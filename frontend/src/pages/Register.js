import React, { useState } from 'react';
import api from '../api';
import { TextField, Button, Stack, Typography, Box } from '@mui/material';
import { styles } from '../styles';

export default function Register() {
  const [form, setForm] = useState({ username: '', password: '', email: '', firstName: '', lastName: '' });
  const submit = async () => {
    await api.post('/register', form);
    alert('registered');
  };
  return (
    <Box>
      <Typography variant="h6" gutterBottom>Register</Typography>
      <Stack spacing={2} sx={styles.formStack}>
        {['username','password','email','firstName','lastName'].map(f => (
          <TextField
            key={f}
            type={f === 'password' ? 'password' : 'text'}
            label={f}
            value={form[f]}
            onChange={e => setForm({ ...form, [f]: e.target.value })}
          />
        ))}
        <Button variant="contained" onClick={submit}>Submit</Button>
      </Stack>
    </Box>
  );
}
