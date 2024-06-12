import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Orders.css';

const getProgressBarStyle = (status) => {
  let color;
  switch (status) {
    case 'pending':
      color = 'yellow';
      break;
    case 'processing':
      color = 'orange';
      break;
    case 'out for delivery':
      color = 'green';
      break;
    case 'delivered':
      color = 'blue';
      break;
    case 'cancelled':
      color = 'red';
      break;
    default:
      color = 'gray';
  }

  return { backgroundColor: color };
};

const OrderDetailsPopup = ({ selectedOrder, handleClosePopup, cancelOrder }) => (
  <aside className="order-details-popup">
    <button className="close-btn" onClick={handleClosePopup}>
      <span aria-label="Close">×</span>
    </button>
    <div className="item-images">
      {selectedOrder.orderItems.map((item) => (
        <img key={item.product._id} src={`/uploads/${item.product.fileName}`} alt={item.product.productName} />
      ))}
    </div>
    <p>Items: {selectedOrder.orderItems.map((item) => item.product.productName).join(', ')}</p>
    <p>Date: {new Date(selectedOrder.createdAt).toLocaleDateString()}</p>
    <p>Total: LKR {selectedOrder.total.toFixed(2)}</p>
    <div className="order-status-details">
      <p>Status: {selectedOrder.status}</p>
      <div className="progress-bar-large" style={getProgressBarStyle(selectedOrder.status)}></div>
    </div>
    {selectedOrder.status !== 'cancelled' && (
      <button className='btn-cancel' onClick={() => cancelOrder(selectedOrder._id)}>Cancel Order</button>
    )}
  </aside>
);

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchDate, setSearchDate] = useState('');
  const [isCancelling, setIsCancelling] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showCancelled, setShowCancelled] = useState(false); // Add state for filtering cancelled orders

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/api/orders');
        setOrders(response.data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleRowClick = (order) => {
    setSelectedOrder(order);
  };

  const handleClosePopup = () => {
    setSelectedOrder(null);
  };

  const handleSearch = (e) => {
    setSearchDate(e.target.value);
    const formattedDate = new Date(e.target.value).toLocaleDateString('en-CA');

    const filteredOrders = orders.filter((order) => {
      const formattedOrderDate = new Date(order.createdAt).toLocaleDateString('en-CA');
      return formattedOrderDate.includes(formattedDate);
    });

    setSearchResults(filteredOrders);
  };

  const CancelOrder = async () => {
    const confirmed = window.confirm('Are you sure you want to cancel this order?');
    if (!confirmed) {
      return;
    }
  
    setIsCancelling(true);
    try {
      await axios.put(`/api/orders/${selectedOrder._id}`, { status: 'cancelled' });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === selectedOrder._id ? { ...order, status: 'cancelled' } : order
        )
      );
      handleClosePopup();
    } catch (error) {
      console.error('Error cancelling order:', error);
      setIsCancelling(false);
    }
  };
  

  const handleShowCancelled = () => {
    setShowCancelled(!showCancelled);
  };

  return (
    <div className="orders-container">
      <header className="header">
        <h1>Order History</h1>
        <div className="search-bar">
          <input
            type="date"
            placeholder="Search by date..."
            value={searchDate}
            onChange={handleSearch}
          />
          {searchResults.length > 0 && <p className="search-results">Showing {searchResults.length} results</p>}
        </div>
        <div className="filter-bar">
          <label htmlFor="show-cancelled">Show Cancelled Orders</label>
          <input
            type="checkbox"
            id="show-cancelled"
            checked={showCancelled}
            onChange={handleShowCancelled}
          />
        </div>
      </header>
      <main className="main-content">
        {error && <div className="error-message">An error occurred while fetching orders.</div>}
        {isLoading && <div className="loading-message">Loading...</div>}
        {!isLoading && !error && (
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Items</th>
                <th>Date</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {(searchResults.length > 0 ? searchResults : orders)
                .filter((order) => !showCancelled || order.status === 'cancelled')
                .map((order) => (
                  <tr key={order._id} onClick={() => handleRowClick(order)} className={`order-details-row ${selectedOrder === order ? 'selected' : ''} ${order.status === 'cancelled' ? 'cancelled' : ''}`}>
                    <td>#{order._id}</td>
                    <td className="item-details">
                      <div className="item-summary">
                        {order.orderItems.map((item) => (
                          <span key={item.product._id} className="item-name">
                            {item.product.productName}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td>LKR {order.total.toFixed(2)}</td>
                    <td>
                      <div className="order-status">
                        {selectedOrder === order && (
                          <>
                            <div className="progress-bar" style={getProgressBarStyle(order.status)}></div>
                            <p>{order.status}</p>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        )}
      </main>

      <br/> <br/> <br/> <br/> <br/> <br/> <br/>
      {selectedOrder && <OrderDetailsPopup selectedOrder={selectedOrder} handleClosePopup={handleClosePopup} cancelOrder={CancelOrder} />}  
    </div>
  );
};

export default Orders;
