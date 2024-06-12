import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRole } from '../components/RoleContext';
import RoleContext from '../components/RoleContext';
import { isEmpty } from 'lodash';
import axios from 'axios';

const Header = () => {
    const { role } = useRole()
    const { setRole } = useContext(RoleContext);
    const [contentType, setContentType] = useState('Spectro')
    const navigate = useNavigate()

    useEffect(() => {
        if (role === 'admin') {
            setContentType('Admin Dashboard')
        } else if (role === 'rider') {
            setContentType('rider dashboard')
        } else if (role === 'user') {
            setContentType(' ')
        }

    }, [role])

    const logout = async () => {
        try {
            setRole(null)
            const response = await axios.post('/api/user/logout')
            console.log(response.data.message)
            navigate('/login')      
          } catch (error) {
            console.error('Logout failed:', error)
          }
    }

    return (
        <header id='header' style={{ backgroundColor: '#f8f9fa', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', padding: '10px 0' }}>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link to='/admin/main/dashboard' className="navbar-brand" style={{ fontWeight: 'bold', color: '#333' }}>{contentType}</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            {role === 'admin' && 
                            <li className="nav-item">
                                <Link to='/admin/main/dashboard' className="nav-link" aria-current="page" style={{ color: '#333' }}><i className='fas fa-dashboard'></i> Dashboard</Link>
                                {/* <Link to='/profileAdmin' className="nav-link" aria-current="page" style={{ color: '#333' }}><i className='fas fa-dashboard'></i> My profile</Link> */}
                            </li>}
                        
                            {role === 'user' && 
                            <>
                                <li className="nav-item">
                                    <Link to='/' className="nav-link" aria-current="page" style={{ color: '#333' }}><i className='fas fa-home'></i> Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/shop' className="nav-link" aria-current="page" style={{ color: '#333' }}><i className='fas fa-shopping-bag'></i> Shop</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/cart' className="nav-link" aria-current="page" style={{ color: '#333' }}><i className='fas fa-shopping-cart'></i> Cart</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/orders/management' className="nav-link" aria-current="page" style={{ color: '#333' }}><i className='fas fa-truck'></i> Orders</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/feedbackHome' className="nav-link" aria-current="page" style={{ color: '#333' }}><i className='fas fa-comment-alt'></i>Feedback</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/profile' className="nav-link" aria-current="page" style={{ color: '#333' }}><i className='fas fa-user'></i>My Profile</Link>
                                </li>
                            </>
                            }
                            {isEmpty(role) && 
                            <li className="nav-item">
                                <Link to='/login' className="nav-link" aria-current="page" style={{ color: '#333' }}><i className='fas fa-sign-in-alt'></i> Login</Link>
                            </li>}
                            {role && 
                            <li className="nav-item">
                                <button className="nav-link" onClick={logout} style={{ border: 'none', backgroundColor: 'transparent', color: '#333', cursor: 'pointer' }}><i className='fas fa-sign-out-alt'></i> Logout</button>
                            </li>}
                            {role === 'rider' && 
                            <li className="nav-item">
                                <Link to='/delivery/rider/dashboard' className="nav-link" aria-current="page" style={{ color: '#333' }}><i className='fas fa-sign-in-alt'></i> Dashboard</Link>
                            </li>}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
