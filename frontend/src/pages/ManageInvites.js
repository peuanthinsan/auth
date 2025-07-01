import React, { useEffect, useState, useMemo } from 'react';
import { Box, Typography, IconButton, TextField, Button, Stack } from '@mui/material';
import { styles } from '../styles';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTable } from 'react-table';
import api from '../api';

export default function ManageInvites() {
  const [invites, setInvites] = useState([]);
  const [orgId, setOrgId] = useState('');
  const [email, setEmail] = useState('');
  const [viewOrgId, setViewOrgId] = useState('');
  const [orgInvites, setOrgInvites] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const load = async () => {
      const res = await api.get('/invites');
      setInvites(res.data);
    };
    load();
  }, []);

  const deleteInvite = async (id) => {
    await api.delete(`/invites/${id}`);
    setInvites(invites.filter(i => i.id !== id));
  };

  const sendInvite = async (e) => {
    e.preventDefault();
    if (!orgId || !email) {
      setMessage('Org ID and email are required');
      return;
    }
    await api.post(`/organizations/${orgId}/invite`, { email });
    setMessage('Invite sent');
  };

  const loadOrgInvites = async () => {
    const res = await api.get(`/organizations/${viewOrgId}/invites`);
    setOrgInvites(res.data);
  };

  const columns = useMemo(() => [
    { Header: 'ID', accessor: 'id' },
    { Header: 'Email', accessor: 'email' },
    { Header: 'Organization', accessor: 'org' },
    { Header: 'Token', accessor: 'token' },
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
            label="org id"
            placeholder="Org ID"
            value={orgId}
            onChange={e => setOrgId(e.target.value)}
            required
          />
          <TextField
            size="small"
            label="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <Button type="submit" variant="contained">Invite User</Button>
        </Stack>
      </Box>
        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
          <TextField
            size="small"
            label="org id"
            placeholder="Org ID"
            value={viewOrgId}
            onChange={e => setViewOrgId(e.target.value)}
          />
          <Button variant="contained" onClick={loadOrgInvites}>View Invites</Button>
        </Stack>
        {orgInvites.length > 0 && (
          <Box component="pre" sx={{ mt: 2 }}>{JSON.stringify(orgInvites, null, 2)}</Box>
        )}
        {message && (
          <Typography role="status" aria-live="polite" sx={{ mt: 2 }}>{message}</Typography>
        )}
      </Box>
    </Box>
  );
}
