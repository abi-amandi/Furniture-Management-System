import '../styles/HeaderDelivery.css'
import { Link } from 'react-router-dom'

const DeliveryHeader = () => {
    return (
        <div className='navigation'>
                <li>
                  <Link to='/riders/registrationform'>
                    <button className='fas fa-user-plus'></button> <lable>New Riders</lable>
                  </Link>
                </li>
                <li>
                  <Link to='/vehicles/registrationform'>
                    <button className='fas fa-truck-pickup'></button> <lable>New Vehicles</lable>
                  </Link>
                </li>
                <li>
                  <Link to='/riders/dashboard'>
                    <button className='fas fa-users'></button> <lable>All Riders</lable>
                  </Link>
                </li>
                <li>
                  <Link to='/vehicles/dashboard'>
                    <button className='fas fa-truck'></button> <lable>All Vehicles</lable>
                  </Link>
                </li>
        </div>
    )
}

export default DeliveryHeader