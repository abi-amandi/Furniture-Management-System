import React, { useState } from 'react';
import '../styles/Vehicle.css';
import axios from 'axios';

const VehicleForm = () => {
    // const [rider, setRider] = useState('');
    const [vehicleNumber, setNumber] = useState('')
    const [license, setLicense] = useState(null);
    const [insurance, setInsurance] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!license ||!insurance) {
            setError('Fill all the required fields.');
            return;
        }

        try {
            const formData = new FormData();

            formData.append('vehicleNumber', vehicleNumber)
            formData.append('license', license);
            formData.append('insurance', insurance);

            const response = await axios.post("/api/deliveryvehicles", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status !== 200) {
                throw new Error('Registration failed');
            } else {
                alert('successfully added ..')
                console.log('Success ..');
            }
        } catch (error) {
            setError(error.response.data);
        }
    };

    return (
        <div className='main-container'>
            <div className="vehicle-form-container">
                <h2>Vehicle Data Form</h2>
                {error && <div className="error">{error}</div>}
                <form onSubmit={handleSubmit}>
                    {/* <input placeholder='Name' type='text' value={rider} onChange={(e) => setRider(e.target.value)} />     */}
                    <input placeholder='Vehicle Number' type='text' value={vehicleNumber} onChange={(e) => setNumber(e.target.value)} />
                    <div className='upload'>
                        <label>Upload a frontside picture of the vehicle license</label>
                        <input type='file' onChange={(e) => setLicense(e.target.files[0])} />
                        <label>Upload the frontside picture of the vehicle insurance</label>
                        <input type='file' onChange={(e) => setInsurance(e.target.files[0])} />
                    </div>
                    <div className='img-container'>
                        <img className='img' src="https://i.ibb.co/jwn9Vk6/vehicle.jpg" alt="vehicle" border="0" />
                    </div>
                    <div className='btn-submit-container'>
                        <button className='btn-submit' type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default VehicleForm;
