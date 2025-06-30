import React, { useState, useContext } from 'react';
import { TextField, Button, Stack, Typography, Box } from '@mui/material';
import { styles } from '../styles';
import api from '../api';
import { AuthContext } from '../AuthContext';

export default function ChangePassword() {
  useContext(AuthContext);
  const [oldPassword, setOld] = useState('');
  const [newPassword, setNew] = useState('');
  const submit = async () => {
    await api.post('/password/change', { oldPassword, newPassword });
    alert('password changed');
  };
  return (
    <Box>
      <Typography variant="h6" gutterBottom>Change Password</Typography>
      <Stack spacing={2} sx={styles.formStack}>
        <TextField label="old password" type="password" value={oldPassword} onChange={e => setOld(e.target.value)} />
        <TextField label="new password" type="password" value={newPassword} onChange={e => setNew(e.target.value)} />
        <Button variant="contained" onClick={submit}>Submit</Button>
      </Stack>
    </Box>
  );
}
