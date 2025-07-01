import React, { useEffect, useState, useMemo, useContext } from 'react';
import { Box, Typography, Select, MenuItem, Button, Stack, IconButton, Autocomplete, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { styles } from '../styles';
import { useTable } from 'react-table';
import api from '../api';
import { AuthContext } from '../AuthContext';

export default function ManageUsers() {
  const navigate = useNavigate();
  const { currentOrg, profile, logout } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [allOrgs, setAllOrgs] = useState([]);
  const [addOrgId, setAddOrgId] = useState('');
  const [addUserId, setAddUserId] = useState('');
  const [removeOrgId, setRemoveOrgId] = useState('');
  const [removeUserId, setRemoveUserId] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const load = async () => {
      const userReq = currentOrg
        ? api.get('/users', { params: { orgId: currentOrg } })
        : api.get('/users');
      const rolesReq = currentOrg
        ? api.get('/roles', { params: { orgId: currentOrg } })
        : Promise.resolve({ data: [] });
      const orgReq = api.get('/organizations');
      const [uRes, rRes, oRes] = await Promise.all([userReq, rolesReq, orgReq]);
      setUsers(uRes.data);
      setRoles(rRes.data);
      setAllOrgs(oRes.data);
    };
    load();
  }, [currentOrg]);

  const changeRoles = async (id, roleIds) => {
    await api.post(`/users/${id}/roles`, { roleIds });
    const roleCodes = roles.filter(r => roleIds.includes(r.id)).map(r => r.code);
    setUsers(users.map(u => (u.id === id ? { ...u, roleIds, roles: roleCodes } : u)));
  };

  const addMember = async () => {
    if (!addOrgId || !addUserId) {
      setMessage('Select organization and user');
      return;
    }
    await api.post(`/organizations/${addOrgId}/members`, { userId: addUserId });
    setMessage('Member added');
  };

  const removeMember = async () => {
    if (!removeOrgId || !removeUserId) {
      setMessage('Select organization and user');
      return;
    }
    await api.delete(`/organizations/${removeOrgId}/members/${removeUserId}`);
    setMessage('Member removed');
  };

  const deleteUser = async (id) => {
    try {
      await api.delete(`/users/${id}`);
      setUsers(users.filter(u => u.id !== id));
      if (profile?.id === id) {
        await logout();
        navigate('/login');
      }
    } catch (err) {
      setMessage(err.response?.data?.message || 'Delete failed');
    }
  };

  const columns = useMemo(() => [
    { Header: 'ID', accessor: 'id' },
    { Header: 'Username', accessor: 'username' },
    { Header: 'Email', accessor: 'email' },
    { Header: 'First Name', accessor: 'firstName' },
    { Header: 'Last Name', accessor: 'lastName' },
    { Header: 'Balance', accessor: 'balance' },
    {
      Header: 'Organizations',
      accessor: 'organizations',
      Cell: ({ value }) => value.map(o => o.name).join(', ')
    },
    {
      Header: 'Roles',
      accessor: 'roles',
      Cell: ({ row }) => (
        <Select
          size="small"
          multiple
          value={row.original.roleIds}
          onChange={e => changeRoles(row.original.id, e.target.value)}
          renderValue={selected => roles.filter(r => selected.includes(r.id)).map(r => r.code).join(', ')}
        >
          {roles.map(r => (
            <MenuItem key={r.id} value={r.id}>{r.code}</MenuItem>
          ))}
        </Select>
      )
    },
    {
      Header: 'Actions',
      accessor: 'actions',
      Cell: ({ row }) => (
        <IconButton color="error" onClick={() => deleteUser(row.original.id)}>
          <DeleteIcon />
        </IconButton>
      )
    }
  ], [users, roles]);

  const filtered = useMemo(
    () =>
      currentOrg
        ? users.filter(u => u.organizations.some(o => o.id === currentOrg))
        : users,
    [users, currentOrg]
  );
  const table = useTable({ columns, data: filtered });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = table;

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Manage Users</Typography>
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
        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
          <Autocomplete
            options={allOrgs}
            getOptionLabel={o => o.name || ''}
            onChange={(_, v) => setAddOrgId(v ? v.id : '')}
            renderInput={params => <TextField {...params} size="small" label="Organization" />}
            sx={{ width: 200 }}
          />
          <Autocomplete
            options={users}
            getOptionLabel={u => u.username || ''}
            onChange={(_, v) => setAddUserId(v ? v.id : '')}
            renderInput={params => <TextField {...params} size="small" label="User" />}
            sx={{ width: 200 }}
          />
          <Button variant="contained" onClick={addMember}>Add Member</Button>
        </Stack>
        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
          <Autocomplete
            options={allOrgs}
            getOptionLabel={o => o.name || ''}
            onChange={(_, v) => setRemoveOrgId(v ? v.id : '')}
            renderInput={params => <TextField {...params} size="small" label="Organization" />}
            sx={{ width: 200 }}
          />
          <Autocomplete
            options={users}
            getOptionLabel={u => u.username || ''}
            onChange={(_, v) => setRemoveUserId(v ? v.id : '')}
            renderInput={params => <TextField {...params} size="small" label="User" />}
            sx={{ width: 200 }}
          />
      <Button variant="contained" color="error" onClick={removeMember}>Remove Member</Button>
    </Stack>
      {message && (
        <Typography role="status" aria-live="polite" sx={{ mt: 1 }}>{message}</Typography>
      )}
    </Box>
  </Box>
);
}
