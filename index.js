import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import multer from 'multer';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';

import path from 'path';
import { fileURLToPath } from 'url';
dotenv.config();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(express.json());
const defaultOrigin = process.env.API_URL
  ? new URL(process.env.API_URL).origin
  : `http://localhost:${process.env.PORT || 3000}`;
const corsOrigin = process.env.CORS_ORIGIN || defaultOrigin;
app.use(cors({ origin: corsOrigin }));
const MAX_FILE_SIZE =
  parseInt(process.env.MAX_FILE_SIZE, 10) || 25 * 1024 * 1024; // 25MB default
const upload = multer({
  dest: path.join(__dirname, 'uploads'),
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('Only JPEG and PNG images are allowed'));
    }
  }
});

app.use('/dist', express.static(path.join(__dirname, 'frontend/dist')));
app.use(express.static(path.join(__dirname, 'frontend/public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const swaggerDocument = yaml.load(path.join(__dirname, 'docs/openapi.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
const SECRET = process.env.JWT_SECRET;
if (!SECRET) {
  throw new Error('JWT_SECRET environment variable is required');
}

const RESET_TOKEN_EXPIRY_MS = 60 * 60 * 1000;

function hashToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

function generateResetToken() {
  const token = crypto.randomBytes(32).toString('hex');
  return { token, hash: hashToken(token) };
}

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
  friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  balances: [{
    orgId: { type: Schema.Types.ObjectId, ref: 'Organization' },
    amount: { type: Number, default: 0 }
  }],
  roles: [{ type: Schema.Types.ObjectId, ref: 'Role' }],
  isSuperAdmin: { type: Boolean, default: false },
  refreshToken: String,
  resetToken: String,
  resetTokenExpires: Date
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

const friendRequestSchema = new Schema({
  from: { type: Schema.Types.ObjectId, ref: 'User' },
  to: { type: Schema.Types.ObjectId, ref: 'User' }
});
friendRequestSchema.index({ from: 1, to: 1 }, { unique: true });

const postSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  content: String,
  image: String,
  organization: { type: Schema.Types.ObjectId, ref: 'Organization', default: null },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  upvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  downvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  credits: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});
postSchema.index({ createdAt: -1 });

const commentSchema = new Schema({
  post: { type: Schema.Types.ObjectId, ref: 'Post' },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  content: String,
  upvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  downvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  credits: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const Role = mongoose.model('Role', roleSchema);
const User = mongoose.model('User', userSchema);
const Organization = mongoose.model('Organization', organizationSchema);
const Invite = mongoose.model('Invite', inviteSchema);
const FriendRequest = mongoose.model('FriendRequest', friendRequestSchema);
const Post = mongoose.model('Post', postSchema);
const Comment = mongoose.model('Comment', commentSchema);

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

async function ensureDefaultUsers() {
  const count = await User.countDocuments();
  if (count >= 100) return;
  const passwordHash = await bcrypt.hash('password', 10);
  const firstNames = [
    'Bob',
    'Alice',
    'John',
    'Jane',
    'Michael',
    'Sarah',
    'David',
    'Emily',
    'Chris',
    'Laura'
  ];
  const lastNames = [
    'Saget',
    'Smith',
    'Johnson',
    'Williams',
    'Brown',
    'Jones',
    'Miller',
    'Davis',
    'Garcia',
    'Martinez'
  ];
  const docs = [];
  for (let i = count; i < 100; i++) {
    const first = firstNames[i % firstNames.length];
    const last = lastNames[Math.floor(i / firstNames.length)];
    docs.push({
      username: `${first.toLowerCase()}${last.toLowerCase()}${i + 1}`,
      passwordHash,
      email: `${first.toLowerCase()}.${last.toLowerCase()}${i + 1}@example.com`,
      firstName: first,
      lastName: last,
      organizations: [],
      invites: [],
      balances: [],
      roles: [],
      isSuperAdmin: false
    });
  }
  if (docs.length) {
    await User.insertMany(docs);
  }
}

ensureDefaultUsers();

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

async function requireOrgAdmin(req, res, next) {
  const orgId =
    req.params.id || req.query.orgId || (req.body && req.body.orgId);
  const user = await User.findById(req.user.id).populate('roles');
  if (user && user.isSuperAdmin) {
    if (orgId) {
      const org = await Organization.findById(orgId);
      if (!org) {
        return res.status(404).json({ message: 'Org not found' });
      }
      req.org = org;
    }
    return next();
  }
  if (!orgId) {
    return res.status(400).json({ message: 'Organization ID required' });
  }
  if (
    !user ||
    !(
      user.organizations.some(o => o.toString() === orgId) &&
      user.roles.some(
        r =>
          r.code === ROLE_CODES.ADMIN &&
          r.orgId &&
          r.orgId.toString() === orgId
      )
    )
  ) {
    return res.status(403).json({ message: 'Organization admin only' });
  }
  const org = await Organization.findById(orgId);
  if (!org) {
    return res.status(404).json({ message: 'Org not found' });
  }
  req.org = org;
  next();
}

async function requireOrgMember(req, res, next) {
  const orgId = req.params.id || req.query.orgId;
  const user = await User.findById(req.user.id);
  if (user && user.isSuperAdmin) {
    const org = await Organization.findById(orgId);
    if (!org) return res.status(404).json({ message: 'Org not found' });
    req.org = org;
    return next();
  }
  if (!orgId) {
    return res.status(400).json({ message: 'Organization ID required' });
  }
  if (!user || !user.organizations.some(o => o.toString() === orgId)) {
    return res.status(403).json({ message: 'Organization member only' });
  }
  const org = await Organization.findById(orgId);
  if (!org) return res.status(404).json({ message: 'Org not found' });
  req.org = org;
  next();
}

function validatePassword(password) {
  return (
    typeof password === 'string' &&
    password.length >= 8 &&
    /[A-Za-z]/.test(password) &&
    /\d/.test(password)
  );
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
  if (!validatePassword(password)) {
    return res.status(400).json({
      message:
        'Password must be at least 8 characters and contain letters and numbers'
    });
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
  if (await User.findOne({ email })) {
    return res.status(400).json({ message: 'Email exists' });
  }
  if (!validatePassword(password)) {
    return res.status(400).json({
      message:
        'Password must be at least 8 characters and contain letters and numbers'
    });
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
    .populate('roles', 'code name')
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
    roleCodes: user.roles.map(r => r.code),
    roles: user.roles.map(r => r.name),
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
  (req, res, next) => {
    const single = upload.single('profilePicture');
    single(req, res, err => {
      if (err) {
        const msg =
          err.code === 'LIMIT_FILE_SIZE'
            ? `File too large. Max ${MAX_FILE_SIZE / (1024 * 1024)}MB`
            : err.message;
        return res.status(400).json({ message: msg });
      }
      next();
    });
  },
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

// delete own profile
apiRouter.delete('/profile', authenticateToken, async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) return res.sendStatus(404);
  await user.deleteOne();
  res.json({ message: 'Account deleted' });
});

// change password
apiRouter.post('/password/change', authenticateToken, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await User.findById(req.user.id);
  if (!user) return res.sendStatus(404);
  const match = await bcrypt.compare(oldPassword, user.passwordHash);
  if (!match) return res.status(400).json({ message: 'Invalid password' });
  if (!validatePassword(newPassword)) {
    return res.status(400).json({
      message:
        'Password must be at least 8 characters and contain letters and numbers'
    });
  }
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
  const token = crypto.randomBytes(32).toString('hex');
  const hashed = crypto.createHash('sha256').update(token).digest('hex');
  user.resetToken = hashed;
  user.resetTokenExpires = new Date(Date.now() + 60 * 60 * 1000);
  await user.save();
  res.json({ message: 'Reset token created', token });
});

apiRouter.post('/password/reset', async (req, res) => {
  const { token, newPassword } = req.body;
  const hashed = crypto.createHash('sha256').update(token).digest('hex');
  const user = await User.findOne({ resetToken: hashed });
  if (!user || !user.resetTokenExpires || user.resetTokenExpires < new Date()) {
    return res.status(400).json({ message: 'Invalid token' });
  }
  if (!validatePassword(newPassword)) {
    return res.status(400).json({
      message:
        'Password must be at least 8 characters and contain letters and numbers'
    });
  }
  user.passwordHash = await bcrypt.hash(newPassword, 10);
  user.resetToken = undefined;
  user.resetTokenExpires = undefined;
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
  const result = await Promise.all(
    orgs.map(async o => {
      const count = await User.countDocuments({ _id: { $in: o.members } });
      return { id: o._id, name: o.name, members: count, invites: o.invites.length };
    })
  );
  res.json(result);
});


apiRouter.post('/organizations/:id/members', authenticateToken, requireSuperAdmin, async (req, res) => {
  const { id } = req.params;
  const { userId, roleId } = req.body;
  if (!userId) return res.status(400).json({ message: 'userId required' });
  const org = await Organization.findById(id);
  if (!org) return res.status(404).json({ message: 'Org not found' });
  const requesting = await User.findById(req.user.id);
  if (!requesting.isSuperAdmin && !org.members.some(m => m.toString() === req.user.id)) {
    return res.status(403).json({ message: 'Not authorized' });
  }
  let user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: 'User not found' });

  if (!org.members.some(m => m.toString() === userId)) {
    org.members.push(userId);
  }

  if (!user.organizations.includes(org._id)) {
    user.organizations.push(org._id);
  }
  if (!user.balances.some(b => b.orgId.toString() === org._id.toString())) {
    user.balances.push({ orgId: org._id, amount: 0 });
  }
  if (roleId) {
    const role = await Role.findOne({ _id: roleId, orgId: org._id });
    if (role && !user.roles.includes(role._id)) {
      user.roles.push(role._id);
    }
  }
  await Promise.all([user.save(), org.save()]);
  res.json({ message: 'Member added' });
});

apiRouter.delete(
  '/organizations/:id/members/:userId',
  authenticateToken,
  requireOrgAdmin,
  async (req, res) => {
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
    const orgRoleIds = (await Role.find({ orgId: org._id }).select('_id')).map(r => r._id.toString());
    user.roles = user.roles.filter(r => !orgRoleIds.includes(r.toString()));
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
  const trimmed = email ? email.trim() : '';
  if (!/^\S+@\S+\.\S+$/.test(trimmed)) {
    return res.status(400).json({ message: 'Invalid email' });
  }
  const roleCode = role === ROLE_CODES.ADMIN ? ROLE_CODES.ADMIN : ROLE_CODES.USER;
  const invite = new Invite({ orgId: org._id, email: trimmed, role: roleCode, token: Math.random().toString(36).substring(2) });
  await invite.save();
  org.invites.push(invite._id);
  await org.save();
  res.json({ message: 'Invite created', inviteId: invite._id });
});

apiRouter.get(
  '/organizations/:id/invites',
  authenticateToken,
  requireOrgAdmin,
  async (req, res) => {
    await req.org.populate('invites');
    res.json(
      req.org.invites.map(i => ({
        id: i._id,
        email: i.email,
        token: i.token,
        role: i.role
      }))
    );
  }
);


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

apiRouter.get('/users', authenticateToken, requireOrgAdmin, async (req, res) => {
  const { orgId } = req.query;
  let filter = {};
  if (orgId && mongoose.isValidObjectId(orgId)) {
    filter.organizations = new mongoose.Types.ObjectId(orgId);
  } else if (!orgId) {
    filter.organizations = { $size: 0 };
  }
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
      roleCodes: u.roles.map(r => r.code)
    }))
  );
});

apiRouter.delete('/users/:id', authenticateToken, requireSuperAdmin, async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  if (user.isSuperAdmin) {
    return res.status(400).json({ message: 'Cannot delete super admin' });
  }
  await Organization.updateMany({ members: id }, { $pull: { members: id } });
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
apiRouter.get('/roles', authenticateToken, requireOrgAdmin, async (req, res) => {
  const { orgId } = req.query;
  let filter = { orgId: null };
  if (orgId && mongoose.isValidObjectId(orgId)) {
    filter = { orgId: new mongoose.Types.ObjectId(orgId) };
  }
  const roles = await Role.find(filter);
  res.json(roles.map(r => ({ id: r._id, code: r.code, name: r.name, system: r.system })));
});

apiRouter.post('/roles', authenticateToken, requireOrgAdmin, async (req, res) => {
  const { code, name, orgId } = req.body;
  if (!code || !orgId) return res.status(400).json({ message: 'Code and orgId required' });
  const role = new Role({ code, name, orgId, system: false });
  await role.save();
  res.json({ message: 'Role created', id: role._id });
});

apiRouter.patch('/roles/:id', authenticateToken, requireOrgAdmin, async (req, res) => {
  const { id } = req.params;
  const { code, name } = req.body;
  const role = await Role.findById(id);
  if (!role) return res.status(404).json({ message: 'Role not found' });
  if (code) role.code = code;
  if (name) role.name = name;
  await role.save();
  res.json({ message: 'Role updated' });
});

apiRouter.delete('/roles/:id', authenticateToken, requireOrgAdmin, async (req, res) => {
  const { id } = req.params;
  const role = await Role.findById(id);
  if (!role) return res.status(404).json({ message: 'Role not found' });
  if (role.system) return res.status(400).json({ message: 'Cannot delete default role' });
  await role.deleteOne();
  res.json({ message: 'Role deleted' });
});

// invite management
apiRouter.get('/invites', authenticateToken, requireOrgAdmin, async (req, res) => {
  const invites = await Invite.find().populate('orgId', 'name');
  res.json(invites.map(i => ({
    id: i._id,
    email: i.email,
    org: i.orgId?.name,
    token: i.token,
    role: i.role
  })));
});

apiRouter.delete('/invites/:id', authenticateToken, requireOrgAdmin, async (req, res) => {
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
  res.json(invites.map(i => ({ id: i._id, org: i.orgId?.name, orgId: i.orgId?._id, token: i.token, role: i.role })));
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
  res.json({ message: 'Invite accepted', orgId: org._id });
});

// friend management
apiRouter.post('/friends/request', authenticateToken, async (req, res) => {
  const { email } = req.body;
  const trimmed = email ? email.trim() : '';
  if (!trimmed) return res.status(400).json({ message: 'Email required' });
  const toUser = await User.findOne({ email: trimmed });
  if (!toUser) return res.status(404).json({ message: 'User not found' });
  if (toUser._id.equals(req.user.id)) {
    return res.status(400).json({ message: 'Cannot add yourself' });
  }
  const user = await User.findById(req.user.id);
  if (user.friends.includes(toUser._id)) {
    return res.status(400).json({ message: 'Already friends' });
  }
  const existing = await FriendRequest.findOne({
    $or: [
      { from: req.user.id, to: toUser._id },
      { from: toUser._id, to: req.user.id }
    ]
  });
  if (existing) return res.status(400).json({ message: 'Request already exists' });
  const fr = new FriendRequest({ from: req.user.id, to: toUser._id });
  await fr.save();
  res.json({ message: 'Friend request sent' });
});

apiRouter.get('/friends/requests', authenticateToken, async (req, res) => {
  const requests = await FriendRequest.find({ to: req.user.id }).populate('from', 'username email firstName lastName');
  res.json(
    requests.map(r => ({
      id: r._id,
      from: {
        id: r.from._id,
        username: r.from.username,
        email: r.from.email,
        firstName: r.from.firstName,
        lastName: r.from.lastName
      }
    }))
  );
});

apiRouter.post('/friends/requests/:id/accept', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const fr = await FriendRequest.findOne({ _id: id, to: req.user.id });
  if (!fr) return res.status(404).json({ message: 'Request not found' });
  const [fromUser, toUser] = await Promise.all([
    User.findById(fr.from),
    User.findById(fr.to)
  ]);
  if (!fromUser || !toUser) return res.status(404).json({ message: 'User not found' });
  if (!fromUser.friends.includes(toUser._id)) fromUser.friends.push(toUser._id);
  if (!toUser.friends.includes(fromUser._id)) toUser.friends.push(fromUser._id);
  await Promise.all([
    fromUser.save(),
    toUser.save(),
    FriendRequest.findByIdAndDelete(fr._id)
  ]);
  res.json({ message: 'Friend request accepted' });
});

apiRouter.get('/friends', authenticateToken, async (req, res) => {
  const user = await User.findById(req.user.id).populate('friends', 'username email firstName lastName');
  res.json(
    user.friends.map(f => ({
      id: f._id,
      username: f.username,
      email: f.email,
      firstName: f.firstName,
      lastName: f.lastName
    }))
  );
});

apiRouter.get('/friends/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(req.user.id);
  if (!user.friends.some(f => f.toString() === id)) {
    return res.status(403).json({ message: 'Not friends' });
  }
  const friend = await User.findById(id)
    .populate('roles', 'code name')
    .populate('organizations', 'name')
    .populate('balances.orgId', 'name')
    .lean();
  if (!friend) return res.status(404).json({ message: 'Friend not found' });
  res.json({
    id: friend._id,
    username: friend.username,
    email: friend.email,
    firstName: friend.firstName,
    lastName: friend.lastName,
    profilePicture: friend.profilePicture,
    roleCodes: friend.roles.map(r => r.code),
    roles: friend.roles.map(r => r.name),
    balances: friend.balances.map(b => ({
      orgId: b.orgId?._id ?? b.orgId,
      orgName: b.orgId?.name,
      amount: b.amount
    })),
    organizations: friend.organizations.map(o => ({ id: o._id, name: o.name }))
  });
});

apiRouter.delete('/friends/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(req.user.id);
  if (!user.friends.some(f => f.toString() === id)) {
    return res.status(404).json({ message: 'Friend not found' });
  }
  const friend = await User.findById(id);
  if (!friend) return res.status(404).json({ message: 'Friend not found' });
  user.friends = user.friends.filter(f => f.toString() !== id);
  friend.friends = friend.friends.filter(f => f.toString() !== req.user.id);
  await Promise.all([user.save(), friend.save()]);
  res.json({ message: 'Friend removed' });
});

// posts
apiRouter.post('/posts', authenticateToken, (req, res) => {
  const single = upload.single('image');
  single(req, res, async err => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ message: 'Content required' });
    }
    const image = req.file ? `/uploads/${req.file.filename}` : '';
    const post = new Post({ author: req.user.id, content, image });
    await post.save();
    res.json({ message: 'Post created', id: post._id });
  });
});

apiRouter.get('/posts', authenticateToken, async (req, res) => {
  const user = await User.findById(req.user.id);
  const ids = [req.user.id, ...user.friends];
  const order = req.query.order || 'latest';
  const posts = await Post.find({ author: { $in: ids } })
    .populate({
      path: 'author',
      select: 'username firstName lastName profilePicture roles',
      populate: { path: 'roles', select: 'code name' }
    });

  const relevance = p =>
    p.upvotes.length - p.downvotes.length + p.likes.length + p.credits;

  posts.sort((a, b) => {
    if (order === 'upvotes') {
      return b.upvotes.length - a.upvotes.length;
    }
    if (order === 'relevance') {
      return relevance(b) - relevance(a);
    }
    return b.createdAt - a.createdAt;
  });

  res.json(
    posts.map(p => ({
      id: p._id,
      content: p.content,
      image: p.image,
      createdAt: p.createdAt,
      author: {
        id: p.author._id,
        username: p.author.username,
        firstName: p.author.firstName,
        lastName: p.author.lastName,
        profilePicture: p.author.profilePicture,
        roleCodes: p.author.roles.map(r => r.code),
        roles: p.author.roles.map(r => r.name)
      },
      likes: p.likes.length,
      liked: p.likes.some(u => u.toString() === req.user.id),
      upvotes: p.upvotes.length,
      downvotes: p.downvotes.length,
      upvoted: p.upvotes.some(u => u.toString() === req.user.id),
      downvoted: p.downvotes.some(u => u.toString() === req.user.id),
      credits: p.credits
    }))
  );
});

apiRouter.post(
  '/organizations/:id/posts',
  authenticateToken,
  requireOrgMember,
  (req, res) => {
    const single = upload.single('image');
    single(req, res, async err => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }
      const { content } = req.body;
      if (!content) {
        return res.status(400).json({ message: 'Content required' });
      }
      const image = req.file ? `/uploads/${req.file.filename}` : '';
      const post = new Post({
        author: req.user.id,
        content,
        image,
        organization: req.org._id
      });
      await post.save();
      res.json({ message: 'Post created', id: post._id });
    });
  }
);

apiRouter.get(
  '/organizations/:id/posts',
  authenticateToken,
  requireOrgMember,
  async (req, res) => {
  const order = req.query.order || 'latest';
  const posts = await Post.find({ organization: req.org._id })
    .populate({
      path: 'author',
      select: 'username firstName lastName profilePicture roles balances',
      populate: { path: 'roles', select: 'code name' }
    });

  const relevance = p =>
    p.upvotes.length - p.downvotes.length + p.likes.length + p.credits;

  posts.sort((a, b) => {
    if (order === 'upvotes') {
      return b.upvotes.length - a.upvotes.length;
    }
    if (order === 'relevance') {
      return relevance(b) - relevance(a);
    }
    return b.createdAt - a.createdAt;
  });

  res.json(
    posts.map(p => ({
      id: p._id,
      content: p.content,
      image: p.image,
      createdAt: p.createdAt,
      author: {
        id: p.author._id,
        username: p.author.username,
        firstName: p.author.firstName,
        lastName: p.author.lastName,
        profilePicture: p.author.profilePicture,
        roleCodes: p.author.roles.map(r => r.code),
        roles: p.author.roles.map(r => r.name),
        balance:
          p.author.balances.find(b =>
            b.orgId.toString() === req.org._id.toString()
          )?.amount || 0
      },
      likes: p.likes.length,
      liked: p.likes.some(u => u.toString() === req.user.id),
      upvotes: p.upvotes.length,
      downvotes: p.downvotes.length,
      upvoted: p.upvotes.some(u => u.toString() === req.user.id),
      downvoted: p.downvotes.some(u => u.toString() === req.user.id),
      credits: p.credits
    }))
  );
  }
);

apiRouter.post('/posts/:id/like', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  if (!post) return res.status(404).json({ message: 'Post not found' });
  const idx = post.likes.findIndex(u => u.toString() === req.user.id);
  let liked;
  if (idx >= 0) {
    post.likes.splice(idx, 1);
    liked = false;
  } else {
    post.likes.push(req.user.id);
    liked = true;
  }
  await post.save();
  res.json({ liked, likes: post.likes.length });
});

apiRouter.post('/posts/:id/upvote', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  if (!post) return res.status(404).json({ message: 'Post not found' });
  const uid = req.user.id;
  const upIdx = post.upvotes.findIndex(u => u.toString() === uid);
  const downIdx = post.downvotes.findIndex(u => u.toString() === uid);
  let upvoted;
  if (upIdx >= 0) {
    post.upvotes.splice(upIdx, 1);
    upvoted = false;
  } else {
    post.upvotes.push(uid);
    upvoted = true;
    if (downIdx >= 0) post.downvotes.splice(downIdx, 1);
  }
  await post.save();
  res.json({
    upvoted,
    upvotes: post.upvotes.length,
    downvotes: post.downvotes.length
  });
});

apiRouter.post('/posts/:id/downvote', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  if (!post) return res.status(404).json({ message: 'Post not found' });
  const uid = req.user.id;
  const upIdx = post.upvotes.findIndex(u => u.toString() === uid);
  const downIdx = post.downvotes.findIndex(u => u.toString() === uid);
  let downvoted;
  if (downIdx >= 0) {
    post.downvotes.splice(downIdx, 1);
    downvoted = false;
  } else {
    post.downvotes.push(uid);
    downvoted = true;
    if (upIdx >= 0) post.upvotes.splice(upIdx, 1);
  }
  await post.save();
  res.json({
    downvoted,
    upvotes: post.upvotes.length,
    downvotes: post.downvotes.length
  });
});

apiRouter.post('/posts/:id/credit', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { amount, orgId } = req.body;
  const num = parseFloat(amount);
  if (isNaN(num) || num <= 0) {
    return res.status(400).json({ message: 'Invalid amount' });
  }
  const post = await Post.findById(id);
  if (!post) return res.status(404).json({ message: 'Post not found' });
  if (post.author.toString() === req.user.id) {
    return res.status(400).json({ message: 'Cannot credit own post' });
  }
  const useOrg = post.organization || orgId;
  if (!useOrg) return res.status(400).json({ message: 'Organization required' });
  const user = await User.findById(req.user.id);
  const bal = user.balances.find(b => b.orgId.toString() === useOrg.toString());
  if (!bal || bal.amount < num)
    return res.status(400).json({ message: 'Insufficient balance' });
  const author = await User.findById(post.author);
  let authorBal = author.balances.find(
    b => b.orgId.toString() === useOrg.toString()
  );
  if (authorBal) {
    authorBal.amount += num;
  } else {
    author.balances.push({ orgId: useOrg, amount: num });
  }
  bal.amount -= num;
  post.credits += num;
  await Promise.all([user.save(), author.save(), post.save()]);
  res.json({ credits: post.credits, balance: bal.amount });
});

apiRouter.post('/posts/:id/comments', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  if (!content) return res.status(400).json({ message: 'Content required' });
  const post = await Post.findById(id);
  if (!post) return res.status(404).json({ message: 'Post not found' });
  const comment = new Comment({ post: id, author: req.user.id, content });
  await comment.save();
  res.json({ message: 'Comment added', id: comment._id });
});

apiRouter.get('/posts/:id/comments', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  if (!post) return res.status(404).json({ message: 'Post not found' });
  const comments = await Comment.find({ post: id })
    .sort({ createdAt: 1 })
    .populate({
      path: 'author',
      select: 'username firstName lastName profilePicture roles balances',
      populate: { path: 'roles', select: 'code name' }
    });
  res.json(
    comments.map(c => ({
      id: c._id,
      content: c.content,
      createdAt: c.createdAt,
      author: {
        id: c.author._id,
        username: c.author.username,
        firstName: c.author.firstName,
        lastName: c.author.lastName,
        profilePicture: c.author.profilePicture,
        roleCodes: c.author.roles.map(r => r.code),
        roles: c.author.roles.map(r => r.name),
        balance:
          post.organization
            ? c.author.balances.find(b =>
                b.orgId.toString() === post.organization.toString()
              )?.amount || 0
            : 0
      },
      upvotes: c.upvotes.length,
      downvotes: c.downvotes.length,
      upvoted: c.upvotes.some(u => u.toString() === req.user.id),
      downvoted: c.downvotes.some(u => u.toString() === req.user.id),
      credits: c.credits
    }))
  );
});

apiRouter.post('/comments/:id/upvote', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const comment = await Comment.findById(id);
  if (!comment) return res.status(404).json({ message: 'Comment not found' });
  const uid = req.user.id;
  const upIdx = comment.upvotes.findIndex(u => u.toString() === uid);
  const downIdx = comment.downvotes.findIndex(u => u.toString() === uid);
  let upvoted;
  if (upIdx >= 0) {
    comment.upvotes.splice(upIdx, 1);
    upvoted = false;
  } else {
    comment.upvotes.push(uid);
    upvoted = true;
    if (downIdx >= 0) comment.downvotes.splice(downIdx, 1);
  }
  await comment.save();
  res.json({
    upvoted,
    upvotes: comment.upvotes.length,
    downvotes: comment.downvotes.length
  });
});

apiRouter.post('/comments/:id/downvote', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const comment = await Comment.findById(id);
  if (!comment) return res.status(404).json({ message: 'Comment not found' });
  const uid = req.user.id;
  const upIdx = comment.upvotes.findIndex(u => u.toString() === uid);
  const downIdx = comment.downvotes.findIndex(u => u.toString() === uid);
  let downvoted;
  if (downIdx >= 0) {
    comment.downvotes.splice(downIdx, 1);
    downvoted = false;
  } else {
    comment.downvotes.push(uid);
    downvoted = true;
    if (upIdx >= 0) comment.upvotes.splice(upIdx, 1);
  }
  await comment.save();
  res.json({
    downvoted,
    upvotes: comment.upvotes.length,
    downvotes: comment.downvotes.length
  });
});

apiRouter.post('/comments/:id/credit', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { amount, orgId } = req.body;
  const num = parseFloat(amount);
  if (isNaN(num) || num <= 0)
    return res.status(400).json({ message: 'Invalid amount' });
  const comment = await Comment.findById(id).populate('post');
  if (!comment) return res.status(404).json({ message: 'Comment not found' });
  if (comment.author.toString() === req.user.id) {
    return res.status(400).json({ message: 'Cannot credit own comment' });
  }
  const useOrg = comment.post.organization || orgId;
  if (!useOrg)
    return res.status(400).json({ message: 'Organization required' });
  const user = await User.findById(req.user.id);
  const bal = user.balances.find(b => b.orgId.toString() === useOrg.toString());
  if (!bal || bal.amount < num)
    return res.status(400).json({ message: 'Insufficient balance' });
  const author = await User.findById(comment.author);
  let authorBal = author.balances.find(
    b => b.orgId.toString() === useOrg.toString()
  );
  if (authorBal) {
    authorBal.amount += num;
  } else {
    author.balances.push({ orgId: useOrg, amount: num });
  }
  bal.amount -= num;
  comment.credits += num;
  await Promise.all([user.save(), author.save(), comment.save()]);
  res.json({ credits: comment.credits, balance: bal.amount });
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
