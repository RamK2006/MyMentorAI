import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import useAuth from './hooks/useAuth';
import Loader from './components/common/Loader';

function App() {
  const { auth, loading } = useAuth();

  if (loading) {
    return <Loader fullScreen={true} />;
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen font-sans">
      <Routes>
        <Route path="/login" element={!auth.token ? <LoginPage /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={auth.token ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;