import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import ClickSpark from '@/components/reactbits/ClickSpark/ClickSpark';
import Home from '@/pages/Home';
import Notes from '@/pages/Notes';
import About from '@/pages/About';
import '@/styles/App.less';

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
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/notes" element={<Notes />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </PageTransition>
        </Box>
        <Footer />
      </Box>
    </ClickSpark>
  );
};

export default App;
