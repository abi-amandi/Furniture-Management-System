//userList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form } from 'react-bootstrap';
import swal from 'sweetalert';
import html2pdf from 'html2pdf.js';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUserData, setEditedUserData] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/user/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleEditUser = (user) => {
    setEditingUserId(user._id);
    setEditedUserData({
      username: user.username,
      email: user.email,
      address: user.address,
    });
  };

  const cancelEdit = () => {
    setEditingUserId(null);
    setEditedUserData({});
  };

  const updateUser = async (userId) => {
    try {
      await axios.put(`http://localhost:4000/api/user/users/${userId}`, editedUserData);
      getUsers();
      setEditingUserId(null);
      setEditedUserData({});
      swal('Success', 'User updated successfully', 'success');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const willDelete = await swal({
        title: 'Are you sure?',
        text: 'Once deleted, you will not be able to recover this user!',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      });
      
      if (willDelete) {
        await axios.delete(`http://localhost:4000/api/user/users/${userId}`);
        // Assuming getUsers is a function that fetches users from the server,
        // you might want to call it here, after the deletion is successful.
        getUsers();
        
        swal('Poof! User has been deleted!', {
          icon: 'success',
        });
      } else {
        // Handle the case where the user clicks "Cancel"
        swal('User deletion canceled!', {
          icon: 'info',
        });
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  

  const handleChange = (e, field) => {
    setEditedUserData({ ...editedUserData, [field]: e.target.value });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const generateReport = () => {
    const content = document.getElementById('userTable');
    const clonedContent = content.cloneNode(true);
    const actionColumnHeaders = clonedContent.querySelectorAll('th')[3];
    const actionColumnCells = clonedContent.querySelectorAll('td:nth-child(4)');
  
    actionColumnHeaders.style.display = 'none'; 
  
    actionColumnCells.forEach((cell) => {
      cell.style.display = 'none'; // Hide each action cell in every row
    });
  
    // Generate PDF from the modified table content
    html2pdf().from(clonedContent).save();
  };

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h1 className="mb-4">User Management</h1>
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <Form.Control
          type="text"
          placeholder="Search by username..."
          style={{ width: '20%'}}
          value={searchTerm}
          onChange={handleSearch}
        />
        <Button variant="primary" onClick={generateReport}>
          Generate Report
        </Button>
      </div>
      <Table id="userTable" striped bordered hover>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user._id}>
              {editingUserId === user._id ? (
                <>
                  <td>
                    <Form.Control
                      type="text"
                      value={editedUserData.username}
                      onChange={(e) => handleChange(e, 'username')}
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="email"
                      value={editedUserData.email}
                      onChange={(e) => handleChange(e, 'email')}
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      value={editedUserData.address}
                      onChange={(e) => handleChange(e, 'address')}
                    />
                  </td>
                  <td>
                    <Button variant="success" onClick={() => updateUser(user._id)} className="me-2">
                      Save
                    </Button>
                    <Button variant="secondary" onClick={cancelEdit}>
                      Cancel
                    </Button>
                  </td>
                </>
              ) : (
                <>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.address}</td>
                  <td>
                    <Button variant="info" onClick={() => handleEditUser(user)} className="me-2">
                      Edit
                    </Button>
                    <Button variant="danger" onClick={() => deleteUser(user._id)}>
                      Delete
                    </Button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserManagement;
