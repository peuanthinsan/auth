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
import api from '../api';

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState({ text: '', error: false });

  const submit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      setMessage({ text: 'Username and password are required', error: true });
      return;
    }
    try {
      await login(username.trim(), password);
      const orgRes = await api.get('/user/organizations');
      setMessage({ text: 'Logged in', error: false });
      if (orgRes.data.organizations.length === 0) {
        navigate('/accept-invite');
      } else {
        navigate('/balance');
      }
    } catch (err) {
      setMessage({ text: err.response?.data?.message || 'Login failed', error: true });
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
        {message.text && (
          <Typography role="status" aria-live="polite" color={message.error ? 'error' : undefined}>{message.text}</Typography>
        )}
      </Stack>
    </Box>
  );
}
