import React, { useEffect, useState, useMemo, useContext } from 'react';
import { Box, Typography, TextField, IconButton, Button } from '@mui/material';
import { styles } from '../styles';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTable } from 'react-table';
import { useDispatch, useSelector } from 'react-redux';
import { loadRoles, createRole, updateRole as updateRoleAction, deleteRole } from '../actions';
import { AuthContext } from '../AuthContext';
import { ToastContext } from '../ToastContext';

export default function ManageRoles() {
  const { currentOrg } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);
  const dispatch = useDispatch();
  const roles = useSelector(state => state.roles);
  const [newCode, setNewCode] = useState('');
  const [newName, setNewName] = useState('');

  useEffect(() => {
    dispatch(loadRoles(currentOrg));
  }, [currentOrg, dispatch]);

  const updateRoleField = async (id, field, value) => {
    const trimmed = value.trim();
    if (!trimmed) {
      showToast(`${field === 'code' ? 'Code' : 'Name'} is required`, 'error');
      return;
    }
    dispatch(updateRoleAction(id, { [field]: trimmed }));
    showToast('Role updated', 'success');
  };

  const deleteRoleHandler = async (id) => {
    const role = roles.find(r => r.id === id);
    if (role?.system) return;
    if (!window.confirm('Delete this role?')) return;
    await dispatch(deleteRole(id));
    showToast('Role deleted', 'success');
  };

  const createRole = async (e) => {
    if (e) e.preventDefault();
    if (!currentOrg) return;
    const code = newCode.trim();
    const name = newName.trim();
    if (!code || !name) {
      showToast('Code and name are required', 'error');
      return;
    }
    dispatch(createRole(code, name, currentOrg));
    setNewCode('');
    setNewName('');
    showToast('Role created', 'success');
  };

  const CodeCell = ({ row }) => {
    const [value, setValue] = useState(row.original.code);
    const save = () => updateRoleField(row.original.id, 'code', value);
    const onKeyDown = (e) => { if (e.key === 'Enter') e.target.blur(); };
    return (
      <TextField
        size="small"
        placeholder="Code"
        value={value}
        onChange={e => setValue(e.target.value)}
        onBlur={save}
        onKeyDown={onKeyDown}
      />
    );
  };

  const NameCell = ({ row }) => {
    const [value, setValue] = useState(row.original.name);
    const save = () => updateRoleField(row.original.id, 'name', value);
    const onKeyDown = (e) => { if (e.key === 'Enter') e.target.blur(); };
    return (
      <TextField
        size="small"
        placeholder="Name"
        value={value}
        onChange={e => setValue(e.target.value)}
        onBlur={save}
        onKeyDown={onKeyDown}
      />
    );
  };

  const columns = useMemo(() => [
    {
      Header: 'Name',
      accessor: 'name',
      Cell: NameCell
    },
    {
      Header: 'Code',
      accessor: 'code',
      Cell: CodeCell
    },
    {
      Header: 'Actions',
      accessor: 'actions',
      Cell: ({ row }) => (
        <IconButton color="error" disabled={row.original.system} onClick={() => deleteRoleHandler(row.original.id)}>
          <DeleteIcon />
        </IconButton>
      )
    }
  ], [roles]);

  const table = useTable({ columns, data: roles });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = table;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      <Typography variant="h6" gutterBottom>Manage Roles</Typography>
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
        <Box component="form" onSubmit={createRole}>
          <TextField
            label="Code"
            placeholder="Code"
            size="small"
            value={newCode}
            onChange={e => setNewCode(e.target.value)}
          />
          <TextField
            label="Name"
            placeholder="Name"
            size="small"
            sx={styles.ml1}
            value={newName}
            onChange={e => setNewName(e.target.value)}
          />
          <Button sx={styles.ml1} type="submit" variant="contained">Add</Button>
        </Box>
      </Box>
    </Box>
  );
}
