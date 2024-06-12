import React, { useState, useEffect } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, InputAdornment, IconButton, Button, Menu, MenuItem,  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,} from '@mui/material';
import { Search as SearchIcon, CloudDownload, Folder as FolderIcon} from '@mui/icons-material';
import office from '../../../assets/office.jpg';
import axios from 'axios';
import { jsPDF } from "jspdf";
import { Link } from 'react-router-dom';
import { Visibility, Delete as DeleteIcon } from "@mui/icons-material";

import "jspdf-autotable";

const ViewService = () => {
  const [complaints, setComplaints] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const response = await axios.get('http://localhost:4000/service/'); // Replace '/api/complaints' with your backend route
      setComplaints(response.data);
    } catch (error) {
      console.error('Error fetching complaints:', error);
    }
  };
  
  const generateCSV = () => {
    // Generate CSV content
    const csvContent = "data:text/csv;charset=utf-8," +
      "Customer ID,Register No,Client Name,Accept/Reject\n" +
      filteredComplaints.map(service => [
        service.customerId,
        service.registerNo,
        service.customerName,
        service.acceptStatus === "true" ? "Accepted" : "Rejected",
      ]).join('\n');
  
    // Create a download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "ServiceTypeComplaints.csv");
    document.body.appendChild(link);
  
    // Trigger the click event to initiate download
    link.click();
  };
  
  const generatePDF = () => {
    // Create a new PDF document
    const doc = new jsPDF();

    // Set up the table headers
    const headers = [["Customer ID", "Register No", "Customer Name", "Accept/Reject"]];

    // Extract relevant data from filteredComplaints
    const data = filteredComplaints.map(service => [
        service.customerId,
        service.registerNo,
        service.customerName,
        service.acceptStatus === "true" ? "Accepted" : "Rejected"
    ]);

    // Set the content for the table
    doc.autoTable({
        head: headers,
        body: data,
        startY: 20 // Adjust the starting Y position if needed
    });

    // Save the PDF
    doc.save("ServiceTypeComplaints.pdf");
};


  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDetailsOpen = (service) => {
    setSelectedComplaint(service);
    setOpenDetailsDialog(true);
  };

  const handleDetailsClose = () => {
    setOpenDetailsDialog(false);
  };

  const filteredComplaints = complaints.filter((service) =>
    service.registerNo.includes(searchValue)
  );


  const handleDelete = async (id) => {
    try {
      // Send DELETE request to delete the complaint
      await axios.delete(`http://localhost:4000/service/${id}`);
      
      // Update the local state to remove the deleted record
      setComplaints((prevComplaints) => prevComplaints.filter(complaint => complaint._id !== id));

      // Show alert for successful deletion
      window.alert("Complaint deleted successfully!");
    } catch (error) {
      console.error('Error deleting complaint:', error);
    }
  };




  const handleAccept = async (service) => {
    try {
      const updatedService = { ...service, acceptStatus: "true" };
      await axios.put(`http://localhost:4000/service/${service._id}`, updatedService);
      setComplaints((prevComplaints) =>
        prevComplaints.map((c) =>
          c._id === service._id ? { ...c, acceptStatus: "true" } : c
        )
      );
      console.log("Complaint accepted successfully!");
      window.alert("Complaint accepted successfully!");
    } catch (error) {
      console.error("Error accepting complaint:", error);
    }
  };

  const handleReject = async (service) => {
    try {
      const updatedService = { ...service, acceptStatus: "false" };
      await axios.put(`http://localhost:4000/service/${service._id}`, updatedService);
      setComplaints((prevComplaints) =>
        prevComplaints.map((c) =>
          c._id === service._id ? { ...c, acceptStatus: "false" } : c
        )
      );
      console.log("Complaint rejected successfully");
      window.alert("Complaint rejected successfully");
    } catch (error) {
      console.error("Error rejecting complaint:", error);
    }
  };



  
  

  return (
    <div className="bg-gray-200 min-h-screen p-8 rounded-lg shadow-md">
     
      <div className="flex justify-between items-center mb-4">
        <div>
        <div className="mb-4 flex items-center" style= {{marginLeft:'10px'}}>
      <Link to="/dashboard" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
    <FolderIcon style={{ marginRight: '8px' }} />
    <Typography variant="h4" className="text-black">
      Dashboard
    </Typography>
  </Link>
          </div>
          <Typography variant="h6" className="text-black" style={{ textDecoration: 'underline',marginLeft:'10px' }}>
            Service Type Complaints
          </Typography>
          </div>
        <div className="flex items-center" style = {{marginLeft: '500px',}}>
          <TextField 
            id="search" 
            label="Search Register No" 
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
          <div className="ml-4">
            <Button
               variant="contained"
               color="primary"
               onClick={handleButtonClick}
               style={{ marginTop: '-80px',marginLeft: '600px', borderRadius: '20px', backgroundColor: '#8d7a7a', color: 'white' }}
               startIcon={<CloudDownload />}
            >
              Generate Service Type Complaint Report
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={() => { generatePDF(); handleMenuClose(); }}>Download as PDF</MenuItem>
              <MenuItem onClick={() => { generateCSV(); handleMenuClose(); }}>Download as CSV</MenuItem>
            </Menu>
          </div>
        </div>
      </div>

      <div className="w-full" style={{ padding: '20px' }}>
        <TableContainer component={Paper} style={{margin: 'auto', background: 'rgba(0, 0, 0, 0.5)', borderRadius: '20px', padding: '20px', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ backgroundColor: '#1a1615', color: 'white' }}>Customer ID</TableCell>
                <TableCell style={{ backgroundColor: '#1a1615', color: 'white' }}>Register No</TableCell>
                <TableCell style={{ backgroundColor: '#1a1615', color: 'white' }}>Client Name</TableCell>
                <TableCell style={{ backgroundColor: '#1a1615', color: 'white' }}>Accept/Reject</TableCell>
                <TableCell style={{ backgroundColor: '#1a1615', color: 'white' }}>View</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredComplaints.map((service) => (
                <TableRow key={service._id}>
                  <TableCell>{service.customerId}</TableCell>
                  <TableCell>{service.registerNo}</TableCell>
                  <TableCell>{service.customerName}</TableCell>
                  <TableCell>
                  <div>
            {service.acceptStatus === "accepted" ? (
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#abdd9e",
                  color: "white",
                  width: "100px",
                  borderRadius: "15px",
                }}
                disabled
              >
                Accepted
              </Button>
            ) : (
              <>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#abdd9e",
                    color: "white",
                    width: "100px",
                    borderRadius: "15px",
                    marginRight: "8px",
                  }}
                  onClick={() => handleAccept(service)}
                >
                  Accept
                </Button>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#ea6964",
                    color: "white",
                    width: "100px",
                    borderRadius: "15px",
                  }}
                  onClick={() => handleReject(service)}
                >
                  Reject
                </Button>
              </>
            )}
          </div>
          </TableCell>

                  <TableCell>
                    <IconButton onClick={() => handleDetailsOpen(service)}>
                      <Visibility />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(service._id)}>
      <DeleteIcon />
    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Dialog open={openDetailsDialog} onClose={handleDetailsClose}>
        <DialogTitle
          style={{ textAlign: "center", fontWeight: "bold", fontSize: "24px" }}
        >
          Service Type Complaint Details
        </DialogTitle>

        <DialogContent>
          <form className="space-y-4">
            <div className="bg-gray-200 bg-opacity-75 w-full max-w-full rounded-xl p-12">
              <div className="flex items-center mb-4">
                <label
                  htmlFor="customerId"
                  className="block mr-4 font-bold"
                  style={{ minWidth: "150px", fontSize: "20px" }}
                >
                  Customer ID:
                </label>
                <input
                  type="text"
                  id="customerId"
                  name="customerId"
                  value={selectedComplaint?.customerId}
                  readOnly
                  className="flex-grow p-3 rounded text-lg border-none"
                />
              </div>
              <div className="flex items-center mb-4">
                <label
                  htmlFor="customerId"
                  className="block mr-4 font-bold"
                  style={{ minWidth: "150px", fontSize: "20px" }}
                >
                  Client Name:
                </label>
                <input
                  type="text"
                  id="customerId"
                  name="customerId"
                  value={selectedComplaint?.customerName}
                  readOnly
                  className="flex-grow p-3 rounded text-lg border-none"
                />
              </div>
              <div className="flex items-center mb-4">
                <label
                  htmlFor="customerId"
                  className="block mr-4 font-bold"
                  style={{ minWidth: "150px", fontSize: "20px" }}
                >
                  Register No:
                </label>
                <input
                  type="text"
                  id="customerId"
                  name="customerId"
                  value={selectedComplaint?.registerNo}
                  readOnly
                  className="flex-grow p-3 rounded text-lg border-none"
                />
              </div>
              <div className="flex items-center mb-4">
                <label
                  htmlFor="customerId"
                  className="block mr-4 font-bold"
                  style={{ minWidth: "150px", fontSize: "20px" }}
                >
                  Phone Number:
                </label>
                <input
                  type="text"
                  id="customerId"
                  name="customerId"
                  value={selectedComplaint?.mobile}
                  readOnly
                  className="flex-grow p-3 rounded text-lg border-none"
                />
              </div>
              <div className="flex items-center mb-4">
                <label
                  htmlFor="customerId"
                  className="block mr-4 font-bold"
                  style={{ minWidth: "150px", fontSize: "20px" }}
                >
                  Email Address:
                </label>
                <input
                  type="text"
                  id="customerId"
                  name="customerId"
                  value={selectedComplaint?.email}
                  readOnly
                  className="flex-grow p-3 rounded text-lg border-none"
                />
              </div>
              <div className="flex items-center mb-4">
                <label
                  htmlFor="customerId"
                  className="block mr-4 font-bold"
                  style={{ minWidth: "150px", fontSize: "20px" }}
                >
                  Product Name / <br/> Product ID:
                </label>
                <input
                  type="text"
                  id="customerId"
                  name="customerId"
                  value={selectedComplaint?.productName}
                  readOnly
                  className="flex-grow p-3 rounded text-lg border-none"
                />
              </div>
              <div className="flex items-center mb-4">
                <label
                  htmlFor="customerId"
                  className="block mr-4 font-bold"
                  style={{ minWidth: "150px", fontSize: "20px" }}
                >
                  Address 1:
                </label>
                <input
                  type="text"
                  id="customerId"
                  name="customerId"
                  value={selectedComplaint?.address1}
                  readOnly
                  className="flex-grow p-3 rounded text-lg border-none"
                />
              </div>
              <div className="flex items-center mb-4">
                <label
                  htmlFor="customerId"
                  className="block mr-4 font-bold"
                  style={{ minWidth: "150px", fontSize: "20px" }}
                >
                  Address 2:
                </label>
                <input
                  type="text"
                  id="customerId"
                  name="customerId"
                  value={selectedComplaint?.address2}
                  readOnly
                  className="flex-grow p-3 rounded text-lg border-none"
                />
              </div>
              <div className="flex items-center mb-4">
                <label
                  htmlFor="customerId"
                  className="block mr-4 font-bold"
                  style={{ minWidth: "150px", fontSize: "20px" }}
                >
                  Date of
                  <br /> Complaint:
                </label>
                <input
                  type="text"
                  id="customerId"
                  name="customerId"
                  value={selectedComplaint?.date}
                  readOnly
                  className="flex-grow p-3 rounded text-lg border-none"
                />
              </div>
              <div className="flex items-center mb-4">
                <label
                  htmlFor="customerId"
                  className="block mr-4 font-bold"
                  style={{ minWidth: "150px", fontSize: "20px" }}
                >
                  Incident Details/ <br/> Complaint:
                </label>
                <input
                  type="text"
                  id="customerId"
                  name="customerId"
                  value={selectedComplaint?.complaint}
                  readOnly
                  className="flex-grow p-3 rounded text-lg border-none"
                />
              </div>
              <div className="flex items-center mb-4">
                <label
                  htmlFor="customerId"
                  className="block mr-4 font-bold"
                  style={{ minWidth: "150px", fontSize: "20px" }}
                >
                  Status:
                </label>
                <input
                  type="text"
                  id="customerId"
                  name="customerId"
                  value={
                    selectedComplaint?.acceptStatus === "true"
                      ? "Accepted"
                      : "Rejected"
                  }
                  readOnly
                  className="flex-grow p-3 rounded text-lg border-none"
                />
              </div>
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDetailsClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ViewService;
