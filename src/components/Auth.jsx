import React, { useContext, useState } from 'react'
import { Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { loginAPI, registerAPI } from '../services/allAPI'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isAuthtokencontext } from '../contexts/ContextShare';

function Auth({register}) {
  const{isAuthToken,setIsAuthToken}=useContext(isAuthtokencontext)

    //create a state to hold the value of user registration details

    const [userData,setuserData]=useState({
      
      username:"",
      email:"",
      password:""
    })

    const navigate=useNavigate()
    

    

  
    const registerForm = register?true:false

    console.log(userData);
    //function to register

    const handleRegister=async(e)=>{
      e.preventDefault()


    const {username,email,password}=userData
    if(!username || !email || !password){ 
    toast.info('please fill the form completely')
  }
  else{
   const result= await registerAPI(userData)
   console.log(result.data);
   if(result.status===200){
    toast.success(`${result.data.username} is successfully registered`)
    setuserData({
      username:"",
      email:"",
      password:""
    })

    //navigate
    navigate('/login')

  } 
  else{
    alert(result.response.data)
  }
    
  
  }
    }

  //function to login
  const handleLogin=async(e)=>{

  e.preventDefault()

  const{email ,password} =userData

  if(!email || !password){
    toast.info('please fill the form completely')

  }
  else{
    //api call
  const result= await loginAPI(userData)
  console.log(result);
  if(result.status===200){
    //alert
    toast.success('login succesfull')
    setIsAuthToken(true)
    //store
    sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
    sessionStorage.setItem("token",result.data.token)

    //state empty
    setuserData({
      email:"",
      password:""
    })
    //navigate
    setTimeout(()=>{
      navigate('/')

    },2500)
   

  }else{
    toast.error(result.response.data)
  }

  }

  }

  return (
  
   <div style={{width:'100%',height:'100vh'}} 
   className='d-flex align-items-center jusify-content-center'>

    <div className='w-75 container' >
        
    <Link style={{color:'blue',textDecoration:'none'}} to={'/'} ><i class="fa-solid fa-arrow-left"  ></i>Back to Home</Link>


   <div className='card bg-info p-5 rounded'>
    

    <div className="row align-items-center">
   <div className="col-lg-6">
    <img src="https://relprod.relianceanimation.in/dist/images/login_illustration1.png"
     width={'100%'}  alt="" />

    </div>

    <div className="col-lg-6">
        <div className='d-flex align-items-center jusify-content-center flex-column'>
        <h1 className='text-light'><i class="fa-brands fa-stack-overflow"></i>Project Fair</h1>

        <h5 className='text-light ms-5 mt-4'>
            {
                registerForm?"sign up to your account":"Sign in to your account"
            }
        </h5>


      <Form className='mt-5 w-100'>

      {  registerForm &&
      <Form.Group className="mb-3" controlId="formBasicEmail">
       
        <Form.Control type="text" placeholder="Enter user name" value={userData.username} onChange={(e)=>setuserData({...userData,username:e.target.value})}/>
      </Form.Group>}

      <Form.Group className="mb-3" controlId="formBasicEmail">
       
       <Form.Control type="email" placeholder="Enter Email" value={userData.email} onChange={(e)=>setuserData({...userData,email:e.target.value})}/>
     </Form.Group>
     <Form.Group className="mb-3" controlId="formBasicEmail">
       
       <Form.Control type="password" placeholder="Enter Password" value={userData.password} onChange={(e)=>setuserData({...userData,password:e.target.value})}/>
     </Form.Group>

      {  registerForm?
    
        <div className="mt-5">
        <button onClick={handleRegister} className='btn btn-warning rounded'>Register</button>
        <p className='text-light'>Already a user? Click here to <Link to={'/login'}  style={{color:'blue'}}>Login</Link></p>
      </div>:
       <div className="mt-5">
       <button onClick={handleLogin} className='btn btn-warning rounded'>Login</button>
       <p className='text-light'>New user? Click here to <Link to={'/register'} style={{color:'blue'}}  >Register</Link></p>
     </div>
      }

      </Form>



    </div>
    </div>



    </div>

   </div>




    </div>
      
      
    <ToastContainer autoClose={2000} theme='colored' position='top-center'/>
   
    </div>

   
  )
}

export default Auth