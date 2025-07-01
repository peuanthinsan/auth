import React, { useEffect, useState, useMemo, useContext } from 'react';
import { Box, Typography, TextField, IconButton, Button } from '@mui/material';
import { styles } from '../styles';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTable } from 'react-table';
import api from '../api';
import { AuthContext } from '../AuthContext';
import { ToastContext } from '../ToastContext';

export default function ManageRoles() {
  const { currentOrg } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);
  const [roles, setRoles] = useState([]);
  const [newCode, setNewCode] = useState('');
  const [newName, setNewName] = useState('');

  useEffect(() => {
    const load = async () => {
      if (!currentOrg) { setRoles([]); return; }
      const res = await api.get('/roles', { params: { orgId: currentOrg } });
      setRoles(res.data);
    };
    load();
  }, [currentOrg]);

  const updateRole = async (id, field, value) => {
    const trimmed = value.trim();
    if (!trimmed) {
      showToast(`${field === 'code' ? 'Code' : 'Name'} is required`, 'error');
      return;
    }
    await api.patch(`/roles/${id}`, { [field]: trimmed });
    setRoles(roles.map(r => (r.id === id ? { ...r, [field]: trimmed } : r)));
    showToast('Role updated', 'success');
  };

  const deleteRole = async (id) => {
    const role = roles.find(r => r.id === id);
    if (role?.system) return;
    if (!window.confirm('Delete this role?')) return;
    await api.delete(`/roles/${id}`);
    setRoles(roles.filter(r => r.id !== id));
    showToast('Role deleted', 'success');
  };

  const createRole = async (e) => {
    if (e) e.preventDefault();
    if (!currentOrg) return;
    const code = newCode.trim();
    const name = newName.trim();
    if (!code || !name) {
      showToast('Code and name are required', 'error');
      return;
    }
    const res = await api.post('/roles', { code, name, orgId: currentOrg });
    setRoles([...roles, { id: res.data.id, code, name, system: false }]);
    setNewCode('');
    setNewName('');
    showToast('Role created', 'success');
  };

  const columns = useMemo(() => [
    { Header: 'ID', accessor: 'id' },
    {
      Header: 'Code',
      accessor: 'code',
      Cell: ({ row }) => (
        <TextField
          size="small"
          placeholder="Code"
          value={row.original.code}
          onChange={e => updateRole(row.original.id, 'code', e.target.value)}
        />
      )
    },
    {
      Header: 'Name',
      accessor: 'name',
      Cell: ({ row }) => (
        <TextField
          size="small"
          placeholder="Name"
          value={row.original.name}
          onChange={e => updateRole(row.original.id, 'name', e.target.value)}
        />
      )
    },
    {
      Header: 'Actions',
      accessor: 'actions',
      Cell: ({ row }) => (
        <IconButton color="error" disabled={row.original.system} onClick={() => deleteRole(row.original.id)}>
          <DeleteIcon />
        </IconButton>
      )
    }
  ], [roles]);

  const table = useTable({ columns, data: roles });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = table;

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Manage Roles</Typography>
      <Box sx={styles.actionRow}>
        <Box component="form" onSubmit={createRole}>
          <TextField
            label="Code"
            placeholder="Code"
            size="small"
            value={newCode}
            onChange={e => setNewCode(e.target.value)}
          />
          <TextField
            label="Name"
            placeholder="Name"
            size="small"
            sx={styles.ml1}
            value={newName}
            onChange={e => setNewName(e.target.value)}
          />
          <Button sx={styles.ml1} type="submit" variant="contained">Add</Button>
        </Box>
      </Box>
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
  );
}
