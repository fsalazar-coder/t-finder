import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthData, useAuthUI } from "../../context/authContext";
import {
  IconArrowRight,
  IconAdd,
  IconEdit,
  IconDelete,
  IconCheckCircle
} from '../../icons/icons';
import SectionTitles from '../components/SectionTitles';
import ImageIconUser from './ImageIconUser';



export default function PersonalInfo(props: any) {

  const { 
    auth, 
    token, 
    userId, 
    userData, setUserData 
  } = useAuthData();
  const { setPersonalInfoModal, setProfileImageModal } = useAuthUI();
  const [userDataRender, setUserDataRender] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };

      try {
        await axios
          .get(`/api/userDataApi?email=${auth?.email}`, config)
          .then((response: any) => {
            if (response.data.user) {
              setUserData(response.data.user)
              console.log('User data: ', userData)
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
      {
        userDataRender ?
          /**personal information */
          <div className='w-full p-1 lg:p-2 lg:mr-1 flex flex-col bg-white rounded-md'>
            {/**edit and delete button */}
            <div className="w-full flex flex-row justify-end items-center">
              <button className="flex flex-row justify-center items-center">
                <i
                  className='px-1 text-green-300 lg:text-slate-200 lg:hover:text-green-300 text-xl lg:text-2xl flex justify-center cursor-default lg:cursor-pointer'
                  onClick={() => setPersonalInfoModal(true)}
                >
                  <IconEdit />
                </i>
              </button>
              <button className="flex flex-row justify-center items-center">
                <i
                  className='px-1 text-green-300 lg:text-slate-200 lg:hover:text-red-300 text-xl lg:text-2xl flex justify-center cursor-default lg:cursor-pointer'
                  onClick={() => setPersonalInfoModal(true)}              >
                  <IconDelete />
                </i>
              </button>
            </div>
            <ul className='w-full px-2 flex flex-col'>
              {/**full name */}
              <li
                key='full-name'
                className='w-full flex flex-row items-center'
              >
                <h3 className='mr-2 text-base text-slate-950 font-semibold'>
                  Fullname:
                </h3>
                <h4 className='text-md text-slate-600'>
                  {userData?.full_name}
                </h4>
              </li>
              {/**profession or occupation */}
              <li
                key='profession-occupation'
                className='w-full flex flex-row items-center'
              >
                <h3 className='mr-2 text-base text-slate-950 font-semibold'>
                  Profession-Occupation:
                </h3>
                <h4 className='text-md text-slate-600'>
                  {userData?.profession_occupation}
                </h4>
              </li>
              {/**language */}
              <li
                key='full-name'
                className='w-full flex flex-row items-center'
              >
                <h3 className='mr-2 text-base text-slate-950 font-semibold'>
                  Preferred language:
                </h3>
                <h4 className='text-md text-slate-600'>
                  {userData?.preferred_language}
                </h4>
              </li>
              {/**location */}
              <li
                key='full-name'
                className='w-full flex flex-row items-center'
              >
                <h3 className='mr-2 text-base text-slate-950 font-semibold'>
                  Location:
                </h3>
                <h4 className='text-md text-slate-600'>
                  {userData?.location}
                </h4>
              </li>
              {/**personal description */}
              <li
                key='full-name'
                className='w-full flex flex-row items-center'
              >
                <h3 className='mr-2 text-base text-slate-950 font-semibold'>
                  Personal description:
                </h3>
                <h4 className='text-md text-slate-600'>
                  {userData?.personal_description}
                </h4>
              </li>
            </ul>
          </div>
          :
          /**add information */
          <div className="w-full p-1 lg:p-2 lg:mr-1 flex flex-col bg-white rounded-md">
            <div className="w-full flex flex-row justify-end items-center">
              <div className="flex-row items-center">
                <h3>Add personal information</h3>
              </div>
              <button className="flex flex-row justify-center items-center">
                <i
                  className='px-1 text-green-300 lg:text-slate-200 lg:hover:text-green-300 text-xl lg:text-2xl flex justify-center cursor-default lg:cursor-pointer'
                  onClick={() => setPersonalInfoModal(true)}              >
                  <IconAdd />
                </i>
              </button>
            </div>
          </div>
      }
    </div >
  )
};