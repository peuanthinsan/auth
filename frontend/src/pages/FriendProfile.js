import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Card, CardContent, Avatar, Typography, Grid, Chip } from '@mui/material';
import { ApiContext } from '../ApiContext';
import { API_ROOT } from '../api';

export default function FriendProfile() {
  const { id } = useParams();
  const { getFriendProfile } = useContext(ApiContext);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getFriendProfile(id);
        setProfile(data);
      } catch (e) {
        setProfile(null);
      }
    };
    load();
  }, [id, getFriendProfile]);

  if (!profile) return <Box />;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
      <Card sx={{ maxWidth: 600, width: '100%' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            {profile.profilePicture && (
              <Avatar
                src={
                  profile.profilePicture.startsWith('http')
                    ? profile.profilePicture
                    : `${API_ROOT}${profile.profilePicture}`
                }
                sx={{ width: 80, height: 80, mr: 2 }}
              />
            )}
            <Box>
              <Typography variant="h6">{profile.username}</Typography>
              <Typography color="text.secondary">{profile.email}</Typography>
              <Typography>
                {profile.firstName} {profile.lastName}
              </Typography>
            </Box>
          </Box>
          {profile.roles?.length > 0 && (
            <Box sx={{ mb: 2 }}>
              {profile.roles.map(r => (
                <Chip key={r} label={r} sx={{ mr: 1, mb: 1 }} />
              ))}
            </Box>
          )}
          {profile.balances.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                Balances
              </Typography>
              <Grid container spacing={2}>
                {profile.balances.map(b => (
                  <Grid item xs={12} sm={6} key={b.orgId}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="subtitle2">
                          {b.orgName || 'No organization'}
                        </Typography>
                        <Typography variant="h6">{b.amount}</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
          {profile.organizations?.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                Organizations
              </Typography>
              <Grid container spacing={2}>
                {profile.organizations.map(o => (
                  <Grid item xs={12} sm={6} key={o.id}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="subtitle2">{o.name}</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
