import React, { useState, useContext } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { styles } from '../styles';
import ManageUsers from './ManageUsers';
import ManageRoles from './ManageRoles';
import ManageOrganizations from './ManageOrganizations';
import ManageInvites from './ManageInvites';
import { AuthContext } from '../AuthContext';

export default function Administration() {
  const { profile, currentOrg, isAdmin } = useContext(AuthContext);
  const [tab, setTab] = useState(0);
  const showOrgs = profile?.isSuperAdmin;
  if (!isAdmin) return <Box>Not authorized</Box>;
  const tabs = [];
  if (currentOrg) tabs.push({ label: 'Users', component: <ManageUsers /> });
  if (currentOrg) tabs.push({ label: 'Roles', component: <ManageRoles /> });
  if (showOrgs) tabs.push({ label: 'Organizations', component: <ManageOrganizations /> });
  if (currentOrg) tabs.push({ label: 'Invites', component: <ManageInvites /> });

  return (
    <Box>
      <Tabs value={tab} onChange={(_, v) => setTab(v)}>
        {tabs.map(t => (
          <Tab key={t.label} label={t.label} />
        ))}
      </Tabs>
      <Box sx={styles.actionRow}>{tabs[tab]?.component}</Box>
    </Box>
  );
}
