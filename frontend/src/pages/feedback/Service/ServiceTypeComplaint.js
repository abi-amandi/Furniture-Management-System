import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import image2 from '../../../assets/image2.jpg';
import axios from 'axios';
import SuccessPage from './SuccessPage'; // Import your success page component
import serviceIcon from '../../../assets/service-icon.png';
import ViewComplaintPage from './ViewComplaint';

const ServiceComplaintFormPage = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    customerId: '',
    customerName: '',
    registerNo: '',
    mobile: '',
    email: '',
    productName: '',
    address1: '',
    address2: '',
    date: '',
    time: '',
    complaint: '',
    desireResolution: '',
    acceptStatus: false,
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [customerId, setCustomerId] = useState(''); 

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setFormData({
      ...formData,
      [name]: val,
    });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (!value.trim()) {
      setErrors({
        ...errors,
        [name]: `${name.charAt(0).toUpperCase() + name.slice(1)} is required`,
      });
    } else {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      try {
        const response = await axios.post('http://localhost:4000/service', formData);
        console.log("*****************",response.data);
        const { _id } = response.data.service; // Extract complaint ID from response
      console.log("=========================", _id);
      
      setCustomerId(_id);
        setSubmitted(true);
        alert('Complaint submitted successfully!');
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
    
  };


  const validateForm = () => {
    let errors = {};
    let isValid = true;
  
    for (const [key, value] of Object.entries(formData)) {
      if (typeof value === 'string' && !value.trim()) {
        errors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
        isValid = false;
      }
    }
  
    setErrors(errors);
    return isValid;
  };

  // Render the success page component if form is submitted
  if (submitted) {
    return <SuccessPage  _id={customerId} />;
  }

  return (
    <div className="min-h-screen p-8 rounded-lg shadow-md flex " style={{ backgroundImage: `url(${image2})`, backgroundSize: 'cover',marginTop:'-5%',marginBottom:'-3.5%'}}>
      <div className="bg-gray-200 bg-opacity-75 w-full max-w-full rounded-xl p-12" style={{ background: 'rgba(224,255,255, 0.6)',width: '1000px',margin: '50px auto',boxShadow: '0 4px 8px rgba(0,0,0,0.1)',borderRadius: '20px', padding: '10px',marginTop:'5%'}}>
      <div className="flex items-center justify-center mb-8" style={{marginTop:'5%'}}>
          <img src={serviceIcon} alt="Service Icon" style={{ width: '50px', height: 'auto', marginRight: '20px', }} />
          <h1 className="font-bold mb-4 text-black text-center text-4xl">Service Type Complaint</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Customer ID */}
            <div className="flex items-center mb-4">
              <label htmlFor="customerId" className="block mr-4 font-bold" style={{ minWidth: '150px', fontSize: '20px' }}>Customer ID:</label>
              <input type="text" id="customerId" name="customerId" value={formData.customerId} onChange={handleChange} onBlur={handleBlur} className="flex-grow p-3 border rounded text-lg" style={{width:'80%'}} />
            </div>
            {errors.customerId && <p className="text-red-500 text-center">{errors.customerId}</p>}
            <div className="flex items-center mb-4">
              <label htmlFor="customerName" className="block mr-4 font-bold" style={{ minWidth: '150px', fontSize: '20px' }}>Customer Name:</label>
              <input type="text" id="customerName" name="customerName" value={formData.customerName} onChange={handleChange} onBlur={handleBlur} className="flex-grow p-3 border rounded text-lg" style={{width:'80%'}} />
            </div>
            {errors.customerName && <p className="text-red-500 text-center">{errors.customerName}</p>}

          <div className="flex items-center mb-4">
            <label htmlFor="registerNo" className="block mr-4 font-bold " style={{ minWidth: '150px', fontSize: '20px' }}>Register No:</label>
            <input type="text" id="registerNo" name="registerNo" value={formData.registerNo} onChange={handleChange} onBlur={handleBlur} className="flex-grow p-3 border rounded" style={{width:'80%'}}/>
          </div>
          {errors.registerNo && <p className="text-red-500 text-center">{errors.registerNo}</p>}

          <div className="flex items-center mb-4">
            <label htmlFor="mobile" className="block mr-4 font-bold " style={{ minWidth: '150px', fontSize: '20px' }}>Phone Number:</label>
            <input type="text" id="mobile" name="mobile" value={formData.mobile} onChange={handleChange} onBlur={handleBlur} className="flex-grow p-3 border rounded" style={{width:'80%'}}/>
          </div>
          {errors.mobile && <p className="text-red-500 text-center">{errors.mobile}</p>}

          <div className="flex items-center mb-4">
            <label htmlFor="email" className="block mr-4 font-bold " style={{ minWidth: '150px', fontSize: '20px' }}>Email Address:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} onBlur={handleBlur} className="flex-grow p-3 border rounded" style={{width:'80%'}}/>
          </div>
          {errors.email && <p className="text-red-500 text-center">{errors.email}</p>}

          <div className="flex items-center mb-4">
            <label htmlFor="productName" className="block mr-4 font-bold " style={{ minWidth: '150px', fontSize: '20px' }}>Product Name / <br/> Product ID:</label>
            <input type="text" id="productName" name="productName" value={formData.productName} onChange={handleChange} onBlur={handleBlur} className="flex-grow p-3 border rounded" style={{width:'80%'}}/>
          </div>
          {errors.productName && <p className="text-red-500 text-center">{errors.productName}</p>}

          <div className="flex items-center mb-4">
            <label htmlFor="address1" className="block mr-4 font-bold " style={{ minWidth: '150px', fontSize: '20px' }}>Address 1:</label>
            <input type="text" id="address1" name="address1" value={formData.address1} onChange={handleChange} onBlur={handleBlur} className="flex-grow p-3 border rounded" style={{width:'80%'}}/>
          </div>
          {errors.address1 && <p className="text-red-500 text-center">{errors.address1}</p>}

          <div className="flex items-center mb-4">
            <label htmlFor="address2" className="block mr-4 font-bold " style={{ minWidth: '150px', fontSize: '20px' }}>Address 2:</label>
            <input type="text" id="address2" name="address2" value={formData.address2} onChange={handleChange} onBlur={handleBlur} className="flex-grow p-3 border rounded" style={{width:'80%'}}/>
          </div>

          <div className="flex flex-wrap">
  <div className="flex items-center mb-4" style={{ width: "50%" }}>
    <label
      htmlFor="date"
      className="block mr-4 font-bold "
      style={{ minWidth: "150px", fontSize: "20px" }}
    >
      Date of the Complaint:
    </label>
    <input
      type="date"
      id="date"
      name="date"
      value={formData.date}
      onChange={handleChange}
      onBlur={handleBlur}
      className="p-3 border rounded w-full mr-4"
      style={{ Width: "200px" }}
    />
  </div>
  <div className="flex items-center mb-4" style={{ width: "50%" }}>
    <label
      htmlFor="time"
      className="block mr-4 font-bold "
      style={{ minWidth: "150px", fontSize: "20px" }}
    >
      Time of the Complaint:
    </label>
    <input
      type="time"
      id="time"
      name="time"
      value={formData.time}
      onChange={handleChange}
      onBlur={handleBlur}
      className="p-3 border rounded w-full"
      style={{ minWidth: "200px" }}
    />
  </div>
</div>


          <div className="flex items-center mb-4" style={{ width: "50%" }}>
            <label htmlFor="complaint" className="block mr-4 font-bold " style={{ minWidth: '250px', fontSize: '20px' }}>Incident Details/Complaint:</label>
            <textarea id="complaint" name="complaint" value={formData.complaint} onChange={handleChange} onBlur={handleBlur} className="flex-grow p-5 border rounded" style={{width:'80%'}}></textarea>
          </div>
          {errors.complaint && <p className="text-red-500 text-center">{errors.complaint}</p>}

          <div className="flex items-center mb-4">
            <label className="block mr-4 font-bold " style={{ minWidth: '150px', fontSize: '20px' }}>Desired Resolution:</label>
            <div className="flex items-center">
              <input type="radio" id="exchange" name="desireResolution" value="exchange" onChange={handleChange} onBlur={handleBlur} className="mr-2 h-4 w-6" />
              <label htmlFor="exchange" className="mr-4" style={{fontSize: '18px'}}>Exchange</label>
              <input type="radio" id="refund" name="desireResolution" value="refund" onChange={handleChange} onBlur={handleBlur} className="mr-2 h-4 w-6" />
              <label htmlFor="refund" className="mr-4" style={{fontSize: '18px'}}>Refund</label>
              <input type="radio" id="others" name="desireResolution" value="others" onChange={handleChange} onBlur={handleBlur} className="mr-2 h-4 w-6" />
              <label htmlFor="others" style={{fontSize: '18px'}}>Others</label>
            </div>
          </div>
          {errors.desireResolution && <p className="text-red-500 text-center">{errors.desireResolution}</p>}

          <div className="flex justify-between items-center mb-4">
            <div className="bg-gray-200 bg-opacity-75 rounded-xl p-4" style={{ maxWidth: 'fit-content' }}>
              <input type="checkbox" id="acceptStatus" name="acceptStatus" checked={formData.acceptStatus} onChange={handleChange} onBlur={handleBlur} className="mr-2" />
              <label htmlFor="acceptStatus" className="font-bold" style={{ fontSize: '20px' }}>I'm not a Robot</label>
            </div>
            <button type="submit" className="bg-[#4b2d2b] hover:bg-blue-400 text-black font-extrabold py-4 px-8 rounded-xl" style={{ fontSize: '20px', margin: 'auto', display: 'block' }}>Submit</button>
          </div>
        </form>
        
      </div>
      
    </div>
  );
};

export default ServiceComplaintFormPage;
