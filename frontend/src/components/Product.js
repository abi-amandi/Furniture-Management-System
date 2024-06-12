import React , {useEffect}from "react";
import {useDispatch, useSelector } from "react-redux";
import { getProduct } from "../redux/actions/productActions";
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom"; // Import useParams hook

const Product = () => {
    const { productId } = useParams(); // Use useParams hook to get the productId
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Use useNavigate hook to get navigation function

    useEffect(() => {
        dispatch(getProduct(productId))
    }, [dispatch, productId]);

    const { product } = useSelector(state => state.products);

    const handleGoBackBtn = () => {
        navigate(-1); // Go back one step in the history stack
    };

    const addToCart = async (id) => {
        axios.post('/api/cart', {
            product: id
        })
        .then(response => {
            console.log(response.data); // Handle successful response
        })
        .catch(error => {
            console.error(error); // Handle errors
        });
    }

    return (
        <section className='product-page m-4'>
            <button to='/shop' className='btn btn-light text-primary mb-4' onClick={handleGoBackBtn}> Go Back </button>
            {product && (
                <div className='row'>
                    <div className='col-md-6'>
                        <img
                            className='img-fluid w-90 mb-4'
                            style={{ height: '500px' }}
                            src={`/uploads/${product.fileName}`}
                            alt='product'
                        />
                    </div>
                    <div className='col-md-5'>
                        <h3 className='mb-4'>{product.productName}</h3>
                        <p className='text-muted border-top py-2'>
                            Price: {product.productPrice.toLocaleString('en-US',
                                {
                                    style: 'currency',
                                    currency: 'LKR',
                                })}
                        </p>
                        <p className='text-muted border-top py-2'> Status: {' '} {product.productQty <= 0? 'Out of Stock' : 'In Stock'}</p>
                        <p className='text-muted border-top py-2'> Description : {product.productDesc}</p>
                        <div className='d-grid gap-2 '>
                            <button className='btn btn-dark btn-lg d-block mb-5 py-2 ' disabled={product.productQty <= 0} onClick={() => addToCart(product._id)}>Add to Cart</button>
                        </div>    
                    </div>
                </div>
            )}
        </section>
    );
};

export default Product;
