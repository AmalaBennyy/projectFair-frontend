import React from 'react'

import Card from 'react-bootstrap/Card';
import video from '../assets/videoplayer.png'


import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { BASE_URL } from '../services/baseurl';

function ProjectCard({projects}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
    <>
     <Card className='btn shadow ' style={{height:'250px',marginBottom:'20px'}} onClick={handleShow}>
      <Card.Img className='w-100' variant="top" height={"200px"} src={projects?`${BASE_URL}/uploads/${projects.image}`:
     
      video} />
      <Card.Body>
        <Card.Title>{projects.title}</Card.Title>
        
      </Card.Body>
    </Card>
    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{projects.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Row style={{height:'300px'}}>
            <Col md={4}>
                {/* <img src={video} width={'100%'} alt="no image" /> */}
                
              <img src={projects?`${BASE_URL}/uploads/${projects.image}`:video} width={"100%"}  alt="" />
            </Col>
            <Col md={8}>
              <h4>Discription</h4>
              <p>{projects.overview}</p>
              
                     <p><span className='fw-bolder'>Technologies</span>:{projects.language}</p>
             </Col>
        </Row>

        <div className="d-flex">
            <a style={{color:'grey'}} href={projects.github} target='_blank'><i class="fa-brands fa-github fa-2x ms-5"></i></a>
         
            <a style={{color:'grey'}} href={projects.website} target='_blank'><i class="fa-solid fa-link fa-2x ms-5"></i></a>

        

        </div>
        </Modal.Body>
     
      </Modal>

    </>
  )
}

export default ProjectCard