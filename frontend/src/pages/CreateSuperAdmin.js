import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { TextField, Button, Stack, Typography, Box } from '@mui/material';
import { styles } from '../styles';
import { ToastContext } from '../ToastContext';

export default function CreateSuperAdmin() {
  const { showToast } = useContext(ToastContext);
  const [form, setForm] = useState({ username: '', password: '', confirmPassword: '', email: '', firstName: '', lastName: '' });
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const trimmed = { ...form, username: form.username.trim() };
    if (Object.values(trimmed).some(v => !v)) {
      showToast('All fields are required', 'error');
      return;
    }
    if (trimmed.password !== trimmed.confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }
    const { confirmPassword, ...payload } = trimmed;
    try {
      await api.post('/superadmin', payload);
      navigate('/login');
    } catch (err) {
      showToast(err.response?.data?.message || 'Creation failed', 'error');
    }
  };

  const formatLabel = (field) =>
    field
      .replace(/^(.)/, (c) => c.toUpperCase())
      .replace(/([A-Z])/g, ' $1')
      .trim();

  return (
    <Box component="form" onSubmit={submit} noValidate>
      <Typography variant="h6" gutterBottom>Create Super Admin</Typography>
      <Stack spacing={2} sx={styles.formStack}>
        {['username','password','confirmPassword','email','firstName','lastName'].map(f => (
          <TextField
            key={f}
            type={['password','confirmPassword'].includes(f) ? 'password' : 'text'}
            label={formatLabel(f)}
            placeholder={formatLabel(f)}
            inputProps={f === 'username' ? { maxLength: 20 } : undefined}
            helperText={f === 'username' ? 'max 20 characters' : ''}
            value={form[f]}
            onChange={e => setForm({ ...form, [f]: e.target.value })}
            required
          />
        ))}
        <Button type="submit" variant="contained">Submit</Button>
      </Stack>
    </Box>
  );
}
