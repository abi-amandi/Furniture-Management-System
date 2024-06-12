import React, { useEffect, useState } from 'react';
import Layout from '../../../components/employee/Layout';
import axios from 'axios';
import { Table, message, Input } from 'antd';
import '../admin/Man.css';

const Managers = () => {
    const [managers, setManagers] = useState([]);
    const [searchText, setSearchText] = useState('');

    // Fetch managers
    const getManagers = async () => {
        try {
            const res = await axios.get('/api/v1/admin/getAllManagers', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (res.data.success) {
                setManagers(res.data.data);
            }
        } catch (error) {
            console.log(error);
            message.error('Failed to fetch managers');
        }
    };

    // Handle account status
    const handleAccountStatus = async (record, status) => {
        try {
            const res = await axios.post('/api/v1/admin/changeAccountStatus', {
                managerId: record._id,
                userId: record.userId,
                status: status
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (res.data.success) {
                message.success(res.data.message);
                getManagers(); // Refresh managers after status change
            }
        } catch (error) {
            message.error('Something went wrong');
        }
    };

    useEffect(() => {
        getManagers();
    }, []);

    // Filter managers based on search text
    const filteredManagers = managers.filter(manager =>
        manager.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
        manager.lastName.toLowerCase().includes(searchText.toLowerCase())
    );

    // Ant Design table columns
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text, record) => (
                <span>{record.firstName} {record.lastName}</span>
            )
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Department',
            dataIndex: 'department',
        },
        {
            title: 'Status',
            dataIndex: 'status',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (text, record) => (
                <div className="d-flex">
                    {record.status === 'pending' ? (
                        <button className="btn btn-success"
                            onClick={() => handleAccountStatus(record, "approved")}>Approve</button>
                    ): (
                        <button className="btn btn-light">Accepted</button>
                    )
                }
                </div>
            )
        },
    ];

    return (
        <Layout >
            <div className="search-container mb-3" >
                <Input
                    placeholder="Search by name"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
            </div>
            <h1 className='text-center m-2'>All Managers</h1>
            <Table columns={columns} dataSource={filteredManagers} />
        </Layout>
    );
};

export default Managers;
