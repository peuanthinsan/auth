import React, { useState, useContext } from 'react';
import { TextField, Button, Stack, Typography, Box } from '@mui/material';
import { styles } from '../styles';
import { AuthContext } from '../AuthContext';
import { ApiContext } from '../ApiContext';

export default function ViewInvites() {
  useContext(AuthContext);
  const { invites, refreshInvites } = useContext(ApiContext);
  const [orgId, setOrgId] = useState('');
  const load = async () => {
    await refreshInvites(orgId);
  };
  return (
    <Box>
      <Typography variant="h6" gutterBottom>View Invites</Typography>
      <Stack spacing={2} sx={styles.formStack}>
        <TextField label="Org ID" value={orgId} onChange={e => setOrgId(e.target.value)} />
        <Button variant="contained" onClick={load}>Load</Button>
      </Stack>
      <pre>{JSON.stringify(invites, null, 2)}</pre>
    </Box>
  );
}
