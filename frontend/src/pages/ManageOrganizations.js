import React, { useEffect, useState, useMemo, useContext } from 'react';
import { Box, Typography, TextField, Button, Stack, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { styles } from '../styles';
import { useTable } from 'react-table';
import api from '../api';
import { AuthContext } from '../AuthContext';
import { ToastContext } from '../ToastContext';

export default function ManageOrganizations() {
  const { refreshOrgs, setCurrentOrg } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);
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
    const trimmed = name.trim();
    if (!trimmed) {
      showToast('Name is required', 'error');
      return;
    }
    await api.patch(`/organizations/${id}`, { name: trimmed });
    setOrgs(orgs.map(o => (o.id === id ? { ...o, name: trimmed } : o)));
    refreshOrgs();
    showToast('Organization updated', 'success');
  };

  const createOrg = async (e) => {
    if (e) e.preventDefault();
    const trimmed = newName.trim();
    if (!trimmed) {
      showToast('Name is required', 'error');
      return;
    }
    await api.post('/organizations', { name: trimmed });
    setNewName('');
    loadOrgs();
    refreshOrgs();
    showToast('Organization created', 'success');
  };

  const deleteOrg = async (id) => {
    if (!window.confirm('Delete this organization?')) return;
    await api.delete(`/organizations/${id}`);
    loadOrgs();
    refreshOrgs();
    setCurrentOrg('');
    showToast('Organization deleted', 'success');
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
    <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      <Typography variant="h6" gutterBottom>Manage Organizations</Typography>
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
        <Box component="form" onSubmit={createOrg}>
          <Stack direction="row" spacing={1}>
            <TextField
              size="small"
              label="Name"
              placeholder="Name"
              value={newName}
              onChange={e => setNewName(e.target.value)}
            />
            <Button type="submit" variant="contained">Create Organization</Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
