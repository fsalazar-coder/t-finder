import React, { useState, useEffect, useRef } from 'react';
import { useAuth, useScreenNarrow, usePersonalInfoModal } from "../../context/authContext";
import axios from 'axios';
import { IconCancel, IconCheckCircle } from '../../icons/icons';
import TemplateForm from './TemplateForm';



export default function PersonalInfoModal(props: any) {

  const { auth } = useAuth();
  const { screenNarrow } = useScreenNarrow();
  const { personalInfoModal, setPersonalInfoModal } = usePersonalInfoModal();
  const [filledForm, setFilledForm] = useState(false);
  const [onClickSubmit, setOnClickSubmit] = useState(false);
  const carouselFormRef: any = useRef(null);
  const carouselFormSelected: any = carouselFormRef.current;
  const [carouselFormPosition, setCarouselFormPosition] = useState(Number);
  const [carouselTranslateX, setCarouselTranslateX] = useState(Number);

  const [dataProfile, setDataProfile] = useState({
    fullName: '',
    professionOcuppation: '',
    preferredLanguage: '',
    location: '',
    birthday: '',
    personalDescription: ''
  });
  const [changeDataProfile, setChangeDataProfile] = useState({
    fullName: false,
    professionOcuppation: false,
    preferredLanguage: false,
    location: false,
    birthday: false,
    personalDescription: false
  });
  {/** */ }

  const handleChangeData = (e: any) => {
    const { name, value } = e.target;
    setDataProfile({ ...dataProfile, [name]: value });
  };

  const handleCloseModal = (e: any) => {
    setPersonalInfoModal(false);
    setCarouselFormPosition(0);
    setFilledForm(false);
    setOnClickSubmit(false);
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios
        .post('/api/Profile', dataProfile);
      console.log(`Profile saved: `, response.data);
    }
    catch (error) {
      console.error(`Error saving profile: `, error);
    }
  };

  /**carousel transition effect control */
  useEffect(() => {
    setCarouselTranslateX(carouselFormPosition * (screenNarrow ? 260 : 500));
    if (carouselFormSelected) {
      carouselFormSelected.style.transition = 'all 1s ease';
      carouselFormSelected.style.transform = `translateX(-${carouselTranslateX}px)`;
    }
  });

  /**fill form control */
  useEffect(() => {
    let dataProfileFilled = Object.values(dataProfile).some(value => value === '');
    if (!dataProfileFilled) {
      setFilledForm(true);
    }
    else {
      setFilledForm(false);
    }
  });

  /**inputs for profile form */
  const personalInfoInput = [
    { type: 'text', title: 'Full name', value: 'fullName' },
    { type: 'text', title: 'Profession/Occupation', value: 'professionOccupation' },
    { type: 'text', title: 'Preferred language', value: 'preferredLanguage' },
    { type: 'text', title: 'Location', value: 'location' },
    { type: 'text', title: 'Personal Description', value: 'personalDescription' }
  ];


  return (
    personalInfoModal ?
      <div
        className={
          `${personalInfoModal ? 'scale-100 animate-[fade-in_0.50s]'
            : 'hidden'
          } w-full h-full fixed top-0 flex flex-col justify-center items-center bg-black bg-opacity-75 z-50`
        }
        onClick={(e: any) => handleCloseModal(e)}
      >
        <div
          className={
            `${screenNarrow ? 'h-[85%]' : 'h-[90%]'}
            ${personalInfoModal ?
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
              onClick={(e: any) => handleCloseModal(e)}
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
          <div className='w-full h-full flex flex-row items-center bg-white rounded-b-md overflow-x-hidden'>
            {/***carousel form***/}
            <ul
              className='w-[9999px] flex flex-row items-center transform transition-all list-none'
              ref={carouselFormRef}
            >
              {/**step 3: complete talent or job request form */}
              <li
                key='profile-filling-I'
                className='w-[16rem] lg:w-[31rem] h-full px-2 lg:px-8 flex flex-col justify-between items-center transition-all'
              >
                {/**form I */}
                <form
                  className='w-full h-full flex flex-col justify-between items-center transition-all z-0'
                  onSubmit={(e: any) => handleSubmit(e)}
                >
                  <div className='w-full h-full flex flex-col items-center'>
                    {/**profile form I */}
                    <TemplateForm
                      inputData={personalInfoInput}
                      formData={dataProfile}
                      changeData={changeDataProfile}
                      onChange={(e: any) => handleChangeData(e)}
                      onFocus={(e: any) => setChangeDataProfile({ ...changeDataProfile, [e.target.name]: true })}
                      onBlur={(e: any) => setChangeDataProfile({ ...changeDataProfile, [e.target.name]: false })}
                    />
                  </div>
                  {/**back and next button */}
                  <div className='w-full py-7 flex flex-row justify-between items-center'>
                    {/**back button */}
                    <button className='w-[45%] text-slate-50 lg:hover:text-white lg:hover:font-bold px-6 py-2 flex flex-row justify-center items-center bg-slate-400 cursor-default lg:cursor-pointer rounded-md transition-all opacity-100'>
                      <h5 className='w-full h-fit text-sm lg:text-base leading-none tracking-wider'>
                        Back
                      </h5>
                    </button>
                    {/**next button */}
                    <button
                      className='w-[45%] px-6 py-2 text-slate-50 lg:hover:text-white font-bold  flex flex-row justify-center items-center bg-green-500 lg:bg-green-300 lg:hover:bg-green-500 cursor-default lg:cursor-pointer rounded-md transition-all'
                      onClick={() => setCarouselFormPosition(1)}
                    >
                      <h5 className='w-full h-fit text-sm lg:text-base leading-none tracking-wider'>
                        Next
                      </h5>
                    </button>
                  </div>
                </form>
              </li>
            </ul>
          </div>
        </div>
      </div>
      :
      ''
  )
}