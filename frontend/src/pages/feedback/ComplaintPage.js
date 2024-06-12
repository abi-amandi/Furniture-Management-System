import React from 'react';
import { Link } from 'react-router-dom';
import image1 from '../../assets/image1.jpg';
import serviceIcon from '../../assets/service-icon.png';
import webpageIcon from '../../assets/webpage-icon.png'; // Import the webpage icon

const ComplaintsPage = () => {
  return (
    <div
      style={{
        backgroundColor: '#cbd5e0',
        minHeight: '100vh',
        borderRadius: '16px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url(${image1})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div
        style={{
          maxWidth: '1900px',
          width: '100%',
        }}
      >
        <div
          style={{
            backgroundColor: '#a69b87',
            padding: '8px',
            borderRadius: '64px',
            overflow: 'hidden',
            width: '80%',
            marginLeft: '10%',
            display: 'flex',
            justifyContent: 'center',
            marginTop:"-10%"
          }}
        >
          <h1
            style={{
              fontSize: '60px',
              fontWeight: 'bold',
              marginBottom: '0',
              color: '#000',
            }}
          >
            Customer Complaints and Feedback
          </h1>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '80px' }}>
          <Link to="/service-complaint" style={{ textDecoration: 'none' }}>
            <button
              style={{
                backgroundColor: '#3182ce',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: '2rem',
                padding: '20px 40px',
                borderRadius: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40%',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                marginLeft:'30%'
              }}
            >
              <img
                src={serviceIcon}
                alt="Service Icon"
                style={{ marginRight: '16px', height: '40px', width: '40px' }}
              />
              Service Type Complaint
            </button>
          </Link>
          <Link to="/webpage-complaint" style={{ textDecoration: 'none' }}>
            <button
              style={{
                backgroundColor: '#3182ce',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: '2rem',
                padding: '20px 70px',
                borderRadius: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40%',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                marginLeft:'30%'
              }}
            >
              <img
                src={webpageIcon}
                alt="Webpage Icon"
                style={{ marginRight: '16px', height: '40px', width: '40px' }}
              />
              Webpage Type Complaint
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ComplaintsPage;
