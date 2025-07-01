import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Stack } from '@mui/material';
import { styles } from '../styles';
import api from '../api';

export default function ForgotPassword() {
  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setMessage('Username is required');
      return;
    }
    const res = await api.post('/password/forgot', { username: username.trim() });
    setToken(res.data.token);
    setMessage('Token created');
  };

  return (
    <Box component="form" onSubmit={submit} noValidate>
      <Typography variant="h6" gutterBottom>Forgot Password</Typography>
      <Stack spacing={2} sx={styles.formStack}>
        <TextField
          label="username"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          inputProps={{ maxLength: 20 }}
          required
        />
        <Button type="submit" variant="contained">Request Reset Token</Button>
        {token && <Typography>Reset Token: {token}</Typography>}
        {message && (
          <Typography role="status" aria-live="polite">{message}</Typography>
        )}
      </Stack>
    </Box>
  );
}
