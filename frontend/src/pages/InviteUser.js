import React, { useState, useContext } from 'react';
import { TextField, Button, Stack, Typography, Box, Select, MenuItem } from '@mui/material';
import { styles } from '../styles';
import api from '../api';
import { AuthContext } from '../AuthContext';
import { ToastContext } from '../ToastContext';

export default function InviteUser() {
  useContext(AuthContext);
  const { showToast } = useContext(ToastContext);
  const [orgId, setOrgId] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('USER');

  const submit = async (e) => {
    e.preventDefault();
    if (!orgId || !email) {
      showToast('Org ID and email are required', 'error');
      return;
    }
    try {
      await api.post(`/organizations/${orgId}/invite`, { email, role });
      showToast('Invite sent', 'success');
    } catch (err) {
      showToast(err.response?.data?.message || 'Error sending invite', 'error');
    }
  };
  return (
    <Box component="form" onSubmit={submit} noValidate>
      <Typography variant="h6" gutterBottom>Invite User</Typography>
      <Stack spacing={2} sx={styles.formStack}>
        <TextField
          label="Org ID"
          placeholder="Org ID"
          value={orgId}
          onChange={e => setOrgId(e.target.value)}
          required
        />
        <TextField
          label="Email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <Select
          value={role}
          onChange={e => setRole(e.target.value)}
          size="small"
        >
          <MenuItem value="USER">USER</MenuItem>
          <MenuItem value="ADMIN">ADMIN</MenuItem>
        </Select>
        <Button type="submit" variant="contained">Submit</Button>
      </Stack>
    </Box>
  );
}
