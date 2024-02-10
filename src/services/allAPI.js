import { BASE_URL } from "./baseurl"
import { commonAPI } from "./commonAPI"

//register api
export const registerAPI = async(user)=>{
   return await commonAPI('POST',`${BASE_URL}/user/register`,user,"")
}

//login api
export const loginAPI =async(user)=>{

  return  await commonAPI('POST',`${BASE_URL}/user/login`,user,"")

}

//add project
export const addProjectAPI =async(reqBody,reqHeader)=>{

  return  await commonAPI('POST',`${BASE_URL}/projects/add`,reqBody,reqHeader)

}

//home project
export const homeprojectAPI=async()=>{
  return await commonAPI('GET',`${BASE_URL}/project/home-project`)

}

//allproject
export const allprojectAPI=async(searchkey,reqHeader)=>{
  //query parameter=path?key=value
  return await commonAPI('GET',`${BASE_URL}/project/all-project?search=${searchkey}`,"",reqHeader)

}

//userproject
export const userprojectAPI=async(reqHeader)=>{
  return await commonAPI('GET',`${BASE_URL}/user/all-project`,"",reqHeader)

}



//editproject 
export const editProjectAPI=async(projectId,reqBody,reqHeader)=>{
  return await commonAPI('PUT',`${BASE_URL}/project/edit/${projectId}`,reqBody,reqHeader)

}

//delete project
export const deleteProjectAPI=async(projectId,reqHeader)=>{
  return await commonAPI('DELETE',`${BASE_URL}/project/remove/${projectId}`,{},reqHeader)

}



//edit profile

export const editProfileAPI=async(reqBody,reqHeader)=>{
  return await commonAPI('PUT',`${BASE_URL}/user/edit`,reqBody,reqHeader)

}