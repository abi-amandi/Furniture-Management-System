import React from 'react';
import '../../styles/employee/RegisterStyles.css';
import {Form, Input,message} from "antd";
import axios from 'axios'
import { Link,useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux'
import { showLoading,hideLoading } from '../../redux/features/alertSlice';

const Register = () => {
    const navigate = useNavigate()
  
    const dispatch = useDispatch();
    //form handler
    const onfinishHandler = async(values) => {
        try {
            dispatch(showLoading())
            const res = await axios.post('/api/v1/user/register',values);
            dispatch(hideLoading())
            if(res.data.success)
            {
               message.success('Register Successfully!')
                navigate('/loginmanager')
            }else{
                message.error(res.data.message)
            }

        } catch (error) {
        dispatch(hideLoading())
           console.log(error.response.data) 
           message.error('Something went wrong')
        }
    };
  return (
    <>
    <div className ="form-container">
    <Form layout="vertical" onFinish={onfinishHandler} className="register-form">
        <h3 className='text-center'>Register Form</h3>
    <Form.Item label="Name" name="name">
        <Input className="register-box" type = "text" required />
    </Form.Item>
    <Form.Item label="NIC" name="nic">
        <Input className="register-box" type = "text" required />
    </Form.Item>
    <Form.Item label="Category" name="category">
        <Input  className="register-box" type = "text" required />
    </Form.Item>
    <Form.Item label="Join Date" name="joinDate">
        <Input   className="register-box" type = "date" required />
    </Form.Item>
    <Form.Item  label="Email" name="email">
        <Input   className="register-box" type = "email" required />
    </Form.Item>
    <Form.Item label="PhoneNo" name="phoneno">
        <Input className="register-box"  type = "tel" required />
    </Form.Item>
    <Form.Item label="Password" name="password">
        <Input  className="register-box" type = "password" required />
    </Form.Item>

    <Link to="/login" className='m-2'>Already user login here</Link>
    <button className="btn btn-primary" type="submit" >Register</button>
    </Form>
    </div>
    </>
  )
}

export default Register;