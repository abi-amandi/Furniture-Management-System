import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/DeliveryRiderDashboard.css';

const MainRiderDashboard = () => {
  const navigate = useNavigate();
  const [acceptedOrders, setAcceptedOrders] = useState([]);

  useEffect(() => {
    const fetchAcceptedOrders = async () => {
      try {
        const response = await fetch('/api/order/rider');
        const data = await response.json();
        setAcceptedOrders(data);
      } catch (error) {
        console.error('Error fetching accepted orders:', error);
      }
    };

    fetchAcceptedOrders();
  }, []);

  const handleOrderClick = (orderId) => {
    console.log(orderId)
    navigate(`/riders/orders/${orderId}`);
  };

  return (
    <div className="delivery-rider-dashboard">
      <div className='bg-dark text-white py-4' style={{ marginBottom: '20px', marginLeft: '-30px', marginRight: '-30px', marginTop: '-28px' }}>
          <div className='container'>
              <div className='row'>
                  <div className='col-md-6'>
                      <h1>
                          <i> Delivery Dashboard</i>
                      </h1>
                  </div>
              </div>
          </div>
      </div>
      <nav className="navigation">
        <ul>
          <li>
            <Link to="/delivery/orders" className="navigation-link">
              <i className="fas fa-list"></i> Available Orders
            </Link>
          </li>
          <li>
            <Link to="#" className="navigation-link active">
              <i className="fas fa-check-circle"></i> Accepted Orders
              <span className="badge">{acceptedOrders.length}</span>
            </Link>
          </li>
        </ul>
        
      </nav>
      <main className="content">
        <h2 style={{ marginTop: '50px', marginBottom: '50px' }}>Accepted Orders</h2>
        {acceptedOrders.length > 0 ? (
          <div className="orders-containers" style={{ marginBottom: '80px' }}>
            {acceptedOrders.map((order, index) => (
            <div key={order._id} className="order-card" onClick={() => handleOrderClick(order._id)} style={{ opacity: order.order.status === 'out for delivery' || order.order.status === 'delivered' ? 0.5 : 1 }}>
              <h3 style={{ fontStyle: 'italic', marginBottom: '20px' }}><strong>Order ID: {order._id}</strong></h3>
              <p><strong>Customer:</strong> {order.user.username}</p>
              <p><strong>Delivery Address:</strong> {order.user.address}</p>
            </div>
            ))}
          </div>
        ) : (
          <p className="no-orders-message">You currently have no accepted orders.</p>
        )}
      </main>
    </div>
  );
};

export default MainRiderDashboard;
