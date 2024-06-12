import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Cart.css';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [orderId, setOrderId] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [confirmStep, setConfirmStep] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCartItems = async () => {
            setLoading(true);
            try {
                const response = await axios.get('/api/cart');
                setCartItems(response.data);
                updateTotalPrice(response.data);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
            setLoading(false);
        };

        fetchCartItems();
    }, []);

    const updateQuantity = async (id, newQuantity, index) => {
        console.log(id)
        try {
            await axios.put(`/api/cart/${id}`, { quantity: newQuantity });
            const updatedCartItems = cartItems.map(item => {
                if (item.orderItems && item.orderItems[index].product._id === id) {
                    item.orderItems[index].quantity = newQuantity;
                    item.orderItems[index].total = newQuantity * item.orderItems[index].product.productPrice;
                }
                return item;
            });
            setCartItems(updatedCartItems);
            updateTotalPrice(updatedCartItems);
        } catch (error) {
            console.error('Error updating quantity:', error);
            alert('Failed to update quantity. Please try again.');
        }
    };

    const deleteItem = async (id) => {
        if (window.confirm('Confirm removing ..')) {
            try {
                await axios.delete(`/api/cart/${id}`);
                setCartItems(prevCartItems => prevCartItems.filter(item => item._id !== id)); // Update cartItems with a new array reference
                alert('Deleted successfully ..');
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        }
    };

    const updateTotalPrice = (items) => {
        const newTotalPrice = items.reduce((total, item) => total + (item.orderItems ? item.orderItems[0].total || 0 : 0), 0);
        setTotalPrice(newTotalPrice);
    };

    const placeOrder = async () => {
        try {
            setConfirmStep(true);
            setTimeout(async () => {
                const orderItems = cartItems.map(item => ({
                    product: item.orderItems ? item.orderItems[0].product : null,
                    quantity: item.orderItems ? item.orderItems[0].quantity : null,
                    total: item.orderItems ? item.orderItems[0].total : null,
                })).filter(orderItem => orderItem.product && orderItem.quantity && orderItem.total);

                const response = await axios.post('/api/orders', { orderItems, totalPrice });
                console.log('Response data:', response.data);

                if (response.data.orderId) {
                    const orderId = response.data.orderId;
                    setOrderPlaced(true);
                    setCartItems([]);
                    setOrderId(orderId);
                    navigate(`/orders/invoice/${orderId}`);
                } else {
                    console.error('Order ID not found in response');
                }
            }, 10000);
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };

    return (
        <div key={cartItems.length} className="cart-container">
            {loading && <p>Loading...</p>}
            {!confirmStep && (
                <>
                    <table className="cart-table">
                        <thead>
                            <tr>
                                <th>Items</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item, index) => (
                                <tr key={`${item._id}-${index}`}>
                                    <td>
                                        {item.orderItems && item.orderItems.map((orderItem, subIndex) => (
                                            <div className="item-info" key={subIndex} style={{ marginTop: '6px' }}>
                                                <img src={`/uploads/${orderItem.product.fileName}`} alt={orderItem.product.productName} />
                                                <div>
                                                    <p>{orderItem.product.productName}</p>
                                                    <div className="quantity">
                                                        <button className="fas fa-minus" onClick={() => updateQuantity(orderItem.product._id, orderItem.quantity - 1, subIndex)}></button>
                                                        <span>{orderItem.quantity}</span>
                                                        <button className="fas fa-plus" onClick={() => updateQuantity(orderItem.product._id, orderItem.quantity + 1, subIndex)}></button>
                                                        <button className='fas fa-trash' onClick={() => deleteItem(orderItem.product._id)}></button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </td>
                                    <td>${item.orderItems.reduce((total, orderItem) => total + (orderItem.total || 0), 0).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p>Total Price: ${totalPrice.toFixed(2)}</p>
                    {!orderPlaced && (
                        <button onClick={placeOrder}>Place Order</button>
                    )}
                    {orderPlaced && (
                        <p>Order placed successfully!</p>
                    )}
                </>
            )}
            {confirmStep && (
                <div className="confirmation-page" style={{ display: 'flex', flexDirection: 'row' }}>
                    <p>We will contact you soon. Please be in touch.<br/> <span style={{ color: 'gray' }}>*you can't cancel the order after 24 hours.</span> </p>
                    <div className="loading-spinner" style={{ marginLeft: '150px', marginTop: '15px' }}></div>
                    <Link to='/admin/shop'><button style={{ marginTop: '100px', marginLeft: '90px' }}>Cancel</button></Link>
                </div>
            )}

           <br/> <br/> <br/>
        </div>
    );
};

export default Cart;
