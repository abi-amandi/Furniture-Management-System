import React,{useEffect, useState} from 'react'
import axios from 'axios'
import Layout from '../../components/employee/Layout';
import { Row } from 'antd';
import ManagerList from '../../components/employee/ManagerList';
import '../../styles/employee/HomeStyles.css';

const HomePage = () => {

const [managers, setManagers] = useState([])

// login user data
const getUserData = async() => {
  try {
    const res = await axios.get('/api/v1/user/getAllManagers', {
      headers:{
        Authorization : "Bearer " + localStorage.getItem('token')
      }
    });
    if(res.data.success){
      setManagers(res.data.data)
    }
  } catch (error) {
    console.log(error.response.data)
  }
}

useEffect(() => {
  getUserData()
}, [])
  return (
    
      <div  className="home">
        <Layout>
        <h1 className='text-center'>Home Page</h1>
        <Row>
          {managers && managers.map((manager) => 
            <ManagerList manager={manager}/>
          )}
        </Row>
        </Layout>
        </div>
    
  )
}

export default HomePage