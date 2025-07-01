import React, { useState, useContext, useEffect } from 'react';
import { TextField, Button, Stack, Typography, Box, Autocomplete } from '@mui/material';
import { styles } from '../styles';
import api from '../api';
import { AuthContext } from '../AuthContext';

export default function AddMember() {
  useContext(AuthContext);
  const [orgId, setOrgId] = useState('');
  const [userId, setUserId] = useState('');
  const [orgs, setOrgs] = useState([]);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const load = async () => {
      const [oRes, uRes] = await Promise.all([
        api.get('/organizations'),
        api.get('/users')
      ]);
      setOrgs(oRes.data.map(o => ({ id: o.id, name: o.name })));
      setUsers(uRes.data.map(u => ({ id: u.id, username: u.username })));
    };
    load();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (!orgId || !userId) {
      setMessage('Org and user IDs are required');
      return;
    }
    try {
      await api.post(`/organizations/${orgId}/members`, { userId });
      setMessage('Member added');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error adding member');
    }
  };
  return (
    <Box component="form" onSubmit={submit} noValidate>
      <Typography variant="h6" gutterBottom>Add Member</Typography>
      <Stack spacing={2} sx={styles.formStack}>
        <Autocomplete
          options={orgs}
          getOptionLabel={o => o.name || ''}
          onChange={(_, v) => setOrgId(v ? v.id : '')}
          renderInput={params => <TextField {...params} label="Organization" required />}
        />
        <Autocomplete
          options={users}
          getOptionLabel={u => u.username || ''}
          onChange={(_, v) => setUserId(v ? v.id : '')}
          renderInput={params => <TextField {...params} label="User" required />}
        />
        <Button type="submit" variant="contained">Submit</Button>
        {message && (
          <Typography role="status" aria-live="polite">{message}</Typography>
        )}
      </Stack>
    </Box>
  );
}
