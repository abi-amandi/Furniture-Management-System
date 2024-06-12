import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link for navigation
import '../styles/LoginPage.css';
import RoleContext from '../components/RoleContext'; 

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { setRole } = useContext(RoleContext);
  const navigate = useNavigate(); // Hook to navigate to different pages

  // const handleRegisterClick = () => {
  //   navigate('/register'); // Navigate to the registration page
  // };

  const validateEmail = (input) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); 

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    ////
    if (!validateEmail(email)) {            
      setError('Please enter a valid email');
      return;
    }

    try {
      const response = await fetch('/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed'); 
      }

      const data = await response.json();
      if (!data || typeof data.role === 'undefined') {
        throw new Error('Invalid response data');
      }
      console.log('Login successful:', data); // Handle successful login

      setRole(data.role);

      if (data.role === 'rider') {
        navigate('/delivery/rider/dashboard');
      } else if (data.role === 'user') {
        navigate('/');
      } else if (data.role === 'admin') {
        navigate('/admin/main/dashboard');
      }
    } catch (error) {
      setError(error.message); // Display error message to user
    }
  };

  return (
    <div className="login-form">
      <h1>Login</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
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
        <button type="submit" className="login-button">Login</button>
      </form>

      <p>Don't have an account? <Link to="/register">Register</Link></p>
 
    </div>
  );
};

export default LoginPage;

