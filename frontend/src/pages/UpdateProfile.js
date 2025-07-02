import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Stack, Typography, Box, Avatar } from '@mui/material';
import { styles } from '../styles';
import { API_ROOT } from '../api';
import { AuthContext } from '../AuthContext';
import { ToastContext } from '../ToastContext';
import { ApiContext } from '../ApiContext';

export default function UpdateProfile() {
  const { loadProfile, profile, logout } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);
  const { updateProfile, deleteAccount } = useContext(ApiContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', firstName: '', lastName: '' });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');

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
      await updateProfile(data);
      showToast('Profile updated', 'success');
      navigate('/profile');
    } catch (err) {
      showToast(err.response?.data?.message || 'Update failed', 'error');
    }
  };
  return (
    <Box component="form" onSubmit={submit} noValidate>
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
        {(preview || profile?.profilePicture) && (
          <Avatar
            src={
              preview ||
              (profile.profilePicture?.startsWith('http')
                ? profile.profilePicture
                : `${API_ROOT}${profile.profilePicture}`)
            }
            sx={{ width: 80, height: 80 }}
          />
        )}
        <Button type="submit" variant="contained">Submit</Button>
        <Button
          variant="outlined"
          color="error"
          onClick={async () => {
            if (!window.confirm('Delete your account?')) return;
            try {
              await deleteAccount();
              showToast('Account deleted', 'success');
              await logout();
              navigate('/register');
            } catch (err) {
              showToast(err.response?.data?.message || 'Delete failed', 'error');
            }
          }}
        >
          Delete Account
        </Button>
      </Stack>
    </Box>
  );
}
