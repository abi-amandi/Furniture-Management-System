import React from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
//redux
import { useDispatch } from "react-redux";
import { deleteProduct } from "../redux/actions/productActions";

const Card = ({ product, adminPage = false, homePage = false }) => {

    const dispatch = useDispatch();

    // const addToCart = async (id) => {
    //     axios.post('/api/cart', {
    //         product: id
    //     })
    //     .then(response => {
    //         alert('successfully added ..')
    //         console.log(response.data); // Handle successful response
    //     })
    //     .catch(error => {
    //         alert('failed to add ..')
    //         console.error(error); // Handle errors
    //     });
    // }

    const addToCart = async (productId, quantity) => {
        try {
          const response = await axios.post('/api/cart', { productId, quantity });
          console.log('Response data:', response.data);
          // Handle success, e.g., show a success message or update the cart state
        } catch (error) {
          console.error('Error adding to cart:', error);
          // Handle error, e.g., show an error message
        }
      };

    return (

        <div className='col-md-8 mb-8'>

            <div className='card h-100'>
                <a href='#!'>
                    <img
                        className='img-fluid w-100'
                        style={{ height: '200px' }}
                        src={`/uploads/${product.fileName}`}
                        alt='product'

                    />
                </a>

                <div className='card-body text-center'>
                    <h5>{product.productName}</h5>
                    <hr />
                    <h6 className='md-3'>
                        <span className='text-secondary mr-2'>
                            {product.productPrice.toLocaleString('en-US',
                                {
                                    style: 'currency',
                                    currency: 'LKR',
                                })}
                        </span>
                    </h6>

                    <p className='text-muted'>{product.productQty <= 0 ? 'Out of Stock' : 'In stock'}</p>

                    <p>
                        {product.productDesc.length > 60 ? product.productDesc.substring(0, 60) + '...' : product.productDesc.substring(0, 60)}
                    </p>

                    {adminPage && (
                        <>
                            <Link
                                to={`/admin/edit/product/${product._id}`}
                                type='button'
                                className='btn btn-secondary btn-sm me-2'>

                                <i className='far fa-edit pr-1'></i>
                                Edit
                            </Link>
                            <button type='button' className='btn btn-danger btn-sm' onClick={() => dispatch(deleteProduct(product._id))}>
                                <i className='far fa-trash-alt pr-1'></i>
                                Delete
                            </button>
                        </>
                    )}

                    {homePage && (
                        <>
                            <div className="d-flex justify-content-between">
                                <Link to={`/product/${product._id}`} type='button' className='btn btn-dark btn-sm me-2'>
                                    View Product
                                </Link>
                                <button type='button' className='btn btn-success btn-sm' disabled={product.productQty <= 0} onClick={() => addToCart(product._id, 1)}>
                                    <i className='fa-solid fa-cart-shopping pr-1'></i>
                                    Add to Cart
                                </button>
                            </div>
                        </>
                    )}

                </div>
            </div>
        </div>
    );
};

export default Card;