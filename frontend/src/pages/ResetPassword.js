import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Stack } from '@mui/material';
import { styles } from '../styles';
import api from '../api';

export default function ResetPassword() {
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    if (!token || !password) {
      setMessage('Token and new password are required');
      return;
    }
    await api.post('/password/reset', { token, newPassword: password });
    setMessage('Password reset');
  };

  return (
    <Box component="form" onSubmit={submit} noValidate>
      <Typography variant="h6" gutterBottom>Reset Password</Typography>
      <Stack spacing={2} sx={styles.formStack}>
        <TextField
          label="reset token"
          placeholder="Reset Token"
          value={token}
          onChange={e => setToken(e.target.value)}
          required
        />
        <TextField
          type="password"
          label="new password"
          placeholder="New Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <Button type="submit" variant="contained">Submit</Button>
        {message && (
          <Typography role="status" aria-live="polite">{message}</Typography>
        )}
      </Stack>
    </Box>
  );
}
