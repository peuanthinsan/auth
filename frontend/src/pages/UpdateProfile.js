import React, { useState, useContext } from 'react';
import { TextField, Button, Stack, Typography, Box } from '@mui/material';
import { styles } from '../styles';
import api from '../api';
import { AuthContext } from '../AuthContext';

export default function UpdateProfile() {
  useContext(AuthContext);
  const [form, setForm] = useState({ username: '', firstName: '', lastName: '' });
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([k, v]) => data.append(k, v));
    if (file) data.append('profilePicture', file);
    await api.patch('/profile', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    setMessage('Profile updated');
  };
  return (
    <Box component="form" onSubmit={submit} noValidate>
      <Typography variant="h6" gutterBottom>Update Profile</Typography>
      <Stack spacing={2} sx={styles.formStack}>
        {['username','firstName','lastName'].map(f => (
          <TextField
            key={f}
            label={f}
            placeholder={f.replace(/^(.)/, c => c.toUpperCase()).replace(/([A-Z])/g, ' $1').trim()}
            value={form[f]}
            onChange={e => setForm({ ...form, [f]: e.target.value })}
          />
        ))}
        <Button variant="contained" component="label">
          Upload Picture
          <input type="file" hidden onChange={e => setFile(e.target.files[0])} />
        </Button>
        <Button type="submit" variant="contained">Submit</Button>
        {message && (
          <Typography role="status" aria-live="polite">{message}</Typography>
        )}
      </Stack>
    </Box>
  );
}
