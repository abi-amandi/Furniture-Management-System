import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const AcceptedOrders = () => {
  const [orderCaptured, setOrder] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [status, setStatus] = useState('');
  const { orderId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAcceptedOrders = async () => {
      try {
        const response = await axios.get(`/api/order/rider/${orderId}`);
        setOrder(response.data);
        setStatus(response.data.order.status);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchAcceptedOrders();
  }, [orderId, status]);

  const handleStatusUpdate = async (newStatus) => {
    const updates = { status: newStatus }
    const id = orderCaptured.order._id

    try {
      await axios.put(`/api/orders/${id}`, updates);
      console.log('Status updated '+ newStatus);
      setStatus(newStatus);
      
      if (newStatus === 'delivered') {
        navigate(`/rider/invoice/${id}`)
      }

    } catch (error) {
      console.log('Error updating status', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'out for delivery':
        return '#Ff0000'; // Red
      case 'delivered':
        return '#28a745'; // Green
      default:
        return '#ffc107'; // Yellow
    }
  };

  return (
    <div className="container mt-5" style={{ marginBottom: '200px' }}>
      {isLoading && (
        <div className="d-flex justify-content-center mt-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {error && <p className="text-danger text-center mt-5">Error fetching data</p>}
      {orderCaptured && (
        <div className="row rounded shadow-sm bg-light">
          <div className="col-md-6 border-right">
            <h2 className="text-center py-4">Order Details</h2>
            <div className="d-flex flex-column align-items-center mb-3">
              <p className="fw-bold mb-0">Order ID: #{orderCaptured._id}</p>
              <p className="text-muted">Assigned to You</p>
            </div>
            <div className="d-flex mb-3">
              <span className="fw-bold me-2">User:</span>
              <span>{orderCaptured.user.username}</span>
            </div>
            <div className="d-flex mb-3">
              <span className="fw-bold me-2">Email:</span>
              <span>{orderCaptured.user.email}</span>
            </div>
            <div className="d-flex mb-3">
              <span className="fw-bold me-2">Address:</span>
              <span>{orderCaptured.user.address}</span>
            </div>
          </div>
          <div className="col-md-6">
            <h2 className="text-center py-4">Order Summary</h2>
            <div className="d-flex mb-3 justify-content-between">
              <span className="fw-bold">Status:</span>
              <span style={{ backgroundColor: getStatusColor(status), padding: '0.5rem', borderRadius: '0.25rem' }}>{status}</span>
            </div>
            <div className="d-flex mb-3 justify-content-between">
              <span className="fw-bold">Total:</span>
              <span>{orderCaptured.order.total}</span>
            </div>
            <div className="form-group">
              <label style={{ marginBottom: '25px' }}>Update Status:</label>
              <span style={{ marginLeft: '50px' }}>
                <button
                  className="btn btn-primary me-2"
                  onClick={() => handleStatusUpdate('out for delivery')}
                  disabled={status === 'out for delivery'}
                >
                  Out for Delivery
                </button>
                <button
                  className="btn btn-success"
                  onClick={() => handleStatusUpdate('delivered')}
                  disabled={status === 'delivered'}
                >
                  Delivered
                </button>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AcceptedOrders;
