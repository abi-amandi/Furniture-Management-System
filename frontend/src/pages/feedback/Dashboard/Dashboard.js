import React from 'react';
import { Link } from 'react-router-dom';
import serviceIcon from '../../../assets/service-icon.png';
import webpageIcon from '../../../assets/webpage-icon.png';
import backgroundImage from '../../../assets/image1.jpg';

const Dashboard = () => {
  const containerStyle = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '2rem',
  };

  const headingStyle = {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: '2rem',
    textAlign: 'center',
  };

  const buttonStyle = {
    backgroundColor: '#007bff',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '1.5rem',
    padding: '1.5rem 3rem',
    borderRadius: '2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    marginBottom: '1.5rem',
    width: '100%',
    maxWidth: '400px',
  };

  return (
    <div style={containerStyle}>
      <div className="text-center">
        <h1 style={headingStyle}>Admin Dashboard</h1>
        <div className="row">
          <div className="col-md-6">
            <Link to="/viewservicetypecomplaint" className="no-underline">
              <button style={buttonStyle}>
                <img src={serviceIcon} alt="Service Icon" className="mr-3" style={{ height: '2rem' }} />
                View Service Type Complaint
              </button>
            </Link>
          </div>
          <div className="col-md-6">
            <Link to="/viewwebtypecomplaint" className="no-underline">
              <button style={buttonStyle}>
                <img src={webpageIcon} alt="Webpage Icon" className="mr-3" style={{ height: '2rem' }} />
                View Webpage Type Complaint
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
