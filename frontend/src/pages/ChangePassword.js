import React, { useState, useContext } from 'react';
import { TextField, Button, Stack, Typography, Box } from '@mui/material';
import { styles } from '../styles';
import api from '../api';
import { AuthContext } from '../AuthContext';

export default function ChangePassword() {
  useContext(AuthContext);
  const [oldPassword, setOld] = useState('');
  const [newPassword, setNew] = useState('');
  const [message, setMessage] = useState({ text: '', error: false });

  const submit = async (e) => {
    e.preventDefault();
    if (!oldPassword || !newPassword) {
      setMessage({ text: 'Both fields are required', error: true });
      return;
    }
    await api.post('/password/change', { oldPassword, newPassword });
    setMessage({ text: 'Password changed', error: false });
  };
  return (
    <Box component="form" onSubmit={submit} noValidate>
      <Typography variant="h6" gutterBottom>Change Password</Typography>
      <Stack sx={styles.formStack}>
        <TextField
          label="Old Password"
          placeholder="Old Password"
          type="password"
          value={oldPassword}
          onChange={e => setOld(e.target.value)}
          required
        />
        <TextField
          label="New Password"
          placeholder="New Password"
          type="password"
          value={newPassword}
          onChange={e => setNew(e.target.value)}
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
