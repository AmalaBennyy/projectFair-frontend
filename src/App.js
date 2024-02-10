
import { Route, Routes } from 'react-router-dom';
import './App.css';

import Home from './pages/Home';

import Dashboard from './pages/Dashboard'
import Project from  './pages/Project'

import Footer from './components/Footer';
import Auth from './components/Auth';
import { useContext } from 'react';
import { isAuthtokencontext } from './contexts/ContextShare';


function App() {
  const {isAuthToken,setIsAuthToken}=useContext(isAuthtokencontext)
  return (
    <div className="App">
        
      <Routes>

      

        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Auth/>}></Route>
        <Route path='/register' element={<Auth register />}></Route>
     
        <Route path='/dashboard' element= {isAuthToken? <Dashboard dashboard />:<Home/>}></Route>
        <Route path='/project' element={  <Project/>}></Route>
        </Routes>
        
        <Footer/>

     


      
      
      
      
     
      
    

     
    
      
    </div>
  );
}

export default App;
