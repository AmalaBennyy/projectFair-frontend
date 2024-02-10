import React, { useContext, useEffect, useState } from 'react'
import AddProject from './AddProject'
import { deleteProjectAPI, userprojectAPI } from '../services/allAPI'
import { createContext } from 'react'
import { addProjectResponseContext, editProjectResponseContext } from '../contexts/ContextShare'
import EditProject from './EditProject'

function MyProject() {
    const[userProject,setUserProject]=useState([])
    const{addProjectResponse , setAddProjectResponse}=useContext(addProjectResponseContext)
    const{editProjectResponse,setEditProjectResponse}=useContext(editProjectResponseContext)
    
    const getUserProject=async()=>{
        const token=sessionStorage.getItem("token")
        const reqHeader = {
            "Content-Type" : "application/json",
            "Authorization" :`Bearer ${token}`
          }
          const result = await userprojectAPI(reqHeader)
          console.log(result.data);
          setUserProject(result.data)

    }
    useEffect(()=>{
    getUserProject()
    },[addProjectResponse,editProjectResponse])

    const handleDelete=async(id)=>{
      const token=sessionStorage.getItem("token")
      const reqHeader = {
        "Content-Type" : "application/json",
        "Authorization" :`Bearer ${token}`
      }
      const result=await deleteProjectAPI(id,reqHeader)
      console.log(result);
      if(result.status===200){
        getUserProject()
      }else{
        console.log(result.response.data);
      }

    }
  return (
    <div className='card shadow p-4'>

        <div className="d-flex justify-content-between">

            <h2 className='text-success'>My Projects</h2>
            <AddProject/>
        </div>
        <div className='mt-4'>
         {  userProject?.length>0? 
         userProject?.map((item)=>(
            <div className='border d-flex align-items-center p-2 rounded'>
            <h5>{item.title}</h5>
            <div className='ms-auto d-flex'>
              <EditProject project={item}/>
                {/* <button className='btn'><i class="fa-solid fa-pen-to-square text-info"></i></button> */}
                <a href={item.github} className='btn'><i class="fa-brands fa-github text-success"></i></a>
                <button className='btn' onClick={()=>handleDelete(item._id)}><i class="fa-solid fa-trash text-danger"></i></button>
            </div>
        </div>

         ))
         :
      
      
        
        <p className='text-danger fw-bolder fs-4'>No projects uploaded yet !!</p>}
        </div>
    </div>
  )
}

export default MyProject