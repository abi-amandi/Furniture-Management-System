import React from 'react'
import "../../styles/employee/LayoutStyles.css"
import { adminMenu, userMenu} from '../../Data/data';
import { Link,useLocation,useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import {Badge, message} from 'antd';
const Layout = ({children}) => {
    const {user} =useSelector((state) => state.user)
    const location = useLocation();
    const navigate = useNavigate();

    //logout function
    const handleLogout = () => {
        localStorage.clear()
        message.success('Logout Successfully')
        navigate('/loginmanager')
    };

    //========manager menu =======
    const managerMenu = [
        {
            name:'Home',
            path:'/managerHome',
            icon: "fa-solid fa-house",
        },
        {
            name:'Leave Appointments',
            path:'/manager-appointments',
            icon: "fa-solid fa-list",
        },
        {
            name:'Profile',
            path:`/manager/profileEmp/${user?._id}`,
            icon: "fa-solid fa-user",
        },
        
    ];
    //========manager menu =======

    //redering menu list
    const SidebarMenu = user?.isAdmin ? adminMenu : user?.isManager ? managerMenu : userMenu;
  return (
    <>
    <div className='main'>
        <div className='layout'>
            <div className='sidebar'>
                <div className='logo'>
                    <h6>Spectro furnitures' Employee</h6>
                    <hr/>
                    </div>
                <div className='menu'>
                    {
                        SidebarMenu.map(menu => {
                            const isActive = location.pathname === menu.path
                            return(
                                <>
                                    <div className={`menu-item ${isActive && 'active'}`}>
                                        <i className= {menu.icon}></i>
                                        <Link to={menu.path}>{menu.name}</Link>
                                    </div>
                                </>
                            )
                        })
                    }
                    <div className={`menu-item`} onClick={handleLogout}>
                                        <i className= "fa-solid fa-right-from-bracket"></i>
                                        <Link to="/loginmanager">Logout</Link>
                                    </div>
                </div>
                
            </div>
            <div className='content'>
                <div className='header'>
                    <div className='header-content'  style={{cursor: "pointer"}}>
                    <Badge count={user && user.notification.length} onClick={() => {navigate("/notification");}}
                        
                    >
                    <i class="fa-solid fa-bell"></i>
                    </Badge>
                      
                      <Link to="/profileEmp">{user?.name}</Link>
                    </div>
                </div>
                <div className='body'>{children}</div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Layout;