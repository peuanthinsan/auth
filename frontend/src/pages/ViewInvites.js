import React, { useState, useContext } from 'react';
import { TextField, Button, Stack, Typography, Box } from '@mui/material';
import { styles } from '../styles';
import api from '../api';
import { AuthContext } from '../AuthContext';

export default function ViewInvites() {
  useContext(AuthContext);
  const [orgId, setOrgId] = useState('');
  const [invites, setInvites] = useState([]);
  const load = async () => {
    const res = await api.get(`/organizations/${orgId}/invites`);
    setInvites(res.data);
  };
  return (
    <Box>
      <Typography variant="h6" gutterBottom>View Invites</Typography>
      <Stack spacing={2} sx={styles.formStack}>
        <TextField label="org id" value={orgId} onChange={e => setOrgId(e.target.value)} />
        <Button variant="contained" onClick={load}>Load</Button>
      </Stack>
      <pre>{JSON.stringify(invites, null, 2)}</pre>
    </Box>
  );
}
