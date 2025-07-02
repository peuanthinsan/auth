import { createTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

export const fonts = {
  body: `'Inter', sans-serif`,
  heading: `'Inter', sans-serif`
};

const theme = createTheme({
  typography: {
    fontFamily: fonts.body,
    h1: { fontFamily: fonts.heading, fontSize: '2rem', fontWeight: 700 },
    h2: { fontFamily: fonts.heading, fontSize: '1.5rem', fontWeight: 700 },
    h3: { fontFamily: fonts.heading, fontSize: '1.25rem', fontWeight: 700 },
    h4: { fontFamily: fonts.heading, fontSize: '1.125rem', fontWeight: 700 },
    h5: { fontFamily: fonts.heading, fontSize: '1rem', fontWeight: 700 },
    h6: { fontFamily: fonts.heading, fontSize: '0.875rem', fontWeight: 700 },
    subtitle1: { fontFamily: fonts.body, fontSize: '1rem' },
    subtitle2: { fontFamily: fonts.body, fontSize: '0.875rem' },
    body1: { fontFamily: fonts.body, fontSize: '1rem' },
    body2: { fontFamily: fonts.body, fontSize: '0.875rem' },
    button: { fontFamily: fonts.body, textTransform: 'none' },
    caption: { fontFamily: fonts.body, fontSize: '0.75rem' },
    overline: { fontFamily: fonts.body, fontSize: '0.75rem', textTransform: 'uppercase' }
  },
  palette: {
    primary: { main: '#4285F4' },
    secondary: { main: '#34A853' },
    error: { main: '#EA4335' },
    warning: { main: '#FBBC05' },
    info: { main: '#2196F3' },
    success: { main: '#4CAF50' },
    text: {
      primary: '#333',
      secondary: '#666'
    },
    background: {
      default: '#fafafa',
      paper: '#fff'
    }
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        input: {
          '::placeholder': {
            color: grey[500],
            opacity: 1
          }
        }
      }
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          '&:last-child': {
            paddingBottom: '16px'
          }
        }
      }
    }
  },
  spacing: 8
});

export default theme;
