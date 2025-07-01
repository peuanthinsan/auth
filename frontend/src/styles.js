export const drawerWidth = 240;

export const styles = {
  root: {
    gridTemplateColumns: `${drawerWidth}px 1fr`,
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
  content: { flexGrow: 1, p: 3 },
  formStack: { maxWidth: 300 },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    '& th, & td': {
      textAlign: 'left',
      padding: '6px'
    },
    '& th': { borderBottom: '1px solid', borderColor: 'divider' }
  },
  actionRow: { mt: 2 },
  ml1: { ml: 1 },
  mb2: { mb: 2 },
  mt2: { mt: 2 }
};
