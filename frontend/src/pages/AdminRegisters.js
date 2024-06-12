import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';

const AdminRegister = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const role = 'admin'; // Set role to 'admin'
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook to navigate to different pages

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username || !email || !password || !address) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      const response = await fetch('/api/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
          address,
          role, // Include 'role' as 'admin'
        }),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      } else {
        const data = await response.json();
        console.log('Registration successful:', data);
        navigate('/login'); 
      }
    } catch (error) {
      setError('Registration failed');
    }
  };

  return (
    <div className="login-form">
      <h1>Admin Register</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="login-input"
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="login-input"
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="login-input"
        />
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          className="login-input"
        />
     
        <input
          type="hidden"
          id="role"
          value={role}
          readOnly 
        />
        <button type="submit" className="login-button">
          Register
        </button>
      </form>
    </div>
  );
};

export default AdminRegister;
