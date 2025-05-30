import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import AdminUsers from '../AdminDashboard/AdminUsers';

const Dashboard = () => {
  const { user, userHasRole } = useContext(AuthContext);
  const [forecasts, setForecasts] = useState();

  return (
    <div>
      <h2>Admin Dashboard</h2>
      {user && <p>Welcome, {user.userName}!</p>}
      <h1 id="tableLabel">Admin Users</h1>
      <AdminUsers />
    </div>
  );
};

export default Dashboard;
