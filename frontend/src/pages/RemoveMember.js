import React, { useState, useContext } from 'react';
import { TextField, Button, Stack, Typography, Box } from '@mui/material';
import { styles } from '../styles';
import api from '../api';
import { AuthContext } from '../AuthContext';

export default function RemoveMember() {
  useContext(AuthContext);
  const [orgId, setOrgId] = useState('');
  const [userId, setUserId] = useState('');
  const submit = async () => {
    await api.delete(`/organizations/${orgId}/members/${userId}`);
    alert('member removed');
  };
  return (
    <Box>
      <Typography variant="h6" gutterBottom>Remove Member</Typography>
      <Stack spacing={2} sx={styles.formStack}>
        <TextField label="org id" value={orgId} onChange={e => setOrgId(e.target.value)} />
        <TextField label="user id" value={userId} onChange={e => setUserId(e.target.value)} />
        <Button variant="contained" onClick={submit}>Submit</Button>
      </Stack>
    </Box>
  );
}
