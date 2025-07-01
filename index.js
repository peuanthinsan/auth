import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import multer from 'multer';

import path from 'path';
import { fileURLToPath } from 'url';
dotenv.config();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(express.json());
app.use(cors());
const upload = multer({ dest: path.join(__dirname, 'uploads') });

app.use('/dist', express.static(path.join(__dirname, 'frontend/dist')));
app.use(express.static(path.join(__dirname, 'frontend/public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
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
  code: String,
  name: String,
  orgId: { type: Schema.Types.ObjectId, ref: 'Organization', default: null },
  system: { type: Boolean, default: false }
});
roleSchema.index({ code: 1, orgId: 1 }, { unique: true });

const userSchema = new Schema({
  username: { type: String, unique: true, maxlength: 20, trim: true },
  passwordHash: String,
  email: { type: String, unique: true },
  firstName: String,
  lastName: String,
  profilePicture: String,
  organizations: [{ type: Schema.Types.ObjectId, ref: 'Organization' }],
  invites: [{ type: Schema.Types.ObjectId, ref: 'Invite' }],
  balances: [{
    orgId: { type: Schema.Types.ObjectId, ref: 'Organization' },
    amount: { type: Number, default: 0 }
  }],
  roles: [{ type: Schema.Types.ObjectId, ref: 'Role' }],
  isSuperAdmin: { type: Boolean, default: false },
  refreshToken: String,
  resetToken: String
});

const organizationSchema = new Schema({
  name: String,
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  invites: [{ type: Schema.Types.ObjectId, ref: 'Invite' }]
});

const inviteSchema = new Schema({
  orgId: { type: Schema.Types.ObjectId, ref: 'Organization' },
  email: String,
  token: String,
  role: { type: String, default: ROLE_CODES.USER }
});

const Role = mongoose.model('Role', roleSchema);
const User = mongoose.model('User', userSchema);
const Organization = mongoose.model('Organization', organizationSchema);
const Invite = mongoose.model('Invite', inviteSchema);

async function ensureDefaultRoles() {
  const defaults = [
    { code: ROLE_CODES.ADMIN, name: 'Administrator', orgId: null, system: true },
    { code: ROLE_CODES.USER, name: 'User', orgId: null, system: true }
  ];
  for (const r of defaults) {
    const existing = await Role.findOne({ code: r.code, orgId: r.orgId });
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
  const user = await User.findById(req.user.id).populate('roles');
  if (
    !user ||
    (!user.isSuperAdmin && !user.roles.some(r => r.code === ROLE_CODES.ADMIN))
  ) {
    return res.status(403).json({ message: 'Admin only' });
  }
  next();
}

async function requireSuperAdmin(req, res, next) {
  const user = await User.findById(req.user.id);
  if (!user || !user.isSuperAdmin) {
    return res.status(403).json({ message: 'Super admin only' });
  }
  next();
}

const apiRouter = express.Router();

// register
apiRouter.post('/register', async (req, res) => {
  let { username, password, email, firstName, lastName } = req.body;
  username = username ? username.trim() : '';
  if (!username || username.length > 20 || !password || !email || !firstName || !lastName) {
    return res.status(400).json({ message: 'Invalid input' });
  }
  if (await User.findOne({ username })) {
    return res.status(400).json({ message: 'Username exists' });
  }
  if (await User.findOne({ email })) {
    return res.status(400).json({ message: 'Email exists' });
  }
  if (await User.findOne({ email })) {
    return res.status(400).json({ message: 'Email exists' });
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const userRole = await Role.findOne({ code: ROLE_CODES.USER, orgId: null });
  const user = new User({
    username,
    passwordHash,
    email,
    firstName,
    lastName,
    organizations: [],
    invites: [],
    balances: [],
    roles: userRole ? [userRole._id] : [],
    isSuperAdmin: false
  });
  await user.save();
  res.json({ message: 'Registered' });
});

apiRouter.post('/superadmin', async (req, res) => {
  const existing = await User.findOne({ isSuperAdmin: true });
  if (existing) return res.status(400).json({ message: 'Super admin already exists' });
  let { username, password, email, firstName, lastName } = req.body;
  username = username ? username.trim() : '';
  if (!username || username.length > 20 || !password || !email || !firstName || !lastName) {
    return res.status(400).json({ message: 'Invalid input' });
  }
  if (await User.findOne({ username })) {
    return res.status(400).json({ message: 'Username exists' });
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const adminRole = await Role.findOne({ code: ROLE_CODES.ADMIN, orgId: null });
  const user = new User({
    username,
    passwordHash,
    email,
    firstName,
    lastName,
    organizations: [],
    invites: [],
    balances: [],
    roles: adminRole ? [adminRole._id] : [],
    isSuperAdmin: true
  });
  await user.save();
  res.json({ message: 'Super admin created' });
});

// login
apiRouter.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const trimmed = username ? username.trim() : '';
  const user = await User.findOne({ username: trimmed });
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });
  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) return res.status(400).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: '1h' });
  const refreshToken = jwt.sign({ id: user._id }, SECRET, { expiresIn: '7d' });
  user.refreshToken = refreshToken;
  await user.save();
  res.json({ token, refreshToken });
});

apiRouter.post('/logout', async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.sendStatus(400);
  try {
    const payload = jwt.verify(refreshToken, SECRET);
    const user = await User.findById(payload.id);
    if (user && user.refreshToken === refreshToken) {
      user.refreshToken = '';
      await user.save();
    }
    res.json({ message: 'Logged out' });
  } catch (err) {
    res.sendStatus(400);
  }
});

apiRouter.post('/refresh', async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.sendStatus(401);
  try {
    const payload = jwt.verify(refreshToken, SECRET);
    const user = await User.findById(payload.id);
    if (!user || user.refreshToken !== refreshToken) {
      return res.sendStatus(403);
    }
    const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.sendStatus(403);
  }
});

// get profile
apiRouter.get('/profile', authenticateToken, async (req, res) => {
  const user = await User.findById(req.user.id)
    .populate('organizations', 'name')
    .populate('roles', 'code')
    .populate('balances.orgId', 'name')
    .lean();
  if (!user) return res.sendStatus(404);
  res.json({
    id: user._id,
    username: user.username,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    profilePicture: user.profilePicture,
    roles: user.roles.map(r => r.code),
    isSuperAdmin: user.isSuperAdmin,
    balances: user.balances.map(b => ({
      orgId: b.orgId?._id ?? b.orgId,
      orgName: b.orgId?.name,
      amount: b.amount
    })),
    organizations: user.organizations.map(o => ({ id: o._id, name: o.name }))
  });
});

apiRouter.get('/user/organizations', authenticateToken, async (req, res) => {
  const user = await User.findById(req.user.id).populate('organizations', 'name');
  if (!user) return res.sendStatus(404);
  if (user.isSuperAdmin) {
    const all = await Organization.find();
    return res.json({ organizations: all.map(o => ({ id: o._id, name: o.name })) });
  }
  res.json({ organizations: user.organizations.map(o => ({ id: o._id, name: o.name })) });
});

// update profile
apiRouter.patch(
  '/profile',
  authenticateToken,
  upload.single('profilePicture'),
  async (req, res) => {
    const { username, firstName, lastName } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.sendStatus(404);
    if (username && username !== user.username) {
      const existing = await User.findOne({ username });
      if (existing && !existing._id.equals(user._id)) {
        return res.status(400).json({ message: 'Username exists' });
      }
      user.username = username;
    }
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (req.file) {
      user.profilePicture = `/uploads/${req.file.filename}`;
    }
    await user.save();
    res.json({ message: 'Profile updated' });
  }
);

// change password
apiRouter.post('/password/change', authenticateToken, async (req, res) => {
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
apiRouter.post('/password/forgot', async (req, res) => {
  const { username } = req.body;
  const trimmed = username ? username.trim() : '';
  const user = await User.findOne({ username: trimmed });
  if (!user) return res.status(404).json({ message: 'User not found' });
  const token = Math.random().toString(36).substring(2);
  user.resetToken = token;
  await user.save();
  res.json({ message: 'Reset token created', token });
});

apiRouter.post('/password/reset', async (req, res) => {
  const { token, newPassword } = req.body;
  const user = await User.findOne({ resetToken: token });
  if (!user) return res.status(400).json({ message: 'Invalid token' });
  user.passwordHash = await bcrypt.hash(newPassword, 10);
  user.resetToken = '';
  await user.save();
  res.json({ message: 'Password reset' });
});

// organization management
apiRouter.post('/organizations', authenticateToken, requireSuperAdmin, async (req, res) => {
  const { name } = req.body;
  const org = new Organization({ name, members: [req.user.id], invites: [] });
  await org.save();
  await User.findByIdAndUpdate(req.user.id, { $push: { organizations: org._id, balances: { orgId: org._id, amount: 0 } } });
  await Role.create([
    { code: ROLE_CODES.ADMIN, name: 'Administrator', orgId: org._id, system: true },
    { code: ROLE_CODES.USER, name: 'User', orgId: org._id, system: true }
  ]);
  res.json({ message: 'Organization created', orgId: org._id });
});

apiRouter.get('/organizations', authenticateToken, requireSuperAdmin, async (req, res) => {
  const orgs = await Organization.find();
  res.json(
    orgs.map(o => ({
      id: o._id,
      name: o.name,
      members: o.members.length,
      invites: o.invites.length
    }))
  );
});


apiRouter.post('/organizations/:id/members', authenticateToken, requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  const org = await Organization.findById(id);
  if (!org) return res.status(404).json({ message: 'Org not found' });
  const requesting = await User.findById(req.user.id);
  if (!requesting.isSuperAdmin && !org.members.some(m => m.toString() === req.user.id)) {
    return res.status(403).json({ message: 'Not authorized' });
  }
  if (!org.members.some(m => m.toString() === userId)) {
    org.members.push(userId);
    const user = await User.findById(userId);
    if (user && !user.organizations.includes(org._id)) {
      user.organizations.push(org._id);
    }
    if (user && !user.balances.some(b => b.orgId.toString() === org._id.toString())) {
      user.balances.push({ orgId: org._id, amount: 0 });
    }
    if (user) await user.save();
  }
  await org.save();
  res.json({ message: 'Member added' });
});

apiRouter.delete('/organizations/:id/members/:userId', authenticateToken, requireAdmin, async (req, res) => {
  const { id, userId } = req.params;
  const org = await Organization.findById(id);
  if (!org) return res.status(404).json({ message: 'Org not found' });
  const requesting = await User.findById(req.user.id);
  if (!requesting.isSuperAdmin && !org.members.some(m => m.toString() === req.user.id)) {
    return res.status(403).json({ message: 'Not authorized' });
  }
  org.members = org.members.filter(m => m.toString() !== userId);
  await org.save();
  const user = await User.findById(userId);
  if (user) {
    user.organizations = user.organizations.filter(o => o.toString() !== org._id.toString());
    user.balances = user.balances.filter(b => b.orgId.toString() !== org._id.toString());
    await user.save();
  }
  res.json({ message: 'Member removed' });
});

// invite user (dummy implementation)
apiRouter.post('/organizations/:id/invite', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { email, role } = req.body;
  const org = await Organization.findById(id);
  if (!org) return res.status(404).json({ message: 'Org not found' });
  const requesting = await User.findById(req.user.id);
  if (!requesting.isSuperAdmin && !org.members.some(m => m.toString() === req.user.id)) {
    return res.status(403).json({ message: 'Not authorized' });
  }
  const roleCode = role === ROLE_CODES.ADMIN ? ROLE_CODES.ADMIN : ROLE_CODES.USER;
  const invite = new Invite({ orgId: org._id, email, role: roleCode, token: Math.random().toString(36).substring(2) });
  await invite.save();
  org.invites.push(invite._id);
  await org.save();
  res.json({ message: 'Invite created', inviteId: invite._id });
});

apiRouter.get('/organizations/:id/invites', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const org = await Organization.findById(id).populate('invites');
  if (!org) return res.status(404).json({ message: 'Org not found' });
  res.json(
    org.invites.map(i => ({ id: i._id, email: i.email, token: i.token, role: i.role }))
  );
});


apiRouter.delete('/organizations/:id', authenticateToken, requireSuperAdmin, async (req, res) => {
  const { id } = req.params;

  const roles = await Role.find({ orgId: id });
  const roleIds = roles.map(r => r._id);

  const inviteIds = (await Invite.find({ orgId: id }).select('_id')).map(i => i._id);

  await Promise.all([
    Role.deleteMany({ orgId: id }),
    Invite.deleteMany({ orgId: id }),
    User.updateMany(
      {},
      {
        $pull: {
          organizations: id,
          balances: { orgId: id },
          roles: { $in: roleIds },
          invites: { $in: inviteIds }
        }
      }
    ),
    Organization.findByIdAndDelete(id)
  ]);

  res.json({ message: 'Organization deleted' });
});

apiRouter.patch('/organizations/:id', authenticateToken, requireSuperAdmin, async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const org = await Organization.findById(id);
  if (!org) return res.status(404).json({ message: 'Org not found' });
  org.name = name || org.name;
  await org.save();
  res.json({ message: 'Organization updated' });
});

apiRouter.get('/users', authenticateToken, requireAdmin, async (req, res) => {
  const { orgId } = req.query;
  const filter = orgId ? { organizations: orgId } : {};
  const users = await User.find(filter)
    .populate('roles', 'code name')
    .populate('organizations', 'name');
  res.json(
    users.map(u => ({
      id: u._id,
      username: u.username,
      email: u.email,
      firstName: u.firstName,
      lastName: u.lastName,
      profilePicture: u.profilePicture,
      balance: orgId ? (u.balances.find(b => b.orgId.toString() === orgId)?.amount || 0) : 0,
      organizations: u.organizations.map(o => ({ id: o._id, name: o.name })),
      roleIds: u.roles.map(r => r._id),
      roles: u.roles.map(r => r.code)
    }))
  );
});

apiRouter.delete('/users/:id', authenticateToken, requireAdmin, async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  if (user.isSuperAdmin) {
    return res.status(400).json({ message: 'Cannot delete super admin' });
  }
  await user.deleteOne();
  res.json({ message: 'User deleted' });
});

apiRouter.post('/users/:id/roles', authenticateToken, requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { roleIds } = req.body;
  if (!Array.isArray(roleIds) || roleIds.length === 0)
    return res.status(400).json({ message: 'roleIds array required and cannot be empty' });
  const roles = await Role.find({ _id: { $in: roleIds } });
  if (roles.length !== roleIds.length) return res.status(400).json({ message: 'Invalid roles' });
  const user = await User.findById(id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  user.roles = roleIds;
  await user.save();
  res.json({ message: 'Roles updated' });
});

// role management
apiRouter.get('/roles', authenticateToken, requireAdmin, async (req, res) => {
  const { orgId } = req.query;
  const filter = orgId ? { orgId } : { orgId: null };
  const roles = await Role.find(filter);
  res.json(roles.map(r => ({ id: r._id, code: r.code, name: r.name, system: r.system })));
});

apiRouter.post('/roles', authenticateToken, requireAdmin, async (req, res) => {
  const { code, name, orgId } = req.body;
  if (!code || !orgId) return res.status(400).json({ message: 'Code and orgId required' });
  const role = new Role({ code, name, orgId, system: false });
  await role.save();
  res.json({ message: 'Role created', id: role._id });
});

apiRouter.patch('/roles/:id', authenticateToken, requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { code, name } = req.body;
  const role = await Role.findById(id);
  if (!role) return res.status(404).json({ message: 'Role not found' });
  if (code) role.code = code;
  if (name) role.name = name;
  await role.save();
  res.json({ message: 'Role updated' });
});

apiRouter.delete('/roles/:id', authenticateToken, requireAdmin, async (req, res) => {
  const { id } = req.params;
  const role = await Role.findById(id);
  if (!role) return res.status(404).json({ message: 'Role not found' });
  if (role.system) return res.status(400).json({ message: 'Cannot delete default role' });
  await role.deleteOne();
  res.json({ message: 'Role deleted' });
});

// invite management
apiRouter.get('/invites', authenticateToken, requireAdmin, async (req, res) => {
  const invites = await Invite.find().populate('orgId', 'name');
  res.json(invites.map(i => ({
    id: i._id,
    email: i.email,
    org: i.orgId?.name,
    token: i.token,
    role: i.role
  })));
});

apiRouter.delete('/invites/:id', authenticateToken, requireAdmin, async (req, res) => {
  const { id } = req.params;
  const invite = await Invite.findByIdAndDelete(id);
  if (invite) {
    await Organization.findByIdAndUpdate(invite.orgId, { $pull: { invites: invite._id } });
  }
  res.json({ message: 'Invite deleted' });
});

apiRouter.get('/my-invites', authenticateToken, async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) return res.sendStatus(404);
  const invites = await Invite.find({ email: user.email }).populate('orgId', 'name');
  res.json(invites.map(i => ({ id: i._id, org: i.orgId?.name, token: i.token, role: i.role })));
});

apiRouter.post('/invites/:id/accept', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { token } = req.body;
  const invite = await Invite.findById(id);
  if (!invite) return res.status(404).json({ message: 'Invite not found' });
  if (!token || invite.token !== token) {
    return res.status(400).json({ message: 'Invalid token' });
  }
  const org = await Organization.findById(invite.orgId);
  if (!org) return res.status(404).json({ message: 'Org not found' });
  const user = await User.findById(req.user.id);
  if (!user.organizations.some(o => o.toString() === org._id.toString())) {
    user.organizations.push(org._id);
  }
  if (!user.balances.some(b => b.orgId.toString() === org._id.toString())) {
    user.balances.push({ orgId: org._id, amount: 0 });
  }
  const role = await Role.findOne({ code: invite.role || ROLE_CODES.USER, orgId: org._id });
  if (role && !user.roles.includes(role._id)) user.roles.push(role._id);
  if (!org.members.some(m => m.toString() === req.user.id)) {
    org.members.push(req.user.id);
  }
  await Promise.all([
    user.save(),
    Organization.findByIdAndUpdate(org._id, { $pull: { invites: invite._id }, $addToSet: { members: req.user.id } }),
    Invite.findByIdAndDelete(id)
  ]);
  res.json({ message: 'Invite accepted' });
});

// currency transfer
apiRouter.post('/transfer', authenticateToken, async (req, res) => {
  const { toUsername, amount, orgId } = req.body;
  const recipient = toUsername ? toUsername.trim() : '';
  const numAmount = parseFloat(amount);
  if (!recipient || isNaN(numAmount) || numAmount <= 0 || !orgId) {
    return res.status(400).json({ message: 'Invalid input' });
  }
  const fromUser = await User.findById(req.user.id);
  const toUser = await User.findOne({ username: recipient });
  if (!toUser) return res.status(404).json({ message: 'Recipient not found' });
  if (toUser._id.equals(fromUser._id)) {
    return res.status(400).json({ message: 'Cannot transfer to self' });
  }
  if (!fromUser.organizations.includes(orgId) || !toUser.organizations.includes(orgId)) {
    return res.status(400).json({ message: 'Users must share the organization' });
  }
  const fromBal = fromUser.balances.find(b => b.orgId.toString() === orgId);
  const toBal = toUser.balances.find(b => b.orgId.toString() === orgId);
  if (!fromBal || !toBal) {
    return res.status(400).json({ message: 'Balance info missing' });
  }
  if (fromBal.amount < numAmount) {
    return res.status(400).json({ message: 'Insufficient balance' });
  }
  fromBal.amount -= numAmount;
  toBal.amount += numAmount;
  await Promise.all([fromUser.save(), toUser.save()]);
  res.json({ message: 'Transfer complete' });
});

// get balance
apiRouter.get('/balance', authenticateToken, async (req, res) => {
  const { orgId } = req.query;
  const user = await User.findById(req.user.id);
  if (orgId) {
    const b = user.balances.find(bl => bl.orgId.toString() === orgId);
    return res.json({ balance: b ? b.amount : 0 });
  }
  res.json({ balances: user.balances.map(b => ({ orgId: b.orgId._id ?? b.orgId, orgName: b.orgId.name ?? undefined, amount: b.amount })) });
});

app.use('/api', apiRouter);

app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/public/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
