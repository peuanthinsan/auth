import React, { useState, useContext } from 'react';
import { TextField, Button, Stack, Typography, Box } from '@mui/material';
import { styles } from '../styles';
import api from '../api';
import { AuthContext } from '../AuthContext';

export default function Transfer() {
  useContext(AuthContext);
  const [toUsername, setTo] = useState('');
  const [amount, setAmount] = useState('');
  const submit = async () => {
    await api.post('/transfer', { toUsername, amount });
    alert('transfer complete');
  };
  return (
    <Box>
      <Typography variant="h6" gutterBottom>Transfer</Typography>
      <Stack spacing={2} sx={styles.formStack}>
        <TextField label="to username" value={toUsername} onChange={e => setTo(e.target.value)} />
        <TextField label="amount" value={amount} onChange={e => setAmount(e.target.value)} />
        <Button variant="contained" onClick={submit}>Submit</Button>
      </Stack>
    </Box>
  );
}
