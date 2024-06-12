import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/Invoice.css';
import axios from 'axios';

const Invoice = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchOrder = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`/api/orders/${orderId}`);
                setOrder(response.data);
                setLoading(false);
            } catch (error) {
                console.log(`error: ${error}`);
                setLoading(false);
            }
        };

        fetchOrder();
    }, [orderId]);

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="invoice-container">
            {loading && <p>Loading...</p>}
            {order && (
                <>
                    <div className="invoice-details">
                        <div className="invoice-details-left">
                            <h3>Bill From</h3>
                            <p>Spectro PVT Limited</p>
                            <p>Ja-ela road</p>
                            <p>Kirindiwita, Western Province</p>
                            <p>Email: contactus@spectro.com</p>
                        </div>
                        <div className="invoice-details-right">
                            <h3>Bill To</h3>
                            <p>{order.user.username}</p>
                            <p><strong>Email:</strong> {order.user.email}</p>
                            <p><strong>Contact:</strong> {order.user.mobile}</p>
                            <p><strong>Address:</strong> {order.user.address}</p>
                        </div>
                    </div>
                    <table className="invoice-table">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Quantity</th>
                                <th>Unit Price</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.orderItems.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.product.productName}</td>
                                    <td>{item.quantity}</td>
                                    <td>${item.product.productPrice}</td>
                                    <td>${(item.quantity * item.product.productPrice).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="invoice-footer">
                        <span style={{ position: 'absolute', left: '175px', marginTop: '10px' }}>Date: {new Date(order.createdAt).toLocaleDateString()}</span>
                        <p>Subtotal: ${order.total.toFixed(2)}</p>
                    </div>
                    <button onClick={handlePrint}>Print</button>
                </>
            )}
        </div>
    );
};

export default Invoice;
