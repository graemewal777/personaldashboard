import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Family Dashboard</h1>
      </header>
      <main className="dashboard-content">
        <div className="welcome-message">
          <h2>Welcome to your Family Dashboard!</h2>
          <p>This dashboard will be customizable for both you and your wife.</p>
        </div>
        <div className="dashboard-grid">
          {/* Placeholder for future widgets */}
          <div className="widget">Todo List (Coming Soon)</div>
          <div className="widget">Calendar (Coming Soon)</div>
          <div className="widget">Weather (Coming Soon)</div>
          <div className="widget">Notes (Coming Soon)</div>
        </div>
      </main>
    </div>
  );
}

export default App;
