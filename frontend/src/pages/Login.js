import React, { useState, useContext } from 'react';
import { TextField, Button, Stack, Typography, Box, Link } from '@mui/material';
import { styles } from '../styles';
import { AuthContext } from '../AuthContext';

export default function Login() {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const submit = async () => {
    await login(username, password);
    alert('logged in');
  };
  return (
    <Box>
      <Typography variant="h6" gutterBottom>Login</Typography>
      <Stack spacing={2} sx={styles.formStack}>
        <TextField label="username" value={username} onChange={e => setUsername(e.target.value)} />
        <TextField type="password" label="password" value={password} onChange={e => setPassword(e.target.value)} />
        <Button variant="contained" onClick={submit}>Submit</Button>
        <Link href="/reset-password" underline="hover">Forgot password?</Link>
      </Stack>
    </Box>
  );
}
