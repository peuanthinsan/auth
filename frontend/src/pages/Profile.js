import React, { useState, useEffect, useContext } from 'react';
import { Typography, Box, Avatar } from '@mui/material';
import { styles } from '../styles';
import { AuthContext } from '../AuthContext';
import api from '../api';

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
        <>
          {profile.profilePicture && (
            <Avatar src={profile.profilePicture} sx={{ width: 100, height: 100 }} />
          )}
          <pre>{JSON.stringify(profile, null, 2)}</pre>
        </>
      )}
    </Box>
  );
}
