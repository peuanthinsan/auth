import React, { useState, useEffect, useContext } from 'react';
import { Typography, Box, Card, CardContent, Stack } from '@mui/material';
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
      <Stack spacing={2} sx={styles.mt2}>
        {balances.map(b => (
          <Card key={b.orgId}>
            <CardContent>
              <Typography variant="h6">{b.orgName || b.orgId}</Typography>
              <Typography>Balance: {b.amount}</Typography>
              <Typography variant="caption">ID: {b.orgId}</Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}
