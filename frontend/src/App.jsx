import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import CommunityPage from './pages/CommunityPage';
import FindSupportPage from './pages/FindSupportPage';
import GamesPage from './pages/GamesPage';
import AuthPage from './pages/AuthPage';
import JournalPage from './pages/JournalPage';
import SettingsPage from './pages/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/ProtectedRoute';
import AiCompanionPage from './pages/AiCompanionPage';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 w-full relative">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="community" element={<CommunityPage />} />
          <Route path="find-support" element={<FindSupportPage />} />
          <Route path="games" element={<GamesPage />} />
          <Route path="login" element={<AuthPage />} />
          <Route path="journal" element={<ProtectedRoute><JournalPage /></ProtectedRoute>} />
          <Route path="ai-companion" element={<ProtectedRoute><AiCompanionPage /></ProtectedRoute>} />
          <Route path="settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
