import React, { useEffect, useState, useMemo } from 'react';
import { Box, Typography, TextField } from '@mui/material';
import { styles } from '../styles';
import { useTable } from 'react-table';
import api from '../api';

export default function ManageOrganizations() {
  const [orgs, setOrgs] = useState([]);

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
    { Header: 'Members', accessor: 'members' }
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
    </Box>
  );
}
