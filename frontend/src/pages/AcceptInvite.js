import React, { useEffect, useState, useContext } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { AuthContext } from '../AuthContext';
import { useTable } from 'react-table';
import { styles } from '../styles';
import api from '../api';
import { ToastContext } from '../ToastContext';

export default function AcceptInvite() {
  const { refreshOrgs, loadProfile } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);
  const [invites, setInvites] = useState([]);
  const [tokens, setTokens] = useState({});

  useEffect(() => {
    const load = async () => {
      const res = await api.get('/my-invites');
      setInvites(res.data);
    };
    load();
  }, []);

  const accept = async (id) => {
    try {
      await api.post(`/invites/${id}/accept`, { token: tokens[id] });
      showToast('Invite accepted', 'success');
      setInvites(invites.filter(i => i.id !== id));
      refreshOrgs();
      loadProfile();
    } catch (err) {
      showToast(err.response?.data?.message || 'Error accepting invite', 'error');
    }
  };

  const columns = React.useMemo(() => [
    { Header: 'ID', accessor: 'id' },
    { Header: 'Organization', accessor: 'org' },
    { Header: 'Role', accessor: 'role' },
    {
      Header: 'Token',
      accessor: 'tokenInput',
      Cell: ({ row }) => (
        <TextField size="small" value={tokens[row.original.id] || ''} onChange={e => setTokens({ ...tokens, [row.original.id]: e.target.value })} />
      )
    },
    {
      Header: 'Actions',
      accessor: 'actions',
      Cell: ({ row }) => (
        <Button variant="contained" onClick={() => accept(row.original.id)}>Accept</Button>
      )
    }
  ], [tokens, invites]);

  const table = useTable({ columns, data: invites });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = table;

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Accept Invites</Typography>
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
