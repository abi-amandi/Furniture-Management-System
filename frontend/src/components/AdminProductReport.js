import React, { Fragment, useEffect, useState, useRef } from "react";
import AdminHeader from './AdminHeader';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/actions/productActions";
import { useReactToPrint } from 'react-to-print';

const AdminProductReport = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const products = useSelector(state => state.products.products || []);
    const componentRef = useRef();

    useEffect(() => {
        dispatch(fetchProducts())
            .then(() => setLoading(false))
            .catch((error) => {
                console.error('Error fetching products:', error);
                setLoading(false);
            });
    }, [dispatch]);


    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    

    return (
        <Fragment>
            <AdminHeader />

            <div className='container my-3'>
                <div className='col-md-8 mx-auto'>
                    <Link to="/admin/dashboard">
                        <span className="fas fa-arrow-left me-2"></span>Go Back
                    </Link>
                </div>
            </div>



            <div className='container mt-5 mb-5' ref={componentRef}>

                <center><h2 style={{ color: 'green' }}>Inventory Report</h2><hr style={{ width: '50%' }} /></center>

                <table className='table table-striped' id='productTable'>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Unit Price</th>
                            <th>Quantity</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="6">Loading...</td>
                            </tr>
                        ) : (
                            products.map(product => (
                                <tr key={product._id}>
                                    <td><img src={`/uploads/${product.fileName}`} alt='product' style={{ height: '50px' }} /></td>
                                    <td>{product.productName}</td>
                                    <td>{product.productCategory.category}</td>
                                    <td>{product.productPrice.toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'LKR',
                                    })}</td>
                                    <td>{product.productQty}</td>
                                    <td>{product.productQty <= 0 ? 'Out of Stock' : 'In stock'}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>


            </div>
            <div className='text-center mt-3 mb-4'>
                <button
                    type='button'
                    className='btn btn-success text-white'
                    onClick={handlePrint}
                >
                    Download as PDF
                </button>
            </div>

            


        </Fragment>
    );
};

export default AdminProductReport;
