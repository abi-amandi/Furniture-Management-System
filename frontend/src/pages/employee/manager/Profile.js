import React, { useEffect, useState } from 'react'
import Layout from '../../../components/employee/Layout';
import axios from 'axios'
import {useParams} from 'react-router-dom'
import { Col, Form, Input, Row, message } from 'antd'
import {useSelector,useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {showLoading,hideLoading} from '../../../redux/features/alertSlice'
import '../manager/managerStyles.css';

const Profile = () => {
    const {user} = useSelector(state => state.user)
    const [manager, setManager] = useState(null)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams()

    //update manager =========
    //handle form
    const handleFinish = async(values) =>{
        try {
            dispatch(showLoading())
            const res = await axios.post('/api/v1/manager/updateProfile', {...values, userId:user._id},{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(hideLoading())
            if(res.data.success){
                message.success(res.data.message)
                navigate('/managerHome')
            }else{
                message.error(res.data.success)
            }
        } catch (error) {
            dispatch(hideLoading())
            console.log(error)
            message.error('Something Went Wrong')
        }
    }

    //getManager Details
    const getManagerInfo = async() => {
        try {
            const res = await axios.post('/api/v1/manager/getManagerInfo', {userId: params.id},
            {
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }) 
            if(res.data.success){
                setManager(res.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
        useEffect(() => {
            getManagerInfo();
            //eslint-disable-next-line
        },[]);
    
  return (
    <div className='profile'>
        <Layout>
        <h1>Manage Profile</h1>
        {manager && (
            <Form layout="vertical" onFinish={handleFinish} className="m-3" initialValues={manager}>
            <h4 className="">Personal Details : </h4>
                <Row gutter={20}>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="First Name" name="firstName" required rules={[{required:true}]}>
                            <Input type="text" placeholder="your name"/>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Last Name" name="lastName" required rules={[{required:true}]}>
                            <Input type="text" placeholder="your name"/>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Phone Number" name="phone" required rules={[{required:true}]}>
                            <Input type="text" placeholder="your phone number"/>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Email" name="email" required rules={[{required:true}]}>
                            <Input type="text" placeholder="your email"/>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Website" name="website" required rules={[{required:true}]}>
                            <Input type="text" placeholder="your website(optional)"/>
                        </Form.Item>
                    </Col>
                </Row>
    
                <h4 className="">Professional Details : </h4>
                <Row gutter={20}>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Department" name="department" required rules={[{required:true}]}>
                            <Input type="text" placeholder="your department"/>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Experience" name="experience" required rules={[{required:true}]}>
                            <Input type="text" placeholder="years of experience"/>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Manager From" name="managerFrom" required rules={[{required:true}]}>
                            <Input type="date" placeholder="manager from date"/>
                        </Form.Item>
                    </Col>
                </Row>
                <div className="d-flex justify-content-end">
                    <button className="btn btn-primary form-btn" type="submit">
                        Update
                    </button>
                </div>
            </Form>
        )}
    </Layout>
    </div>
  )
}

export default Profile