import React, { useEffect, useState, useMemo, useContext } from 'react';
import { Box, Typography, Select, MenuItem, Button, Stack, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { styles } from '../styles';
import { useTable } from 'react-table';
import api from '../api';
import { AuthContext } from '../AuthContext';

export default function ManageUsers() {
  const { currentOrg } = useContext(AuthContext);
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
      const [uRes, rRes, oRes] = await Promise.all([
        api.get('/users', { params: { orgId: currentOrg } }),
        api.get('/roles', { params: { orgId: currentOrg } }),
        api.get('/organizations')
      ]);
      setUsers(uRes.data);
      setRoles(rRes.data);
      setAllOrgs(oRes.data);
    };
    load();
  }, [currentOrg]);

  const changeRole = async (id, roleId) => {
    await api.post(`/users/${id}/role`, { roleId });
    const role = roles.find(r => r.id === roleId);
    setUsers(users.map(u => (u.id === id ? { ...u, role: role.code, roleId } : u)));
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
    await api.delete(`/users/${id}`);
    setUsers(users.filter(u => u.id !== id));
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
      Header: 'Role',
      accessor: 'role',
      Cell: ({ row }) => (
        <Select
          size="small"
          value={row.original.roleId}
          onChange={e => changeRole(row.original.id, e.target.value)}
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
          <Select
            size="small"
            displayEmpty
            value={addOrgId}
            onChange={e => setAddOrgId(e.target.value)}
          >
            <MenuItem value="">
              <em>Select Org</em>
            </MenuItem>
            {allOrgs.map(o => (
              <MenuItem key={o.id} value={o.id}>{o.name}</MenuItem>
            ))}
          </Select>
          <Select
            size="small"
            displayEmpty
            value={addUserId}
            onChange={e => setAddUserId(e.target.value)}
          >
            <MenuItem value="">
              <em>Select User</em>
            </MenuItem>
            {users.map(u => (
              <MenuItem key={u.id} value={u.id}>{u.username}</MenuItem>
            ))}
          </Select>
          <Button variant="contained" onClick={addMember}>Add Member</Button>
        </Stack>
        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
          <Select
            size="small"
            displayEmpty
            value={removeOrgId}
            onChange={e => setRemoveOrgId(e.target.value)}
          >
            <MenuItem value="">
              <em>Select Org</em>
            </MenuItem>
            {allOrgs.map(o => (
              <MenuItem key={o.id} value={o.id}>{o.name}</MenuItem>
            ))}
          </Select>
          <Select
            size="small"
            displayEmpty
            value={removeUserId}
            onChange={e => setRemoveUserId(e.target.value)}
          >
            <MenuItem value="">
              <em>Select User</em>
            </MenuItem>
            {users.map(u => (
              <MenuItem key={u.id} value={u.id}>{u.username}</MenuItem>
            ))}
          </Select>
      <Button variant="contained" color="error" onClick={removeMember}>Remove Member</Button>
    </Stack>
      {message && (
        <Typography role="status" aria-live="polite" sx={{ mt: 1 }}>{message}</Typography>
      )}
    </Box>
  </Box>
);
}
