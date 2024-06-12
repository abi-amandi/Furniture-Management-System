import React, { useState, useEffect } from 'react';
import { Typography, Button, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import side from '../../../assets/side.jpg';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ViewComplaintPage = () => {
  const { _id } = useParams();
  const [complaintData, setComplaintData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedCustomerName, setEditedCustomerName] = useState('');
  const [editedRegisterNo, setEditedRegisterNo] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [editedPhoneNumber, setEditedPhoneNumber] = useState('');

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/service/${_id}`);
        setComplaintData(response.data);
        // Set initial edited values to the current complaint data
        setEditedCustomerName(response.data.customerName);
        setEditedRegisterNo(response.data.registerNo);
        setEditedEmail(response.data.email);
        setEditedPhoneNumber(response.data.mobile);
      } catch (error) {
        console.error('Error fetching complaint:', error);
      }
    };

    fetchComplaint();
  }, [_id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      // Prepare the data to be sent in the request body
      const updatedData = {
        customerId: complaintData.customerId,
        customerName: editedCustomerName,
        registerNo: editedRegisterNo,
        mobile: editedPhoneNumber,
        email: editedEmail,
        productName: complaintData.productName,
        address1: complaintData.address1,
        address2: complaintData.address2,
        date: complaintData.date,
        time: complaintData.time,
        complaint: complaintData.complaint,
        desireResolution: complaintData.desireResolution,
        acceptStatus: complaintData.acceptStatus,
      };
  
      // Send PUT request to update complaint details
      const response = await axios.put(`http://localhost:4000/service/${_id}`, updatedData);
  
      // Log the updated complaint data received from the backend
      console.log('Updated complaint data:', response.data);

      // Update the local state with the updated complaint data
      setComplaintData(response.data); 
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating complaint:', error);
    }
  };
  
  

  return (
    <div className="min-h-screen p-8 rounded-lg shadow-md flex items-center justify-center" style={{ backgroundImage: `url(${side})`, backgroundSize: 'cover', 
    backgroundPosition: 'center', marginTop:'-5%',marginBottom:'-3.5%'}}>
      <div className="bg-gray-200 bg-opacity-75 w-full max-w-full rounded-xl p-12"style={{ background: 'rgba(224,255,255, 0.6)',
      width: '1000px',margin: '50px auto',boxShadow: '0 4px 8px rgba(0,0,0,0.1)',borderRadius: '20px', padding: '10px',marginTop:'5%'}}>
        <Typography variant="h3" align="center" gutterBottom style={{ textDecoration: 'underline' }}>
          View Complaint
        </Typography>
        <div className="bg-[#968d7c] bg-opacity-75 rounded-xl p-12"style={{ background: 'rgba(102,51,0, 0.6)',
      width: '900px',margin: '50px auto',boxShadow: '0 4px 8px rgba(0,0,0,0.1)',borderRadius: '20px', padding: '10px',marginTop:'5%'}}>
          <div className="mb-4">
            {isEditing ? null : (
              <Typography variant="h5" gutterBottom>
                Complaint ID: {complaintData._id}
              </Typography>
            )}
            {isEditing ? (
              <TextField
                value={editedCustomerName}
                onChange={(e) => setEditedCustomerName(e.target.value)}
                fullWidth
                label="Customer Name"
              />
            ) : (
              <Typography variant="h5" gutterBottom>
                Customer Name: {complaintData.customerName}
              </Typography>
            )}
          </div>
          <div className="mb-4">
            {isEditing ? (
              <TextField
                value={editedRegisterNo}
                onChange={(e) => setEditedRegisterNo(e.target.value)}
                fullWidth
                label="Registration No"
              />
            ) : (
              <Typography variant="h5" gutterBottom>
                Registration No: {complaintData.registerNo}
              </Typography>
            )}
          </div>
          <div className="mb-4">
            {isEditing ? (
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
            {isEditing ? (
              <TextField
                value={editedEmail}
                onChange={(e) => setEditedEmail(e.target.value)}
                fullWidth
                label="Email"
              />
            ) : (
              <Typography variant="h5" gutterBottom>
                Email Address: {complaintData.email}
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
            {isEditing ? (
              <Button
                variant="contained"
                color="success"
                onClick={handleSave}
                style={{ backgroundColor: '#6e5050', color: 'black', borderRadius: '15px', marginRight: '10px' }}
              >
                Save
              </Button>
            ) : (
              <Button
                variant="contained"
                color="error"
                startIcon={<EditIcon />}
                onClick={handleEdit}
                style={{ backgroundColor: '#6e5050', color: 'black', borderRadius: '15px', marginRight: '10px' }}
              >
                Edit
              </Button>
            )}
            <Button
              variant="contained"
              color="error"
              startIcon={<DeleteIcon />}
              // onClick={handleDelete}
              style={{ backgroundColor: '#6e5050', color: 'black', borderRadius: '15px' }}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};

export default ViewComplaintPage;

