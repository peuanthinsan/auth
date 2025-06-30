import React, { useState, useContext } from 'react';
import { TextField, Button, Stack, Typography, Box } from '@mui/material';
import { styles } from '../styles';
import api from '../api';
import { AuthContext } from '../AuthContext';

export default function InviteUser() {
  useContext(AuthContext);
  const [orgId, setOrgId] = useState('');
  const [email, setEmail] = useState('');
  const submit = async () => {
    await api.post(`/organizations/${orgId}/invite`, { email });
    alert('invite sent');
  };
  return (
    <Box>
      <Typography variant="h6" gutterBottom>Invite User</Typography>
      <Stack spacing={2} sx={styles.formStack}>
        <TextField label="org id" value={orgId} onChange={e => setOrgId(e.target.value)} />
        <TextField label="email" value={email} onChange={e => setEmail(e.target.value)} />
        <Button variant="contained" onClick={submit}>Submit</Button>
      </Stack>
    </Box>
  );
}
