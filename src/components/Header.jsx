import React, { useContext } from 'react'
// import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { isAuthtokencontext } from '../contexts/ContextShare';

function Header({dashboard}) {
  const{isAuthToken,setIsAuthToken}=useContext(isAuthtokencontext)
  const navigate=useNavigate()

   const handleLogOut=()=>{
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("existingUser")
    setIsAuthToken(false)
    navigate('/')
   }

  return (
    <Navbar className='bg-info'>
    <Container>
      <Navbar.Brand href="#home">
      <i class="fa-brands fa-stack-overflow"></i> {' '}
       Project Fair
      </Navbar.Brand>
      {
        dashboard &&
        <button className='btn btn-warning' onClick={handleLogOut}>Logout <i class="fa-solid fa-power-off"></i> </button>
      }
    </Container>
  </Navbar>
  )
}

export default Header