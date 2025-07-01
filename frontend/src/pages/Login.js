import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Stack,
  Typography,
  Box,
  Link
} from '@mui/material';
import { styles } from '../styles';
import { AuthContext } from '../AuthContext';
import { ToastContext } from '../ToastContext';

export default function Login() {
  const { login, refreshOrgs } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      showToast('Username and password are required', 'error');
      return;
    }
    try {
      await login(username.trim(), password);
      const newOrgs = await refreshOrgs();
      showToast('Logged in', 'success');
      if (!newOrgs.length) {
        navigate('/accept-invite');
      } else {
        navigate('/balance');
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Login failed', 'error');
    }
  };
  return (
    <Box component="form" onSubmit={submit} noValidate>
      <Typography variant="h6" gutterBottom>Login</Typography>
      <Stack spacing={2} sx={styles.formStack}>
        <TextField
          label="Username"
          placeholder="Username"
          inputProps={{ maxLength: 20 }}
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <TextField
          type="password"
          label="Password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <Button type="submit" variant="contained">Submit</Button>
        <Link href="/forgot-password" underline="hover">Forgot password?</Link>
      </Stack>
    </Box>
  );
}
