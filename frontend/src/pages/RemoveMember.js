import React, { useState, useContext, useEffect } from 'react';
import { TextField, Button, Stack, Typography, Box, Autocomplete } from '@mui/material';
import { styles } from '../styles';
import api from '../api';
import { AuthContext } from '../AuthContext';

export default function RemoveMember() {
  useContext(AuthContext);
  const [orgId, setOrgId] = useState('');
  const [userId, setUserId] = useState('');
  const [orgs, setOrgs] = useState([]);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState({ text: '', error: false });

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
      setMessage({ text: 'Org and user IDs are required', error: true });
      return;
    }
    try {
      await api.delete(`/organizations/${orgId}/members/${userId}`);
      setMessage({ text: 'Member removed', error: false });
    } catch (err) {
      setMessage({ text: err.response?.data?.message || 'Error removing member', error: true });
    }
  };
  return (
    <Box component="form" onSubmit={submit} noValidate>
      <Typography variant="h6" gutterBottom>Remove Member</Typography>
      <Stack sx={styles.formStack}>
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
        {message.text && (
          <Typography role="status" aria-live="polite" color={message.error ? 'error' : undefined}>{message.text}</Typography>
        )}
      </Stack>
    </Box>
  );
}
