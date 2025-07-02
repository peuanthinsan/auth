import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Stack, Typography, Box } from '@mui/material';
import { styles } from '../styles';
import { AuthContext } from '../AuthContext';
import { ToastContext } from '../ToastContext';
import { ApiContext } from '../ApiContext';

export default function Transfer() {
  const [toUsername, setTo] = useState('');
  const [amount, setAmount] = useState('');
  const { showToast } = useContext(ToastContext);
  const { currentOrg, loadProfile } = useContext(AuthContext);
  const { balance, refreshBalance, transfer } = useContext(ApiContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentOrg) {
      navigate('/profile');
    }
  }, [currentOrg, navigate]);

  useEffect(() => {
    refreshBalance();
  }, [currentOrg, refreshBalance]);

  const submit = async (e) => {
    e.preventDefault();
    if (!toUsername.trim() || !amount || !currentOrg) {
      showToast('Recipient, amount, and organization are required', 'error');
      return;
    }
    try {
      await transfer(toUsername.trim(), amount);
      showToast('Transfer complete', 'success');
      refreshBalance();
      loadProfile();
    } catch (err) {
      showToast(err.response?.data?.message || 'Transfer failed', 'error');
    }
  };
  if (!currentOrg) return <Box />;

  return (
    <Box component="form" onSubmit={submit} noValidate>
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
