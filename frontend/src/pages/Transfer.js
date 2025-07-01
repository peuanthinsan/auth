import React, { useState, useEffect, useContext } from 'react';
import { TextField, Button, Stack, Typography, Box } from '@mui/material';
import { styles } from '../styles';
import api from '../api';
import { AuthContext } from '../AuthContext';

export default function Transfer() {
  const [toUsername, setTo] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState({ text: '', error: false });
  const { currentOrg, loadProfile } = useContext(AuthContext);
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
      setMessage({ text: 'Recipient, amount, and organization are required', error: true });
      return;
    }
    try {
      await api.post('/transfer', { toUsername: toUsername.trim(), amount, orgId: currentOrg });
      setMessage({ text: 'Transfer complete', error: false });
      const res = await api.get('/balance', { params: { orgId: currentOrg } });
      setBalance(res.data.balance);
      loadProfile();
    } catch (err) {
      setMessage({ text: err.response?.data?.message || 'Transfer failed', error: true });
    }
  };
  if (!currentOrg) return <Box />;

  return (
    <Box component="form" onSubmit={submit} noValidate>
      <Typography variant="h6" gutterBottom>Transfer</Typography>
      <Stack sx={styles.formStack}>
        <TextField
          label="To Username"
          placeholder="To Username"
          value={toUsername}
          onChange={e => setTo(e.target.value)}
          required
        />
        <TextField
          label="Amount"
          placeholder="Amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          required
        />
        <Button type="submit" variant="contained">Submit</Button>
        {balance !== null && (
          <Typography>Current Balance: {balance}</Typography>
        )}
        {message.text && (
          <Typography role="status" aria-live="polite" color={message.error ? 'error' : undefined}>{message.text}</Typography>
        )}
      </Stack>
    </Box>
  );
}
