import React, { useState, useContext } from 'react';
import { TextField, Button, Stack, Typography, Box } from '@mui/material';
import { styles } from '../styles';
import api from '../api';
import { AuthContext } from '../AuthContext';
import { ToastContext } from '../ToastContext';

export default function CreateOrganization() {
  const { refreshOrgs } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);
  const [name, setName] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    if (!name) {
      showToast('Name is required', 'error');
      return;
    }
    await api.post('/organizations', { name });
    showToast('Organization created', 'success');
    refreshOrgs();
  };
  return (
    <Box component="form" onSubmit={submit} noValidate>
      <Typography variant="h6" gutterBottom>Create Organization</Typography>
      <Stack spacing={2} sx={styles.formStack}>
        <TextField
          label="Name"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <Button type="submit" variant="contained">Submit</Button>
      </Stack>
    </Box>
  );
}
