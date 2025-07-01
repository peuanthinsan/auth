import React, { useEffect, useState, useMemo, useContext } from 'react';
import { Box, Typography, Select, MenuItem, Button, Stack, IconButton, Autocomplete, TextField, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { styles } from '../styles';
import { useTable } from 'react-table';
import api, { API_ROOT } from '../api';
import { AuthContext } from '../AuthContext';

export default function ManageUsers() {
  const navigate = useNavigate();
  const { currentOrg, profile, logout } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [addUserId, setAddUserId] = useState('');
  const [removeUserId, setRemoveUserId] = useState('');
  const [message, setMessage] = useState({ text: '', error: false });
  const load = async () => {
    const userReq = currentOrg
      ? api.get('/users', { params: { orgId: currentOrg } })
      : api.get('/users');
    const roleReq = api.get('/roles', { params: currentOrg ? { orgId: currentOrg } : {} });
    const [uRes, rRes] = await Promise.all([userReq, roleReq]);
    setUsers(uRes.data);
    setRoles(rRes.data);
  };

  useEffect(() => {
    load();
  }, [currentOrg]);

  const changeRoles = async (id, roleIds) => {
    await api.post(`/users/${id}/roles`, { roleIds });
    const roleCodes = roles.filter(r => roleIds.includes(r.id)).map(r => r.code);
    setUsers(users.map(u => (u.id === id ? { ...u, roleIds, roles: roleCodes } : u)));
  };

  const addMember = async () => {
    if (!addUserId || !currentOrg) {
      setMessage({ text: 'Select user', error: true });
      return;
    }
    await api.post(`/organizations/${currentOrg}/members`, { userId: addUserId });
    setMessage({ text: 'Member added', error: false });
    load();
  };

  const removeMember = async () => {
    if (!removeUserId || !currentOrg) {
      setMessage({ text: 'Select user', error: true });
      return;
    }
    await api.delete(`/organizations/${currentOrg}/members/${removeUserId}`);
    setMessage({ text: 'Member removed', error: false });
    load();
  };

  const deleteUser = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      await api.delete(`/users/${id}`);
      setUsers(users.filter(u => u.id !== id));
      if (profile?.id === id) {
        await logout();
        navigate('/login');
      }
    } catch (err) {
      setMessage({ text: err.response?.data?.message || 'Delete failed', error: true });
    }
  };

  const columns = useMemo(() => {
    const base = [
      { Header: 'ID', accessor: 'id' },
      { Header: 'Username', accessor: 'username' },
      { Header: 'Email', accessor: 'email' },
      { Header: 'First Name', accessor: 'firstName' },
      { Header: 'Last Name', accessor: 'lastName' },
      {
        Header: 'Profile Picture',
        accessor: 'profilePicture',
        Cell: ({ value }) =>
          value ? (
            <Avatar src={value.startsWith('http') ? value : `${API_ROOT}${value}`} sx={{ width: 32, height: 32 }} />
          ) : null
      }
    ];

    if (currentOrg) {
      base.push({ Header: 'Balance', accessor: 'balance' });
      base.push({
        Header: 'Organizations',
        accessor: 'organizations',
        Cell: ({ value }) => value.map(o => o.name).join(', ')
      });
      base.push({
        Header: 'Roles',
        accessor: 'roles',
        Cell: ({ row }) => (
          <Select
            size="small"
            multiple
            value={row.original.roleIds}
            onChange={e => changeRoles(row.original.id, e.target.value)}
            renderValue={selected =>
              roles
                .filter(r => selected.includes(r.id))
                .map(r => r.name)
                .join(', ')
            }
          >
            {roles.map(r => (
              <MenuItem key={r.id} value={r.id}>{r.name}</MenuItem>
            ))}
          </Select>
        )
      });
    }

    base.push({
      Header: 'Actions',
      accessor: 'actions',
      Cell: ({ row }) => (
        <IconButton color="error" onClick={() => deleteUser(row.original.id)}>
          <DeleteIcon />
        </IconButton>
      )
    });

    return base;
  }, [users, roles, currentOrg]);

  const filtered = useMemo(
    () =>
      currentOrg
        ? users.filter(u => u.organizations.some(o => o.id === currentOrg))
        : users.filter(u => u.organizations.length === 0),
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
            options={users}
            getOptionLabel={u => u.username || ''}
            onChange={(_, v) => setRemoveUserId(v ? v.id : '')}
            renderInput={params => <TextField {...params} size="small" label="User" />}
            sx={{ width: 200 }}
          />
          <Button variant="contained" color="error" onClick={removeMember}>Remove Member</Button>
        </Stack>
        {message.text && (
          <Typography role="status" aria-live="polite" sx={{ mt: 1 }} color={message.error ? 'error' : undefined}>{message.text}</Typography>
        )}
      </Box>
    </Box>
);
}
