import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import Login from './Auth/Login';
import Dashboard from '../components/Dashboard/Dashboard';
import AdminDashboard from './AdminDashboard/AdminDashboard';
import Profile from '../components/Profile/Profile';
import Navigation from '../components/Navigation';
import PrivateRoute from '../components/PrivateRoute';
import ResetPassword from './Auth/ResetPassword';
import ForgotPassword from './Auth/ForgotPassword';
import RegistrationLink from './Auth/RegistrationLink';
import Registration from './Auth/Registration';

const App = () => {
  return (
    <AuthProvider>
      <Router>
      <Navigation />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/registration-link" element={<RegistrationLink />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/" element={<PrivateRoute />} >
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
