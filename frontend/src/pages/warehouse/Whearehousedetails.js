import React, { useEffect, useState, useRef } from 'react';
import axios from "axios";
import './warehousedetails.css';
import { useReactToPrint } from "react-to-print";
import { Link } from 'react-router-dom';

function WarehouseDetails() {
    const componentPDF = useRef();
    const [showWarehouses, setShowWarehouses] = useState([]);
    const [filteredWarehouses, setFilteredWarehouses] = useState([]);
    const [searchKey, setSearchKey] = useState('');

    // Fetch data
    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:4000/api/warehouse");
            if (response.data.success) {
                setShowWarehouses(response.data.data);
            }
        } catch (err) {
            alert("Error fetching warehouse data.");
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    // Delete warehouse
    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:4000/api/warehouse/delete/${id}`);
            if (response.data.success) {
                fetchData();
                alert("Warehouse deleted successfully!");
            }
        } catch (err) {
            alert("Failed to delete warehouse.");
        }
    }

    // Print PDF
    const generatePDF = useReactToPrint({
        content: () => componentPDF.current,
        documentTitle: "Warehouse Details",
        onAfterPrint: () => alert("Warehouse details saved as PDF.")
    });

    // Search by warehuse name
    const handleSearch = () => {
        if (searchKey.trim() === '') {
            setFilteredWarehouses([]); // Reset to show all warehouses
        } else {
            const filteredData = showWarehouses.filter(warehouse =>
                warehouse.warehouse_id.toLowerCase().includes(searchKey.toLowerCase())
            );
            setFilteredWarehouses(filteredData);
        }
    }

    return (
        <div className="warehouse-details-container">
            <div className="action-buttons">
                {/* Apply inline style to remove underline */}
                <Link to='/admin/addwherehouse' className="link" style={{ textDecoration: 'none' }}>
                    <button className="add-button">Add Warehouse</button>
                </Link>
            </div>

            <div className="search-container">
                <input
                    type="text"
                    value={searchKey}
                    onChange={(e) => setSearchKey(e.target.value)}
                    placeholder="Search by Warehouse ID"
                    className="search-input"
                />
                <button onClick={handleSearch} className="search-button">Search</button>
            </div>

            <div ref={componentPDF} className="pdf-content">
                <table className="warehouse-table">
                    <thead>
                        <tr>
                            <th>Warehouse ID</th>
                            
                            <th>Warehouse Name</th>
                            <th>Location</th>
                            <th>Contact Number</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(filteredWarehouses.length > 0 ? filteredWarehouses : showWarehouses).map((warehouse) => (
                            <tr key={warehouse._id}>
                                <td>{warehouse.warehouse_id}</td>
                                
                                <td>{warehouse.warehouse_name}</td>
                                <td>{warehouse.location}</td>
                                <td>{warehouse.contact_number}</td>
                                <td>
                                    <Link to={`/admin/updateWareHouse/${warehouse._id}`} className="action-link">Edit Warehouse</Link>
                                    <button onClick={() => handleDelete(warehouse._id)} className="action-button">Delete Warehouse</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button onClick={generatePDF} className="pdf-button">Download Report</button>
            </div>
        </div>
    );
}

export default WarehouseDetails;
