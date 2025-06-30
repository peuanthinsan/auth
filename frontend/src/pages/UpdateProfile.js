import React, { useState, useContext } from 'react';
import { TextField, Button, Stack, Typography, Box } from '@mui/material';
import { styles } from '../styles';
import api from '../api';
import { AuthContext } from '../AuthContext';

export default function UpdateProfile() {
  useContext(AuthContext);
  const [form, setForm] = useState({ username: '', firstName: '', lastName: '' });
  const [file, setFile] = useState(null);
  const submit = async () => {
    const data = new FormData();
    Object.entries(form).forEach(([k, v]) => data.append(k, v));
    if (file) data.append('profilePicture', file);
    await api.patch('/profile', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    alert('updated');
  };
  return (
    <Box>
      <Typography variant="h6" gutterBottom>Update Profile</Typography>
      <Stack spacing={2} sx={styles.formStack}>
        {['username','firstName','lastName'].map(f => (
          <TextField key={f} label={f} value={form[f]} onChange={e => setForm({ ...form, [f]: e.target.value })} />
        ))}
        <Button variant="contained" component="label">
          Upload Picture
          <input type="file" hidden onChange={e => setFile(e.target.files[0])} />
        </Button>
        <Button variant="contained" onClick={submit}>Submit</Button>
      </Stack>
    </Box>
  );
}
