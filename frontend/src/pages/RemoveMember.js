import React, { useState, useContext } from 'react';
import { TextField, Button, Stack, Typography, Box } from '@mui/material';
import { styles } from '../styles';
import api from '../api';
import { AuthContext } from '../AuthContext';

export default function RemoveMember() {
  useContext(AuthContext);
  const [orgId, setOrgId] = useState('');
  const [userId, setUserId] = useState('');
  const [message, setMessage] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    if (!orgId || !userId) {
      setMessage('Org and user IDs are required');
      return;
    }
    await api.delete(`/organizations/${orgId}/members/${userId}`);
    setMessage('Member removed');
  };
  return (
    <Box component="form" onSubmit={submit} noValidate>
      <Typography variant="h6" gutterBottom>Remove Member</Typography>
      <Stack spacing={2} sx={styles.formStack}>
        <TextField
          label="org id"
          placeholder="Org ID"
          value={orgId}
          onChange={e => setOrgId(e.target.value)}
          required
        />
        <TextField
          label="user id"
          placeholder="User ID"
          value={userId}
          onChange={e => setUserId(e.target.value)}
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
