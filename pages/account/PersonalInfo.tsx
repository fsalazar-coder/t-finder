import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthData, useAuthUI, useUI } from "../../context/authContext";
import {
  IconAdd,
  IconEdit,
  IconDelete,
} from '../../icons/icons';
import ImageIconUser from './ImageIconUser';



export default function PersonalInfo(props: any) {

  const { token, userId, userData, setUserData } = useAuthData();
  const { setPersonalInfoModal, setProfileImageModal } = useAuthUI();
  const { setMessageModal, setTypeMessageModal, setTextMessageModal, setLoading } = useUI();
  const [personalInfo, setPersonalInfo] = useState(Object);
  const [showPersonalInfo, setShowPersonalInfo] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };

      try {
        await axios
          .get(`/api/userDataApi?id=${userId}`, config)
          .then((response: any) => {
            if (response.data.user) {
              const resDataUser = response.data.user;
              setUserData(resDataUser);
              console.log('response data: ', resDataUser)
              console.log('User data from personal info: ', userData)
              setPersonalInfo([
                { title: 'Fullname:', description: resDataUser?.full_name },
                { title: 'Profession or ocupation:', description: resDataUser?.profession_occupation },
                { title: 'Preferred language:', description: resDataUser?.preferred_language },
                { title: 'Location:', description: resDataUser?.location },
                { title: 'Personal description:', description: resDataUser?.personal_description },
              ]);
              console.log('Personal Info: ', personalInfo);
              let dataProfileFilled = Object.values(personalInfo).some(value => value === '');
              console.log('Data profile filled: ', dataProfileFilled)
              if (!dataProfileFilled) {
                setShowPersonalInfo(true);
                console.log('Show personal Info: ', showPersonalInfo)
              }
              else {
                setShowPersonalInfo(false);
                console.log('Show personal Info: ', showPersonalInfo)
              }
            }
          })
      }
      catch (error) {
        () => {
          console.log('Error fetching user info: ', error);
        }
      }
    };
    fetchUserInfo();
  }, []);

  const handleDeletePersonalInfo = () => {
    setMessageModal(true);
    setTypeMessageModal('delete');
    setTextMessageModal('Delete your personal information with this action');
  }


  return (
    <div className='w-full flex flex-col lg:flex-row-reverse lg:justify-between'>
      {/**profile image */}
      <div className='w-full lg:w-60 p-1 lg:p-2 mb-1 lg:mb-0 flex flex-col justify-between items-center bg-white rounded-md'>
        {/**edit and delete button */}
        <div className="w-full flex flex-row justify-end items-center">
          <button className="flex flex-row justify-center items-center">
            <i
              className='px-1 text-green-300 lg:text-slate-200 lg:hover:text-green-300 text-xl lg:text-2xl flex justify-center cursor-default lg:cursor-pointer'
              onClick={() => setProfileImageModal(true)}
            >
              <IconEdit />
            </i>
          </button>
          <button className="flex flex-row justify-center items-center">
            <i
              className='px-1 text-green-300 lg:text-slate-200 lg:hover:text-red-300 text-xl lg:text-2xl flex justify-center cursor-default lg:cursor-pointer'
              onClick={() => setProfileImageModal(true)}              >
              <IconDelete />
            </i>
          </button>
        </div>
        {/**image */}
        <div className='w-40 h-40 flex flex-col justify-center items-center'>
          <ImageIconUser size='large' />
        </div>
        <div className='w-full flex flex-row justify-center items-center'>
          availability
        </div>
      </div>
      {/**personal information */}
      <div className='w-full p-1 lg:p-2 lg:mr-1 flex flex-col bg-white rounded-md'>
        {
          showPersonalInfo ?
            <>
              {/**edit and delete button */}
              <div className="w-full flex flex-row justify-end items-center">
                <button className="flex flex-row justify-center items-center">
                  <i
                    className='px-1 text-green-300 lg:text-slate-200 lg:hover:text-green-300 text-xl lg:text-2xl flex justify-center cursor-default lg:cursor-pointer'
                    onClick={() => setPersonalInfoModal(true)}>
                    <IconEdit />
                  </i>
                </button>
                <button className="flex flex-row justify-center items-center">
                  <i
                    className='px-1 text-green-300 lg:text-slate-200 lg:hover:text-red-300 text-xl lg:text-2xl flex justify-center cursor-default lg:cursor-pointer'
                    onClick={() => handleDeletePersonalInfo()}>
                    <IconDelete />
                  </i>
                </button>
              </div>
              {/**personal information */}
              <ul className='w-full px-2 flex flex-col'>
                {
                  personalInfo.map((element: any, index: any) => {
                    return (
                      /**full name, profession or occupation, preferred language, location and personal description */
                      <li
                        key={index}
                        className='w-full flex flex-row items-center'
                      >
                        <h3 className='text-sm lg:text-base text-slate-600'>
                          <strong>{element.title}</strong>  {element.description}
                        </h3>
                      </li>
                    )
                  })
                }
              </ul>
            </>
            :
            /**add information */
            <div className="w-full flex flex-row justify-end">
              <div className="px-1 flex flex-col justify-center">
                <h3 className='text-[1rem]'>
                  Add personal information
                </h3>
              </div>
              <button className="flex flex-row justify-center items-center">
                <i
                  className='px-1 text-green-300 lg:text-slate-200 lg:hover:text-green-300 text-xl lg:text-2xl flex justify-center cursor-default lg:cursor-pointer'
                  onClick={() => setPersonalInfoModal(true)}              >
                  <IconAdd />
                </i>
              </button>
            </div>
        }
      </div>
    </div >
  )
};