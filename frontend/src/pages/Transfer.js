import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Stack, Typography, Box } from '@mui/material';
import { styles } from '../styles';
import api from '../api';
import { AuthContext } from '../AuthContext';
import { ToastContext } from '../ToastContext';

export default function Transfer() {
  const [toUsername, setTo] = useState('');
  const [amount, setAmount] = useState('');
  const { showToast } = useContext(ToastContext);
  const { currentOrg, loadProfile } = useContext(AuthContext);
  const [balance, setBalance] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentOrg) {
      navigate('/profile');
    }
  }, [currentOrg, navigate]);

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
      showToast('Recipient, amount, and organization are required', 'error');
      return;
    }
    try {
      await api.post('/transfer', { toUsername: toUsername.trim(), amount, orgId: currentOrg });
      showToast('Transfer complete', 'success');
      const res = await api.get('/balance', { params: { orgId: currentOrg } });
      setBalance(res.data.balance);
      loadProfile();
    } catch (err) {
      showToast(err.response?.data?.message || 'Transfer failed', 'error');
    }
  };
  if (!currentOrg) return <Box />;

  return (
    <Box component="form" onSubmit={submit} noValidate>
      <Typography variant="h6" gutterBottom>Transfer</Typography>
      <Stack spacing={2} sx={styles.formStack}>
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
      </Stack>
    </Box>
  );
}
