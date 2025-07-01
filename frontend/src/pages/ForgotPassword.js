import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Stack } from '@mui/material';
import { styles } from '../styles';
import api from '../api';

export default function ForgotPassword() {
  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');
  const [message, setMessage] = useState({ text: '', error: false });

  const submit = async (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setMessage({ text: 'Username is required', error: true });
      return;
    }
    const res = await api.post('/password/forgot', { username: username.trim() });
    setToken(res.data.token);
    setMessage({ text: 'Token created', error: false });
  };

  return (
    <Box component="form" onSubmit={submit} noValidate>
      <Typography variant="h6" gutterBottom>Forgot Password</Typography>
      <Stack sx={styles.formStack}>
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
        {message.text && (
          <Typography role="status" aria-live="polite" color={message.error ? 'error' : undefined}>{message.text}</Typography>
        )}
      </Stack>
    </Box>
  );
}
