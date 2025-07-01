import React, { useState, useContext } from 'react';
import { TextField, Button, Stack, Typography, Box } from '@mui/material';
import { styles } from '../styles';
import api from '../api';
import { AuthContext } from '../AuthContext';

export default function InviteUser() {
  useContext(AuthContext);
  const [orgId, setOrgId] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    if (!orgId || !email) {
      setMessage('Org ID and email are required');
      return;
    }
    try {
      await api.post(`/organizations/${orgId}/invite`, { email });
      setMessage('Invite sent');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error sending invite');
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
        <Button type="submit" variant="contained">Submit</Button>
        {message && (
          <Typography role="status" aria-live="polite">{message}</Typography>
        )}
      </Stack>
    </Box>
  );
}
