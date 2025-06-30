import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Stack } from '@mui/material';
import { styles } from '../styles';
import api from '../api';

export default function ResetPassword() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submit = async () => {
    await api.post('/password/reset', { username, newPassword: password });
    alert('password reset');
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Reset Password</Typography>
      <Stack spacing={2} sx={styles.formStack}>
        <TextField label="username" value={username} onChange={e => setUsername(e.target.value)} />
        <TextField type="password" label="new password" value={password} onChange={e => setPassword(e.target.value)} />
        <Button variant="contained" onClick={submit}>Submit</Button>
      </Stack>
    </Box>
  );
}
