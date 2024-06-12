import React from "react";
import { Link } from "react-router-dom";

const AdminActionBtns = () => (
    <div className='bg-light my-4'>
        <div className='container'>
            <div className='row pb-3'>
                <div className='col-md-4  my-1'>
                    <button className='btn btn-primary ' style={{ width: '300px' }} data-bs-toggle='modal' data-bs-target='#addCategoryModal'>
                        <i className='fas fa-plus'></i> Add Category
                    </button>
                </div>

                <div className='col-md-4  my-1'>
                    <button className='btn btn-info' style={{ width: '300px' }} data-bs-toggle='modal' data-bs-target='#addProductModal' >
                        <i className='fas fa-plus'></i> Add product
                    </button>
                </div>

                <div className='col-md-4 my-1'>
                    <Link to="/admin/report" className='btn btn-warning' style={{ width: '300px' }}>
                        <i className='fas fa-edit'></i> Generate Report
                    </Link>
                </div>


            </div>
        </div>
    </div>
);

export default AdminActionBtns;