import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import {Col, Row} from 'react-bootstrap'
import MyProject from '../components/MyProject'
import Profile from '../components/Profile'

function Dashboard() {
  const [username,setUsername]=useState("")
  useEffect(()=>{
    setUsername(JSON.parse(sessionStorage.getItem("existingUser")).username)
  },[])
  console.log(username);
  return (
    <>
     
     <Header dashboard/>

    
      <h1 className='mt-5 ms-3'>Welcome <span className='text-warning'>{username}</span></h1>
    

     <Row className='container-fluid mt-5'>
        
        <Col md={8}>
          <MyProject/>
        </Col>
        <Col md={4}>

          <Profile/>
        </Col>

     </Row>
    
    </>
  )
}

export default Dashboard