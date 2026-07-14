import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import ClickSpark from '@/components/reactbits/ClickSpark/ClickSpark';
import '@/styles/App.less';

const Home = lazy(() => import('@/pages/Home'));
const Notes = lazy(() => import('@/pages/Notes'));
const About = lazy(() => import('@/pages/About'));

const routeFallback = (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '40vh',
    }}
  >
    <CircularProgress size={32} sx={{ color: '#b09472' }} />
  </Box>
);

const App: React.FC = () => {
  return (
    <ClickSpark
      sparkColor="#b09472"
      sparkSize={9}
      sparkRadius={18}
      sparkCount={9}
      duration={500}
      easing="ease-out"
      extraScale={1.0}
    >
      <Box className="app">
        <Navbar />
        <Box component="main" className="main-content">
          <PageTransition>
            <Suspense fallback={routeFallback}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/notes" element={<Notes />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </Suspense>
          </PageTransition>
        </Box>
        <Footer />
      </Box>
    </ClickSpark>
  );
};

export default App;
