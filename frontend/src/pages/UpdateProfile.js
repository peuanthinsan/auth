import React, { useState, useContext } from 'react';
import { TextField, Button, Stack, Typography, Box } from '@mui/material';
import { styles } from '../styles';
import api from '../api';
import { AuthContext } from '../AuthContext';

export default function UpdateProfile() {
  useContext(AuthContext);
  const [form, setForm] = useState({ username: '', firstName: '', lastName: '' });
  const submit = async () => {
    await api.patch('/profile', form);
    alert('updated');
  };
  return (
    <Box>
      <Typography variant="h6" gutterBottom>Update Profile</Typography>
      <Stack spacing={2} sx={styles.formStack}>
        {['username','firstName','lastName'].map(f => (
          <TextField key={f} label={f} value={form[f]} onChange={e => setForm({ ...form, [f]: e.target.value })} />
        ))}
        <Button variant="contained" onClick={submit}>Submit</Button>
      </Stack>
    </Box>
  );
}
