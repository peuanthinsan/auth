import React, { useState, useContext } from 'react';
import { TextField, Button, Stack, Typography, Box } from '@mui/material';
import { styles } from '../styles';
import api from '../api';
import { AuthContext } from '../AuthContext';

export default function CreateOrganization() {
  useContext(AuthContext);
  const [name, setName] = useState('');
  const submit = async () => {
    await api.post('/organizations', { name });
    alert('organization created');
  };
  return (
    <Box>
      <Typography variant="h6" gutterBottom>Create Organization</Typography>
      <Stack spacing={2} sx={styles.formStack}>
        <TextField label="name" value={name} onChange={e => setName(e.target.value)} />
        <Button variant="contained" onClick={submit}>Submit</Button>
      </Stack>
    </Box>
  );
}
