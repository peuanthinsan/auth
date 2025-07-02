import React, { useState, useContext } from 'react';
import { Box, Typography, TextField, Button, Stack } from '@mui/material';
import { styles } from '../styles';
import { ApiContext } from '../ApiContext';
import { ToastContext } from '../ToastContext';

export default function ForgotPassword() {
  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');
  const { showToast } = useContext(ToastContext);
  const { forgotPassword } = useContext(ApiContext);

  const submit = async (e) => {
    e.preventDefault();
    if (!username.trim()) {
      showToast('Username is required', 'error');
      return;
    }
    const t = await forgotPassword(username.trim());
    setToken(t);
    showToast('Token created', 'success');
  };

  return (
    <Box component="form" onSubmit={submit} noValidate>
      <Stack spacing={2} sx={styles.formStack}>
        <TextField
          label="Username"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          inputProps={{ maxLength: 20 }}
          required
        />
        <Button type="submit" variant="contained">Request Reset Token</Button>
        {token && <Typography>Reset Token: {token}</Typography>}
      </Stack>
    </Box>
  );
}
