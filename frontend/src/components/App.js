import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Header from './Header';
import AdminDashboard from './AdminDashboard';
import AdminEditProduct from './AdminEditProduct';
import AdminProductReport from './AdminProductReport';
import Home from './Home';
import Shop from './Shop';
import Product from './Product';
import Login from '../pages/Login';
import Signup from '../pages/Registration';
import Cart from '../pages/CartPage';
import Orders from '../pages/OrdersPage';
import OrderDet from '../pages/OrderDetails';
// import RiderDet from '../pages/RiderDet';
import Invoice from '../pages/Invoice';
import Vehicle from '../pages/VehicleDetails';
import Rider from '../pages/RiderDetails'; 
import VehicleDash from '../pages/VehiclesDash'; 
import RiderDash from '../pages/RidersDash'; 
import OrderAccept from '../pages/DeliveryRiderOrders';
import OrdersAccepted from '../pages/Status';
import AdminRegister from '../pages/AdminRegisters'
import MainAdminDashboard from '../pages/AdminMainDashboard';
import DeliveryAdminMain from '../pages/DeliveryAdminMain';
import DeliveryRiderMainDashboard from '../pages/DeliveryRiderMainDashboard';
import Register from '../pages/Registration';
import RiderInvoice from '../pages/RiderInvoice';
import Footer from './Footer';

//supply
import AddSupplier from '../pages/supply/addsupplier';
import SupplierDetails from '../pages/supply/supplierdetails';
import UpdateSupplier from '../pages/supply/UpdateSupplier';
import SupplierReport from '../pages/supply/Dashboard';
//quatation
import AddQuatation from '../pages/quatation/addQuatatiom';
import QuatationDetails from '../pages/quatation/quatationdetails';

//warehouse
import UpdateOrder from '../pages/warehouse/UpdateDetails';
import AddWereHouse from '../pages/warehouse/addwarehouse';
import WereHouseDetails from '../pages/warehouse/Whearehousedetails';




import HomePage from '../pages/employee/HomePage';
import Loginmanager from '../pages/employee/Login';
import Registermanager from '../pages/employee/Register';
import { useSelector } from 'react-redux';
import Spinner from '../components/employee/Spinner';
import ProtectedRoute from '../components/employee/ProtectedRoute';
import PublicRoute from '../components/employee/PublicRoute';
import ApplyManager from '../pages/employee/ApplyManager';
import NotificationPage from '../pages/employee/NotificationPage';
import Employees from '../pages/employee/admin/Employees';
import Managers from '../pages/employee/admin/Managers';
import ProfileEmp from '../pages/employee/manager/Profile';
import BookingPage from '../pages/employee/BookingPage';
import Appointments from '../pages/employee/Appointments';
import ManagerAppointments from '../pages/employee/manager/ManagerAppointments';


//complaint
import CustomerFeedback from '../pages/feedback/CustomerComplaint';
import ComplaintPage from '../pages/feedback/ComplaintPage';

import ServiceComplaintFormPage from '../pages/feedback/Service/ServiceTypeComplaint';
import WebpageComplaintFormPage from '../pages/feedback/Webpage/WebpageTypeComplaint';
import ViewComplaintPage from '../pages/feedback/Service/ViewComplaint';
import ComplaintStatusPage from '../pages/feedback/Service/ComplaintStatus';
import SuccessPage from '../pages/feedback/Service/SuccessPage';
import WebSuccessPage from '../pages/feedback/Webpage/WebSuccessPage';
import WebComplaintStatusPage from '../pages/feedback/Webpage/WebComplaintStatus';
import Dashboard from '../pages/feedback/Dashboard/Dashboard';
import ViewService from '../pages/feedback/Dashboard/ViewServiceTypeComplaint';
import ViewWeb from '../pages/feedback/Dashboard/ViewWebTypeComplaint';

import WebViewComplaintPage from '../pages/feedback/Webpage/WebViewComplaint';

import Profiles from '../pages/profile';
import ProfileAdmin from '../pages/profileAdmin';
import UserList from '../pages/userList';


const App = () => {

    return (
        <BrowserRouter>
            <Header/>
            <main>
                <Routes>



                    <Route path="/profile" element={<Profiles/>} />
                    <Route path="/profileAdmin" element={<ProfileAdmin/>} />
                    <Route path="/userList" element={<UserList/>} />

                      {/* Routes for complaint */}
                    <Route path="/feedbackHome" element={<CustomerFeedback />} />
                    <Route path="/complaints" element={<ComplaintPage />} />
                
                    <Route path="/service-complaint" element={<ServiceComplaintFormPage />} />
                    <Route path="/webpage-complaint" element={<WebpageComplaintFormPage/>} />
                    <Route path="/view-complaint/:_id" element={<ViewComplaintPage/>} />
                    {/* <Route path={`/view-complaint/:id`} component={ViewComplaintPage} /> */}

                    <Route path="/web-view-complaint/:_id" element={<WebViewComplaintPage/>} />
                    <Route path="/service-complaintstatus" element={<ComplaintStatusPage/>} />
                    <Route path="/web-complaintstatus" element={<WebComplaintStatusPage/>} />
                    <Route path="/service-success" element={<SuccessPage/>} />
                    <Route path="/web-success" element={<WebSuccessPage/>} />
                    <Route path="/complaintDashboard" element={<Dashboard/>} />
                    <Route path="/viewservicetypecomplaint" element={<ViewService/>} />
                    <Route path="/viewwebtypecomplaint" element={<ViewWeb/>} />






                    <Route path="/apply-manager" element={<ProtectedRoute><ApplyManager/></ProtectedRoute>}/>
                    <Route path="/admin/users" element={<ProtectedRoute><Employees/></ProtectedRoute>}/>
                    <Route path="/admin/managers" element={<ProtectedRoute><Managers/></ProtectedRoute>}/>
                    <Route path="/manager/profileEmp" element={<ProtectedRoute><ProfileEmp/></ProtectedRoute>}/>
                    <Route path="/manager/profileEmp/:id" element={<ProtectedRoute><ProfileEmp/></ProtectedRoute>}/>
                    <Route path="/manager/book-appointment/:managerId" element={<ProtectedRoute><BookingPage/></ProtectedRoute>}/>
                    <Route path="/notification" element={<ProtectedRoute><NotificationPage/></ProtectedRoute>}/>
                    <Route path="/loginmanager" element={<PublicRoute><Loginmanager/></PublicRoute>}/>
                    <Route path="/registermanager" element={<PublicRoute><Registermanager/></PublicRoute>}/>
                    <Route path="/leaveappointments" element={<ProtectedRoute><Appointments/></ProtectedRoute>}/>
                    <Route path="/manager-appointments" element={<ProtectedRoute><ManagerAppointments/></ProtectedRoute>}/>
                    <Route path="/managerHome" element={<ProtectedRoute><HomePage/></ProtectedRoute>}/>
                    

                    <Route exact path='/admin/register' Component={AdminRegister}/>
                    <Route exact path='/admin' Component={Login}/>
                    <Route exact path='/register' Component={Register}/>

                    <Route exact path='/admin/dashboard' Component={AdminDashboard}/>
                    <Route exact path='/' Component={Home}/>
                    <Route exact path='/shop' Component={Shop}/>

                    {/* Routes for products */}
                    <Route exact path='/product/:productId' Component={Product}/>
                    <Route exact path='/admin/edit/product/:productId' Component={AdminEditProduct}/>
                    <Route exact path='/admin/report' Component={AdminProductReport}/>

                    {/* Routes for users */}
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/signup' element={<Signup/>}/>

                    {/* Routes for cart & order management */}
                    <Route path='/cart' element={<Cart/>}/>
                    <Route path='/orders/management' element={<Orders/>}/>
                    <Route path='/orders/management/:id' element={<OrderDet/>}/>
                    <Route path='/orders/invoice/:orderId' element={<Invoice />}/>

                    {/* Routes for vehicles & riders */}
                    <Route path='/vehicles/registrationform' element={<Vehicle/>}/>
                    <Route path='/riders/registrationform' element={<Rider/>}/>
                    <Route path='/vehicles/dashboard' element={<VehicleDash/>}/>
                    <Route path='/riders/dashboard' element={<RiderDash/>}/> 
                    {/* <Route path='/riders/:id' element={<RiderDet/>}/> */}
                    <Route path='/delivery/orders' element={<OrderAccept />} />
                    <Route path='/riders/orders/:orderId' element={<OrdersAccepted />} />
                    <Route path='/delivery/main/dashboard' element={<DeliveryAdminMain />} />
                    <Route path='/delivery/rider/dashboard' element={<DeliveryRiderMainDashboard />} />
                    <Route path='/rider/invoice/:id' element={<RiderInvoice />} />

                    <Route path='/admin/main/dashboard' element={<MainAdminDashboard />} />


                    
                    {/* Routes for supply */}
                    <Route path='/admin/AddSupplier' element={<AddSupplier/>}></Route>
                    <Route path='/admin/supplierDetails' element={<SupplierDetails/>}></Route>
                    <Route path='/updateOrder/:id' element={<UpdateSupplier/>}></Route>
                    <Route path='admin/totalSupplierReport' element={<SupplierReport/>}></Route>

                    {/* Routes for quatation */}
                    <Route path='/addQuatation' element={<AddQuatation/>}></Route>
                    <Route path='/admin/quatationDetails' element={<div><QuatationDetails/></div>}></Route>

                       {/* Routes for warehouse */}
                    <Route path='/admin/addwherehouse' element={<AddWereHouse/>}></Route>
                    <Route path='/admin/WherehouseDetails' element={<WereHouseDetails/>}></Route>
                    <Route path='/admin/updateWareHouse/:id' element={<UpdateOrder/>}></Route>
            

                </Routes>
            </main>
            <Footer/>
        </BrowserRouter>
    );
};

export default App;
