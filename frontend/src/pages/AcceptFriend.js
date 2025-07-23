import React, { useEffect, useContext, useMemo } from 'react';
import { Box, Button } from '@mui/material';
import { useTable } from 'react-table';
import { ApiContext } from '../ApiContext';
import { ToastContext } from '../ToastContext';
import { styles } from '../styles';

export default function AcceptFriend() {
  const { friendRequests, refreshFriendRequests, acceptFriendRequest } = useContext(ApiContext);
  const { showToast } = useContext(ToastContext);

  useEffect(() => {
    refreshFriendRequests();
  }, [refreshFriendRequests]);

  const accept = async (id) => {
    try {
      await acceptFriendRequest(id);
      showToast('Friend added', 'success');
    } catch (err) {
      showToast(err.response?.data?.message || 'Error accepting request', 'error');
    }
  };

  const columns = useMemo(() => [
    { Header: 'Username', accessor: 'from.username' },
    { Header: 'Email', accessor: 'from.email' },
    {
      Header: 'Actions',
      accessor: 'actions',
      Cell: ({ row }) => (
        <Button variant="contained" onClick={() => accept(row.original.id)}>Accept</Button>
      )
    }
  ], [friendRequests]);

  const table = useTable({ columns, data: friendRequests });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = table;

  return (
    <Box>
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
    </Box>
  );
}
