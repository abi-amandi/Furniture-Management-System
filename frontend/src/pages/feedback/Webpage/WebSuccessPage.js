import React from 'react';
import { Link } from 'react-router-dom';
import office from '../../../assets/office.jpg';

const SuccessPage = ({_id}) => {
  
    if (!_id) {
      return null; // or display a message indicating that _id is undefined
    }
  return (
    <div className="bg-gray-200 min-h-screen p-8 rounded-lg shadow-md flex items-center justify-center" style={{ backgroundImage: `url(${office})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="w-full max-w-4xl">
        <div className="flex items-center justify-center" style={{ backgroundColor: '#a69b87', padding: '16px', 
        borderRadius: '64px', overflow: 'hidden', width: '80%', marginLeft: '11%' }}>
          <h1 className="text-xl font-bold mb-4 text-black text-center" style={{ fontSize: '70px' }}>Customer Complaints and Feedback</h1>
        </div>

        <div className="flex mt-4">
          <div className="w-full pl-1">
            <div className="bg-white bg-opacity-50 p-6 rounded-lg shadow-md" style={{ height: '100%', width: '80%',marginLeft:'10%' }}>
              <h2 className="text-xl font-bold mb-4 text-black text-center" style={{ fontSize: '70px' }}>Your Complaint Sent Successfully !</h2>
              <p className="text-gray-700 mb-4" style={{ fontSize: '30px', minWidth: '100%' }}>
                Thank you for submitting your complaint! Our team will review it and get back to you as soon as possible. In the meantime, feel free to browse our website or check the status of your complaint.
              </p>
              <div className="flex flex-col">
                <div className="mb-4">
                  <Link to={`/web-view-complaint/${_id}`} className="no-underline">
                    <button className="bg-[#4b2d2b] hover:bg-blue-400 text-black font-bold py-2 px-4 rounded-full text-center" style={{ fontSize: '24px', display: 'block', width: '50%', marginLeft: 'auto' }}>
                      View Complaint
                    </button>
                  </Link>
                </div>
                <div>
                  <Link to="/web-complaintstatus" className="no-underline">
                    <button className="bg-[#4b2d2b] hover:bg-green-400 text-black font-bold py-2 px-4 rounded-full text-center" style={{ fontSize: '24px', display: 'block', width: '50%', marginLeft: 'auto' }}>
                      Complaint Status
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
