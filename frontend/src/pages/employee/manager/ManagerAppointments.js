import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { message, Button } from 'antd';
import moment from 'moment';
import Layout from '../../../components/employee/Layout';
import '../manager/managerStyles.css';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ManagerAppointments = () => {
    const [leaveAppointments, setLeaveAppointments] = useState([]);

    const getLeaveAppointments = async () => {
        try {
            const res = await axios.get('/api/v1/manager/manager-appointments', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (res.data.success) {
                setLeaveAppointments(res.data.data);
            }
        } catch (error) {
            console.log(error);
            message.error('Failed to fetch leave appointments');
        }
    };

    useEffect(() => {
        getLeaveAppointments();
    }, []);

    const generatePDF = () => {
        const columns = [
            { title: 'User Name', dataKey: 'username' },
            { title: 'Type', dataKey: 'type' },
            { title: 'Reason', dataKey: 'reason' },
            { title: 'Appointment Date', dataKey: 'appDate' },
            { title: 'Status', dataKey: 'status' }
        ];

        const rows = leaveAppointments.map(appointment => ({
            username: appointment.username,
            type: appointment.type,
            reason: appointment.reason,
            appDate: moment(appointment.appDate).format('YYYY-MM-DD'),
            status: appointment.status
        }));

        const doc = new jsPDF();

        doc.autoTable({
            columns,
            body: rows,
            margin: { top: 30 },
            styles: { overflow: 'linebreak' }
        });

        doc.save('appointment_report.pdf');
    };

    const handleStatus = async (record, status) => {
        try {
            const res = await axios.post('/api/v1/manager/update-status', { appointmentsId: record._id, status }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (res.data.success) {
                message.success(res.data.message);
                getLeaveAppointments();
            }
        } catch (error) {
            console.log(error);
            message.error('Something went wrong');
        }
    };

    return (
        <div className='managerapp'>
            <Layout>
                <Button type="primary" onClick={generatePDF} className='report-btn fa-solid fa-download'></Button>
                <h1>Leave Appointment Lists</h1>
                <table>
                    <thead>
                        <tr>
                            <th>User Name</th>
                            <th>Type</th>
                            <th>Reason</th>
                            <th>Appointment Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaveAppointments.map(appointment => (
                            <tr key={appointment._id}>
                                <td>{appointment.username}</td>
                                <td>{appointment.type}</td>
                                <td>{appointment.reason}</td>
                                <td>{moment(appointment.appDate).format('YYYY-MM-DD')}</td>
                                <td>{appointment.status}</td>
                                <td>
                                    {appointment.status === 'pending' && (
                                        <div className='d-flex'>
                                            <button className='btn btn-success' onClick={() => handleStatus(appointment, 'approved')}>Approved</button>
                                            <button className='btn btn-danger ms-2' onClick={() => handleStatus(appointment, 'reject')}>Reject</button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Layout>
        </div>
    );
};

export default ManagerAppointments;
