import React, { useEffect, useState, useMemo, useContext } from 'react';
import { Box, Typography, TextField, Button, Stack, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { styles } from '../styles';
import { useTable } from 'react-table';
import api from '../api';
import { AuthContext } from '../AuthContext';

export default function ManageOrganizations() {
  const { refreshOrgs } = useContext(AuthContext);
  const [orgs, setOrgs] = useState([]);
  const [newName, setNewName] = useState('');

  const loadOrgs = async () => {
    const res = await api.get('/organizations');
    setOrgs(res.data);
  };

  useEffect(() => {
    loadOrgs();
  }, []);

  const updateName = async (id, name) => {
    await api.patch(`/organizations/${id}`, { name });
    setOrgs(orgs.map(o => (o.id === id ? { ...o, name } : o)));
    refreshOrgs();
  };

  const createOrg = async () => {
    await api.post('/organizations', { name: newName });
    setNewName('');
    loadOrgs();
    refreshOrgs();
  };

  const deleteOrg = async (id) => {
    await api.delete(`/organizations/${id}`);
    loadOrgs();
    refreshOrgs();
  };

  const NameCell = ({ row }) => {
    const [value, setValue] = useState(row.original.name);
    const save = () => updateName(row.original.id, value);
    return (
      <Stack direction="row" spacing={1}>
        <TextField
          size="small"
          placeholder="Name"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
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
    { Header: 'Members', accessor: 'members' },
    { Header: 'Invites', accessor: 'invites' },
    {
      Header: 'Actions',
      accessor: 'actions',
      Cell: ({ row }) => (
        <IconButton color="error" onClick={() => deleteOrg(row.original.id)}>
          <DeleteIcon />
        </IconButton>
      )
    }
  ], [orgs]);

  const table = useTable({ columns, data: orgs });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = table;

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Manage Organizations</Typography>
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
      <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
        <TextField
          size="small"
          label="Name"
          placeholder="Name"
          value={newName}
          onChange={e => setNewName(e.target.value)}
        />
        <Button variant="contained" onClick={createOrg}>Create Organization</Button>
      </Stack>
    </Box>
  );
}
