import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Box, Button, List, ListItem, ListItemText } from '@mui/material';
import { styles } from '../styles';
import { AuthContext } from '../AuthContext';
import { ApiContext } from '../ApiContext';

export default function Balance() {
  const { currentOrg } = useContext(AuthContext);
  const { balance, refreshBalance, history, loadHistory } = useContext(ApiContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentOrg) {
      navigate('/profile');
    }
  }, [currentOrg, navigate]);

  useEffect(() => {
    refreshBalance();
    loadHistory();
  }, [currentOrg, refreshBalance, loadHistory]);

  if (!currentOrg) return <Box />;

  return (
    <Box>
      {balance !== null && (
        <Typography sx={{ mb: 2 }}>Current Balance: {balance}</Typography>
      )}
      <Button variant="outlined" onClick={() => loadHistory()}>Refresh History</Button>
      <List>
        {history.map(h => (
          <ListItem key={h.id}>
            <ListItemText
              primary={`${h.type} ${h.amount}`}
              secondary={new Date(h.createdAt).toLocaleString()}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
