import React, { useState, useContext } from 'react';
import { Button, Typography, Box } from '@mui/material';
import { styles } from '../styles';
import api from '../api';
import { AuthContext } from '../AuthContext';

export default function Balance() {
  useContext(AuthContext);
  const [balance, setBalance] = useState(null);
  const load = async () => {
    const res = await api.get('/balance');
    setBalance(res.data.balance);
  };
  return (
    <Box>
      <Typography variant="h6" gutterBottom>Balance</Typography>
      <Button variant="contained" onClick={load} sx={styles.mb2}>Load</Button>
      {balance !== null && <Typography>Balance: {balance}</Typography>}
    </Box>
  );
}
