import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import AdminHeader from './AdminHeader';
import { Link } from 'react-router-dom';
import { useParams, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import { getProduct } from "../redux/actions/productActions";
import { getCategories } from "../redux/actions/categoryActions";

const AdminEditProduct = ({ match }) => {
    

     /********************************
     * PARAMS
     ********************************/
     
     const { productId } = useParams();
     const navigate = useNavigate();

      /********************************
     * REDUCX GLOBAL STATE PROPERTIES
     ********************************/

      const dispatch = useDispatch();
      const {product} = useSelector(state => state.products);
      const {categories} = useSelector(state => state.categories);

     /********************************
     * COMPONENT STATE PROPERTIES
     ********************************/
    
    const [productImage, setProductImage] = useState(null);
    const [productName, setproductName] = useState('');
    const [productDesc, setproductDesc] = useState('');
    const [productPrice, setproductPrice] = useState('');
    const [productCategory, setproductCategory] = useState('');
    const [productQty, setproductQty] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

     /********************************
     * LIFECYCLE METHODS
     ********************************/


    useEffect(() => {
        //dispatch(getProduct(productId));
        if (!product){
            dispatch(getProduct(productId));
            dispatch(getCategories());
        }else {
            setProductImage(product.fileName);
            setproductName(product.productName);
            setproductDesc(product.productDesc);
            setproductPrice(product.productPrice);
            setproductCategory(product.productCategory);
            setproductQty(product.productQty);
        }
    }, [dispatch,productId, product]);


    /********************************
     * EVENT HANDLERS
     ********************************/

    const handleImageUpload = e => {
        const image = e.target.files[0];
        setProductImage(image);
    };

    const handleProductSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('productImage', productImage);
        formData.append('productName', productName);
        formData.append('productDesc', productDesc);
        formData.append('productPrice', productPrice);
        formData.append('productCategory', productCategory);
        formData.append('productQty', productQty);

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        
        // await axios.put(`/api/product/${productId}`, formData, config)
        //     .then(res => {
        //         history.push('/admin/dashboard');
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     });

        try {
            await axios.put(`/api/product/${productId}`, formData, config);
            setSuccessMessage("Product updated successfully");

            setTimeout(() => {
               setSuccessMessage("");
            //    history.push("/admin/dashboard");
            navigate("/admin/dashboard",{replace: true});
            }, 3000);
        } catch (error) {
            console.error("Error updating product:", error);
            // Handle error here (e.g., show an error message to the user)
        }
    };





     /********************************
     * RENDERER
     ********************************/

    return ( <Fragment>
        <AdminHeader />

        <div className='container my-3  '>

        {successMessage && (
          <div className="alert alert-success" role="alert">
            {successMessage}
          </div>
        )}
            <div className='row'>
                <div className='col-md-8 mx-auto'>
                        <Link to="/admin/dashboard" >
                            <span className="fas fa-arrow-left me-2"></span>Go Back
                        </Link>
                    <div>
                        <br />
                        <div className='modal-content'>
                            <form onSubmit={handleProductSubmit} className="border border-dark p-4">
                                <div className='modal-header p-4 bg-warning text-white'>
                                    <h5 className='modal-title'>
                                        Update Product
                                    </h5>
                                </div>
                                <div className='modal-body my-2'>
                                        <div className="mb-3">
                                            <label htmlFor="productImage" className="btn btn-dark mr-4">
                                                Choose file
                                                <input
                                                    type="file"
                                                    id="productImage"
                                                    className="visually-hidden"
                                                    name="productImage"
                                                    accept="images/*"
                                                    hidden
                                                    onChange={handleImageUpload}
                                                />
                                            </label>
                                            {productImage && productImage.name ? (
                                                <span className="badge bg-secondary">{productImage.name}</span>
                                            ) : productImage ? (
                                                <img
                                                    className="img-thumbnail"
                                                    style={{ width: '120px', height: '80px' }}
                                                    src={`/uploads/${productImage}`}
                                                    alt="product"
                                                />
                                            ) : null}
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="productName" className="form-label text-secondary">Name</label>
                                            <input 
                                                type='text'
                                                className='form-control'
                                                name='productName'
                                                value={productName}
                                                onChange={e =>
                                                    setproductName(
                                                        e.target.value
                                                    )
                                                }
                                                />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="productDesc" className="form-label text-secondary">Description</label>
                                            <textarea 
                                                
                                                className='form-control'
                                                rows='3'
                                                name='productDesc'
                                                value={productDesc}
                                                onChange={e =>
                                                    setproductDesc(
                                                        e.target.value
                                                    )
                                                }
                                                ></textarea>
                                        </div>

                                        <div  className="mb-3">
                                            <label htmlFor="productPrice" className="form-label text-secondary">Price</label>
                                            <input 
                                                type='text'
                                                className='form-control'
                                                name='productPrice'
                                                value={productPrice}
                                                onChange={e =>
                                                    setproductPrice(
                                                        e.target.value
                                                    )
                                                }
                                                />
                                        </div>

                                        <div  className=" row mb-3">
                                            <div className='col-md-6'>
                                                <label htmlFor="productCategory" className="form-label text-secondary">Category</label>
                                                <select
                                                    className='form-select'
                                                    name='productCategory'
                                                    value={productCategory}
                                                    onChange={e => 
                                                        setproductCategory(
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    <option value=''>Choose one...</option>
                                                    {categories && categories.map(
                                                        c => (
                                                            <option
                                                                key={
                                                                    c._id
                                                                }
                                                                value={
                                                                    c._id
                                                                }
                                                            >
                                                                {
                                                                    c.category
                                                                }
                                                            </option>    
                                                        )
                                                    )}
                                                    </select>    
                                            </div>
                                        

                                        <div className='col-md-6'>
                                            <label htmlFor="productQty" className="form-label text-secondary">Quantity</label>
                                            <input 
                                                type='number'
                                                className='form-control'
                                                min='0'
                                                max='100'
                                                name='productQty'
                                                value={productQty}
                                                onChange={e =>
                                                    setproductQty(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                        </div>
                                    

                                    <div className='modal-footer'>
                                        <button
                                            type='submit'
                                            className='btn btn-warning text-white'> Submit </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Fragment>
    )  

};

export default AdminEditProduct;