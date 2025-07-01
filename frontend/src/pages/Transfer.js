import React, { useState, useEffect, useContext } from 'react';
import { TextField, Button, Stack, Typography, Box } from '@mui/material';
import { styles } from '../styles';
import api from '../api';
import { AuthContext } from '../AuthContext';

export default function Transfer() {
  const [toUsername, setTo] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const { currentOrg } = useContext(AuthContext);
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const loadBal = async () => {
      if (currentOrg) {
        const res = await api.get('/balance', { params: { orgId: currentOrg } });
        setBalance(res.data.balance);
      } else {
        setBalance(null);
      }
    };
    loadBal();
  }, [currentOrg]);

  const submit = async (e) => {
    e.preventDefault();
    if (!toUsername.trim() || !amount || !currentOrg) {
      setMessage('Recipient, amount, and organization are required');
      return;
    }
    try {
      await api.post('/transfer', { toUsername: toUsername.trim(), amount, orgId: currentOrg });
      setMessage('Transfer complete');
      const res = await api.get('/balance', { params: { orgId: currentOrg } });
      setBalance(res.data.balance);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Transfer failed');
    }
  };
  if (!currentOrg) return <Box />;

  return (
    <Box component="form" onSubmit={submit} noValidate>
      <Typography variant="h6" gutterBottom>Transfer</Typography>
      <Stack spacing={2} sx={styles.formStack}>
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
