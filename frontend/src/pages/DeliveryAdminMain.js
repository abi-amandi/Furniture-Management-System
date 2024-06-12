import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/DeliveryMain.css';
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';
import { useRole } from '../components/RoleContext';
import DeliveryHeader from '../components/DeliveryAdminHeader';

const DeliveryDashboardAdmin = () => {
  const [pending, setPending] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [cancelled, setCancelled] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [ridersCount, setRidersCount] = useState(null);
  const [vehicleCount, setVehicleCount] = useState(null);
  const [pendingOrdersCount, setPendingOrdersCount] = useState(null);
  const [OutForDelivery, setOutForDeliveryOrders] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [errors, setErrors] = useState(false);
  const { role } = useRole();
  const navigate = useNavigate();

  useEffect(() => {
    if (role !== 'admin') {
      navigate('/login');
    } else {
      axios.get('/api/orders/pending')
        .then(response => {
          if (response.status !== 200) {
            throw new Error('Failed to fetch data');
          }
          setPending(response.data.length);
          return axios.get('/api/orders/processing');
        })
        .then(response => {
          if (response.status !== 200) {
            throw new Error('Failed to fetch data');
          }
          setProcessing(response.data.length);
          return axios.get('/api/orders/cancelled');
        })
        .then(response => {
          if (response.status !== 200) {
            throw new Error('Failed to fetch data');
          }
          setCancelled(response.data.length);
          return axios.get('/api/riders')
        })
        .then(response => {
          if (response.status !== 200) {
            throw new Error('Failed to fetch data');
          }
          setRidersCount(response.data.length);
          return axios.get('/api/deliveryvehicles')
        })
        .then(response => {
          if (response.status !== 200) {
            throw new Error('Failed to fetch data');
          }
          setVehicleCount(response.data.length);
          return axios.get('/api/orders/pending');
        })
        .then(response => {
          if (response.status !== 200) {
            throw new Error('Failed to fetch data');
          }
          setPendingOrdersCount(response.data.length);
          return axios.get('/api/orders/outfordelivery');
        })
        .then(response => {
          if (response.status !== 200) {
            throw new Error('Failed to fetch data');
          }
          setOutForDeliveryOrders(response.data.length)
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setErrors(true);
        })
        .finally(() => {
          setLoading(false);
          // console.log(pendingOrdersCount)
          // console.log(processing)
          // console.log(cancelled)
          // console.log(OutForDelivery)
        });
    }
  }, [role, navigate]);

  useEffect(() => {
    if (pending || processing || cancelled || OutForDelivery) {
      setChartData({
        labels: ['Pending', 'Processing', 'Cancelled', 'Out For Delivery'],
        datasets: [{
          data: [pendingOrdersCount, processing, cancelled, OutForDelivery],
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(255, 255, 86, 0.8)'
          ],
          hoverBackgroundColor: [
            'rgba(255, 99, 132, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 206, 86, 0.8)',
            'rgba(255, 255, 86, 0.8)'
          ]
        }]
      });
    }
  }, [pending, processing, cancelled, OutForDelivery]);

  return (
    <div style={{ marginBottom: '100px' }}>
      <div className='bg-dark text-white py-4' style={{ marginBottom: '20px' }}>
        <div className='container'>
          <div className='row'>
            <div className='col-md-6'>
              <h1 style={{ fontStyle: "italic" }}>
                Delivery Management
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className='container'>
        <div className='upper-container'>
          <DeliveryHeader />
        </div>
        <div className='upper-container'>
          <div className='upper-right-container'>
            <h2 style={{ marginBottom: '30px' }}>Order Status</h2>
            <div className='chart-container'>
              {chartData ? (
                <Doughnut key={JSON.stringify(chartData)} data={chartData} />
              ) : (
                <p>Loading chart...</p>
              )}
            </div>
          </div>
          <div className='upper-left-container' style={{ marginLeft: '20px' }}>
            <div className='stats-container'>
              <div className='stat-item'>
                <p>Total Riders</p>
                <p>{ridersCount}</p>
              </div>
              <div className='stat-item'>
                <p>Total Vehicles</p>
                <p>{vehicleCount}</p>
              </div>
              <div className='stat-item'>
                <p>To be Fulfilled</p>
                <p>{pendingOrdersCount}</p>
              </div>
              <div className='stat-item'>
                <p>Fulfilled</p>
                <p>{OutForDelivery}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryDashboardAdmin;
