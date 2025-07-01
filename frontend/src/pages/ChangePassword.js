import React, { useState, useContext } from 'react';
import { TextField, Button, Stack, Typography, Box } from '@mui/material';
import { styles } from '../styles';
import api from '../api';
import { AuthContext } from '../AuthContext';

export default function ChangePassword() {
  useContext(AuthContext);
  const [oldPassword, setOld] = useState('');
  const [newPassword, setNew] = useState('');
  const [message, setMessage] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    if (!oldPassword || !newPassword) {
      setMessage('Both fields are required');
      return;
    }
    await api.post('/password/change', { oldPassword, newPassword });
    setMessage('Password changed');
  };
  return (
    <Box component="form" onSubmit={submit} noValidate>
      <Typography variant="h6" gutterBottom>Change Password</Typography>
      <Stack spacing={2} sx={styles.formStack}>
        <TextField
          label="old password"
          placeholder="Old Password"
          type="password"
          value={oldPassword}
          onChange={e => setOld(e.target.value)}
          required
        />
        <TextField
          label="new password"
          placeholder="New Password"
          type="password"
          value={newPassword}
          onChange={e => setNew(e.target.value)}
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
