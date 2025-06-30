import React, { useEffect, useState, useMemo } from 'react';
import { Box, Typography, TextField, IconButton, Button } from '@mui/material';
import { styles } from '../styles';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTable } from 'react-table';
import api from '../api';

export default function ManageRoles() {
  const [roles, setRoles] = useState([]);
  const [newCode, setNewCode] = useState('');
  const [newName, setNewName] = useState('');

  useEffect(() => {
    const load = async () => {
      const res = await api.get('/roles');
      setRoles(res.data);
    };
    load();
  }, []);

  const updateRole = async (id, field, value) => {
    await api.patch(`/roles/${id}`, { [field]: value });
    setRoles(roles.map(r => (r.id === id ? { ...r, [field]: value } : r)));
  };

  const deleteRole = async (id) => {
    await api.delete(`/roles/${id}`);
    setRoles(roles.filter(r => r.id !== id));
  };

  const createRole = async () => {
    const res = await api.post('/roles', { code: newCode, name: newName });
    setRoles([...roles, { id: res.data.id, code: newCode, name: newName }]);
    setNewCode('');
    setNewName('');
  };

  const columns = useMemo(() => [
    { Header: 'ID', accessor: 'id' },
    {
      Header: 'Code',
      accessor: 'code',
      Cell: ({ row }) => (
        <TextField
          size="small"
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
          value={row.original.name}
          onChange={e => updateRole(row.original.id, 'name', e.target.value)}
        />
      )
    },
    {
      Header: 'Actions',
      accessor: 'actions',
      Cell: ({ row }) => (
        <IconButton color="error" onClick={() => deleteRole(row.original.id)}>
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
        <TextField label="Code" size="small" value={newCode} onChange={e => setNewCode(e.target.value)} />
        <TextField label="Name" size="small" sx={styles.ml1} value={newName} onChange={e => setNewName(e.target.value)} />
        <Button sx={styles.ml1} variant="contained" onClick={createRole}>Add</Button>
      </Box>
    </Box>
  );
}
