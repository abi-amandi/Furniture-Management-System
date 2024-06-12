import React from 'react';
import { useNavigate } from 'react-router-dom';

const ManagerList = ({ manager }) => {
    const navigate = useNavigate();

    // Check if the manager's status is 'pending'
    if (manager.status === 'pending') {
        return null; 
    }

    return (
        <div>
            <div className='card m-2' style={{ cursor: 'pointer' }} onClick={() => navigate(`/manager/book-appointment/${manager._id}`)}>
                <div className='card-header'>
                    Mr. {manager.firstName} {manager.lastName}
                </div>
                <div className='card-header'>
                    <p>
                        <b>Department</b> {manager.department}
                    </p>
                    <p>
                        <b>Email</b> {manager.email}
                    </p>
                    <p>
                        <b>PhoneNo</b> {manager.phone}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ManagerList;
