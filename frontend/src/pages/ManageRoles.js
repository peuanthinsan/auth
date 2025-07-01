import React, { useEffect, useState, useMemo, useContext } from 'react';
import { Box, Typography, TextField, IconButton, Button, Stack } from '@mui/material';
import { styles } from '../styles';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTable } from 'react-table';
import api from '../api';
import { AuthContext } from '../AuthContext';

export default function ManageRoles() {
  const { currentOrg } = useContext(AuthContext);
  const [roles, setRoles] = useState([]);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    const load = async () => {
      if (!currentOrg) { setRoles([]); return; }
      const res = await api.get('/roles', { params: { orgId: currentOrg } });
      setRoles(res.data);
    };
    load();
  }, [currentOrg]);

  const updateRole = async (id, name) => {
    await api.patch(`/roles/${id}`, { name });
    setRoles(roles.map(r => (r.id === id ? { ...r, name } : r)));
  };

  const deleteRole = async (id) => {
    const role = roles.find(r => r.id === id);
    if (role?.system) return;
    await api.delete(`/roles/${id}`);
    setRoles(roles.filter(r => r.id !== id));
  };

  const createRole = async () => {
    if (!currentOrg || !newName) return;
    const code = newName.toUpperCase().replace(/\s+/g, '_');
    const res = await api.post('/roles', { code, name: newName, orgId: currentOrg });
    setRoles([...roles, { id: res.data.id, name: newName, code, system: false }]);
    setNewName('');
  };

  const NameCell = ({ row }) => {
    const [value, setValue] = useState(row.original.name);
    const save = () => updateRole(row.original.id, value);
    return (
      <Stack direction="row" spacing={1}>
        <TextField size="small" value={value} onChange={e => setValue(e.target.value)} />
        <Button size="small" variant="contained" onClick={save}>Change</Button>
      </Stack>
    );
  };

  const columns = useMemo(() => [
    { Header: 'ID', accessor: 'id' },
    {
      Header: 'Name',
      accessor: 'name',
      Cell: NameCell
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
        <TextField
          label="Name"
          placeholder="Name"
          size="small"
          sx={styles.ml1}
          value={newName}
          onChange={e => setNewName(e.target.value)}
        />
        <Button sx={styles.ml1} variant="contained" onClick={createRole}>Add</Button>
      </Box>
    </Box>
  );
}
