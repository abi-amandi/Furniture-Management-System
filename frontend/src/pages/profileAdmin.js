//profileAdmin.js

import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2'; // Import SweetAlert2

const Profile = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    address: '',
    password: ''
  });

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch('/api/user/profile');
      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }
      const userData = await response.json();
      setUserData(userData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const updateUserProfile = async () => {
    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Failed to update user profile');
      }

      const result = await response.json();
      console.log(result.message);

      // Show success message using SweetAlert2
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'User profile updated successfully!',
      });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUserProfile = async () => {
    try {
      const confirmed = await Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover your profile!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      });
  
      if (!confirmed.isConfirmed) {
        return;
      }
  
      const response = await fetch('/api/user/profile', {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete user profile');
      }
  
      const result = await response.json();
      await Swal.fire(
        'Deleted!',
        result.message,
        'success'
      );
      logout();
    } catch (error) {
      console.error(error);
      await Swal.fire(
        'Error!',
        'Failed to delete user profile',
        'error'
      );
    }
  };
  
  const logout = () => {
    // Perform logout logic here
    window.location.href = '/logout'; // Redirect to logout endpoint
  };
  

  return (
    <div style={styles.container}>
      <div style={styles.profileCard}>
        <h2>Admin Profile</h2>
        <div style={styles.inputContainer}>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={userData.username}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>
        <div style={styles.inputContainer}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>
        <div style={styles.inputContainer}>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={userData.address}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>
        <div style={styles.inputContainer}>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>
        <button style={styles.button} onClick={updateUserProfile}>Update Profile</button>
        <button style={styles.button} onClick={deleteUserProfile}>Delete Profile</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f0f0',
  },
  profileCard: {
    width: '400px',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  inputContainer: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '8px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ddd',
  },
  button: {
    width: '100%',
    padding: '10px',
    marginTop: '10px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    backgroundColor: '#4caf50',
    color: '#fff',
    border: 'none',
  },
};

export default Profile;
