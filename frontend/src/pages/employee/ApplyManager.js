import React from 'react'
import Layout from '../../components/employee/Layout';
import { Col, Form, Input, Row, message } from 'antd'
import {useSelector,useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {showLoading, hideLoading} from '../../redux/features/alertSlice'
import axios from 'axios'
import '../../styles/employee/HomeStyles.css';

const ApplyManager = () => {
    const {user} = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    //handle form
    const handleFinish = async(values) =>{
        try {
            dispatch(showLoading())
            const res = await axios.post('/api/v1/user/apply-manager', {...values, userId:user._id},{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(hideLoading())
            if(res.data.success){
                message.success(res.data.message)
                navigate('/managerHome')
            }else{
                message.error(res.data.message)
            }
        } catch (error) {
            dispatch(hideLoading())
            console.log(error)
            message.error('Something Went Wrong')
        }
    }
  return (
    <div className="manager">
        <Layout>
        <h1 className="text-center">Apply Manager</h1>
        <Form layout="vertical" onFinish={handleFinish} className="m-3">
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
                        <Input type="text" placeholder="your emai"/>
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
                    Submit
                </button>
            </div>
        </Form>
    </Layout>
    </div>
  )
}

export default ApplyManager