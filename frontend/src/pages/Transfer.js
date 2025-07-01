import React, { useState, useEffect } from 'react';
import { TextField, Button, Stack, Typography, Box, Autocomplete } from '@mui/material';
import { styles } from '../styles';
import api from '../api';

export default function Transfer() {
  const [toUsername, setTo] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [balance, setBalance] = useState(null);
  const [orgId, setOrgId] = useState('');
  const [orgs, setOrgs] = useState([]);

  useEffect(() => {
    const load = async () => {
      const res = await api.get('/user/organizations');
      setOrgs(res.data.organizations);
    };
    load();
  }, []);

  useEffect(() => {
    const loadBal = async () => {
      if (orgId) {
        const res = await api.get('/balance', { params: { orgId } });
        setBalance(res.data.balance);
      } else {
        setBalance(null);
      }
    };
    loadBal();
  }, [orgId]);

  const submit = async (e) => {
    e.preventDefault();
    if (!toUsername.trim() || !amount || !orgId) {
      setMessage('Recipient, amount, and organization are required');
      return;
    }
    try {
      await api.post('/transfer', { toUsername: toUsername.trim(), amount, orgId });
      setMessage('Transfer complete');
      const res = await api.get('/balance', { params: { orgId } });
      setBalance(res.data.balance);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Transfer failed');
    }
  };
  return (
    <Box component="form" onSubmit={submit} noValidate>
      <Typography variant="h6" gutterBottom>Transfer</Typography>
      <Stack spacing={2} sx={styles.formStack}>
        <Autocomplete
          options={orgs}
          getOptionLabel={o => o.name || ''}
          onChange={(_, v) => setOrgId(v ? v.id : '')}
          renderInput={params => <TextField {...params} label="Organization" required />}
        />
        <TextField
          label="to username"
          placeholder="To Username"
          value={toUsername}
          onChange={e => setTo(e.target.value)}
          required
        />
        <TextField
          label="amount"
          placeholder="Amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          required
        />
        <Button type="submit" variant="contained">Submit</Button>
        {balance !== null && (
          <Typography>Current Balance: {balance}</Typography>
        )}
        {message && (
          <Typography role="status" aria-live="polite">{message}</Typography>
        )}
      </Stack>
    </Box>
  );
}
