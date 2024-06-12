import React from 'react';
import { Link } from 'react-router-dom';
import image1 from '../../assets/image1.jpg';
import laptop from '../../assets/laptop.jpg';
import office from '../../assets/office.jpg';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const CustomerFeedback = () => {
  return (
    <div
      style={{
        backgroundColor: '#cbd5e0',
        minHeight: '100vh',
        padding: '32px',
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
          maxWidth: '1920px',
          height: '50%',
          width: '80%',
          backgroundColor: 'rgba(237, 242, 247, 0.6)',
          padding: '32px',
          borderRadius: '16px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h1
          style={{
            borderRadius: '32px',
            backgroundColor: '#a69b87',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            fontSize: '48px',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '32px',
          }}
        >
          Customer Complaints and Feedback
        </h1>

        <div style={{ display: 'flex' }}>
          <div style={{ flex: '1', marginRight: '32px' }}>
            <img
              src={laptop}
              alt="Person working on a laptop"
              style={{
                width: '100%',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              }}
            />
          </div>
          <div style={{ flex: '1' }}>
            <div
              style={{
                backgroundColor: 'rgba(237, 242, 247, 0.6)',
                padding: '24px',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              }}
            >
              <p
                style={{
                  fontSize: '24px',
                  lineHeight: '1.5',
                  marginBottom: '24px',
                }}
              >
                Your satisfaction fuels our passion for excellence. At ISURU Spectro, we're dedicated to providing you with exceptional service and quality furniture pieces that enhance your living spaces. We value your feedback, whether it's a suggestion, a concern, or a compliment. Your input helps us continually improve and tailor our offerings to meet your needs. Reach out to us today to share your thoughts and experiences. Together, let's create the perfect home environment for you!
              </p>
              <Link to="/complaints" style={{ textDecoration: 'none' }}>
                <button
                  style={{
                    backgroundColor: '#3182ce',
                    color: '#ffffff',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    padding: '12px 24px',
                    borderRadius: '9999px',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  Click here to make a complaint
                  <ArrowForwardIcon style={{ marginLeft: '8px' }} />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerFeedback;
