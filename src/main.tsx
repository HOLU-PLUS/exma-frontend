
import ReactDOM from 'react-dom/client';
import { App } from './App';

import './styles.css';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import { createPalette } from './utils/createPalette';
// import React from 'react';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1440
    }
  },
  palette: createPalette(),
  typography: {
    fontFamily: 'poppins',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '10px', // Establece el radio de los bordes para todos los botones
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
  // </React.StrictMode>
)