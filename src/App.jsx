import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainPage from './pages/MainPage';
import DetailPage from './pages/DetailPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        {/* Main Content Area */}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/restaurant/:id" element={<DetailPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>

        {/* Footer */}
        <footer className="py-6 border-t border-border-light bg-white text-center text-xs text-neutral-light font-light mt-auto">
          <div className="container mx-auto px-4">
            <p>© {new Date().getFullYear()} Restaurants Directory. Technical Test for Front End Developer.</p>
            <p className="mt-1">Built with React, Vite, and Tailwind CSS.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
