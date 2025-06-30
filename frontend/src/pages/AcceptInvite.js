import React, { useState, useContext } from 'react';
import { TextField, Button, Stack, Typography, Box } from '@mui/material';
import { styles } from '../styles';
import api from '../api';
import { AuthContext } from '../AuthContext';

export default function AcceptInvite() {
  useContext(AuthContext);
  const [inviteId, setInviteId] = useState('');
  const submit = async () => {
    await api.post(`/invites/${inviteId}/accept`);
    alert('invite accepted');
  };
  return (
    <Box>
      <Typography variant="h6" gutterBottom>Accept Invite</Typography>
      <Stack spacing={2} sx={styles.formStack}>
        <TextField label="invite id" value={inviteId} onChange={e => setInviteId(e.target.value)} />
        <Button variant="contained" onClick={submit}>Submit</Button>
      </Stack>
    </Box>
  );
}
