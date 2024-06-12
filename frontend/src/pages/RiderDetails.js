import React, { useState } from 'react';
import '../styles/Rider.css';
import axios from 'axios';

const RiderForm = () => {
    const [rider, setRider] = useState('');
    const [age, setAge] = useState('');
    const [address, setAddress] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [ nic, setNic ] = useState('');
    const [license, setLicense] = useState(null);
    const [insurance, setInsurance] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!rider || !age || !address || !mobile || !email || !license ||!insurance) {
            setError('Fill all the required fields.');
            return;
        }

        try {
            const formData = new FormData();

            formData.append('rider', rider);
            formData.append('age', age);
            formData.append('address', address);
            formData.append('mobile', mobile);
            formData.append('email', email);
            formData.append('license', license);
            formData.append('insurance', insurance);
            formData.append('nic', nic)

            const response = await axios.post("/api/riders", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status !== 200) {
                throw new Error('Registration failed');
            } else {
                console.log('Success ..');
            }
        } catch (error) {
            setError(error.response.data);
        }
    };

    return (
        <div className='main-container'>
            <div className="vehicle-form-container">
                <h2>Driver Data Form</h2>
                {error && <div className="error">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <input placeholder='Name' type='text' value={rider} onChange={(e) => setRider(e.target.value)} />
                    <input placeholder='Age' type='text' value={age} onChange={(e) => setAge(e.target.value)} />
                    <input placeholder='Address' type='text' value={address} onChange={(e) => setAddress(e.target.value)} />
                    <input placeholder='Contact Number' type='text' value={mobile} onChange={(e) => setMobile(e.target.value)} />
                    <input placeholder='Email' type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input placeholder='NIC' type='text' value={nic} onChange={(e) => setNic(e.target.value)} />
                    <div className='upload'>
                        <label>Upload a frontside picture of the license</label>
                        <input type='file' onChange={(e) => setLicense(e.target.files[0])} />
                        <label>Upload the frontside picture of the insurance</label>
                        <input type='file' onChange={(e) => setInsurance(e.target.files[0])} />
                    </div>
                    <div className='img-container'>
                        <img className='img' src="https://i.ibb.co/jwn9Vk6/vehicle.jpg" alt="vehicle" border="0" />
                    </div>
                    <button className='btn-submit' type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default RiderForm;
