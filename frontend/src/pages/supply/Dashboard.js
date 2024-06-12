import React, { useEffect, useState } from 'react';
import axios from 'axios';


//Total Supplier Report

function SupplierReport() {
  // State variables to store supplier count and list of suppliers
  const [countlist, setCountlist] = useState(null);
  const [customerlist, setCustomerlist] = useState([]);

  // Function to fetch supplier data from the server
  const fetchData = async () => {
    try {
      // GET request to retrieve supplier count and list
      const response = await axios.get("http://localhost:4000/api/supplier/count");
      const { count } = response.data;
      setCountlist(count);
      setCustomerlist(response.data.data);
    } catch (error) {
      // Alert user if an error occurs while fetching data
      alert(error.message);
    }
  };

  // Fetch data when component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // JSX rendering
  return (
    <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', maxWidth: '800px', margin: '0 auto' }}>
      {/* Supplier count section */}
      <div>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Total Supplier Report</h3>
        <p>Total List of Suppliers: {countlist !== null ? countlist : "Loading..."}</p>
      </div>

      {/* Supplier details section */}
      <div>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Summary Of Supplier Details:</h3>
        {/* Scrollable table for displaying supplier details */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', minWidth: '600px' }}>
            <thead>
              {/* Table headers */}
              <tr>
                <th style={tableHeaderStyle}>Supplier ID</th>
                <th style={tableHeaderStyle}>Company Name</th>
                <th style={tableHeaderStyle}>Email</th>
              </tr>
            </thead>
            <tbody>
              {/* Iterate over each supplier and display their details */}
              {customerlist.map((supplier) => (
                <tr key={supplier._id}>
                  <td style={tableCellStyle}>{supplier.supplier_name}</td>
                  <td style={tableCellStyle}>{supplier.company_name}</td>
                  <td style={tableCellStyle}>{supplier.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Styles for table header cells
const tableHeaderStyle = {
  backgroundColor: '#58d256',
  border: '1px solid #cbc7c7',
  padding: '8px',
  textAlign: 'left',
  color: '#fff'
};

// Styles for table data cells
const tableCellStyle = {
  padding: '8px',
  textAlign: 'left',
  border: '1px solid #cbc7c7'
};

export default SupplierReport;
