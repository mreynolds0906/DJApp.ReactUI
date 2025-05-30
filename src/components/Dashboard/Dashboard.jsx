import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Profiles from '../Profile/Profiles';

const Dashboard = () => {
  const { user, userHasRole } = useContext(AuthContext);
  const [forecasts, setForecasts] = useState();

  return (
    <div>
      <h2>Artist Dashboard</h2>
      {user && <p>Welcome, {user.userName}!</p>}
      <br />
      <h1 id="tableLabel">My Profiles</h1>
      <Profiles />
    </div>
  );
};

export default Dashboard;
