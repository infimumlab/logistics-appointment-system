import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navigation: React.FC = () => {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav style={{ padding: '15px', backgroundColor: '#333', color: 'white' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>📦 Logistics Appointment System</h2>
        <ul style={{ display: 'flex', gap: '20px', listStyle: 'none' }}>
          {isAuthenticated ? (
            <>
              <li><Link to="/" style={{ color: 'white' }}>Dashboard</Link></li>
              <li><Link to="/book" style={{ color: 'white' }}>Book Appointment</Link></li>
              <li><Link to="/monitoring" style={{ color: 'white' }}>Monitoring</Link></li>
              <li>{user?.username}</li>
              <li><button onClick={logout} style={{ cursor: 'pointer' }}>Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login" style={{ color: 'white' }}>Login</Link></li>
              <li><Link to="/register" style={{ color: 'white' }}>Register</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
