import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Navbar from '@/components/Navbar/Navbar';
import Home from '@/pages/Home/Home';
import Notes from '@/pages/Notes/Notes';
import About from '@/pages/About/About';
import '@/styles/App.less';

const App: React.FC = () => {
  return (
    <Box className="app">
      <Navbar />
      <Box component="main" className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default App;
