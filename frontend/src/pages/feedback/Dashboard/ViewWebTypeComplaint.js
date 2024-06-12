import React, { useState, useEffect } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  Search as SearchIcon,
  CloudDownload,
  Folder as FolderIcon,
  Visibility,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import axios from "axios";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const ViewWeb = () => {
  const [complaints, setComplaints] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const response = await axios.get("http://localhost:4000/webpage/");
      setComplaints(response.data);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    }
  };

  const generateCSV = () => {

    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Customer ID,Register No,Client Name,Accept/Reject\n" +
      complaints
        .map((complaint) => [
          complaint.customerId,
          complaint.email,
          complaint.name,
          complaint.acceptStatus === "true" ? "Accepted" : "Rejected",
        ])
        .join("\n");

 
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "WebpageTypeComplaints.csv");
    document.body.appendChild(link);


    link.click();
  };

  const generatePDF = () => {
    // Create a new PDF document
    const doc = new jsPDF();

    // Set up the table headers
    const headers = [["Customer ID", "Email", "Client Name", "Accept/Reject"]];

    // Extract relevant data from complaints
    const data = complaints.map((complaint) => [
      complaint.customerId,
      complaint.email,
      complaint.name,
      complaint.acceptStatus === "true" ? "Accepted" : "Rejected",
    ]);

    // Add the table to the document
    doc.autoTable({
      head: headers,
      body: data,
    });

    // Save the PDF
    doc.save("WebpageTypeComplaints.pdf");
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/webpage/${id}`);
      setComplaints((prevComplaints) =>
        prevComplaints.filter((complaint) => complaint._id !== id)
      );
      window.alert("Complaint deleted successfully");
    } catch (error) {
      console.error("Error deleting complaint:", error);
    }
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

  const handleDetailsOpen = (complaint) => {
    setSelectedComplaint(complaint);
    setOpenDetailsDialog(true);
  };

  const handleDetailsClose = () => {
    setOpenDetailsDialog(false);
  };

  const handleAccept = async (complaint) => {
    try {
      const updatedComplaint = { ...complaint, acceptStatus: "true" };
      await axios.put(
        `http://localhost:4000/webpage/${complaint._id}`,
        updatedComplaint
      );
      setComplaints((prevComplaints) =>
        prevComplaints.map((c) =>
          c._id === complaint._id ? { ...c, acceptStatus: "true" } : c
        )
      );
      window.alert("Complaint accepted successfully!");
    } catch (error) {
      console.error("Error accepting complaint:", error);
    }
  };

  const handleReject = async (complaint) => {
    try {
      const updatedComplaint = { ...complaint, acceptStatus: "false" };
      await axios.put(
        `http://localhost:4000/webpage/${complaint._id}`,
        updatedComplaint
      );
      setComplaints((prevComplaints) =>
        prevComplaints.map((c) =>
          c._id === complaint._id ? { ...c, acceptStatus: "false" } : c
        )
      );
      window.alert("Complaint rejected successfully");
    } catch (error) {
      console.error("Error rejecting complaint:", error);
    }
  };

  const filteredComplaints = complaints.filter((complaint) =>
    complaint.customerId.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="bg-gray-200 min-h-screen p-8 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <div>
          <div className="mb-4 flex items-center" style={{ marginLeft: '10px' }}>
            <FolderIcon style={{ marginRight: "8px" }} />
            <Typography variant="h4" className="text-black">
              Dashboard
            </Typography>
          </div>
          <Typography
            variant="h6"
            className="text-black"
            style={{ textDecoration: "underline" }}
          >
            Webpage Type Complaints
          </Typography>
        </div>
        <div className="flex items-center" style={{ marginLeft: '500px' }}>
          <TextField
            id="search"
            label="Search Customer ID"
            variant="outlined"
            size="medium"
            value={searchValue}
            onChange={handleSearchChange}
            InputProps={{
              style: {
                backgroundColor: "#ac8484",
                borderRadius: "20px",
                padding: "2px",
                color: "white",
                width: "500px", // Adjust the width here
              },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <div className="ml-4">
            <Button
              variant="contained"
              color="primary"
              onClick={handleButtonClick}
              style={{
                marginTop: '-80px',
                marginLeft: '600px',
                borderRadius: "50px",
                backgroundColor: "#8d7a7a",
                color: "white",
              }}
              startIcon={<CloudDownload />}
            >
              Generate Webpage Type Complaint Report
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem
                onClick={() => {
                  generatePDF();
                  handleMenuClose();
                }}
              >
                Download as PDF
              </MenuItem>
              <MenuItem
                onClick={() => {
                  generateCSV();
                  handleMenuClose();
                }}
              >
                Download as CSV
              </MenuItem>
            </Menu>
          </div>
        </div>
      </div>

      <div className="w-full">
        <TableContainer
          component={Paper}
          style={{
            background: "rgba(0, 0, 0, 0.5)",
            borderRadius: "20px",
            padding: "20px",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  style={{ backgroundColor: "#1a1615", color: "white" }}
                >
                  Customer ID{" "}
                </TableCell>
                <TableCell
                  style={{ backgroundColor: "#1a1615", color: "white" }}
                >
                  Email
                </TableCell>
                <TableCell
                  style={{ backgroundColor: "#1a1615", color: "white" }}
                >
                  Client Name
                </TableCell>
                <TableCell
                  style={{ backgroundColor: "#1a1615", color: "white" }}
                >
                  Accept/Reject
                </TableCell>
                <TableCell
                  style={{ backgroundColor: "#1a1615", color: "white" }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredComplaints.map((complaint) => (
                <TableRow key={complaint._id}>
                  <TableCell>{complaint.customerId}</TableCell>
                  <TableCell>{complaint.email}</TableCell>
                  <TableCell>{complaint.name}</TableCell>
                  <TableCell>
                    <div>
                      {complaint.acceptStatus === "accepted" ? (
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
                            onClick={() => handleAccept(complaint)}
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
                            onClick={() => handleReject(complaint)}
                          >
                            Reject
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleDetailsOpen(complaint)}>
                      <Visibility />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(complaint._id)}>
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
          Webpage Type Complaint Details
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
                  value={selectedComplaint?.name}
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
                  Email:
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
                  Address:
                </label>
                <input
                  type="text"
                  id="customerId"
                  name="customerId"
                  value={selectedComplaint?.address}
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

export default ViewWeb;
