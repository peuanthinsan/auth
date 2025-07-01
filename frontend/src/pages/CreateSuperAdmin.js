import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { TextField, Button, Stack, Typography, Box } from '@mui/material';
import { styles } from '../styles';

export default function CreateSuperAdmin() {
  const [form, setForm] = useState({ username: '', password: '', email: '', firstName: '', lastName: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const trimmed = { ...form, username: form.username.trim() };
    if (Object.values(trimmed).some(v => !v)) {
      setMessage('All fields are required');
      return;
    }
    try {
      await api.post('/superadmin', trimmed);
      navigate('/login');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Creation failed');
    }
  };

  return (
    <Box component="form" onSubmit={submit} noValidate>
      <Typography variant="h6" gutterBottom>Create Super Admin</Typography>
      <Stack spacing={2} sx={styles.formStack}>
        {['username','password','email','firstName','lastName'].map(f => (
          <TextField
            key={f}
            type={f === 'password' ? 'password' : 'text'}
            label={f}
            placeholder={f.replace(/^(.)/, c => c.toUpperCase()).replace(/([A-Z])/g, ' $1').trim()}
            inputProps={f === 'username' ? { maxLength: 20 } : undefined}
            helperText={f === 'username' ? 'max 20 characters' : ''}
            value={form[f]}
            onChange={e => setForm({ ...form, [f]: e.target.value })}
            required
          />
        ))}
        <Button type="submit" variant="contained">Submit</Button>
        {message && (
          <Typography role="status" aria-live="polite">{message}</Typography>
        )}
      </Stack>
    </Box>
  );
}
