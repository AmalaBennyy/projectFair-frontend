// import React, { useEffect, useState } from 'react'
// import Header from '../components/Header'
// import {Row,Col} from 'react-bootstrap'
//  import ProjectCard from '../components/ProjectCard'
// import { allprojectAPI } from '../services/allAPI'

// function Project() {
//   const[allproject,setAllproject]=useState("")
//   const getAllProject=async()=>{
//     if(sessionStorage.getItem("token")){
//       const token=sessionStorage.getItem("token")
//       const reqHeader={
//         "Content-Type":"application/json",
//         "Authorization":`Barer ${token}`
//       }
//       const result=await allprojectAPI(reqHeader)
//       console.log(result.data);
//       setAllproject(result.data)

//     }
   
//   }
//   useEffect(()=>{
//     getAllProject()

//   },[])
//   return (
//     <>
//     <Header/>
  
//   <div>
  
//    <h1 className='text-center w-100 mb-5 mt-5'>All Projects</h1>
//    <div className='d-flex align-items-center justify-content-center '>
//    <input className='border border-danger w-25' type='text' 
//    placeholder='Search the project using technologies' style={{}} />
//    <i class="fa-solid fa-magnifying-glass fa-rotate-90" style={{marginLeft:'-40px',color:'lightgrey'}}></i>
   
  
//    </div>
 

//   </div>

//    <Row className='mt-5 container-fluid'>
  
//   <Col sm={12} md={6} lg={4}>

//  {/* {<ProjectCard/>} */}

//   </Col>

//    </Row>

//     </>
    
//   )
// }

// export default Project

import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Col, Row } from 'react-bootstrap'
import ProjectCard from '../components/ProjectCard'
import {  allprojectAPI } from '../services/allAPI'
import { Link,  } from 'react-router-dom'

function Project() {

const[allproject,setAllProject]=useState([])
const[searchkey,setSearchKey]=useState("")
const[istoken,setIsToken]=useState(false)
console.log(searchkey);

  const getAllProjects = async()=>{
    // e.preventDefault()

    if(sessionStorage.getItem("token")){
      const token = sessionStorage.getItem("token")
      const reqHeader = {
        "Content-Type" : "application/json",
        "Authorization" :`Bearer ${token}`
      }
      const result =await allprojectAPI(searchkey,reqHeader)
      console.log(result.data);
      if(result.status===200){

        setAllProject(result.data)
      }
     
    }
  }
   console.log(searchkey);
  useEffect(()=>{
  getAllProjects()
  },[searchkey])

  useEffect(()=>{
   if (sessionStorage.getItem("token")) {
    setIsToken(true)
   }
   else{
    setIsToken(false)
   }
  },[])



  return (
  
<>
<Header/>

<div style={{width:"100%",height:"100vh"}}>
<h1 className='text-center mt-5'>All Projects</h1>
<div className='mt-5'><form class="d-flex" >
        <input value={searchkey} onChange={(e)=>setSearchKey(e.target.value)} class="form-control  w-25" style={{marginLeft:"500px"}} type="search" placeholder="Search Using Technologies"/>
        <button  class="btn btn-light my-2 my-sm-0 ms-2 text-black" type="submit">Search</button>
      </form></div>

      <Row className=' container-fluid' style={{marginTop:"70px"}}>
{allproject?.length>0?
allproject.map((item)=>( <Col sm={12}  md={6} lg={4}>

  <ProjectCard projects={item} /> 
  
  
  
  
  </Col>))
 
: <div>{istoken? <p>Sorry No Such Projects Avilable</p>:
  <div className='d-flex justify-content-center align-items-center flex-column '>
<img src="https://cdn.dribbble.com/users/89373/screenshots/4937800/dribbble_padlock_shot.gif" alt="" height={'300px'}/>
<h3 className='text-danger'>Please <Link to={'/login'}  style={{color:'blue',textDecoration:'none'}}>Login</Link> to view More Project</h3>

</div>  }</div>
}

</Row>



</div>






</>

    )
}

export default Project
