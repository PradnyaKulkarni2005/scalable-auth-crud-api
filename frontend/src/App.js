import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import { healthCheck } from './api/apiClient';
import './App.css';

function AppContent() {
  const { token, loading } = useAuth();
  const [apiStatus, setApiStatus] = useState(null);

  useEffect(() => {
    const checkAPI = async () => {
      try {
        const response = await healthCheck();
        setApiStatus(response.data.success);
      } catch (error) {
        setApiStatus(false);
      }
    };

    checkAPI();
  }, []);

  if (loading) {
    return <div className="loading-container">Loading...</div>;
  }

  if (apiStatus === false) {
    return (
      <div className="error-container">
        <h1>Connection Error</h1>
        <p>Could not connect to the API server. Please ensure the backend is running on port 5000.</p>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={token ? <Navigate to="/dashboard" /> : <AuthPage />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
