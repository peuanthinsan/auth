import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Stack } from '@mui/material';
import { styles } from '../styles';
import api from '../api';

export default function ResetPassword() {
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState({ text: '', error: false });

  const submit = async (e) => {
    e.preventDefault();
    if (!token || !password) {
      setMessage({ text: 'Token and new password are required', error: true });
      return;
    }
    await api.post('/password/reset', { token, newPassword: password });
    setMessage({ text: 'Password reset', error: false });
  };

  return (
    <Box component="form" onSubmit={submit} noValidate>
      <Typography variant="h6" gutterBottom>Reset Password</Typography>
      <Stack spacing={2} sx={styles.formStack}>
        <TextField
          label="Reset Token"
          placeholder="Reset Token"
          value={token}
          onChange={e => setToken(e.target.value)}
          required
        />
        <TextField
          type="password"
          label="New Password"
          placeholder="New Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <Button type="submit" variant="contained">Submit</Button>
        {message.text && (
          <Typography role="status" aria-live="polite" color={message.error ? 'error' : undefined}>{message.text}</Typography>
        )}
      </Stack>
    </Box>
  );
}
