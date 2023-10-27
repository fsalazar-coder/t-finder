import React, { useState, useEffect, useRef } from 'react';
import { useAuthData, useAuthUI, useUI } from "../../context/authContext";
import axios from 'axios';
import { IconCancel, IconCheckCircle } from '../../icons/icons';
import TemplateForm from './TemplateForm';



export default function EducacionalInfoModal(props: any) {

  const { token, userId, updateUserEducationalInfo } = useAuthData();
  const { educationalInfoModal, setEducationalInfoModal } = useAuthUI();
  const { setLoading, screenNarrow } = useUI();
  const [filledForm, setFilledForm] = useState(false);

  const [educationalInfo, setEducationalInfo] = useState({
    fullName: '',
    professionOccupation: '',
    preferredLanguage: '',
    location: '',
    personalDescription: ''
  });
  const [changeEducationalInfo, setChangeEducationalInfo] = useState({
    fullName: false,
    professionOccupation: false,
    preferredLanguage: false,
    location: false,
    personalDescription: false
  });
  {/** */ }

  const handleChangeData = (e: any) => {
    const { name, value } = e.target;
    setEducationalInfo({ ...educationalInfo, [name]: value });
  };

  const handleCloseModal = () => {
    setEducationalInfoModal(false);
    setFilledForm(false);
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setEducationalInfoModal(false);
    setFilledForm(false);
    const education = {
      full_name: educationalInfo.fullName,
      profession_occupation: educationalInfo.professionOccupation,
      preferred_language: educationalInfo.preferredLanguage,
      location: educationalInfo.location,
      personal_description: educationalInfo.personalDescription
    };
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    try {
      await axios
        .post(`/api/userDataApi?id=${userId}`, { education }, config)
        .then((response) => {
          const educationInfo = response.data.user.education_info;
          updateUserEducationalInfo(educationInfo);
        })
    }
    catch (error) {
      console.error(`Error saving education information: `, error);
    }
    finally {
      setLoading(false);
    }
  };

  /**fill form control */
  useEffect(() => {
    let educationalInfoFilled = Object.values(educationalInfo).some(value => value === '');
    if (!educationalInfoFilled) {
      setFilledForm(true);
    }
    else {
      setFilledForm(false);
    }
  });

  /**inputs for educational form */
  const educationalInfoInput = [
    { type: 'text', title: 'Full name', value: 'fullName' },
    { type: 'text', title: 'Profession or occupation', value: 'professionOccupation' },
    { type: 'text', title: 'Preferred language', value: 'preferredLanguage' },
    { type: 'text', title: 'Location', value: 'location' },
    { type: 'text', title: 'Personal Description', value: 'personalDescription' }
  ];


  return (
    educationalInfoModal ?
      <div
        className={
          `${educationalInfoModal ? 'scale-100 animate-[fade-in_0.50s]'
            : 'hidden'
          } w-full h-full fixed top-0 flex flex-col justify-center items-center bg-black bg-opacity-75 z-[60]`
        }
        onClick={() => handleCloseModal()}
      >
        <div
          className={
            `${screenNarrow ? 'h-[85%]' : 'h-[90%]'}
            ${educationalInfoModal ?
              'scale-100 animate-[zoom-in_0.50s]'
              : 'scale-0 animate-[zoom-out_0.30s]'
            }  container w-[16rem] lg:w-[31rem] relative flex flex-col justify-center items-center list-none rounded-md shadow-lg transform`
          }
          onClick={(e) => e.stopPropagation()}
        >
          {/**icon-cancel to close modal */}
          <div className='w-6 h-6 absolute -top-5 -right-5 flex flex-col justify-center items-center rounded-full bg-white'>
            <i
              className='w-full h-full text-gray-900 lg:text-gray-400 text-2xl lg:xl flex justify-center cursor-default lg:cursor-pointer lg:hover:text-gray-900'
              onClick={() => handleCloseModal()}
            >
              <IconCancel />
            </i>
          </div>
          {/**header form */}
          <div className='w-full px-4 lg:px-8 py-1 lg:py-2 flex flex-col bg-slate-950 rounded-t-md z-50'>
            <h2 className='w-full h-fit py-1 text-white text-xl lg:text-3xl font-bold transition-all z-10'>
              YOUR PERSONAL INFORMATION
            </h2>
          </div>
          {/**form */}
          <div className='w-full h-full px-2 lg:px-8 flex flex-col justify-center items-center bg-white rounded-b-md'>
            <form
              className='w-full h-full flex flex-col justify-between items-center transition-all z-0'
              onSubmit={(e: any) => handleSubmit(e)}
            >
              <div className='w-full h-full flex flex-col items-center'>
                {/**profile form */}
                <TemplateForm
                  inputData={educationalInfoInput}
                  formData={educationalInfo}
                  changeData={changeEducationalInfo}
                  onChange={(e: any) => handleChangeData(e)}
                  onFocus={(e: any) => setChangeEducationalInfo({ ...changeEducationalInfo, [e.target.name]: true })}
                  onBlur={(e: any) => setChangeEducationalInfo({ ...changeEducationalInfo, [e.target.name]: false })}
                />
              </div>
              {/**submit button */}
              <div className='w-full py-7 flex flex-row justify-between items-center'>
                <button
                  type='submit'
                  className={
                    `${filledForm ?
                      'font-bold bg-green-400 lg:bg-green-30 lg:hover:bg-green-400 cursor-default lg:cursor-pointer' :
                      'bg-slate-400 cursor-default'
                    } w-full text-slate-50 lg:hover:text-white lg:hover:font-bold px-6 py-2 flex flex-row justify-center items-center rounded-md transition-all z-30`
                  }
                  disabled={!filledForm}
                >
                  <h5 className='w-full h-fit text-sm lg:text-base leading-none tracking-wider'>
                    Send
                  </h5>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      :
      ''
  )
}