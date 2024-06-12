import React, { useState, useEffect } from 'react';
import Layout from '../../components/employee/Layout';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { DatePicker, message, Input, Select } from 'antd';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { showLoading, hideLoading } from '../../redux/features/alertSlice';
import '../../styles/employee/HomeStyles.css';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const BookingPage = () => {
    const { user } = useSelector(state => state.user);
    const params = useParams();
    const [manager, setManager] = useState(null);
    const [appDate, setAppDate] = useState(null);
    const [type, setType] = useState('');
    const [reason, setReason] = useState('');
    const [username, setUsername] = useState(user?.name || '');
    const [errors, setErrors] = useState({}); // State to store validation errors

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Fetch manager data
    useEffect(() => {
        const getManagerData = async () => {
            try {
                const res = await axios.post('/api/v1/manager/getManagerById', { managerId: params.managerId }, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem('token')
                    }
                });
                if (res.data.success) {
                    setManager(res.data.data);
                }
            } catch (error) {
                console.log(error.response.data);
            }
        };
        getManagerData();
    }, [params.managerId]);

    // Booking function
    // Booking function
const handleBooking = async () => {
    // Validate inputs
    const errors = {};
    if (!type) {
        errors.type = 'Type is required';
    }
    if (!reason) {
        errors.reason = 'Reason is required';
    }
    if (!appDate) {
        errors.appDate = 'Date is required';
    }
    setErrors(errors);

    // If there are errors, do not proceed with booking
    if (Object.keys(errors).length > 0) {
        return;
    }

    try {
        dispatch(showLoading());
        const res = await axios.post('/api/v1/user/book-appointment', {
            managerId: params.managerId,
            userId: user._id,
            managerInfo: manager,
            appDate: appDate ? moment(appDate, "DD-MM-YYYY").format("YYYY-MM-DD") : null, // Format date here
            userInfo: user,
            type: type,
            reason: reason,
            username: username
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        dispatch(hideLoading());
        if (res.data.success) {
            message.success(res.data.message);
        }
    } catch (error) {
        dispatch(hideLoading());
        console.log(error);
    }
};

    // Logout function
    const handleLogout = () => {
        localStorage.clear();
        message.success('Logout Successfully');
        navigate('/loginmanager');
    };

    return (
        <div className='leaveappointment'>
            <Layout>
                <br />
                <h3>Leave Booking Page</h3>
                <div className='container'>
                    {manager && (
                        <div>
                            <h4>Dr.{manager.firstName} {manager.lastName}</h4>
                            <h4>Department: {manager.department}</h4>
                            <div className='d-flex flex-column w-50'>
                                <Input
                                    className="m-2"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    style={{ display: 'none' }} 
                                />
                                {/* Display error message if username is required */}
                                {errors.username && <span className="error">{errors.username}</span>}
                                <Select
                                    className="m-2"
                                    placeholder="Leave Type"
                                    value={type}
                                    onChange={(value) => setType(value)}
                                >
                                    <Option value="" disabled>Select Type</Option>
                                    <Option value="full day">Full Day</Option>
                                    <Option value="half day">Half Day</Option>
                                </Select>
                                {/* Display error message if type is required */}
                                {errors.type && <span className="error">{errors.type}</span>}
                                {/* Reason field */}
                                <Input
                                    className="m-2"
                                    placeholder="Reason"
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                />
                                {/* Display error message if reason is required */}
                                {errors.reason && <span className="error">{errors.reason}</span>}
                                {/* Date picker */}
                                <DatePicker
                                    className="m-2"
                                    format="DD-MM-YYYY"
                                    value={appDate ? moment(appDate, "DD-MM-YYYY") : null}
                                    onChange={(date, dateString) => setAppDate(dateString)}
                                />
                                {/* Display error message if date is required */}
                                {errors.appDate && <span className="error">{errors.appDate}</span>}
                                {/* Book Now button */}
                                <button className='btn btn-dark mt-2' onClick={handleBooking}>Book Now</button>
                            </div>
                        </div>
                    )}
                </div>
            </Layout>
        </div>
    );
};

export default BookingPage;
