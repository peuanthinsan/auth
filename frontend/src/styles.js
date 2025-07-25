export const drawerWidth = 240;

export const styles = {
  root: {
    display: 'flex',
    minHeight: '100vh',
    fontFamily: (theme) => theme.typography.fontFamily
  },
  appBar: {
    zIndex: (theme) => theme.zIndex.drawer + 1,
    background: (theme) =>
      `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: drawerWidth,
      boxSizing: 'border-box',
      backgroundColor: (theme) => theme.palette.background.paper
    }
  },
  content: {
    flexGrow: 1,
    p: { xs: 1, sm: 2, md: 3, lg: 4, xl: 6 },
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    maxWidth: { xs: '100vw', sm: `calc(100vw - ${drawerWidth}px)` }
  },
  tableContainer: {
    flexGrow: 1,
    overflowY: 'auto',
    overflowX: 'auto',
    mt: 2,
    mb: '72px',
    height: '100%',
    width: '100%',
    border: '1px solid',
    borderColor: 'divider',
    borderRadius: 1,
    backgroundColor: 'background.paper',
    boxShadow: 1
  },
  formStack: {
    maxWidth: 600,
    width: '100%',
    mx: 'auto'
  },
  table: {
    width: '100%',
    height: '100%',
    borderCollapse: 'collapse',
    border: '1px solid',
    borderColor: 'divider',
    '& th, & td': {
      textAlign: 'left',
      padding: '8px',
      borderBottom: '1px solid',
      borderColor: 'divider'
    },
    '& thead th': {
      backgroundColor: 'grey.100',
      borderBottomWidth: '2px'
    },
    '& tbody tr:nth-of-type(odd)': {
      backgroundColor: 'grey.50'
    },
    '& tbody tr:hover': {
      backgroundColor: 'action.hover'
    },
    '& th:first-of-type, & td:first-of-type': {
      position: 'sticky',
      left: 0,
      backgroundColor: 'background.paper',
      zIndex: 1
    }
  },
  actionRow: {
    position: 'fixed',
    bottom: 0,
    left: { xs: 0, sm: drawerWidth },
    right: 0,
    p: 2,
    backgroundColor: 'background.paper',
    borderTop: '1px solid',
    borderColor: 'divider',
    zIndex: 1
  },
  adminContent: { mt: 2 },
  ml1: { ml: 1 },
  mb2: { mb: 2 },
  mt2: { mt: 2 },
  swaggerPost: {
    border: '1px solid #e8e8e8',
    borderLeft: '5px solid #61affe',
    borderRadius: 2,
    backgroundColor: '#f7f7f7',
    p: 2
  },
  swaggerComment: {
    mt: 1,
    ml: 2,
    p: 1,
    borderRadius: 1,
    backgroundColor: '#fff',
    border: '1px solid #e8e8e8',
    borderLeft: '5px solid #49cc90'
  }
};
