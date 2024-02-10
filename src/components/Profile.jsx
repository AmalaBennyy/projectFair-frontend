

import React, { useEffect } from 'react';
import { useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import { BASE_URL } from '../services/baseurl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editProfileAPI } from '../services/allAPI';

function Profile() {
  const [open, setOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  const [userProfile, setUserProfile] = useState({
    username: '',
    email: '',
    password: '',
    github: '',
    linkedin: '',
    profile: '',
  });

  const [existingImage, setExistingImage] = useState('');
  const [preview, setPreview] = useState('');

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('existingUser'));
    setUserProfile({
      ...userProfile,
      username: user.username,
      email: user.email,
      password: user.password,
      github: user.github,
      linkedin: user.linkedin,
      profile: '',
    });
    setExistingImage(user.profile);
  }, [isUpdate]);

  useEffect(() => {
    if (userProfile.profile) {
      setPreview(URL.createObjectURL(userProfile.profile));
    } else {
      setPreview(existingImage ? `${BASE_URL}/uploads/${existingImage}` : '');
    }
  }, [userProfile.profile, existingImage]);

  const handleProfileUpdate = async () => {
    const { username, email, password, github, linkedin, profile } = userProfile;

    if (!github || !linkedin) {
      toast.info('Please fill the form completely');
    } else {
      const reqBody = new FormData();
      reqBody.append('username', username);
      reqBody.append('email', email);
      reqBody.append('password', password);
      reqBody.append('github', github);
      reqBody.append('linkedin', linkedin);

      if (userProfile.profile) {
        reqBody.append('profile', userProfile.profile);
      } else {
        reqBody.append('profile', existingImage);
      }

      const token = sessionStorage.getItem('token');

      const reqHeader = {
        'Authorization': `Bearer ${token}`,
      };

      try {
        const result = await editProfileAPI(reqBody, reqHeader);

        if (result.status === 200) {
          toast.success('Updated successfully');
          sessionStorage.setItem('existingUser', JSON.stringify(result.data));
          setIsUpdate(true);
        } else {
          console.log(result.response.data);
        }
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    }
  };

  return (
    <div className='card shadow p-5'>
      <div className='d-flex justify-content-between'>
        <h3 className='me-5'>Profile</h3>
        <button
          className='btn btn-outline-info '
          onClick={() => setOpen(!open)}
        >
          <i className="fa-solid fa-arrow-up-from-bracket fa-rotate-180"></i>
        </button>
      </div>

      <Collapse in={open}>
        <div className='row justify-content-center mt-4'>

<label htmlFor='profile' className='text-center'>
  <input
    id='profile'
    type='file'
    style={{ display: 'none' }}
    onChange={(e) => {
      const newProfile = e.target.files[0];
      setUserProfile({ ...userProfile, profile: newProfile });
      setPreview(URL.createObjectURL(newProfile));
    }}
  />
  <img
    width={'200px'}
    height={'200px'}
    src={
      preview || existingImage
        ? preview
          ? preview
          : `${BASE_URL}/uploads/${existingImage}`
        : 'https://tse4.mm.bing.net/th?id=OIP.X-YMD17NQrGp3m2VP1kpzQHaJT&pid=Api&P=0&h=180'
    }
    alt='no image'
    className='rounded-circle'
  />
</label>

          <div className='mb-3 mt-4'>
            <input
              type='text'
              placeholder='github'
              className='form-control'
              value={userProfile.github}
              onChange={(e) =>
                setUserProfile({ ...userProfile, github: e.target.value })
              }
            />
          </div>

          <div className='mb-3'>
            <input
              type='text'
              placeholder='LinkedIn'
              className='form-control'
              value={userProfile.linkedin}
              onChange={(e) =>
                setUserProfile({ ...userProfile, linkedin: e.target.value })
              }
            />
          </div>

          <div className='mb-3 mt-3'>
            <button
              className='btn btn-success rounded w-100'
              onClick={handleProfileUpdate}
            >
              Update
            </button>
          </div>
        </div>
      </Collapse>
      <ToastContainer autoClose={2000} theme='colored' position='top-center' />
    </div>
  );
}

export default Profile;
