import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
import HomePage from './pages/HomePage';
import TeacherTribute from './pages/TeacherTribute';
import UploadPage from './pages/UploadPage';
import NotFound from './pages/NotFound';

// Import Roboto font
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './App.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          { import.meta.env.VITE_LIVE_MODE === 'false' && (
            <>
              <Route path="/" element={<HomePage />} />
              <Route path="/teacher/:teacherName" element={<TeacherTribute />} />
              <Route path="/upload" element={<UploadPage />} />
            </>
          )}
          { import.meta.env.VITE_LIVE_MODE === 'true' && (
            <>
              <Route path="/" element={<NotFound />} />
              <Route path="/teacher/:teacherName" element={<TeacherTribute />} />
              <Route path="*" element={<NotFound />} />
            </>
          )}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
