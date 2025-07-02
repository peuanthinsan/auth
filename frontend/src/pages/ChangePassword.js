import React, { useState, useContext } from 'react';
import { TextField, Button, Stack, Typography, Box } from '@mui/material';
import { styles } from '../styles';
import { AuthContext } from '../AuthContext';
import { ApiContext } from '../ApiContext';
import { ToastContext } from '../ToastContext';

export default function ChangePassword() {
  useContext(AuthContext);
  const { showToast } = useContext(ToastContext);
  const { changePassword } = useContext(ApiContext);
  const [oldPassword, setOld] = useState('');
  const [newPassword, setNew] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    if (!oldPassword || !newPassword) {
      showToast('Both fields are required', 'error');
      return;
    }
    await changePassword(oldPassword, newPassword);
    showToast('Password changed', 'success');
  };
  return (
    <Box component="form" onSubmit={submit} noValidate>
      <Stack spacing={2} sx={styles.formStack}>
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
      </Stack>
    </Box>
  );
}
