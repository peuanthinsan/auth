import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: `'Inter', sans-serif`,
    h1: { fontSize: '2rem', fontWeight: 500 },
    h2: { fontSize: '1.5rem', fontWeight: 500 },
    h3: { fontSize: '1.25rem', fontWeight: 500 },
    h4: { fontSize: '1.125rem', fontWeight: 500 },
    body1: { fontSize: '1rem' }
  },
  palette: {
    text: {
      primary: '#333'
    }
  },
  spacing: 8
});

export default theme;
