import React, { useState, useEffect, useContext } from 'react';
import { Typography, Box, Avatar } from '@mui/material';
import { styles } from '../styles';
import { AuthContext } from '../AuthContext';
import api, { API_ROOT } from '../api';

export default function Profile() {
  useContext(AuthContext);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const load = async () => {
      const res = await api.get('/profile');
      setProfile(res.data);
    };
    load();
  }, []);
  return (
    <Box>
      <Typography variant="h6" gutterBottom>Profile</Typography>
      {profile && (
        <Box sx={{ border: '1px solid #ccc', p: 2, maxWidth: 400 }}>
          {profile.profilePicture && (
            <Avatar
              src={profile.profilePicture.startsWith('http') ? profile.profilePicture : `${API_ROOT}${profile.profilePicture}`}
              sx={{ width: 100, height: 100, mb: 2 }}
            />
          )}
          <Typography><strong>Username:</strong> {profile.username}</Typography>
          <Typography><strong>Email:</strong> {profile.email}</Typography>
          <Typography><strong>Name:</strong> {profile.firstName} {profile.lastName}</Typography>
          <Typography><strong>Roles:</strong> {profile.roles.join(', ')}</Typography>
          <Typography sx={{ mt: 1 }}><strong>Balances:</strong></Typography>
          <ul>
            {profile.balances.map(b => (
              <li key={b.orgId}>{b.orgName || 'No organization'}: {b.amount}</li>
            ))}
          </ul>
          <Typography sx={{ mt: 1 }}><strong>Organizations:</strong></Typography>
          <ul>
            {profile.organizations.map(o => (
              <li key={o.id}>{o.name}</li>
            ))}
          </ul>
        </Box>
      )}
    </Box>
  );
}
