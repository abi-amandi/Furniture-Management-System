import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/MainDash.css';
import axios from 'axios';
import { useRole } from '../components/RoleContext';
import Chart from 'chart.js/auto';

const MainAdminDashboard = () => {
    const [orders, setOrders] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [errors, setErrors] = useState(false);
    const [isSidePanelOpen, setSidePanelOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const { role } = useRole();
    const sidePanelRef = useRef(null);
    const navigate = useNavigate();
    const chartRef = useRef(null);

    useEffect(() => {
        if (role !== 'admin') {
            navigate('/login');
        } else {
            axios.get('/api/orders/all')
                .then(response => {
                    if (response.status !== 200) {
                        throw new Error('Failed to fetch data');
                    }
                    setOrders(response.data);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    setErrors(true);
                })
                .finally(() => {
                    setLoading(false);
                });
        }

        const handleOutsideClick = (event) => {
            if (sidePanelRef.current && !sidePanelRef.current.contains(event.target)) {
                setSidePanelOpen(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [role, navigate]);

    useEffect(() => {
        if (orders) {
            const orderDates = orders.map(order => new Date(order.createdAt).toLocaleDateString());
            const orderCounts = orderDates.reduce((acc, date) => {
                acc[date] = (acc[date] || 0) + 1;
                return acc;
            }, {});
    
            const labels = Object.keys(orderCounts);
            const data = Object.values(orderCounts);
    
            if (chartRef.current) {
                if (chartRef.current.chart) {
                    chartRef.current.chart.destroy();
                }
                const ctx = chartRef.current.getContext('2d');
                chartRef.current.chart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Order Placing Frequency',
                            data: data,
                            fill: false,
                            borderColor: 'rgb(75, 192, 192)',
                            tension: 0.1
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            }
        }
    }, [orders]);    

    const toggleSidePanel = () => {
        setSidePanelOpen(!isSidePanelOpen);
    };

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'pending':
                return 'orange';
            case 'processing':
                return 'blue';
            case 'cancelled':
                return 'red';
            case 'finished':
                return 'green';
            default:
                return 'gray';
        }
    }

    const totalOrderAmount = orders ? orders.reduce((total, order) => total + order.total, 0).toLocaleString() : '0';
    const pendingOrdersCount = orders ? orders.filter(order => order.status === 'pending').length : 0;
    const processingOrdersCount = orders ? orders.filter(order => order.status === 'processing').length : 0;
    const cancelledOrdersCount = orders ? orders.filter(order => order.status === 'cancelled').length : 0;

    const handleOrderClick = (orderId) => {
        const selected = orders.find(order => order._id === orderId);
        setSelectedOrder(selected);
    }

    return (
        <div className='container-dashboard' style={{ marginTop: '-50px' }}>
            <div className='upper-container' style={{ marginTop: '50px' }}>
                <div className='upper-left-container' style={{ display: 'flex', justifyContent: 'space-between', marginTop: '-190px' }}>
                    <div className='small-container enhanced' style={{ backgroundColor: '#FFFFFF', width: '150px', height: '150px', cursor: 'pointer' }} onClick={() => console.log('Total Sales Clicked')}>
                        <p style={{ paddingTop: '10px', paddingLeft: '10px', color: '#333' }}><strong>Total Sales</strong></p>
                        <p style={{ textAlign: 'center', marginTop: '35px', fontSize: '18px', color: '#007bff' }}><strong>LKR {totalOrderAmount}</strong></p>
                    </div>
                    <div className='small-container enhanced' style={{ backgroundColor: '#FFFFFF', width: '150px', height: '150px', cursor: 'pointer' }} onClick={() => console.log('Pending Orders Clicked')}>
                        <p style={{ paddingTop: '10px', paddingLeft: '10px', color: '#333' }}><strong>Pending,</strong></p>
                        <p style={{ textAlign: 'center', marginTop: '35px', fontSize: '18px', color: '#ffc107' }}><strong>{pendingOrdersCount}</strong></p>
                    </div>
                    <div className='small-container enhanced' style={{ backgroundColor: '#FFFFFF', width: '150px', height: '150px', cursor: 'pointer' }} onClick={() => console.log('Processing Orders Clicked')}>
                        <p style={{ paddingTop: '10px', paddingLeft: '10px', color: '#333' }}><strong>Processing,</strong></p>
                        <p style={{ textAlign: 'center', marginTop: '35px', fontSize: '18px', color: '#28a745' }}><strong>{processingOrdersCount}</strong></p>
                    </div>
                    <div className='small-container enhanced' style={{ backgroundColor: '#FFFFFF', width: '150px', height: '150px', cursor: 'pointer' }} onClick={() => console.log('Cancelled Orders Clicked')}>
                        <p style={{ paddingTop: '10px', paddingLeft: '10px', color: '#333' }}><strong>Cancelled,</strong></p>
                        <p style={{ textAlign: 'center', marginTop: '35px', fontSize: '18px', color: '#dc3545' }}><strong>{cancelledOrdersCount}</strong></p>
                    </div>
                </div>
                <div className='upper-right-container'>
                    <canvas ref={chartRef}></canvas>
                </div>
            </div>
            <div className='bottom-container'>
                <div className='bottom-left-container' style={{ marginTop: '-200px' }}>
                    {selectedOrder && (
                        <div>
                            <p style={{ marginBottom: '30px' }}><strong>Order Number: # {selectedOrder._id}</strong></p>
                            <p>- Status: {selectedOrder.status}</p>
                            <p>- Customer: {selectedOrder.user.username}</p>
                            <p>- Address: {selectedOrder.user.address}</p>
                            <p>- Contact: mobile ({selectedOrder.user.mobile}) / email ({selectedOrder.user.email})</p>
                            <p>- Items:</p>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                {selectedOrder.orderItems.map((item, index) => (
                                    <ul key={item.product._id} style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
                                        <div>
                                            <p>{index+1}. {item.product.productName}</p>
                                            <p>(LKR {item.total.toLocaleString()})</p>
                                        </div>
                                    </ul>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <div className='bottom-right-container'>
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : errors ? (
                        <p>Error fetching data</p>
                    ) : (
                        <table className='orders-table'>
                            <thead>
                                <tr>
                                    <th>Order Number</th>
                                    <th>Placed at</th>
                                    <th></th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders && orders.map((order) => (
                                    <tr key={order._id} onClick={() => handleOrderClick(order._id)}>
                                        <td># {order._id}</td>
                                        <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                        <td>
                                            <span
                                                className='status-box'
                                                style={{ backgroundColor: getStatusColor(order.status) }}
                                            ></span>
                                            {order.status}
                                        </td>
                                        <td>LKR {order.total}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
            <div ref={sidePanelRef} className={`side-panel ${isSidePanelOpen ? 'open' : ''}`}>
                <div className='title-container'>
                    <p><strong>Admin Menu</strong></p>
                </div>
                <div className='options-container' >
                    <Link to='/delivery/main/dashboard' className='option'><button style={{ backgroundColor: 'transparent', color: 'white', border: 'none' }}>Delivery</button></Link>
                    <Link to='/admin/dashboard' className='option'><button style={{ backgroundColor: 'transparent', color: 'white', border: 'none' }}>Product</button></Link>
                    <Link to='/admin/quatationDetails' className='option'><button style={{ backgroundColor: 'transparent', color: 'white', border: 'none' }}>SupplierRequests</button></Link>
                    <Link to='/admin/WherehouseDetails' className='option'><button style={{ backgroundColor: 'transparent', color: 'white', border: 'none' }}>WareHouse</button></Link>
                    <Link to='/managerHome' className='option'><button style={{ backgroundColor: 'transparent', color: 'white', border: 'none' }}>Employee</button></Link>
                    <Link to='/complaintDashboard' className='option'><button style={{ backgroundColor: 'transparent', color: 'white', border: 'none' }}>Complaints</button></Link>
                    <Link to='/userList' className='option'><button style={{ backgroundColor: 'transparent', color: 'white', border: 'none' }}>Users</button></Link>
                    <Link to='/profileAdmin' className='option'><button style={{ backgroundColor: 'transparent', color: 'white', border: 'none' }}>My profile</button></Link>
                </div>
            </div>
           {!isSidePanelOpen && (
                <button className='toggle-button' onClick={toggleSidePanel} style={{ position: 'absolute', left: '10px', zIndex: '9999', top: '110px', bottom: '590px', padding: '10px' }}>
                    <i className={`fas ${isSidePanelOpen ? 'fa-times' : 'fa-bars'}`}></i>
                </button>
            )}
        </div>
    );
};

export default MainAdminDashboard;
