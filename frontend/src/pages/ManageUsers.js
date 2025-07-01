import React, { useEffect, useState, useMemo, useContext } from 'react';
import { Box, Typography, Select, MenuItem, Button, Stack, IconButton, Autocomplete, TextField, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { styles } from '../styles';
import { useTable } from 'react-table';
import api, { API_ROOT } from '../api';
import { AuthContext } from '../AuthContext';
import { ToastContext } from '../ToastContext';
import { ApiContext } from '../ApiContext';

export default function ManageUsers() {
  const navigate = useNavigate();
  const { currentOrg, profile, logout } = useContext(AuthContext);
  const { users, refreshUsers, roles, refreshRoles } = useContext(ApiContext);
  const [allUsers, setAllUsers] = useState([]);
  const [orgs, setOrgs] = useState([]);
  const [addUserId, setAddUserId] = useState('');
  const [addRoleId, setAddRoleId] = useState('');
  const [removeUserId, setRemoveUserId] = useState('');
  const [addOrgId, setAddOrgId] = useState('');
  const [removeOrgId, setRemoveOrgId] = useState('');
  const { showToast } = useContext(ToastContext);
  const load = async () => {
    const orgReq = profile?.isSuperAdmin
      ? api.get('/organizations')
      : Promise.resolve({ data: [] });
    const allReq = api.get('/users');
    const [oRes, aRes] = await Promise.all([orgReq, allReq]);
    await Promise.all([refreshUsers(currentOrg || ''), refreshRoles(currentOrg || '')]);
    setAllUsers(aRes.data);
    setOrgs(oRes.data.map(o => ({ id: o.id, name: o.name }))); 
  };

  useEffect(() => {
    load();
  }, [currentOrg]);

  useEffect(() => {
    const fetchRoles = async () => {
      const orgId = currentOrg || addOrgId;
      if (!orgId) return;
      await refreshRoles(orgId);
    };
    fetchRoles();
  }, [currentOrg, addOrgId, refreshRoles]);

  useEffect(() => {
    if (roles.length && !addRoleId) {
      setAddRoleId(roles[0].id);
    }
  }, [roles]);

  const changeRoles = async (id, roleIds) => {
    await api.post(`/users/${id}/roles`, { roleIds });
    await refreshUsers(currentOrg || '');
  };

  const addMember = async (e) => {
    if (e) e.preventDefault();
    const orgId = currentOrg || addOrgId;
    if (!addUserId || !orgId || !addRoleId) {
      showToast('Select user, organization and role', 'error');
      return;
    }
    await api.post(`/organizations/${orgId}/members`, { userId: addUserId, roleId: addRoleId });
    showToast('Member added', 'success');
    setAddUserId('');
    setAddRoleId('');
    load();
  };

  const removeMember = async (e) => {
    if (e) e.preventDefault();
    const orgId = currentOrg || removeOrgId;
    if (!removeUserId || !orgId) {
      showToast('Select user and organization', 'error');
      return;
    }
    await api.delete(`/organizations/${orgId}/members/${removeUserId}`);
    showToast('Member removed', 'success');
    load();
  };

  const deleteUser = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      await api.delete(`/users/${id}`);
      await refreshUsers(currentOrg || '');
      if (profile?.id === id) {
        await logout();
        navigate('/login');
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Delete failed', 'error');
    }
  };

  const columns = useMemo(() => {
    const base = [
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
        accessor: 'roleCodes',
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
      Cell: ({ row }) =>
        profile?.isSuperAdmin ? (
          <IconButton color="error" onClick={() => deleteUser(row.original.id)}>
            <DeleteIcon />
          </IconButton>
        ) : null
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

  const addOptions = useMemo(() => {
    const orgId = currentOrg || addOrgId;
    if (!orgId) return allUsers;
    const memberIds = users
      .filter(u => u.organizations.some(o => o.id === orgId))
      .map(u => u.id);
    return allUsers.filter(u => !memberIds.includes(u.id));
  }, [allUsers, users, currentOrg, addOrgId]);

  const removeOptions = useMemo(
    () =>
      currentOrg
        ? users.filter(u => u.organizations.some(o => o.id === currentOrg))
        : users.filter(u => u.organizations.length === 0),
    [users, currentOrg]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = table;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      <Typography variant="h6" gutterBottom>Manage Users</Typography>
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
        {profile?.isSuperAdmin && (
          <Box component="form" onSubmit={addMember}>
            <Stack direction="row" spacing={1}>
              <Autocomplete
                options={addOptions}
                getOptionLabel={u => u.username || ''}
                onChange={(_, v) => setAddUserId(v ? v.id : '')}
                renderInput={params => <TextField {...params} size="small" label="User" />}
                sx={{ width: 200 }}
              />
              {!currentOrg && (
                <Autocomplete
                  options={orgs}
                  getOptionLabel={o => o.name || ''}
                  onChange={(_, v) => {
                    setAddOrgId(v ? v.id : '');
                    setAddRoleId('');
                  }}
                  renderInput={params => <TextField {...params} size="small" label="Organization" />}
                  sx={{ width: 200 }}
                />
              )}
              <Select
                size="small"
                value={addRoleId}
                onChange={e => setAddRoleId(e.target.value)}
                displayEmpty
                sx={{ width: 160 }}
              >
                <MenuItem value="" disabled>
                  Role
                </MenuItem>
                {roles.map(r => (
                  <MenuItem key={r.id} value={r.id}>
                    {r.name}
                  </MenuItem>
                ))}
              </Select>
              <Button type="submit" variant="contained">Add Member</Button>
            </Stack>
          </Box>
        )}
        {currentOrg && (
          <Box component="form" onSubmit={removeMember} sx={{ mt: 2 }}>
            <Stack direction="row" spacing={1}>
              <Autocomplete
                options={removeOptions}
                getOptionLabel={u => u.username || ''}
                onChange={(_, v) => setRemoveUserId(v ? v.id : '')}
                renderInput={params => <TextField {...params} size="small" label="User" />}
                sx={{ width: 200 }}
              />
              <Button type="submit" variant="contained" color="error">Remove Member</Button>
            </Stack>
          </Box>
        )}
        </Box>
      </Box>
    );
  }
