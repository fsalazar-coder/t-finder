import { useState, useEffect } from 'react';
import { useAuthData, useAuthUI, useUI } from "../../context/authContext";
import { IconUser, IconCamera, IconAdd, IconEdit, IconDelete } from '../../icons/icons';
import ImageIconUser from './ImageIconUser';
import SectionTitles from '../components/SectionTitles';
import axios from 'axios';



export default function PersonalInfo() {

  const { token, userId, userProfilePersonalInfo, setUserProfilePersonalInfo,
    userProfileImage, setUserProfileImage, setCollectionToChange, update, setUpdate } = useAuthData();
  const { setProfileModal, setProfileModalAction, setProfileModalType } = useAuthUI();
  const { screenNarrow, setMessageModal, setTypeMessageModal, setTextMessageModal } = useUI();
  const [imageHover, setImageHover] = useState(false);
  const [listHover, setListHover] = useState(false);
  const [available, setAvailable] = useState(false);


  const fetchData = async (collection: string) => {
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
    try {
      const response = await axios.post('/api/profileApi',
        {
          id: userId,
          collectionName: collection,
          action: 'get',
          data: ''
        },
        config
      );
      const { status, actionResponse } = response.data;
      if (status === 'success') {
        if (collection === 'personal_info') {
          setUserProfilePersonalInfo(actionResponse);
        }
        else if (collection === 'profile_image') {
          setUserProfileImage(actionResponse.image_url);
        }
      }
    }
    catch (error: any) {
      console.log('An error occurred fetch data: ', error);
    }
  };

  useEffect(() => {
    fetchData('personal_info');
    fetchData('profile_image');
  }, []);

  useEffect(() => {
    if (update === 'personal_info') {
      fetchData('personal_info');
      setUpdate('');
      setCollectionToChange('');
    }
    else if (update === 'profile_image') {
      fetchData('profile_image');
      setUpdate('');
      setCollectionToChange('');
    }
  }, [update])

  let personalInfo = [
    { title: 'Fullname:', description: userProfilePersonalInfo?.full_name },
    { title: 'Profession or occupation:', description: userProfilePersonalInfo?.profession_occupation },
    { title: 'Preferred language:', description: userProfilePersonalInfo?.preferred_language },
    { title: 'Location:', description: userProfilePersonalInfo?.location },
    { title: 'Personal description:', description: userProfilePersonalInfo?.personal_description }
  ];

  const buttons = [
    {
      id: 'post-item-profile',
      key: 'post-item-profile',
      icon: <IconEdit />,
      click: () => {
        setProfileModal(true);
        setProfileModalAction('edit');
        setProfileModalType('personal_info');
        setCollectionToChange('personal_info')
      },
    },
    {
      id: 'delete-item-profile',
      key: 'delete-item-profile',
      icon: <IconDelete />,
      click: () => {
        setMessageModal(true);
        setTypeMessageModal('delete');
        setTextMessageModal('Delete your personal information with this action');
        setCollectionToChange('personal_info');
      },
    },
  ];


  return (
    <>
      {/**title */}
      <div className='w-full relative px-5 py-1 lg:py-2 flex flex-row items-center border-b border-slate-200'>
        <SectionTitles
          sectionTitle='Personal information'
          sectionType='account'
        />
        {/**add button */}
        <div className={
          `${!userProfilePersonalInfo ? 'h-full visible' : 'hidden'
          } absolute right-0 top-0 px-5 py-1 lg:py-2 flex flex-row justify-end items-center z-20`
        }>
          <div
            id='post-item-profile'
            className='flex flex-col justify-center items-center transition-all'>
            <button
              className="w-full flex flex-row justify-center items-center hover:cursor-default"
              onClick={() => {
                setProfileModal(true);
                setProfileModalAction('post');
                setProfileModalType('personal information');
                setCollectionToChange('personal_info');
              }}
            >
              <h3 className='pr-2 text-sm text-slate-400 transition-all'>
                {!userProfilePersonalInfo ? screenNarrow ? 'Add' : 'Add information' : ''}
              </h3>
              <i className='p-[2px] text-slate-300 lg:hover:text-green-500 text-xl lg:text-2xl flex flex-row justify-center bg-white rounded-full cursor-default lg:cursor-pointer transition-all'>
                <IconAdd />
              </i>
            </button>
          </div>
        </div>
      </div>
      {/**content */}
      <div className='w-full px-5 py-1 flex flex-col'>
        <div className='w-full flex flex-col lg:flex-row-reverse lg:justify-between'>
          {/**profile image */}
          <div className={`${!screenNarrow && 'border-l border-slate-100'} w-full lg:w-60 pl-5 mb-1 lg:mb-0 flex flex-col justify-between items-center`}>
            {/**image */}
            <div className='w-full relative p-1 lg:p-2 mb-1 flex flex-col justify-between items-center'>
              {/**image effect-button add or edit */}
              <div
                className={
                  `${imageHover ?
                    'bg-black bg-opacity-60' : ''
                  } w-40 h-40 absolute flex flex-col justify-center items-center rounded-full hover:cursor-pointer transition-all`
                }
                onMouseEnter={() => setImageHover(true)}
                onMouseLeave={() => setImageHover(false)}
                onClick={(e: any) => {
                  setProfileModal(true);
                  setProfileModalAction(userProfileImage ? 'edit' : 'post');
                  setCollectionToChange('profile_image');
                }}
              >
                <i className={
                  `${userProfileImage ?
                    imageHover ? 'visible text-white' : 'hidden' :
                    'visible text-slate-300'} text-7xl flex flex-row justify-center cursor-default lg:cursor-pointer transition-all`}>
                  {imageHover && <IconCamera />}
                </i>
              </div>
              {/**profile image */}
              <div className='w-40 h-40'>
                <ImageIconUser size='large' />
              </div>
            </div>
            {/**Availability */}
            <div className='w-full p-1 lg:p-2 flex flex-row items-center'>
              <h3 className='w-fit px-2 text-xs text-start transition-all'>
                Availability
              </h3>
              <div className='w-14 relative py-1 flex flex-row justify-center items-center rounded-full'>
                <button
                  className={`${available ? 'bg-green-300' : 'bg-slate-100'} w-20 h-3 rounded-full transition-all`}
                  onClick={() => setAvailable(!available)}
                />
                <div className={
                  `${available ? 'bg-green-400 outline-green-400 translate-x-[2.2rem]'
                    : 'bg-slate-300 outline-slate-300 translate-x-0'} w-5 h-5 absolute left-0 border-2 border-white outline-1 outline rounded-full transform transition-transform`
                } />
              </div>
            </div>
          </div>
          {/**personal information */}
          <div
            className='w-full relative py-3 lg:mr-1 flex flex-col transform transition-all'
            onMouseEnter={() => setListHover(true)}
            onMouseLeave={() => setListHover(false)}
          >
            {/**edit and delete button */}
            <div className="w-full absolute top-0 right-0 p-2 flex flex-row justify-end items-center z-20">
              {userProfilePersonalInfo && listHover &&
                <ul className="w-full h-fit flex flex-row justify-end items-center transition-all">
                  {
                    buttons.map((button: any, index: any) => {
                      return (
                        <li
                          key={button.key}
                          id={button.id}
                          className='flex flex-col justify-center items-center transition-all'>
                          <button className="flex flex-row justify-center items-center hover:cursor-default">
                            <i className={
                              `${index === 1 ? 'lg:hover:text-red-500' : 'lg:hover:text-green-500'} 
                              p-[2px] text-slate-300 text-xl lg:text-2xl flex flex-row justify-center bg-white rounded-full cursor-default lg:cursor-pointer animate-[appear_0.7s_ease] transition-all`
                            }
                              onClick={button.click}
                            >
                              {button.icon}
                            </i>
                          </button>
                        </li>
                      )
                    })
                  }
                </ul>
              }
            </div>
            {
              userProfilePersonalInfo &&
              /**personal information */
              <ul className='w-full flex flex-col'>
                {
                  personalInfo?.map((element: any, index: any) => {
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
            }
          </div>
        </div>
      </div>
    </>
  )
};