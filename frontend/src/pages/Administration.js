import React, { useState, useContext } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { styles } from '../styles';
import ManageUsers from './ManageUsers';
import ManageRoles from './ManageRoles';
import ManageOrganizations from './ManageOrganizations';
import ManageInvites from './ManageInvites';
import { AuthContext } from '../AuthContext';

export default function Administration() {
  const { profile, currentOrg } = useContext(AuthContext);
  const [tab, setTab] = useState(0);
  const showOrgs = profile?.isSuperAdmin;
  const isAdmin = profile?.isSuperAdmin || profile?.roles?.includes('ADMIN');
  if (!isAdmin) return <Box>Not authorized</Box>;
  return (
    <Box>
      <Tabs value={tab} onChange={(_, v) => setTab(v)}>
        <Tab label="Users" />
        {currentOrg && <Tab label="Roles" />}
        {showOrgs && <Tab label="Organizations" />}
        {currentOrg && <Tab label="Invites" />}
      </Tabs>
      <Box sx={styles.actionRow}>
        {tab === 0 && <ManageUsers />}
        {currentOrg && tab === 1 && <ManageRoles />}
        {showOrgs && ((currentOrg ? tab === 2 : tab === 1)) && <ManageOrganizations />}
        {currentOrg && ((showOrgs ? tab === 3 : tab === 2)) && <ManageInvites />}
      </Box>
    </Box>
  );
}
