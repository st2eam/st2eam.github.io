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
      main: '#31463b',
      light: '#536b5e',
      dark: '#1d2d25',
    },
    secondary: {
      main: '#9b7952',
      light: '#c0a47d',
      dark: '#6d5135',
    },
    background: {
      default: '#f2efe7',
      paper: '#fffdf8',
    },
    text: {
      primary: '#1d1c18',
      secondary: '#625f57',
    },
  },
  typography: {
    fontFamily: '"DM Sans", "PingFang SC", "Microsoft YaHei", sans-serif',
    h1: {
      fontFamily: '"Songti SC", "STSong", "Noto Serif CJK SC", SimSun, serif',
      fontWeight: 600,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontFamily: '"Songti SC", "STSong", "Noto Serif CJK SC", SimSun, serif',
      fontWeight: 600,
      letterSpacing: '-0.02em',
    },
    h3: {
      fontFamily: '"Songti SC", "STSong", "Noto Serif CJK SC", SimSun, serif',
      fontWeight: 500,
      letterSpacing: '-0.01em',
    },
    h4: { fontFamily: '"Songti SC", "STSong", serif', fontWeight: 600 },
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
