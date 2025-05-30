import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import AdminUsers from '../AdminDashboard/AdminUsers';
import SendRegistrationLink from '../Auth/SendRegistrationLink';

const Dashboard = () => {
  const { user, userHasRole } = useContext(AuthContext);

  const handleRegistrationLinkSent = (email) => {
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      {user && <p>Welcome, {user.userName}!</p>}
      <h1 id="tableLabel">Admin Users</h1>
      <AdminUsers /> 
      {userHasRole('Admin') ? (
                    <SendRegistrationLink onRegistrationLinkSent={handleRegistrationLinkSent} />
                  ) : null}
    </div>
  );
};

export default Dashboard;