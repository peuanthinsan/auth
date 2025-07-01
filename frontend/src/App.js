import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Avatar
} from '@mui/material';
import {
  PersonAdd,
  Login as LoginIcon,
  AccountCircle,
  Edit,
  Lock,
  HowToReg,
  SwapHoriz,
  AccountBalanceWallet,
  AdminPanelSettings,
  Logout
} from '@mui/icons-material';
import { styles } from './styles';
import Register from './pages/Register';
import Login from './pages/Login';
import CreateSuperAdmin from './pages/CreateSuperAdmin';
import Profile from './pages/Profile';
import UpdateProfile from './pages/UpdateProfile';
import ChangePassword from './pages/ChangePassword';
import AcceptInvite from './pages/AcceptInvite';
import Transfer from './pages/Transfer';
import Balance from './pages/Balance';
import Administration from './pages/Administration';
import ResetPassword from './pages/ResetPassword';
import ForgotPassword from './pages/ForgotPassword';
import LogoutPage from './pages/Logout';
import api from './api';
import { AuthContext } from './AuthContext';

export default function App() {
  const loggedOutNav = [
    { text: 'Register', path: '/register', icon: <PersonAdd /> },
    { text: 'Login', path: '/login', icon: <LoginIcon /> },
    { text: 'Create SuperAdmin', path: '/create-superadmin', icon: <AdminPanelSettings /> }
  ];

  const { token, currentOrg, setCurrentOrg, profile } = useContext(AuthContext);

  const loggedInNav = [
    { text: 'Profile', path: '/profile', icon: <AccountCircle /> },
    { text: 'Update Profile', path: '/update-profile', icon: <Edit /> },
    { text: 'Change Password', path: '/change-password', icon: <Lock /> },
    { text: 'Accept Invite', path: '/accept-invite', icon: <HowToReg /> },
    ...(currentOrg ? [
      { text: 'Transfer', path: '/transfer', icon: <SwapHoriz /> },
      { text: 'Balance', path: '/balance', icon: <AccountBalanceWallet /> }
    ] : []),
    { text: 'Logout', path: '/logout', icon: <Logout /> }
  ];
  const adminNav = { text: 'Administration', path: '/admin', icon: <AdminPanelSettings /> };
  const navItems = token
    ? [...loggedInNav, ...(profile && (profile.isSuperAdmin || profile.roles?.includes('ADMIN')) ? [adminNav] : [])]
    : loggedOutNav;
  const [orgs, setOrgs] = useState([]);

  useEffect(() => {
    const load = async () => {
      const res = await api.get('/user/organizations');
      setOrgs(res.data.organizations);
    };
    if (token) {
      load();
    } else {
      setOrgs([]);
      setCurrentOrg('');
    }
  }, [token]);

  const changeOrg = (e) => {
    const id = e.target.value;
    setCurrentOrg(id);
  };
  return (
    <Router>
      <Box sx={styles.root}>
        <CssBaseline />
        <AppBar position="fixed" sx={styles.appBar}>
          <Toolbar>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
              Auth Dashboard
            </Typography>
            {token && profile && (
              <Typography sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
                {profile.profilePicture && (
                  <Avatar src={profile.profilePicture} sx={{ width: 32, height: 32, mr: 1 }} />
                )}
                {profile.firstName} {profile.lastName} | {profile.username} |
                Balance: {profile.balances.find(b => b.orgId === currentOrg)?.amount ?? 0}
              </Typography>
            )}
            {token && (
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel id="org-select-label">Org</InputLabel>
                <Select
                  labelId="org-select-label"
                  value={currentOrg}
                  label="Org"
                  onChange={changeOrg}
                >
                  {orgs.map(o => (
                    <MenuItem key={o.id} value={o.id}>{o.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          sx={styles.drawer}
        >
          <Toolbar />
          <List>
            {navItems.map((item) => (
              <ListItem disablePadding key={item.text}>
                <ListItemButton component={Link} to={item.path}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Box component="main" sx={styles.content}>
          <Toolbar />
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create-superadmin" element={<CreateSuperAdmin />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/update-profile" element={<UpdateProfile />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/accept-invite" element={<AcceptInvite />} />
            <Route path="/transfer" element={<Transfer />} />
            <Route path="/balance" element={<Balance />} />
            <Route path="/admin" element={<Administration />} />
            <Route path="/logout" element={<LogoutPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="*" element={<div>Home</div>} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}
