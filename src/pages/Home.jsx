import React, { useEffect, useState } from 'react'
import {Col, Row} from 'react-bootstrap'
import Title from '../assets/Designer.png'
import ProjectCard from '../components/ProjectCard'
import { Link } from 'react-router-dom'
import { homeprojectAPI } from '../services/allAPI'

function Home() {
  const [islogin , setislogin]=useState(false)
  const [homeproject,sethomeproject]=useState([])

  const gethomeProject= async()=>{
    const result= await homeprojectAPI()
    console.log(result.data);
    sethomeproject(result.data)
  }

  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setislogin(true)
    }else{
      setislogin(false)
    }
  },[])
 

  useEffect(()=>{
    gethomeProject()

  },[])

  
  console.log(islogin);


  return (
    <>
    <div style={{width:'100%', height:'100vh' }} className='bg-info'>
      <div className='container-fluid rounded'>
        <Row className='align-items-center p-5'>

        <Col sm={12} md={6}>
          <h1 style={{fontSize:'80px',color:'white'}}>Project Fair</h1>
          <p>One stop destination for all software development projects</p>
          {islogin?
            <Link to={'/dashboard'} className='btn btn-primary rounded'>Manage Projects<i class="fa-solid fa-arrow-right ms-3"></i></Link>:
       
          <Link to={'/login'} className='btn btn-primary rounded'>Get Started<i class="fa-solid fa-arrow-right ms-3"></i></Link>
       } </Col>
        <Col sm={12} md={6}>
          <img src={Title} alt="no image" className='w-75' style={{marginTop:'100px'}} />
        </Col>

        </Row>
      </div>
    </div>
 
  <div className='mt-5'>
    <h2 className='text-center'>All Projects</h2>
   
   <marquee scrollAmount ={20} className="mt-5">

    <div className='d-flex'>
     {  homeproject?.length>0?
     homeproject.map((item)=>(
      <div  className='ms-5' style={{width:'350px'}}>
      <ProjectCard projects={item}/>
    </div>))
    :null
      }

    </div>
    </marquee>
    <div className='text-center mt-5'>
      <Link to={'/project'}>See more Project</Link>
    </div>
  </div>

    </>
    
  )
}

export default Home