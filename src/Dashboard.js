import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [travellerData, setTravellerData] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loadingTravellerData, setLoadingTravellerData] = useState(true);
  const [loadingAlerts, setLoadingAlerts] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch traveller data
    axios.get('https://6lovyuia4k.execute-api.ap-southeast-2.amazonaws.com/traveller-data')
      .then(response => {
        setTravellerData(response.data);
        setLoadingTravellerData(false);
      })
      .catch(error => {
        setError(error);
        setLoadingTravellerData(false);
      });

    // Fetch alerts
    axios.get('https://6lovyuia4k.execute-api.ap-southeast-2.amazonaws.com/alerts')
      .then(response => {
        setAlerts(response.data);
        setLoadingAlerts(false);
      })
      .catch(error => {
        setError(error);
        setLoadingAlerts(false);
      });
  }, []);

  if (loadingTravellerData || loadingAlerts) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Traveller Safety Dashboard</h1>
      <div>
        <h2>Traveller Data</h2>
        <ul>
          {travellerData.map(traveller => (
            <li key={traveller.EmailAddress}>
              {traveller.Name} - {traveller.FromLocation} to {traveller.ToLocation}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Alerts</h2>
        <ul>
          {alerts.map(alert => (
            <li key={alert.alert_id}>
              {alert.message} - {alert.location} at {new Date(alert.alert_timestamp * 1000).toLocaleString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;

