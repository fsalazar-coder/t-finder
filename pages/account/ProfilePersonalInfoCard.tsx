import { useState, useEffect } from 'react';
import { useAuthData, useAuthUI, useUI } from "../../context/authContext";
import { IconAdd, IconEdit, IconDelete } from '../../icons/icons';
import ImageIconUser from './ImageIconUser';
import SectionTitles from '../components/SectionTitles';
import axios from 'axios';



export default function PersonalInfo() {

  const { token, userId, userProfilePersonalInfo, setUserProfilePersonalInfo,
    userProfileImage, setUserProfileImage, setCollectionToChange, update, setUpdate } = useAuthData();
  const { setProfileModal, setProfileModalAction, setProfileModalType } = useAuthUI();
  const { setMessageModal, setTypeMessageModal, setTextMessageModal } = useUI();
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
          setUserProfileImage(actionResponse);
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
      icon: userProfilePersonalInfo ? <IconEdit /> : <IconAdd />,
      click: () => {
        setProfileModal(true);
        setProfileModalAction(userProfilePersonalInfo ? 'edit' : 'post');
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
    <li
      key='personal-information'
      id='personal-information'
      className='w-full relative p-2 lg:p-5 my-3 lg:my-2 flex flex-col justify-center bg-slate-50 border border-white rounded-md drop-shadow-md'
    >
      <div className='w-full flex flex-row'>
        <SectionTitles
          sectionTitle='PERSONAL INFORMATION'
          sectionSubtitle=''
          sectionType='account'
        />
      </div>
      <div className='w-full mt-1 lg:mt-2 flex flex-col'>
        <div className='w-full flex flex-col lg:flex-row-reverse lg:justify-between'>
          {/**profile image */}
          <div className='w-full lg:w-60 mb-1 lg:mb-0 flex flex-col justify-between items-center'>
            {/**image */}
            <div className='w-full p-1 lg:p-2 mb-1 flex flex-col justify-between items-center bg-white rounded-md'>
              <div className='w-40 h-40 relative flex flex-col justify-center items-center'>
                <div className='absolute top-0 right-0 flex flex-col justify-center items-center z-30'>
                  <button
                    className="w-full p-[2px] flex flex-row justify-center items-center bg-white rounded-full"
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      setProfileModal(true);
                      setProfileModalAction(userProfileImage ? 'edit' : 'post');
                      setCollectionToChange('profile_image');
                    }}
                  >
                    <i className='text-green-300 lg:hover:text-green-300 lg:text-slate-300 text-xl lg:text-2xl flex flex-row justify-center cursor-default lg:cursor-pointer'>
                      {userProfileImage ? <IconEdit /> : <IconAdd />}
                    </i>
                  </button>
                </div>
                <ImageIconUser size='large' />
              </div>
            </div>
            <div className='w-full p-1 lg:p-2 flex flex-row items-center bg-white rounded-md'>
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
          <div className='w-full relative p-1 lg:p-2 lg:mr-1 flex flex-col bg-white rounded-md'>
            {/**add, edit and delete button */}
            <ul className="w-full absolute top-0 right-0 p-2 flex flex-row justify-end items-center z-20">
              {
                buttons.map((button: any, index: any) => {
                  return (
                    <li
                      key={button.key}
                      id={button.id}
                      className={
                        `${!userProfilePersonalInfo ? index > 0 ?
                          'hidden' : 'visible' : 'visible'} flex flex-col justify-center items-center`
                      }>
                      <button className="flex flex-row justify-center items-center hover:cursor-default">
                        <h3 className='pr-2 text-sm text-slate-400'>
                          {userProfilePersonalInfo ? '' : 'Add information'}
                        </h3>
                        <i className={
                          `${index === 1 ?
                            'lg:hover:text-red-500' :
                            'lg:hover:text-green-500'
                          } p-[2px] text-slate-300 text-xl lg:text-2xl flex flex-row justify-center bg-white rounded-full cursor-default lg:cursor-pointer`
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
            {
              userProfilePersonalInfo ?
                /**personal information */
                <ul className='w-full p-2 flex flex-col'>
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
                :
                ''
            }
          </div>
        </div>
      </div>
    </li>
  )
};