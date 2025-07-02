import React, { useEffect, useState, useMemo, useContext } from 'react';
import { Box, Typography, IconButton, TextField, Button, Stack, Select, MenuItem } from '@mui/material';
import { styles } from '../styles';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTable } from 'react-table';
import api from '../api';
import { AuthContext } from '../AuthContext';
import { ToastContext } from '../ToastContext';
import { ApiContext } from '../ApiContext';

export default function ManageInvites() {
  const { currentOrg } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);
  const { invites, refreshInvites, roles, refreshRoles } = useContext(ApiContext);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  const loadInvites = async () => {
    if (!currentOrg) return;
    await Promise.all([refreshInvites(currentOrg), refreshRoles(currentOrg)]);
    if (roles.length && !role) setRole(roles[0].code);
  };
  useEffect(() => {
    loadInvites();
  }, [currentOrg]);


  const deleteInvite = async (id) => {
    if (!window.confirm('Delete this invite?')) return;
    await api.delete(`/invites/${id}`);
    await refreshInvites(currentOrg);
    showToast('Invite deleted', 'success');
  };

  const sendInvite = async (e) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!currentOrg || !trimmed || !role) {
      showToast('Organization, email and role are required', 'error');
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(trimmed)) {
      showToast('Invalid email address', 'error');
      return;
    }
    await api.post(`/organizations/${currentOrg}/invite`, { email: trimmed, role });
    showToast('Invite sent', 'success');
    setEmail('');
    loadInvites();
  };


  const columns = useMemo(() => [
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
    <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      <Box sx={styles.tableContainer}>
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
      </Box>
      <Box sx={styles.actionRow}>
        <Box component="form" onSubmit={sendInvite} noValidate>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
            <TextField
              size="small"
              label="Email"
              placeholder="Email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              sx={{ width: { xs: '100%', sm: 'auto' } }}
            />
            <Select
              size="small"
              value={role}
              onChange={e => setRole(e.target.value)}
              displayEmpty
              sx={{ width: { xs: '100%', sm: 160 } }}
            >
              <MenuItem value="" disabled>
                Role
              </MenuItem>
              {roles.map(r => (
                <MenuItem key={r.id} value={r.code}>{r.name}</MenuItem>
              ))}
            </Select>
            <Button type="submit" variant="contained">Invite User</Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
