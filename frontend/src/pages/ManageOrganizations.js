import React, { useEffect, useState, useMemo } from 'react';
import { Box, Typography, TextField, Button, Stack } from '@mui/material';
import { styles } from '../styles';
import { useTable } from 'react-table';
import api from '../api';

export default function ManageOrganizations() {
  const [orgs, setOrgs] = useState([]);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    const load = async () => {
      const res = await api.get('/organizations/all');
      setOrgs(res.data);
    };
    load();
  }, []);

  const updateName = async (id, name) => {
    await api.patch(`/organizations/${id}`, { name });
    setOrgs(orgs.map(o => (o.id === id ? { ...o, name } : o)));
  };

  const createOrg = async () => {
    const res = await api.post('/organizations', { name: newName });
    setOrgs([...orgs, { id: res.data.orgId, name: newName, members: 1, invites: 0 }]);
    setNewName('');
  };

  const deleteOrg = async (id) => {
    await api.delete(`/organizations/${id}`);
    setOrgs(orgs.filter(o => o.id !== id));
  };

  const columns = useMemo(() => [
    { Header: 'ID', accessor: 'id' },
    {
      Header: 'Name',
      accessor: 'name',
      Cell: ({ row }) => (
        <TextField
          size="small"
          value={row.original.name}
          onChange={e => updateName(row.original.id, e.target.value)}
        />
      )
    },
    { Header: 'Members', accessor: 'members' },
    { Header: 'Invites', accessor: 'invites' },
    {
      Header: 'Actions',
      accessor: 'actions',
      Cell: ({ row }) => (
        <Button color="error" onClick={() => deleteOrg(row.original.id)}>Delete</Button>
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
        <TextField size="small" label="name" value={newName} onChange={e => setNewName(e.target.value)} />
        <Button variant="contained" onClick={createOrg}>Create Organization</Button>
      </Stack>
    </Box>
  );
}
