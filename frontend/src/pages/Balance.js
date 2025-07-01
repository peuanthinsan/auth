import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Box } from '@mui/material';
import { styles } from '../styles';
import { AuthContext } from '../AuthContext';
import { ApiContext } from '../ApiContext';

export default function Balance() {
  const { currentOrg } = useContext(AuthContext);
  const { balance, refreshBalance } = useContext(ApiContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentOrg) {
      navigate('/profile');
    }
  }, [currentOrg, navigate]);

  useEffect(() => {
    refreshBalance();
  }, [currentOrg, refreshBalance]);

  if (!currentOrg) return <Box />;

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Balance</Typography>
      {balance !== null && (
        <Typography>Current Balance: {balance}</Typography>
      )}
    </Box>
  );
}
