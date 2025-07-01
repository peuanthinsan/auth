import React, { useEffect, useState, useMemo, useContext } from 'react';
import { Box, Typography, IconButton, TextField, Button, Stack, Autocomplete } from '@mui/material';
import { styles } from '../styles';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTable } from 'react-table';
import api from '../api';
import { AuthContext } from '../AuthContext';

export default function ManageInvites() {
  const { currentOrg } = useContext(AuthContext);
  const [invites, setInvites] = useState([]);
  const [orgId, setOrgId] = useState('');
  const [email, setEmail] = useState('');
  const [viewOrgId, setViewOrgId] = useState('');
  const [orgInvites, setOrgInvites] = useState([]);
  const [allOrgs, setAllOrgs] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const load = async () => {
      if (!currentOrg) { setInvites([]); return; }
      const res = await api.get(`/organizations/${currentOrg}/invites`);
      setInvites(res.data.map(i => ({ id: i._id, email: i.email, token: i.token })));
    };
    load();
  }, [currentOrg]);

  useEffect(() => {
    const loadOrgs = async () => {
      const res = await api.get('/organizations');
      setAllOrgs(res.data.map(o => ({ id: o.id, name: o.name })));
    };
    loadOrgs();
  }, []);

  const deleteInvite = async (id) => {
    await api.delete(`/invites/${id}`);
    setInvites(invites.filter(i => i.id !== id));
  };

  const sendInvite = async (e) => {
    e.preventDefault();
    const targetOrg = orgId || currentOrg;
    if (!targetOrg || !email) {
      setMessage('Org ID and email are required');
      return;
    }
    await api.post(`/organizations/${targetOrg}/invite`, { email });
    setMessage('Invite sent');
  };

  const loadOrgInvites = async () => {
    const target = viewOrgId || currentOrg;
    if (!target) return;
    const res = await api.get(`/organizations/${target}/invites`);
    setOrgInvites(res.data);
  };

  const columns = useMemo(() => [
    { Header: 'ID', accessor: 'id' },
    { Header: 'Email', accessor: 'email' },
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
          <Autocomplete
            options={allOrgs}
            getOptionLabel={o => o.name || ''}
            onChange={(_, v) => setOrgId(v ? v.id : '')}
            renderInput={params => <TextField {...params} size="small" label="Organization" required />}
            sx={{ width: 200 }}
          />
          <TextField
            size="small"
            label="Email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <Button type="submit" variant="contained">Invite User</Button>
        </Stack>
      </Box>
        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
          <Autocomplete
            options={allOrgs}
            getOptionLabel={o => o.name || ''}
            onChange={(_, v) => setViewOrgId(v ? v.id : '')}
            renderInput={params => <TextField {...params} size="small" label="Organization" />}
            sx={{ width: 200 }}
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
