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
  const [role, setRole] = useState('');
  const [roles, setRoles] = useState([]);
  const [message, setMessage] = useState({ text: '', error: false });

  const loadInvites = async () => {
    if (!currentOrg) { setInvites([]); setRoles([]); return; }
    const [iRes, rRes] = await Promise.all([
      api.get(`/organizations/${currentOrg}/invites`),
      api.get('/roles', { params: { orgId: currentOrg } })
    ]);
    setInvites(iRes.data.map(i => ({ id: i.id, email: i.email, token: i.token, role: i.role })));
    setRoles(rRes.data);
    if (rRes.data.length && !role) setRole(rRes.data[0].code);
  };
  useEffect(() => {
    loadInvites();
  }, [currentOrg]);


  const deleteInvite = async (id) => {
    if (!window.confirm('Delete this invite?')) return;
    await api.delete(`/invites/${id}`);
    setInvites(invites.filter(i => i.id !== id));
    setMessage({ text: 'Invite deleted', error: false });
  };

  const sendInvite = async (e) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!currentOrg || !trimmed || !role) {
      setMessage({ text: 'Organization, email and role are required', error: true });
      return;
    }
    await api.post(`/organizations/${currentOrg}/invite`, { email: trimmed, role });
    setMessage({ text: 'Invite sent', error: false });
    setEmail('');
    loadInvites();
  };


  const columns = useMemo(() => [
    { Header: 'ID', accessor: 'id' },
    { Header: 'Email', accessor: 'email' },
    { Header: 'Token', accessor: 'token' },
    {
      Header: 'Role',
      accessor: 'role',
      Cell: ({ value }) => roles.find(r => r.code === value)?.name || value
    },
    {
      Header: 'Actions',
      accessor: 'actions',
      Cell: ({ row }) => (
        <IconButton color="error" onClick={() => deleteInvite(row.original.id)}>
          <DeleteIcon />
        </IconButton>
      )
    }
  ], [invites, roles]);

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
              {roles.map(r => (
                <MenuItem key={r.id} value={r.code}>{r.name}</MenuItem>
              ))}
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
