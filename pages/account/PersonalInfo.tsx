import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  useAuth,
  useUserData,
  usePersonalInfoModal,
  useProfileImageModal
} from "../../context/authContext";
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

  const { auth } = useAuth();
  const { userData } = useUserData();
  const [personalInfo, setPersonalInfo] = useState(Object);
  const [profileImageModal, setProfileImageModal] = useState(false);
  const { setPersonalInfoModal } = usePersonalInfoModal();

  useEffect(() => {
    const joinSubmitHandle = async (e: any) => {
      const config: any = {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: false
      };

      try {
        await axios
          .get("/api/userDataApi", config)
          .then((response: any) => {
            if (response.data) {
              setPersonalInfo(response.data)
            }
          })
      }
      catch (error) {
        () => {
          console.log('Error on register: ', error);
        }
      }
      finally {
        
      }
    };

  })

  return (
    personalInfo ?
      <div className='w-full h-screen pl-0 lg:pl-60 flex flex-row justify-center items-center'>
        <div className='container w-full h-full pt-14 lg:pt-10 p-5 lg:p-10 flex flex-col lg:flex-row transition-all'>
          {/**profile image */}
          <div className='w-full flex flex-col items-center'>
            <div className='py-4 flex flex-col justify-center items-center'>
              <div
                className='w-32 h-32 flex flex-col justify-center items-center'
                onClick={() => setProfileImageModal(true)}
              >
                <ImageIconUser size='large' />
              </div>
            </div>
          </div>
          {/**personal information */}
          <ul className='w-full lg:w-2/3 flex'>
          </ul>
        </div>
      </div>
      :
      <div className='hidden' />
  )
};