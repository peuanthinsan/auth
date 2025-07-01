import React, { useState, useEffect, useContext } from 'react';
import { Typography, Box } from '@mui/material';
import { styles } from '../styles';
import api from '../api';
import { AuthContext } from '../AuthContext';

export default function Balance() {
  const { currentOrg } = useContext(AuthContext);
  const [balances, setBalances] = useState([]);

  useEffect(() => {
    const load = async () => {
      const res = await api.get('/balance');
      setBalances(res.data.balances);
    };
    load();
  }, [currentOrg]);
  return (
    <Box>
      <Typography variant="h6" gutterBottom>Balance</Typography>
      {balances.map(b => (
        <Typography key={b.orgId}>{b.orgName || b.orgId}: {b.amount}</Typography>
      ))}
    </Box>
  );
}
