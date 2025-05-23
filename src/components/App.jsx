import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import Login from './Auth/Login';
import Dashboard from '../components/Dashboard';
import Profile from '../components/Profile';
import Navigation from '../components/Navigation';
import PrivateRoute from '../components/PrivateRoute';
import ResetPassword from './Auth/ResetPassword';

const App = () => {
  return (
    <AuthProvider>
      <Router>
      <Navigation />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/" element={<PrivateRoute />} >
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
