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

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      setMessage('Username and password are required');
      return;
    }
    try {
      await login(username.trim(), password);
      setMessage('Logged in');
      navigate('/balance');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Login failed');
    }
  };
  return (
    <Box component="form" onSubmit={submit} noValidate>
      <Typography variant="h6" gutterBottom>Login</Typography>
      <Stack spacing={2} sx={styles.formStack}>
        <TextField
          label="username"
          placeholder="Username"
          inputProps={{ maxLength: 20 }}
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <TextField
          type="password"
          label="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <Button type="submit" variant="contained">Submit</Button>
        <Link href="/forgot-password" underline="hover">Forgot password?</Link>
        {message && (
          <Typography role="status" aria-live="polite">{message}</Typography>
        )}
      </Stack>
    </Box>
  );
}
