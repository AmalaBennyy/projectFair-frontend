import React from 'react'
import { Link } from 'react-router-dom'


function Footer() {
  return (
    <div>
                   <div style={{width:'100%',height:'300px',color:'white'}} className='bg-info d-flex justify-content-center align-items-center flex-column w-100 mt-5 '>
   
   <div className=" container footer d-flex justify-content-between align-items-center w-100 ">

        <div className="website" style={{width:'400px'}}>
          <h3> <i class="fa-brands fa-stack-overflow"></i>{'  '}
          Project-Fair</h3>

          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos adipisci voluptas ipsam,  quas ratione iste sint hic ea voluptates eum nobis reprehenderit id aperiam. Delectus, nam!

          </p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.   mollitia laudantium culpa iure cum.

          </p>
    
          
        </div>
        <div className="links d-flex flex-column">
          <h3>Links</h3>
          <Link to={'/'} style={{textDecoration:'none',color:'white'}}>Landing Page</Link>
          <Link to={'/cart'}style={{textDecoration:'none',color:'white'}}>Home Page</Link>
          <Link to={'./wishList'}style={{textDecoration:'none',color:'white'}}>Login Page</Link>
          <Link to={'./wishList'}style={{textDecoration:'none',color:'white'}}>Register</Link>
        </div>
        <div className="guide d-flex flex-column">
          <h4>Guides</h4>
          <Link to={'/'} style={{textDecoration:'none',color:'white'}}>React</Link>
          <Link to={'https://react-bootstrap.github.io/'}style={{textDecoration:'none',color:'white'}}>React Bootstrap</Link>
          <Link to={'https://bootswatch.com/'}style={{textDecoration:'none',color:'white'}}>Bootswatch</Link>
          
        </div>
        <div className="contact">
          
            <h4 className='mb-4'>Contact </h4>
            <div className='d-flex mb-4'>

          <input type="text" className='form-control' placeholder='Enter your email id' />
          <button className='btn btn-warning text-light ms-2'>Subscribe</button>
          </div>
          <div className='icons d-flex justify-content-evenly'>
          
          <Link to={'https://bootswatch.com/'} style={{textDecoration:'none',color:'white',fontSize:'30px'}}>
                  <i class="fa-brands fa-instagram"></i>
                  </Link>
                  <Link to={'https://bootswatch.com/'} style={{textDecoration:'none',color:'white',fontSize:'30px'}}>
                  <i class="fa-brands fa-twitter"></i>
                  </Link>
                  <Link to={'https://bootswatch.com/'} style={{textDecoration:'none',color:'white',fontSize:'30px'}}>
                  <i class="fa-brands fa-github"></i>
                  </Link>
                  <Link to={'https://bootswatch.com/'} style={{textDecoration:'none',color:'white',fontSize:'30px'}}>
                  <i class="fa-brands fa-facebook"></i>
                  </Link>


          </div>
        </div>


   </div>



   <p>Copy right  &copy; Media Player.Built with React</p>

  </div>
    </div>
  )
}

export default Footer