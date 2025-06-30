import React, { useEffect, useState, useMemo } from 'react';
import { Box, Typography, Select, MenuItem, Button, Stack } from '@mui/material';
import { styles } from '../styles';
import { useTable } from 'react-table';
import api from '../api';

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [allOrgs, setAllOrgs] = useState([]);
  const [addOrgId, setAddOrgId] = useState('');
  const [addUserId, setAddUserId] = useState('');
  const [removeOrgId, setRemoveOrgId] = useState('');
  const [removeUserId, setRemoveUserId] = useState('');

  useEffect(() => {
    const load = async () => {
      const [uRes, rRes, oRes] = await Promise.all([
        api.get('/users'),
        api.get('/roles'),
        api.get('/organizations/all')
      ]);
      setUsers(uRes.data);
      setRoles(rRes.data);
      setAllOrgs(oRes.data);
    };
    load();
  }, []);

  const changeRole = async (id, roleId) => {
    await api.post(`/users/${id}/role`, { roleId });
    const role = roles.find(r => r.id === roleId);
    setUsers(users.map(u => (u.id === id ? { ...u, role: role.code, roleId } : u)));
  };

  const addMember = async () => {
    await api.post(`/organizations/${addOrgId}/members`, { userId: addUserId });
    alert('member added');
  };

  const removeMember = async () => {
    await api.delete(`/organizations/${removeOrgId}/members/${removeUserId}`);
    alert('member removed');
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
        <Button color="error" onClick={() => deleteUser(row.original.id)}>Delete</Button>
      )
    }
  ], [users, roles]);

  const table = useTable({ columns, data: users });

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
            value={addOrgId}
            onChange={e => setAddOrgId(e.target.value)}
          >
            {allOrgs.map(o => (
              <MenuItem key={o.id} value={o.id}>{o.name}</MenuItem>
            ))}
          </Select>
          <Select
            size="small"
            value={addUserId}
            onChange={e => setAddUserId(e.target.value)}
          >
            {users.map(u => (
              <MenuItem key={u.id} value={u.id}>{u.username}</MenuItem>
            ))}
          </Select>
          <Button variant="contained" onClick={addMember}>Add Member</Button>
        </Stack>
        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
          <Select
            size="small"
            value={removeOrgId}
            onChange={e => setRemoveOrgId(e.target.value)}
          >
            {allOrgs.map(o => (
              <MenuItem key={o.id} value={o.id}>{o.name}</MenuItem>
            ))}
          </Select>
          <Select
            size="small"
            value={removeUserId}
            onChange={e => setRemoveUserId(e.target.value)}
          >
            {users.map(u => (
              <MenuItem key={u.id} value={u.id}>{u.username}</MenuItem>
            ))}
          </Select>
          <Button variant="contained" color="error" onClick={removeMember}>Remove Member</Button>
        </Stack>
      </Box>
    </Box>
  );
}
