import React, { useState, useContext } from 'react';
import { Box, TextField, Button, Stack } from '@mui/material';
import { ApiContext } from '../ApiContext';
import { ToastContext } from '../ToastContext';
import { styles } from '../styles';

export default function AddFriend() {
  const [email, setEmail] = useState('');
  const { sendFriendRequest } = useContext(ApiContext);
  const { showToast } = useContext(ToastContext);

  const submit = async (e) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) {
      showToast('Email is required', 'error');
      return;
    }
    try {
      await sendFriendRequest(trimmed);
      showToast('Request sent', 'success');
      setEmail('');
    } catch (err) {
      showToast(err.response?.data?.message || 'Error sending request', 'error');
    }
  };

  return (
    <Box component="form" onSubmit={submit} noValidate>
      <Stack spacing={2} sx={styles.formStack}>
        <TextField
          label="Friend Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <Button type="submit" variant="contained">Send Request</Button>
      </Stack>
    </Box>
  );
}
