import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  CssBaseline,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import { styles } from './styles';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import UpdateProfile from './pages/UpdateProfile';
import ChangePassword from './pages/ChangePassword';
import CreateOrganization from './pages/CreateOrganization';
import AddMember from './pages/AddMember';
import RemoveMember from './pages/RemoveMember';
import InviteUser from './pages/InviteUser';
import ViewInvites from './pages/ViewInvites';
import AcceptInvite from './pages/AcceptInvite';
import Transfer from './pages/Transfer';
import Balance from './pages/Balance';
import Administration from './pages/Administration';
import api from './api';
import { AuthContext } from './AuthContext';

export default function App() {
  const navItems = [
    { text: 'Register', path: '/register' },
    { text: 'Login', path: '/login' },
    { text: 'Profile', path: '/profile' },
    { text: 'Update Profile', path: '/update-profile' },
    { text: 'Change Password', path: '/change-password' },
    { text: 'Create Org', path: '/create-org' },
    { text: 'Add Member', path: '/add-member' },
    { text: 'Remove Member', path: '/remove-member' },
    { text: 'Invite User', path: '/invite-user' },
    { text: 'View Invites', path: '/view-invites' },
    { text: 'Accept Invite', path: '/accept-invite' },
    { text: 'Transfer', path: '/transfer' },
    { text: 'Balance', path: '/balance' },
    { text: 'Administration', path: '/admin' }
  ];

  const { token, currentOrg, setCurrentOrg } = useContext(AuthContext);
  const [orgs, setOrgs] = useState([]);

  useEffect(() => {
    const load = async () => {
      const res = await api.get('/organizations');
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
              <ListItem button component={Link} to={item.path} key={item.text}>
              <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Box component="main" sx={styles.content}>
          <Toolbar />
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/update-profile" element={<UpdateProfile />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/create-org" element={<CreateOrganization />} />
            <Route path="/add-member" element={<AddMember />} />
            <Route path="/remove-member" element={<RemoveMember />} />
            <Route path="/invite-user" element={<InviteUser />} />
            <Route path="/view-invites" element={<ViewInvites />} />
            <Route path="/accept-invite" element={<AcceptInvite />} />
            <Route path="/transfer" element={<Transfer />} />
            <Route path="/balance" element={<Balance />} />
            <Route path="/admin" element={<Administration />} />
            <Route path="*" element={<div>Home</div>} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}
