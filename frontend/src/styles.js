export const drawerWidth = 240;

export const styles = {
  root: {
    display: 'flex',
    minHeight: '100vh'
  },
  appBar: {
    zIndex: (theme) => theme.zIndex.drawer + 1,
    background: 'linear-gradient(90deg, #4285F4 0%, #34A853 100%)'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: drawerWidth,
      boxSizing: 'border-box',
      backgroundColor: '#f7f7f7'
    }
  },
  content: {
    flexGrow: 1,
    p: 3,
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  tableContainer: {
    flexGrow: 1,
    overflowY: 'auto',
    overflowX: 'auto',
    mt: 2
  },
  formStack: { maxWidth: 300 },
  table: {
    width: 'max-content',
    minWidth: '100%',
    borderCollapse: 'collapse',
    '& th, & td': {
      textAlign: 'left',
      padding: '8px'
    },
    '& th': { borderBottom: '1px solid', borderColor: 'divider' },
    '& th:first-of-type, & td:first-of-type': {
      position: 'sticky',
      left: 0,
      backgroundColor: 'background.paper',
      zIndex: 1
    }
  },
  actionRow: { mt: 2 },
  ml1: { ml: 1 },
  mb2: { mb: 2 },
  mt2: { mt: 2 }
};
