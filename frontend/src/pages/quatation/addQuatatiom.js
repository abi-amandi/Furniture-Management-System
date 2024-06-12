import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const QuotationForm = () => {
  const [formData, setFormData] = useState({
    quotation_company_name: '',
    quotation_company_email: '',
    phone: '',
    company_description: '',
    furniture_types: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [furnitureImages, setFurnitureImages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: '' });
  };

  const handleImageChange = (e) => {
    setFurnitureImages([...furnitureImages, ...Array.from(e.target.files)]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const data = new FormData();
      for (let key in formData) {
        data.append(key, formData[key]);
      }
      furnitureImages.forEach((image) => {
        data.append('furniture_images', image);
      });

      const response = await axios.post('http://localhost:4000/api/quatation/create_quotation', data);

      setFormData({
        quotation_company_name: '',
        quotation_company_email: '',
        phone: '',
        company_description: '',
        furniture_types: ''
      });
      setFurnitureImages([]);

      Swal.fire({
        icon: 'success',
        title: 'Quotation Added Successfully!',
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      console.error('Error:', error.response.data);

      Swal.fire({
        icon: 'error',
        title: 'Error Occurred',
        text: 'Failed to add quotation. Please try again.',
        confirmButtonText: 'Ok'
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.quotation_company_email || !/\S+@\S+\.\S+/.test(formData.quotation_company_email)) {
      errors.quotation_company_email = 'Invalid email format';
    }
    if (!formData.phone || !/^\d{10}$/.test(formData.phone)) {
      errors.phone = 'Phone number must be 10 digits';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", marginTop: "50px",marginBottom: "50px", padding: "20px", border: "1px solid #ddd", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '24px', fontWeight: 'bold' }}>Add Quotation</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ marginBottom: '8px', fontWeight: 'bold' }}>Company Name:</label>
          <input
            type="text"
            name="quotation_company_name"
            value={formData.quotation_company_name}
            onChange={handleChange}
            required
            style={{ width: '100%', height: '40px', borderRadius: '4px', border: '1px solid #ccc', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ marginBottom: '8px', fontWeight: 'bold' }}>Company Email:</label>
          <input
            type="email"
            name="quotation_company_email"
            value={formData.quotation_company_email}
            onChange={handleChange}
            required
            style={{ width: '100%', height: '40px', borderRadius: '4px', border: '1px solid #ccc', padding: '8px' }}
          />
          {formErrors.quotation_company_email && <span style={{ color: 'red', fontSize: '14px' }}>{formErrors.quotation_company_email}</span>}
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ marginBottom: '8px', fontWeight: 'bold' }}>Phone:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            style={{ width: '100%', height: '40px', borderRadius: '4px', border: '1px solid #ccc', padding: '8px' }}
          />
          {formErrors.phone && <span style={{ color: 'red', fontSize: '14px' }}>{formErrors.phone}</span>}
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={{ marginBottom: '8px', fontWeight: 'bold' }}>Furniture Description:</label>
          <textarea
            name="company_description"
            value={formData.company_description}
            onChange={handleChange}
            required
            style={{ width: '100%', minHeight: '80px', borderRadius: '4px', border: '1px solid #ccc', padding: '8px' }}
          />
        </div>


        <div style={{ display: 'flex', marginBottom: '20px' }}>
          <div style={{ flex: '1', marginRight: '10px' }}>
            <label style={{ marginBottom: '8px', fontWeight: 'bold' }}>Furniture Types:</label>
            <select
              name="furniture_types"
              value={formData.furniture_types}
              onChange={handleChange}
              style={{ width: '100%', height: '40px', borderRadius: '4px', border: '1px solid #ccc', padding: '8px' }}
              required
            >
              <option value="">Select Furniture Type</option>
              <option value="Dinning Chairs">Dinning Chairs</option>
              <option value="Beds">Beds</option>
              <option value="Mirrors">Mirrors</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div style={{ flex: '1' }}>
            <label style={{ marginBottom: '8px', fontWeight: 'bold' }}>Images:</label>
            <input
              type="file"
              name="furniture_images"
              onChange={handleImageChange}
              accept="image/*"
              multiple
              style={{ display: 'none' }} // Hide the input field
              ref={(fileInput) => (fileInput && fileInput.setAttribute('multiple', 'multiple'))}
            />
            <button
              type="button"
              onClick={() => document.getElementsByName('furniture_images')[0].click()}
              style={{ width: '100%', height: '40px', backgroundColor: '#007bff', color: '#fff', borderRadius: '4px', border: 'none', cursor: 'pointer' }}
            >
              Add Image
            </button>
            {furnitureImages.map((image, index) => (
              <div key={index}>
                <img src={URL.createObjectURL(image)} alt={`Furniture ${index}`} style={{ width: '100px', height: '100px', objectFit: 'cover', margin: '5px', borderRadius: '4px' }} />
              </div>
            ))}
          </div>
        </div>
        <button type="submit" style={{ width: '100%', height: '40px', backgroundColor: '#007bff', color: '#fff', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>Submit</button>
      </form>
    </div>
  );
};

export default QuotationForm;
