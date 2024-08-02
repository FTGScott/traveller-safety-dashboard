import React from 'react';
import './App.css';
import Dashboard from './Dashboard'; // Import the Dashboard component

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Traveller Safety Dashboard</h1>
      </header>
      <main>
        <Dashboard />
      </main>
    </div>
  );
}

export default App;

