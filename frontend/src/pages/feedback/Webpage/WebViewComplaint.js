import React, { useState, useEffect } from 'react';
import { Typography, Button, TextField, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import side from '../../../assets/side.jpg';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const WebViewComplaintPage = () => {
  const { _id } = useParams();
  const [complaintData, setComplaintData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editedCustomerName, setEditedCustomerName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [editedPhoneNumber, setEditedPhoneNumber] = useState('');

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/webpage/${_id}`);
        setComplaintData(response.data);
        setEditedCustomerName(response.data.name);
        setEditedEmail(response.data.email);
        setEditedPhoneNumber(response.data.mobile);
      } catch (error) {
        console.error('Error fetching complaint:', error);
      }
    };

    fetchComplaint();
  }, [_id]);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async () => {
    try {
      // Send PUT request to update complaint details
      const response = await axios.put(`http://localhost:4000/webpage/${_id}`, {
        customerId: complaintData.customerId,
        name: editedCustomerName,
        email: editedEmail,
        mobile: editedPhoneNumber,
        address: complaintData.address,
        date: complaintData.date,
        time: complaintData.time,
        url: complaintData.url,
        acceptStatus: complaintData.acceptStatus
      });
  
      // Update the local state with the updated complaint data
      setComplaintData(response.data);
      setEditMode(false);
    } catch (error) {
      console.error('Error updating complaint:', error);
    }
  };
  const handleDelete = async () => {
    try {
      // Send DELETE request to delete the complaint
      await axios.delete(`http://localhost:4000/webpage/${_id}`);
      console.log("Complaint deleted!");
      // Optionally, you can navigate the user to another page after deletion
      window.alert("Delete request sent successfully");
    } catch (error) {
      console.error('Error deleting complaint:', error);
    }
  };
    

  // const handleDelete = async () => {
  //   try {
  //     // Send DELETE request to delete the complaint
  //     await axios.delete(`http://localhost:4000/webpage/${_id}`);
  //     console.log("Complaint deleted!");
  //     // Optionally, you can navigate the user to another page after deletion
  //   } catch (error) {
  //     console.error('Error deleting complaint:', error);
  //   }
  // };

  return (
    <div className="min-h-screen p-8 rounded-lg shadow-md flex items-center justify-center" style={{ backgroundImage: `url(${side})`, 
    backgroundSize: 'cover', backgroundPosition: 'center', marginTop:'-5%',marginBottom:'-3.5%' }}>
      <div className="bg-gray-200 bg-opacity-75 w-full max-w-full rounded-xl p-12"style={{ background: 'rgba(224,255,255, 0.6)',
      width: '1000px',margin: '50px auto',boxShadow: '0 4px 8px rgba(0,0,0,0.1)',borderRadius: '20px', padding: '10px',marginTop:'5%'}}>
        <Typography variant="h3" align="center" gutterBottom style={{ textDecoration: 'underline' }}>
          View Complaint
        </Typography>
        <div className="bg-[#968d7c] bg-opacity-75  rounded-xl p-12"style={{ background: 'rgba(102,51,0, 0.6)',
      width: '900px',margin: '50px auto',boxShadow: '0 4px 8px rgba(0,0,0,0.1)',borderRadius: '20px', padding: '10px',marginTop:'5%'}} >
          <div className="mb-4">
            {!editMode && (
              <Typography variant="h5" gutterBottom>
                Complaint No: {complaintData._id}
              </Typography>
            )}
            {editMode ? (
              <TextField
                value={editedCustomerName}
                onChange={(e) => setEditedCustomerName(e.target.value)}
                fullWidth
                label="Name"
                sx={{ mb: 2 }}
              />
            ) : (
              <Typography variant="h5" gutterBottom>
                Customer Name: {complaintData.name}
              </Typography>
            )}
            {editMode ? (
              <TextField
                value={editedEmail}
                onChange={(e) => setEditedEmail(e.target.value)}
                fullWidth
                label="Email"
                sx={{ mb: 2 }}
              />
            ) : (
              <Typography variant="h5" gutterBottom>
                Email Address: {complaintData.email}
              </Typography>
            )}
            {editMode ? (
              <TextField
                value={editedPhoneNumber}
                onChange={(e) => setEditedPhoneNumber(e.target.value)}
                fullWidth
                label="Phone Number"
              />
            ) : (
              <Typography variant="h5" gutterBottom>
                Phone Number: {complaintData.mobile}
              </Typography>
            )}
          </div>
          <div className="mb-4">
            <Typography variant="h5" gutterBottom>
              Complaint Update:
            </Typography>
          </div>
          <div className="mb-4">
            <div className="flex items-center">
              {editMode ? (
                <Button variant="contained" color="primary" onClick={handleSave} style={{ backgroundColor: '#6e5050', color: 'black', borderRadius: '15px' }}>
                  Save
                </Button>
              ) : (
                <>
                  <Button variant="contained" color="primary" startIcon={<EditIcon />} onClick={handleEdit} style={{ backgroundColor: '#6e5050', color: 'black', borderRadius: '15px' }}>
                    Edit
                  </Button>
                  <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={handleDelete} sx={{ ml: 2 }} style={{ backgroundColor: '#6e5050', color: 'black', borderRadius: '15px' }}>
                    Delete
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebViewComplaintPage;
