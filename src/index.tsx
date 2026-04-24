import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';
import '@/styles/global.less';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1a1a2e',
      light: '#3a3a50',
      dark: '#0e0e1a',
    },
    secondary: {
      main: '#b09472',
      light: '#c8ae8e',
      dark: '#8a7458',
    },
    background: {
      default: '#f8f6f2',
      paper: '#ffffff',
    },
    text: {
      primary: '#1a1a1a',
      secondary: '#6e6e73',
    },
  },
  typography: {
    fontFamily: '"DM Sans", "PingFang SC", "Microsoft YaHei", sans-serif',
    h1: {
      fontFamily: '"Playfair Display", Georgia, serif',
      fontWeight: 600,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontFamily: '"Playfair Display", Georgia, serif',
      fontWeight: 600,
      letterSpacing: '-0.02em',
    },
    h3: {
      fontFamily: '"Playfair Display", Georgia, serif',
      fontWeight: 500,
      letterSpacing: '-0.01em',
    },
    h4: { fontFamily: '"DM Sans", sans-serif', fontWeight: 600 },
    h5: { fontFamily: '"DM Sans", sans-serif', fontWeight: 600 },
    h6: { fontFamily: '"DM Sans", sans-serif', fontWeight: 500 },
    body1: { lineHeight: 1.7 },
    body2: { lineHeight: 1.65 },
  },
  shape: {
    borderRadius: 16,
  },
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
