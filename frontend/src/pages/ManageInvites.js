import React, { useEffect, useState, useMemo } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { styles } from '../styles';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTable } from 'react-table';
import api from '../api';

export default function ManageInvites() {
  const [invites, setInvites] = useState([]);

  useEffect(() => {
    const load = async () => {
      const res = await api.get('/invites');
      setInvites(res.data);
    };
    load();
  }, []);

  const deleteInvite = async (id) => {
    await api.delete(`/invites/${id}`);
    setInvites(invites.filter(i => i.id !== id));
  };

  const columns = useMemo(() => [
    { Header: 'Email', accessor: 'email' },
    { Header: 'Organization', accessor: 'org' },
    {
      Header: 'Actions',
      accessor: 'actions',
      Cell: ({ row }) => (
        <IconButton color="error" onClick={() => deleteInvite(row.original.id)}>
          <DeleteIcon />
        </IconButton>
      )
    }
  ], [invites]);

  const table = useTable({ columns, data: invites });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = table;

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Manage Invites</Typography>
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
