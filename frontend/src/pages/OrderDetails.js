import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/OrderDet.css';

const OrderDet = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchOrder = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`/api/orders/${id}`);
                setOrder(response.data);
                setLoading(false);
            } catch (error) {
                console.log(`error: ${error}`);
                setLoading(false);
            }
        };

        fetchOrder();
    }, [id]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending':
                return '#ff9800'; // Orange
            case 'Processing':
                return '#2196f3'; // Blue
            case 'Shipped':
                return '#4caf50'; // Green
            case 'Delivered':
                return '#8bc34a'; // Light Green
            case 'Cancelled':
                return '#f44336'; // Red
            default:
                return '#9e9e9e'; // Grey
        }
    };

    return (
        <div className='order-details-container'>
            {loading && <p>Loading...</p>}
            {order && (
                <div>
                    <h2>Order Details</h2>
                    <div className='order-details'>
                        <p><strong>Order ID:</strong> {id}</p>
                        <p><strong>Product:</strong> {order.product ? order.product.title : 'N/A'}</p>
                        <p><strong>Created At:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                        <p><strong>Quantity:</strong> {order.quantity}</p>
                        <div className='status-bar' style={{ backgroundColor: getStatusColor(order.status) }}></div>
                        <p><strong>Status:</strong> {order.status}</p>
                        <p><strong>Total:</strong> LKR {order.total}</p>
                    </div>
                    <div className='btn-container'>
                        <button className='cancel-btn'>Cancel Order</button>
                        <button className='edit-btn'>Edit</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderDet;
