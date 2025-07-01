import React, { useState, useContext } from 'react';
import { TextField, Button, Stack, Typography, Box, Select, MenuItem } from '@mui/material';
import { styles } from '../styles';
import api from '../api';
import { AuthContext } from '../AuthContext';

export default function InviteUser() {
  useContext(AuthContext);
  const [orgId, setOrgId] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('USER');
  const [message, setMessage] = useState({ text: '', error: false });

  const submit = async (e) => {
    e.preventDefault();
    if (!orgId || !email) {
      setMessage({ text: 'Org ID and email are required', error: true });
      return;
    }
    try {
      await api.post(`/organizations/${orgId}/invite`, { email, role });
      setMessage({ text: 'Invite sent', error: false });
    } catch (err) {
      setMessage({ text: err.response?.data?.message || 'Error sending invite', error: true });
    }
  };
  return (
    <Box component="form" onSubmit={submit} noValidate>
      <Typography variant="h6" gutterBottom>Invite User</Typography>
      <Stack sx={styles.formStack}>
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
        {message.text && (
          <Typography role="status" aria-live="polite" color={message.error ? 'error' : undefined}>{message.text}</Typography>
        )}
      </Stack>
    </Box>
  );
}
