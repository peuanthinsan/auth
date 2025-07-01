import React, { useState, useContext } from 'react';
import { TextField, Button, Stack, Typography, Box } from '@mui/material';
import { styles } from '../styles';
import api from '../api';
import { AuthContext } from '../AuthContext';

export default function AcceptInvite() {
  useContext(AuthContext);
  const [inviteId, setInviteId] = useState('');
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    if (!inviteId || !token) {
      setMessage('Invite ID and token are required');
      return;
    }
    try {
      await api.post(`/invites/${inviteId}/accept`, { token });
      setMessage('Invite accepted');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error accepting invite');
    }
  };
  return (
    <Box component="form" onSubmit={submit} noValidate>
      <Typography variant="h6" gutterBottom>Accept Invite</Typography>
      <Stack spacing={2} sx={styles.formStack}>
        <TextField
          label="Invite ID"
          placeholder="Invite ID"
          value={inviteId}
          onChange={e => setInviteId(e.target.value)}
          required
        />
        <TextField
          label="Token"
          placeholder="Token"
          value={token}
          onChange={e => setToken(e.target.value)}
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
