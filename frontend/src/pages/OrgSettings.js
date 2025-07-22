import React, { useContext, useState, useEffect } from 'react';
import { Box, TextField, Button, Stack, Typography } from '@mui/material';
import api from '../api';
import { AuthContext } from '../AuthContext';
import { ToastContext } from '../ToastContext';
import { styles } from '../styles';

export default function OrgSettings() {
  const { currentOrg, orgs, refreshOrgs } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);
  const [name, setName] = useState('');

  useEffect(() => {
    const org = orgs.find(o => o.id === currentOrg);
    setName(org?.name || '');
  }, [orgs, currentOrg]);

  if (!currentOrg) return null;

  const save = async (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) { showToast('Name is required', 'error'); return; }
    await api.patch(`/organizations/${currentOrg}`, { name: trimmed });
    await refreshOrgs();
    showToast('Organization updated', 'success');
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>Organization Settings</Typography>
      <Box component="form" onSubmit={save} sx={styles.formStack}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
          <TextField
            size="small"
            label="Name"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <Button type="submit" variant="contained">Change</Button>
        </Stack>
      </Box>
    </Box>
  );
}
