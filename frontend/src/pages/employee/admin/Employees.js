import React, { useEffect, useState } from 'react';
import Layout from '../../../components/employee/Layout';
import axios from 'axios';
import { Table, Button, Space, Modal, Input, Form } from 'antd';
import Swal from 'sweetalert2';
import '../admin/Man.css';

const Employees = () => {
    const [users, setUsers] = useState([]);
    const [editingUserId, setEditingUserId] = useState(null);
    const [form] = Form.useForm();
    const [searchText, setSearchText] = useState('');

    const getUsers = async () => {
        try {
            const res = await axios.get('/api/v1/admin/getAllUsers', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (res.data.success) {
                setUsers(res.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    const handleSalaryUpdate = async (values, userId) => {
        try {
            const { basicSalary, leaves } = values;
            const newSalary = basicSalary - (leaves * 1000);
            const res = await axios.put(`/api/v1/user/update-user/${userId}`, { salary: newSalary }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (res.data.success) {
                const updatedUsers = users.map(user => {
                    if (user._id === userId) {
                        return { ...user, salary: newSalary };
                    }
                    return user;
                });
                setUsers(updatedUsers);
                setEditingUserId(null);
                Swal.fire({
                    icon: 'success',
                    title: 'Salary Updated!',
                    text: 'The salary has been updated successfully.',
                    timer: 2000,
                    showConfirmButton: false
                });
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong! Please try again.',
            });
        }
    };

    const handleBlockUser = async (userId) => {
        try {
            const res = await axios.delete(`/api/v1/user/delete-user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (res.data.success) {
                const updatedUsers = users.filter(user => user._id !== userId);
                setUsers(updatedUsers);
                Swal.fire({
                    icon: 'success',
                    title: 'User Blocked!',
                    text: 'The user has been blocked successfully.',
                    timer: 2000,
                    showConfirmButton: false
                });
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed to block user. Please try again.',
            });
        }
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Category',
            dataIndex: 'category',
        },
        {
            title: 'Manager',
            dataIndex: 'isManager',
            render: (text, record) => (
                <span>{record.isManager ? 'Yes' : 'No'}</span>
            ),
        },
        {
            title: 'Salary',
            dataIndex: 'salary',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (text, record) => (
                <Space>
                    <Button onClick={() => setEditingUserId(record._id)}>Salary</Button>
                    //<Button
                        className="btn btn-danger"
                        onClick={() => {
                            Modal.confirm({
                                title: 'Are you sure you want to block this user?',
                                icon: 'warning',
                                okText: 'Yes',
                                cancelText: 'No',
                                onOk: () => handleBlockUser(record._id)
                            });
                        }}
                    >
                        Block
                    </Button>
                </Space>
            ),
        },
    ];

    // Filter users based on search text
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchText.toLowerCase()) ||
        user.email.toLowerCase().includes(searchText.toLowerCase()) ||
        user.category.toLowerCase().includes(searchText.toLowerCase()) ||
        (user.isManager ? 'yes' : 'no').includes(searchText.toLowerCase()) ||
        user.salary.toString().includes(searchText.toLowerCase())
    );

    return (
        <Layout>
            <div className="search-container mb-3">
                <Input
                    placeholder="Search"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
            </div>
            <h1 className="text-center m-2">Employees List</h1>
            <Table columns={columns} dataSource={filteredUsers} />
            <Modal
                title="Edit Salary"
                visible={editingUserId !== null}
                onCancel={() => setEditingUserId(null)}
                footer={null}
            >
                <Form
                    form={form}
                    onFinish={(values) => handleSalaryUpdate(values, editingUserId)}
                >
                    <Form.Item
                        name="basicSalary"
                        label="Basic Salary"
                        rules={[{ required: true, message: 'Please input basic salary!' }]}
                    >
                        <Input type="number" placeholder="Enter basic salary" />
                    </Form.Item>
                    <Form.Item
                        name="leaves"
                        label="Number of Leaves"
                        rules={[{ required: true, message: 'Please input number of leaves!' }]}
                    >
                        <Input type="number" placeholder="Enter number of leaves" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </Layout>
    );
};

export default Employees;
