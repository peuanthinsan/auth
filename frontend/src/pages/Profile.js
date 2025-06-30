import React, { useState, useContext } from 'react';
import { Button, Typography, Box } from '@mui/material';
import { styles } from '../styles';
import { AuthContext } from '../AuthContext';
import api from '../api';

export default function Profile() {
  useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const load = async () => {
    const res = await api.get('/profile');
    setProfile(res.data);
  };
  return (
    <Box>
      <Typography variant="h6" gutterBottom>Profile</Typography>
      <Button variant="contained" onClick={load} sx={styles.mb2}>Load</Button>
      {profile && (
        <>
          {profile.profilePicture && (
            <img src={profile.profilePicture} alt="profile" width={100} />
          )}
          <pre>{JSON.stringify(profile, null, 2)}</pre>
        </>
      )}
    </Box>
  );
}
