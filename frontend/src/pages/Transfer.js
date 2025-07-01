import React, { useState, useContext } from 'react';
import { TextField, Button, Stack, Typography, Box } from '@mui/material';
import { styles } from '../styles';
import api from '../api';
import { AuthContext } from '../AuthContext';

export default function Transfer() {
  useContext(AuthContext);
  const [toUsername, setTo] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    if (!toUsername.trim() || !amount) {
      setMessage('Recipient and amount are required');
      return;
    }
    try {
      await api.post('/transfer', { toUsername: toUsername.trim(), amount });
      setMessage('Transfer complete');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Transfer failed');
    }
  };
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
        {message && (
          <Typography role="status" aria-live="polite">{message}</Typography>
        )}
      </Stack>
    </Box>
  );
}
