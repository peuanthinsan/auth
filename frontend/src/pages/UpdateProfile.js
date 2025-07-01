import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Stack, Typography, Box, Avatar } from '@mui/material';
import { styles } from '../styles';
import api from '../api';
import { AuthContext } from '../AuthContext';

export default function UpdateProfile() {
  const { loadProfile, profile } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', firstName: '', lastName: '' });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [message, setMessage] = useState({ text: '', error: false });

  const formatLabel = (field) =>
    field
      .replace(/^(.)/, (c) => c.toUpperCase())
      .replace(/([A-Z])/g, ' $1')
      .trim();

  useEffect(() => {
    if (profile) {
      setForm({ username: profile.username || '', firstName: profile.firstName || '', lastName: profile.lastName || '' });
    }
  }, [profile]);

  const submit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([k, v]) => data.append(k, v));
    if (file) data.append('profilePicture', file);
    try {
      await api.patch('/profile', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMessage({ text: 'Profile updated', error: false });
      await loadProfile();
      navigate('/profile');
    } catch (err) {
      setMessage({ text: err.response?.data?.message || 'Update failed', error: true });
    }
  };
  return (
    <Box component="form" onSubmit={submit} noValidate>
      <Typography variant="h6" gutterBottom>Update Profile</Typography>
      <Stack spacing={2} sx={styles.formStack}>
        {['username','firstName','lastName'].map(f => (
          <TextField
            key={f}
            label={formatLabel(f)}
            placeholder={formatLabel(f)}
            value={form[f]}
            onChange={e => setForm({ ...form, [f]: e.target.value })}
          />
        ))}
        <Button variant="contained" component="label">
          Upload Picture
          <input
            type="file"
            hidden
            onChange={e => {
              const f = e.target.files[0];
              setFile(f);
              if (f) {
                const reader = new FileReader();
                reader.onload = ev => setPreview(ev.target.result);
                reader.readAsDataURL(f);
              } else {
                setPreview('');
              }
            }}
          />
        </Button>
        {preview && <Avatar src={preview} sx={{ width: 80, height: 80 }} />}
        <Button type="submit" variant="contained">Submit</Button>
        {message.text && (
          <Typography role="status" aria-live="polite" color={message.error ? 'error' : undefined}>{message.text}</Typography>
        )}
      </Stack>
    </Box>
  );
}
