import React, { useEffect, useState, useMemo, useContext } from 'react';
import { Box, Typography, TextField, IconButton, Button, Stack } from '@mui/material';
import { styles } from '../styles';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTable } from 'react-table';
import api from '../api';
import { ToastContext } from '../ToastContext';
import { ApiContext } from '../ApiContext';

export default function ManageRoles() {
  const { showToast } = useContext(ToastContext);
  const { roles, refreshRoles } = useContext(ApiContext);
  const [newCode, setNewCode] = useState('');
  const [newName, setNewName] = useState('');

  useEffect(() => {
    refreshRoles();
  }, [refreshRoles]);

  const updateRole = async (id, field, value) => {
    const trimmed = value.trim();
    if (!trimmed) {
      showToast(`${field === 'code' ? 'Code' : 'Name'} is required`, 'error');
      return;
    }
    await api.patch(`/roles/${id}`, { [field]: trimmed });
    await refreshRoles();
    showToast('Role updated', 'success');
  };

  const deleteRole = async (id) => {
    const role = roles.find(r => r.id === id);
    if (role?.system) return;
    if (!window.confirm('Delete this role?')) return;
    await api.delete(`/roles/${id}`);
    await refreshRoles();
    showToast('Role deleted', 'success');
  };

  const createRole = async (e) => {
    if (e) e.preventDefault();
    const code = newCode.trim();
    const name = newName.trim();
    if (!code || !name) {
      showToast('Code and name are required', 'error');
      return;
    }
    await api.post('/roles', { code, name });
    await refreshRoles();
    setNewCode('');
    setNewName('');
    showToast('Role created', 'success');
  };

  const CodeCell = ({ row }) => {
    const [value, setValue] = useState(row.original.code);
    const save = () => updateRole(row.original.id, 'code', value);
    const onKeyDown = (e) => { if (e.key === 'Enter') save(); };
    return (
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
        <TextField
          size="small"
          placeholder="Code"
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={onKeyDown}
        />
        <Button size="small" variant="contained" onClick={save}>Change</Button>
      </Stack>
    );
  };

  const NameCell = ({ row }) => {
    const [value, setValue] = useState(row.original.name);
    const save = () => updateRole(row.original.id, 'name', value);
    const onKeyDown = (e) => { if (e.key === 'Enter') save(); };
    return (
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
        <TextField
          size="small"
          placeholder="Name"
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={onKeyDown}
        />
        <Button size="small" variant="contained" onClick={save}>Change</Button>
      </Stack>
    );
  };

  const columns = useMemo(() => [
    {
      Header: 'Name',
      accessor: 'name',
      Cell: NameCell
    },
    {
      Header: 'Code',
      accessor: 'code',
      Cell: CodeCell
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
        <Stack component="form" onSubmit={createRole} direction={{ xs: 'column', sm: 'row' }} spacing={1}>
          <TextField
            label="Name"
            placeholder="Name"
            size="small"
            value={newName}
            onChange={e => setNewName(e.target.value)}
          />
          <TextField
            label="Code"
            placeholder="Code"
            size="small"
            value={newCode}
            onChange={e => setNewCode(e.target.value)}
          />
          <Button type="submit" variant="contained">Add</Button>
        </Stack>
      </Box>
    </Box>
  );
}
