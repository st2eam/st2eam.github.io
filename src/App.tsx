import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import '@/styles/App.less';

const Home = lazy(() => import('@/pages/Home'));
const Notes = lazy(() => import('@/pages/Notes'));
const About = lazy(() => import('@/pages/About'));
const Projects = lazy(() => import('@/pages/Projects'));
const NotFound = lazy(() => import('@/pages/NotFound'));

const routeFallback = (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '40vh',
    }}
  >
    <CircularProgress size={32} sx={{ color: '#9b7952' }} />
  </Box>
);

const App: React.FC = () => {
  return (
    <Box className="app">
      <Navbar />
      <Box component="main" className="main-content">
        <PageTransition>
          <Suspense fallback={routeFallback}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/notes" element={<Notes />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </PageTransition>
      </Box>
      <Footer />
    </Box>
  );
};

export default App;
