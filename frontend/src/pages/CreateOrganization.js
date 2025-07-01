import React, { useState, useContext } from 'react';
import { TextField, Button, Stack, Typography, Box } from '@mui/material';
import { styles } from '../styles';
import api from '../api';
import { AuthContext } from '../AuthContext';

export default function CreateOrganization() {
  const { refreshOrgs } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [message, setMessage] = useState({ text: '', error: false });

  const submit = async (e) => {
    e.preventDefault();
    if (!name) {
      setMessage({ text: 'Name is required', error: true });
      return;
    }
    await api.post('/organizations', { name });
    setMessage({ text: 'Organization created', error: false });
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
        {message.text && (
          <Typography role="status" aria-live="polite" color={message.error ? 'error' : undefined}>{message.text}</Typography>
        )}
      </Stack>
    </Box>
  );
}
