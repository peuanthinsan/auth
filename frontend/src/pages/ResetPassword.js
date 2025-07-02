import React, { useState, useContext } from 'react';
import { Box, Typography, TextField, Button, Stack } from '@mui/material';
import { styles } from '../styles';
import { ToastContext } from '../ToastContext';
import { ApiContext } from '../ApiContext';

export default function ResetPassword() {
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const { showToast } = useContext(ToastContext);
  const { resetPassword } = useContext(ApiContext);

  const submit = async (e) => {
    e.preventDefault();
    if (!token || !password) {
      showToast('Token and new password are required', 'error');
      return;
    }
    await resetPassword(token, password);
    showToast('Password reset', 'success');
  };

  return (
    <Box component="form" onSubmit={submit} noValidate>
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
      </Stack>
    </Box>
  );
}
