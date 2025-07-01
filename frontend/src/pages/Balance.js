import React, { useState, useEffect, useContext } from 'react';
import { Typography, Box } from '@mui/material';
import { styles } from '../styles';
import api from '../api';
import { AuthContext } from '../AuthContext';

export default function Balance() {
  const { currentOrg } = useContext(AuthContext);
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const load = async () => {
      if (!currentOrg) { setBalance(null); return; }
      const res = await api.get('/balance', { params: { orgId: currentOrg } });
      setBalance(res.data.balance);
    };
    load();
  }, [currentOrg]);

  if (!currentOrg) return <Box />;

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Balance</Typography>
      {balance !== null && (
        <Typography>Balance: {balance}</Typography>
      )}
    </Box>
  );
}
