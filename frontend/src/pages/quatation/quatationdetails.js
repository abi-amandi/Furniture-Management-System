import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Swal from 'sweetalert2';

function QuotationDetails() {
    const [showQuotations, setShowQuotations] = useState([]);
    const [searchKey, setSearchKey] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/quatation');
            if (response.data.success) {
                setShowQuotations(response.data.data);
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error fetching data',
            });
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:4000/api/quatation/delete_quotation/${id}`);
            if (response.data.success) {
                fetchData();
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Quotation deleted successfully!',
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error deleting quotation',
            });
        }
    };

    const handleDownloadReport = () => {
        const doc = new jsPDF();
        doc.autoTable({
            head: [['Company Name', 'Company Email', 'Phone', 'Company Description', 'Furniture Types']],
            body: showQuotations.map(item => [
                item.quotation_company_name,
                item.quotation_company_email,
                item.phone,
                item.company_description,
                item.furniture_types
            ])
        });
        doc.save('quotation_report.pdf');
    };

    const handleSearch = (e) => {
        setSearchKey(e.target.value);
        filterData(e.target.value);
    };

    const filterData = (searchKey) => {
        const filteredData = showQuotations.filter((item) =>
            item.quotation_company_name.toLowerCase().includes(searchKey.toLowerCase())
        );
        setShowQuotations(filteredData);
    };

    const renderDescription = (description) => {
        return description.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
        ));
    };

    return (
        <div className="container mt-5">
            <div className="row mb-3">
                <div className="col">
                    <div className="input-group">
                        <input
                            type="search"
                            onChange={handleSearch}
                            value={searchKey}
                            placeholder="Search"
                            className="form-control"
                        />
                        <div className="input-group-append">
                            <button className="btn btn-primary" onClick={handleSearch}>
                                Search
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-auto">
                    <Link to="/admin/AddSupplier" className="btn btn-success me-2">
                        Add Supplier
                    </Link>
                    <Link to="/admin/supplierDetails" className="btn btn-success">
                        Manage Supplier
                    </Link>
                </div>
            </div>
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <th>Furniture Image(s)</th>
                            <th>Company Name</th>
                            <th>Company Email</th>
                            <th>Phone</th>
                            <th>Description</th>
                            <th>Furniture Types</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {showQuotations.map((item, index) => (
                            <tr key={item._id}>
                                <td className="align-middle">
                                    {item.furniture_images.map((img, imgIndex) => (
                                        <img
                                            key={imgIndex}
                                            src={`http://localhost:4000/Images/${img}`}
                                            alt=""
                                            className="img-fluid"
                                            style={{ maxHeight: "100px", maxWidth: "100px", margin: "5px" }}
                                        />
                                    ))}
                                </td>
                                <td className="align-middle">{item.quotation_company_name}</td>
                                <td className="align-middle">{item.quotation_company_email}</td>
                                <td className="align-middle">{item.phone}</td>
                                <td className="align-middle">{renderDescription(item.company_description)}</td>
                                <td className="align-middle">{item.furniture_types}</td>
                                <td className="align-middle">
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="btn btn-danger btn-sm"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="text-center">
                <button onClick={handleDownloadReport} className="btn btn-success">
                    Download Report
                </button>
            </div>
            <br/>
        </div>
    );
}

export default QuotationDetails;
