import React, { useEffect, useContext, useMemo } from 'react';
import { Box, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTable } from 'react-table';
import { ApiContext } from '../ApiContext';
import { ToastContext } from '../ToastContext';
import { styles } from '../styles';

export default function ManageFriends() {
  const { friends, refreshFriends, removeFriend } = useContext(ApiContext);
  const { showToast } = useContext(ToastContext);

  useEffect(() => {
    refreshFriends();
  }, [refreshFriends]);

  const del = async (id) => {
    if (!window.confirm('Remove this friend?')) return;
    try {
      await removeFriend(id);
      showToast('Friend removed', 'success');
    } catch (err) {
      showToast(err.response?.data?.message || 'Error removing friend', 'error');
    }
  };

  const columns = useMemo(
    () => [
      { Header: 'Username', accessor: 'username' },
      { Header: 'Email', accessor: 'email' },
      { Header: 'First Name', accessor: 'firstName' },
      { Header: 'Last Name', accessor: 'lastName' },
      {
        Header: 'Profile',
        accessor: 'profile',
        Cell: ({ row }) => (
          <Link to={`/friend/${row.original.id}`}>View</Link>
        )
      },
      {
        Header: 'Actions',
        accessor: 'actions',
        Cell: ({ row }) => (
          <IconButton color="error" onClick={() => del(row.original.id)}>
            <DeleteIcon />
          </IconButton>
        )
      }
    ],
    [friends]
  );

  const table = useTable({ columns, data: friends });
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
