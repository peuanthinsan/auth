import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { styles } from '../styles';
import ManageUsers from './ManageUsers';
import ManageRoles from './ManageRoles';
import ManageOrganizations from './ManageOrganizations';
import ManageInvites from './ManageInvites';

export default function Administration() {
  const [tab, setTab] = useState(0);
  return (
    <Box>
      <Tabs value={tab} onChange={(_, v) => setTab(v)}>
        <Tab label="Users" />
        <Tab label="Roles" />
        <Tab label="Organizations" />
        <Tab label="Invites" />
      </Tabs>
      <Box sx={styles.actionRow}>
        {tab === 0 && <ManageUsers />}
        {tab === 1 && <ManageRoles />}
        {tab === 2 && <ManageOrganizations />}
        {tab === 3 && <ManageInvites />}
      </Box>
    </Box>
  );
}
