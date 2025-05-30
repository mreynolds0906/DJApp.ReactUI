import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Weather = () => {
  const { apiBearerToken } = useContext(AuthContext);
  const [forecasts, setForecasts] = useState();

  useEffect(() => {
    populateWeatherData();
  }, []);

  const forecastContents = forecasts === undefined
    ? <p><em>Loading...</em></p>
    : <table className="table table-striped" aria-labelledby="tableLabel">
      <thead>
        <tr>
          <th>Date</th>
          <th>Temp. (C)</th>
          <th>Temp. (F)</th>
          <th>Summary</th>
        </tr>
      </thead>
      <tbody>
        {forecasts.map(forecast =>
          <tr key={forecast.date}>
            <td>{forecast.date}</td>
            <td>{forecast.temperatureC}</td>
            <td>{forecast.temperatureF}</td>
            <td>{forecast.summary}</td>
          </tr>
        )}
      </tbody>
    </table>;

  return (
    <div>
      {forecastContents}
    </div>
  );

  async function populateWeatherData() {
    const response = await fetch('weatherforecast', {
      headers: {
        'Authorization': `Bearer ${apiBearerToken}`
      }
    });
    if (response.ok) {
      const data = await response.json();
      setForecasts(data);
    }
  }
};

export default Weather;
