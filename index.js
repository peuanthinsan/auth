import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import path from 'path';
import { fileURLToPath } from 'url';
dotenv.config();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(express.json());
app.use(cors());

app.use('/dist', express.static(path.join(__dirname, 'frontend/dist')));
app.use(express.static(path.join(__dirname, 'frontend/public')));
const SECRET = process.env.JWT_SECRET || 'supersecretkey';

const ROLE_CODES = {
  ADMIN: 'ADMIN',
  USER: 'USER'
};

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const { Schema } = mongoose;

const roleSchema = new Schema({
  code: { type: String, unique: true },
  name: String
});

const userSchema = new Schema({
  username: { type: String, unique: true },
  passwordHash: String,
  email: String,
  firstName: String,
  lastName: String,
  organizations: [{ type: Schema.Types.ObjectId, ref: 'Organization' }],
  invites: [{ type: Schema.Types.ObjectId, ref: 'Invite' }],
  balance: { type: Number, default: 0 },
  role: { type: Schema.Types.ObjectId, ref: 'Role' }
});

const organizationSchema = new Schema({
  name: String,
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  invites: [{ type: Schema.Types.ObjectId, ref: 'Invite' }]
});

const inviteSchema = new Schema({
  orgId: { type: Schema.Types.ObjectId, ref: 'Organization' },
  email: String,
  token: String
});

const Role = mongoose.model('Role', roleSchema);
const User = mongoose.model('User', userSchema);
const Organization = mongoose.model('Organization', organizationSchema);
const Invite = mongoose.model('Invite', inviteSchema);

async function ensureDefaultRoles() {
  const defaults = [
    { code: ROLE_CODES.ADMIN, name: 'Administrator' },
    { code: ROLE_CODES.USER, name: 'User' }
  ];
  for (const r of defaults) {
    const existing = await Role.findOne({ code: r.code });
    if (!existing) {
      await Role.create(r);
    }
  }
}

ensureDefaultRoles();

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

async function requireAdmin(req, res, next) {
  const user = await User.findById(req.user.id).populate('role');
  if (!user || !user.role || user.role.code !== ROLE_CODES.ADMIN) {
    return res.status(403).json({ message: 'Admin only' });
  }
  next();
}

// register
app.post('/register', async (req, res) => {
  const { username, password, email, firstName, lastName } = req.body;
  if (await User.findOne({ username })) {
    return res.status(400).json({ message: 'Username exists' });
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const userRole = await Role.findOne({ code: ROLE_CODES.ADMIN });
  const user = new User({
    username,
    passwordHash,
    email,
    firstName,
    lastName,
    organizations: [],
    invites: [],
    balance: 0,
    role: userRole ? userRole._id : null
  });
  await user.save();
  res.json({ message: 'Registered' });
});

// login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });
  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) return res.status(400).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// get profile
app.get('/profile', authenticateToken, async (req, res) => {
  const user = await User.findById(req.user.id).lean();
  if (!user) return res.sendStatus(404);
  res.json({
    username: user.username,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    balance: user.balance
  });
});

// update profile
app.patch('/profile', authenticateToken, async (req, res) => {
  const { username, firstName, lastName } = req.body;
  const user = await User.findById(req.user.id);
  if (!user) return res.sendStatus(404);
  if (username) user.username = username;
  if (firstName) user.firstName = firstName;
  if (lastName) user.lastName = lastName;
  await user.save();
  res.json({ message: 'Profile updated' });
});

// change password
app.post('/password/change', authenticateToken, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await User.findById(req.user.id);
  if (!user) return res.sendStatus(404);
  const match = await bcrypt.compare(oldPassword, user.passwordHash);
  if (!match) return res.status(400).json({ message: 'Invalid password' });
  user.passwordHash = await bcrypt.hash(newPassword, 10);
  await user.save();
  res.json({ message: 'Password changed' });
});

// reset password without auth (simple demo)
app.post('/password/reset', async (req, res) => {
  const { username, newPassword } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(404).json({ message: 'User not found' });
  user.passwordHash = await bcrypt.hash(newPassword, 10);
  await user.save();
  res.json({ message: 'Password reset' });
});

// organization management
app.post('/organizations', authenticateToken, requireAdmin, async (req, res) => {
  const { name } = req.body;
  const org = new Organization({ name, members: [req.user.id], invites: [] });
  await org.save();
  await User.findByIdAndUpdate(req.user.id, { $push: { organizations: org._id } });
  res.json({ message: 'Organization created', orgId: org._id });
});

app.get('/organizations', authenticateToken, async (req, res) => {
  const user = await User.findById(req.user.id).populate('organizations');
  if (!user) return res.sendStatus(404);
  res.json({
    organizations: user.organizations.map(o => ({ id: o._id, name: o.name }))
  });
});

app.get('/my-organizations', authenticateToken, async (req, res) => {
  const user = await User.findById(req.user.id).populate('organizations');
  if (!user) return res.sendStatus(404);
  res.json({
    organizations: user.organizations.map(o => ({ id: o._id, name: o.name }))
  });
});


app.post('/organizations/:id/members', authenticateToken, requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  const org = await Organization.findById(id);
  if (!org) return res.status(404).json({ message: 'Org not found' });
  if (!org.members.includes(req.user.id)) return res.status(403).json({ message: 'Not authorized' });
  if (!org.members.includes(userId)) {
    org.members.push(userId);
    await User.findByIdAndUpdate(userId, { $push: { organizations: org._id } });
  }
  await org.save();
  res.json({ message: 'Member added' });
});

app.delete('/organizations/:id/members/:userId', authenticateToken, requireAdmin, async (req, res) => {
  const { id, userId } = req.params;
  const org = await Organization.findById(id);
  if (!org) return res.status(404).json({ message: 'Org not found' });
  if (!org.members.includes(req.user.id)) return res.status(403).json({ message: 'Not authorized' });
  org.members = org.members.filter(m => m.toString() !== userId);
  await org.save();
  await User.findByIdAndUpdate(userId, { $pull: { organizations: org._id } });
  res.json({ message: 'Member removed' });
});

// invite user (dummy implementation)
app.post('/organizations/:id/invite', authenticateToken, requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { email } = req.body;
  const org = await Organization.findById(id);
  if (!org) return res.status(404).json({ message: 'Org not found' });
  const invite = new Invite({ orgId: org._id, email, token: Math.random().toString(36).substring(2) });
  await invite.save();
  org.invites.push(invite._id);
  await org.save();
  res.json({ message: 'Invite created', inviteId: invite._id });
});

app.get('/organizations/:id/invites', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const org = await Organization.findById(id).populate('invites');
  if (!org) return res.status(404).json({ message: 'Org not found' });
  res.json(org.invites);
});

app.get('/organizations/all', authenticateToken, requireAdmin, async (req, res) => {
  const orgs = await Organization.find();
  res.json(orgs.map(o => ({
    id: o._id,
    name: o.name,
    members: o.members.length,
    invites: o.invites.length
  })));
});

app.delete('/organizations/:id', authenticateToken, requireAdmin, async (req, res) => {
  const { id } = req.params;
  await Organization.findByIdAndDelete(id);
  res.json({ message: 'Organization deleted' });
});

app.patch('/organizations/:id', authenticateToken, requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const org = await Organization.findById(id);
  if (!org) return res.status(404).json({ message: 'Org not found' });
  org.name = name || org.name;
  await org.save();
  res.json({ message: 'Organization updated' });
});

app.get('/users', authenticateToken, requireAdmin, async (req, res) => {
  const users = await User.find()
    .populate('role', 'code name')
    .populate('organizations', 'name');
  res.json(users.map(u => ({
    id: u._id,
    username: u.username,
    email: u.email,
    firstName: u.firstName,
    lastName: u.lastName,
    balance: u.balance,
    roleId: u.role?._id,
    role: u.role?.code,
    organizations: u.organizations.map(o => ({ id: o._id, name: o.name }))
  })));
});

app.delete('/users/:id', authenticateToken, requireAdmin, async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.json({ message: 'User deleted' });
});

app.post('/users/:id/role', authenticateToken, requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { roleId } = req.body;
  const role = await Role.findById(roleId);
  if (!role) return res.status(400).json({ message: 'Invalid role' });
  const user = await User.findById(id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  user.role = role._id;
  await user.save();
  res.json({ message: 'Role updated' });
});

// role management
app.get('/roles', authenticateToken, requireAdmin, async (req, res) => {
  const roles = await Role.find();
  res.json(roles.map(r => ({ id: r._id, code: r.code, name: r.name })));
});

app.post('/roles', authenticateToken, requireAdmin, async (req, res) => {
  const { code, name } = req.body;
  if (!code) return res.status(400).json({ message: 'Code required' });
  const role = new Role({ code, name });
  await role.save();
  res.json({ message: 'Role created', id: role._id });
});

app.patch('/roles/:id', authenticateToken, requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { code, name } = req.body;
  const role = await Role.findById(id);
  if (!role) return res.status(404).json({ message: 'Role not found' });
  if (code) role.code = code;
  if (name) role.name = name;
  await role.save();
  res.json({ message: 'Role updated' });
});

app.delete('/roles/:id', authenticateToken, requireAdmin, async (req, res) => {
  const { id } = req.params;
  await Role.findByIdAndDelete(id);
  res.json({ message: 'Role deleted' });
});

// invite management
app.get('/invites', authenticateToken, requireAdmin, async (req, res) => {
  const invites = await Invite.find().populate('orgId', 'name');
  res.json(invites.map(i => ({
    id: i._id,
    email: i.email,
    org: i.orgId?.name,
    token: i.token
  })));
});

app.delete('/invites/:id', authenticateToken, requireAdmin, async (req, res) => {
  const { id } = req.params;
  await Invite.findByIdAndDelete(id);
  res.json({ message: 'Invite deleted' });
});

app.post('/invites/:id/accept', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const invite = await Invite.findById(id);
  if (!invite) return res.status(404).json({ message: 'Invite not found' });
  const org = await Organization.findById(invite.orgId);
  if (!org) return res.status(404).json({ message: 'Org not found' });
  const user = await User.findById(req.user.id);
  if (!user.organizations.includes(org._id)) user.organizations.push(org._id);
  if (!org.members.includes(req.user.id)) org.members.push(req.user.id);
  await Promise.all([user.save(), org.save(), Invite.findByIdAndDelete(id)]);
  res.json({ message: 'Invite accepted' });
});

// currency transfer
app.post('/transfer', authenticateToken, async (req, res) => {
  const { toUsername, amount } = req.body;
  const numAmount = parseFloat(amount);
  if (isNaN(numAmount) || numAmount <= 0) return res.status(400).json({ message: 'Invalid amount' });
  const fromUser = await User.findById(req.user.id);
  const toUser = await User.findOne({ username: toUsername });
  if (!toUser) return res.status(404).json({ message: 'Recipient not found' });
  if (fromUser.balance < numAmount) return res.status(400).json({ message: 'Insufficient balance' });
  fromUser.balance -= numAmount;
  toUser.balance += numAmount;
  await Promise.all([fromUser.save(), toUser.save()]);
  res.json({ message: 'Transfer complete' });
});

// get balance
app.get('/balance', authenticateToken, async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json({ balance: user.balance });
});

app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/public/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
