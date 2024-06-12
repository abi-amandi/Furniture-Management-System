import React, { useState, useEffect } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, InputAdornment, IconButton, Button } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import office from '../../../assets/office.jpg';
import axios from 'axios';

const WebComplaintStatusPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const response = await axios.get('http://localhost:4000/webpage/'); // Replace '/api/complaints' with your backend route
      setComplaints(response.data);
    } catch (error) {
      console.error('Error fetching complaints:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const filteredComplaints = complaints.filter((complaint) =>
  complaint.name.toLowerCase().includes(searchValue.toLowerCase())
);


  return (
    <div className="bg-gray-200 min-h-screen p-8 rounded-lg shadow-md flex items-center justify-center" style={{ backgroundImage: `url(${office})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="bg-gray-200 bg-opacity-75 w-full max-w-full rounded-xl p-12"style={{background: 'rgba(224,255,255, 0.6)',
      width: '90%',margin: '50px auto',boxShadow: '0 4px 8px rgba(0,0,0,0.1)',borderRadius: '20px', padding: '10px',marginTop:'5%'}}>
        <div className="flex items-center justify-between mb-4">
          <Typography variant="h4" className="text-black" style={{ fontSize: '70px', textAlign: 'left', textDecoration: 'underline' }}>
            Complaint Status
          </Typography>
          <div className="flex items-center"style = {{marginLeft: '800px', marginTop:'-3%'}}>
            <TextField 
              id="search" 
              label="Search Customer" 
              variant="outlined" 
              size="medium" 
              value={searchValue}
              onChange={handleSearchChange}
              InputProps={{ 
                style: { 
                  backgroundColor: '#ac8484',
                  borderRadius: '20px',
                  padding: '2px',
                  color: 'white',
                  width: '500px' // Adjust the width here
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }} 
            />
          </div>
        </div>

        <div className="w-full">
          <TableContainer component={Paper} style={{ background: 'rgba(0, 0, 0, 0.5)', borderRadius: '20px', padding: '20px', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ backgroundColor: '#1a1615', color: 'white' }}>Complaint No</TableCell>
                  <TableCell style={{ backgroundColor: '#1a1615', color: 'white' }}>Customer Name</TableCell>
                  <TableCell style={{ backgroundColor: '#1a1615', color: 'white' }}>Status of the complaint</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredComplaints.map((complaint) => (
                  <TableRow key={complaint._id}>
                    <TableCell>{complaint._id}</TableCell>
                    <TableCell>{complaint.name}</TableCell>
                    <TableCell>
                      {complaint.acceptStatus === "true" ? (
                        <Button variant="contained" style={{ backgroundColor: '#abdd9e', color: 'white', width: '120px', borderRadius: '15px' }}>Approved</Button>
                      ) : (
                        <Button variant="contained" style={{ backgroundColor: '#ea6964', color: 'white', width: '120px', borderRadius: '15px' }}>Pending</Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default WebComplaintStatusPage;
