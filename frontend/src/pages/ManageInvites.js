import React, { useEffect, useState, useMemo, useContext } from 'react';
import { Box, Typography, IconButton, TextField, Button, Stack, Select, MenuItem } from '@mui/material';
import { styles } from '../styles';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTable } from 'react-table';
import api from '../api';
import { AuthContext } from '../AuthContext';

export default function ManageInvites() {
  const { currentOrg } = useContext(AuthContext);
  const [invites, setInvites] = useState([]);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('USER');
  const [message, setMessage] = useState({ text: '', error: false });

  const loadInvites = async () => {
    if (!currentOrg) { setInvites([]); return; }
    const res = await api.get(`/organizations/${currentOrg}/invites`);
    setInvites(res.data.map(i => ({ id: i.id, email: i.email, token: i.token, role: i.role })));
  };
  useEffect(() => {
    loadInvites();
  }, [currentOrg]);


  const deleteInvite = async (id) => {
    await api.delete(`/invites/${id}`);
    setInvites(invites.filter(i => i.id !== id));
  };

  const sendInvite = async (e) => {
    e.preventDefault();
    if (!currentOrg || !email) {
      setMessage({ text: 'Organization and email are required', error: true });
      return;
    }
    await api.post(`/organizations/${currentOrg}/invite`, { email, role });
    setMessage({ text: 'Invite sent', error: false });
    setEmail('');
    loadInvites();
  };


  const columns = useMemo(() => [
    { Header: 'ID', accessor: 'id' },
    { Header: 'Email', accessor: 'email' },
    { Header: 'Token', accessor: 'token' },
    { Header: 'Role', accessor: 'role' },
    {
      Header: 'Actions',
      accessor: 'actions',
      Cell: ({ row }) => (
        <IconButton color="error" onClick={() => deleteInvite(row.original.id)}>
          <DeleteIcon />
        </IconButton>
      )
    }
  ], [invites]);

  const table = useTable({ columns, data: invites });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = table;

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Manage Invites</Typography>
      <Box component="table" {...getTableProps()} sx={styles.table}>
        <Box component="thead">
          {headerGroups.map(hg => (
            <Box component="tr" {...hg.getHeaderGroupProps()}>
              {hg.headers.map(col => (
                <Box component="th" {...col.getHeaderProps()}>{col.render('Header')}</Box>
              ))}
            </Box>
          ))}
        </Box>
        <Box component="tbody" {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <Box component="tr" {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <Box component="td" {...cell.getCellProps()}>{cell.render('Cell')}</Box>
                ))}
              </Box>
            );
          })}
        </Box>
      </Box>
      <Box sx={styles.actionRow}>
        <Box component="form" onSubmit={sendInvite} noValidate sx={{ mt: 2 }}>
          <Stack direction="row" spacing={1}>
            <TextField
              size="small"
              label="Email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <Select
              size="small"
              value={role}
              onChange={e => setRole(e.target.value)}
            >
              <MenuItem value="USER">USER</MenuItem>
              <MenuItem value="ADMIN">ADMIN</MenuItem>
            </Select>
            <Button type="submit" variant="contained">Invite User</Button>
          </Stack>
        </Box>
        {message.text && (
          <Typography role="status" aria-live="polite" sx={{ mt: 2 }} color={message.error ? 'error' : undefined}>{message.text}</Typography>
        )}
      </Box>
    </Box>
  );
}
