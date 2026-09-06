import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import UploadPage from './components/UploadPage';
import EvidencePage from './components/EvidencePage';
import DashboardPage from './components/DashboardPage';
import IntroAnimation from './components/IntroAnimation';

function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {showIntro && (
        <IntroAnimation onComplete={() => setShowIntro(false)} />
      )}
      
      {!showIntro && (
        <div className="min-h-screen fade-in-app">
          <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/upload" element={<UploadPage />} />
              <Route path="/evidence" element={<EvidencePage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
            </Routes>
          </Router>
        </div>
      )}
    </>
  );
}

export default App;
