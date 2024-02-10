import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Col, Row} from 'react-bootstrap'
import { addProjectAPI } from '../services/allAPI';
import { addProjectResponseContext } from '../contexts/ContextShare';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function AddProject() {
  const {addProjectResponse , setAddProjectResponse}=useContext(addProjectResponseContext)

  //to hold value of image url

  const[preview , setpreview] =useState("")





  const[token,setToken]=useState("")

    const [show, setShow] = useState(false);


    const handleClose = () => {
      setShow(false);
      handleClose1()
    }
    const handleShow = () => setShow(true);
    

    const [projectdetails,setprojectdetails]=useState({
      title:'',
      language:'',
      github:'',
      website:'',
      overview:'',
      image:''
    })
    console.log(projectdetails);


    const handleClose1=()=>{
      setprojectdetails({
        title:'',
        language:'',
        github:'',
        website:'',
        overview:'',
        image:'',
       

      })
      setpreview("")
    }
    useEffect(()=>{
      if(projectdetails.image){
        (setpreview(URL.createObjectURL(projectdetails.image)))
      }
    },[projectdetails.image])

    useEffect(()=>{
      if(sessionStorage.getItem("token")){
        setToken(sessionStorage.getItem("token"))
      }else{
        setToken("")
      }
    })
    console.log(preview);

    //add project
    
    const handleAdd = async(e)=>{
      e.preventDefault()
      const {title,language,github,website,overview,image} = projectdetails

      if(!title || !language || !github || !website || !overview ||!image){
        toast.info('please fill the form completely')
      }else{
    
        //reqBody
        //1)create object for fotmData -since we have uploaded content
        const reqBody = new FormData()
        //2)add data to formData- append()
        reqBody.append("title",title) 
        reqBody.append("language",language) 
        reqBody.append("github",github) 
        reqBody.append("website",website) 
        reqBody.append("overview",overview) 
        reqBody.append("image",image) 

        if(token){
          const reqHeader={
            "Content-Type":"multipart/form-data",
            "Authorization": `Bearer ${token}`
          }
          const result= await addProjectAPI(reqBody,reqHeader)
          console.log(result);
          if(result.status===200){
            console.log(result.data);
            toast.success('Project added successfully')
            handleClose()
            //context
            setAddProjectResponse(result.data)
            
            

          }
          else{
            console.log(result.response.data);
          }
        }

      
      }

    }




  return (
    <div>

<Button variant="primary" onClick={handleShow}>
       AddProject
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size='lg'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>

   <Row>
    <Col md={6}>
    <label htmlFor='image' className='text-center'>
            <input id='image' type="file" style={{display:'none'}} onChange={(e)=>setprojectdetails({...projectdetails,image:e.target.files[0]})} />
            <img width={'200px'} height={'200px'} src={preview?preview:"http://blogs.ulethbridge.ca/it-services/files/2014/02/cartoon-of-proj-mgmt.jpg"} 
            alt="no image" className='rounded-circle' />
        </label>
    </Col>
    <Col md={6}>

        <div className='d-flex justify-content-center align-items-center flex-column'>
         
        <div className="mb-3 w-100">
        <input type="text" placeholder='Project Title' className='form-control' value={projectdetails.title} onChange={(e)=>setprojectdetails({...projectdetails,title:e.target.value})} />

       </div>
       <div className="mb-3 w-100">
        <input type="text" placeholder='Project Language' className='form-control'value={projectdetails.language} onChange={(e)=>setprojectdetails({...projectdetails,language:e.target.value})} />

       </div>

       <div className="mb-3 w-100">
        <input type="text" placeholder='Github link' className='form-control' value={projectdetails.github} onChange={(e)=>setprojectdetails({...projectdetails,github:e.target.value})} />

       </div>
       <div className="mb-3 w-100">
        <input type="text" placeholder='Website Link' className='form-control' value={projectdetails.website} onChange={(e)=>setprojectdetails({...projectdetails,website:e.target.value})} />

       </div>
       <div className="mb-3 w-100">
        <input type="text" placeholder='Project Overview' className='form-control' value={projectdetails.overview} onChange={(e)=>setprojectdetails({...projectdetails,overview:e.target.value})} />

       </div>

        </div>
    </Col>
   </Row>



    
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose1}>
            Close
          </Button>
          <Button variant="success" onClick={handleAdd}>Add</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer autoClose={2000} theme='colored' position='top-center'/>

    </div>
  )
}

export default AddProject

