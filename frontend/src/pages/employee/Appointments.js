import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../../components/employee/Layout';
import { Table } from 'antd';
import moment from 'moment';
import '../../styles/employee/HomeStyles.css';

const Appointments = () => {
    const [leaveAppointments, setAppointments] = useState([]);

    const getAppointments = async () => {
        try {
            const res = await axios.get('/api/v1/user/user-appointments', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (res.data.success) {
                setAppointments(res.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAppointments();
    }, []);

    const columns = [
        {
            title: 'Reason',
            dataIndex: 'reason',
        },
        {
            title: 'Type',
            dataIndex: 'type',
        },
        {
            title: 'Appointment Date',
            dataIndex: 'appDate',
            render: (text) => moment(text).format('DD-MM-YYYY'),
        },
        {
            title: 'Status',
            dataIndex: 'status',
        },
    ];

    return (
        <div className='appointment'>
            <Layout>
                <h1>Leave Appointment Lists</h1>
                <Table columns={columns} dataSource={leaveAppointments} />
            </Layout>
        </div>
    );
};

export default Appointments;
