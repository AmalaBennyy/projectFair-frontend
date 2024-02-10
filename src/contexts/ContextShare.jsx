import React, { children, createContext, useState } from 'react'


export const addProjectResponseContext =createContext()
//createContext-used to create contextApi

export const editProjectResponseContext=createContext()

export const isAuthtokencontext=createContext()

function ContextShare({children}) {
    //data to share
    const [addProjectResponse , setAddProjectResponse]=useState({})

    const[editProjectResponse,setEditProjectResponse]=useState({})

    const[isAuthToken,setIsAuthToken]=useState(false)
  return (
    <>
    {/* only provider can provide data and value atribute is used to specify the data to share */}

    <addProjectResponseContext.Provider value={{addProjectResponse , setAddProjectResponse}}>

      <editProjectResponseContext.Provider value={{editProjectResponse,setEditProjectResponse}}>

        <isAuthtokencontext.Provider value={{isAuthToken,setIsAuthToken}}>
         

     
        
        {children}
        {/* children is a predefined props */}
        </isAuthtokencontext.Provider>

        </editProjectResponseContext.Provider>

        </addProjectResponseContext.Provider>
        
        
        </>
  )
}

export default ContextShare