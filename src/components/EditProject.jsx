import { useEffect, useState } from 'react';
import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Col, Row} from 'react-bootstrap'
import { BASE_URL } from '../services/baseurl';
import { editProjectAPI } from '../services/allAPI';
import { useContext } from 'react';
import { editProjectResponseContext } from '../contexts/ContextShare';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function EditProject({project}) {
  const{editProjectResponse,setEditProjectResponse}=useContext(editProjectResponseContext)
    const [show, setShow] = useState(false);
    const [projectdetails,setprojectdetails]=useState({
        id:project._id,
        title:project.title,
        language:project.language,
        github:project.github,
        website:project.website,
        overview:project.overview,
       image:"",
       
      }
      )
      const [preview,setPreview]=useState("")
    const handleClose = () => {
      setShow(false);
      handleClose1()
    }

    const handleShow = () => setShow(true);
    

    useEffect(()=>{
        if(projectdetails.image){
            setPreview(URL.createObjectURL(projectdetails.image))
        }
        
    },[projectdetails.image])


    const handleClose1=()=>{
        setprojectdetails({
          id:project._id,
          title:project.title,
          language:project.language,
          github:project.github,
          website:project.website,
          overview:project.overview,
         image:""
         
  
        })
        setPreview("")
      }

      const handleUpdate = async()=>{
        const{id,title,language,github,website,overview,image}=projectdetails

        if(!title || !language ||!github ||!website ||!overview){
            toast.info('please fill the form completely')
        }
        else{
            const reqBody= new FormData()
            reqBody.append("title",title)
            reqBody.append("language",language)
            reqBody.append("github",github)
            reqBody.append("website",website)
            reqBody.append("overview",overview)
            preview?reqBody.append("image",image):reqBody.append("image",project.image)
       
        const token=sessionStorage.getItem("token")
        if(preview){
            const reqHeader ={
                "Content-Type":"multipart/form-data",
                "Authorization": `Bearer ${token}`
            }
            const result=await editProjectAPI(id,reqBody,reqHeader)
            console.log(result);
            if(result.status==200){
              toast.success('updated successfully')
              handleClose()
              setEditProjectResponse(result.data)
            }else{
              console.log(result.response.data);
            }
            
        }else{
            const reqHeader ={
                "Content-Type":"application/json",
                "Authorization": `Bearer ${token}`
            }
            const result=await editProjectAPI(id,reqBody,reqHeader)
            console.log(result);
            if(result.status==200){
              toast.success('updated successfully')
              handleClose()
              setEditProjectResponse(result.data)
            }else{
              console.log(result.response.data);
            }
        }
      }
    }

  return (
    <>

<button onClick={handleShow} className='btn'><i class="fa-solid fa-pen-to-square text-info"></i></button>
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
            <img width={'200px'} height={'200px'} src={preview?preview:`${BASE_URL}/uploads/${project.image}`}
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
        <input type="text" placeholder='Github link' className='form-control' value={projectdetails.github} onChange={(e)=>setprojectdetails({...projectdetails,language:e.target.value})} />

       </div>
       <div className="mb-3 w-100">
        <input type="text" placeholder='Website Link' className='form-control' value={projectdetails.website} onChange={(e)=>setprojectdetails({...projectdetails,language:e.target.value})} />

       </div>
       <div className="mb-3 w-100">
        <input type="text" placeholder='Project Overview' className='form-control' value={projectdetails.overview} onChange={(e)=>setprojectdetails({...projectdetails,language:e.target.value})} />

       </div>

        </div>
    </Col>
   </Row>



    
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose1}>
            Close
          </Button>
          <Button variant="success"  onClick={handleUpdate}>Update</Button>
        </Modal.Footer>

      </Modal>
      <ToastContainer autoClose={2000} theme='colored' position='top-center' />
              
    
    </>
  )
}

export default EditProject