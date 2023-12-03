import { useState, useEffect } from 'react';
import { useAuthData, useAuthUI, useUI } from "../../context/authContext";
import { IconUser, IconMenuI, IconCamera, IconAdd, IconEdit, IconDelete } from '../../icons/icons';
import ImageIconUser from './ImageIconUser';
import SectionTitles from '../components/SectionTitles';
import axios from 'axios';
import DashboardAddInfo from './DashboardAddInfo';



export default function ProfilePersonalInfoCard() {

  const { token, userId, userProfilePersonalInfo, setUserProfilePersonalInfo,
    userProfileImage, setUserProfileImage, setCollectionToChange, update, setUpdate } = useAuthData();
  const { accountModule, setProfileModal, setProfileModalAction, setProfileModalType } = useAuthUI();
  const { setMessageModal, setTypeMessageModal, setTextMessageModal } = useUI();
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
      const response = await axios.post('/api/userApi',
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
    { title: 'Fullname', description: userProfilePersonalInfo?.full_name },
    { title: 'Profession or occupation', description: userProfilePersonalInfo?.profession_occupation },
    { title: 'Preferred language', description: userProfilePersonalInfo?.preferred_language },
    { title: 'Location', description: userProfilePersonalInfo?.location }
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

  const isDashboard = accountModule === 'Dashboard';


  return (
    <>
      <div className='w-full h-[45%]'>
        {/**profile image */}
        <div className='w-full h-full relative flex flex-col justify-between items-center border border-color-border-clear bg-color-clear shadow-md rounded-lg'>
          <div className='w-full h-[80%] relative flex flex-col justify-center items-center'>
            {/**profile image */}
            <div className='w-36 h-36'>
              <ImageIconUser size='large' />
            </div>
            {/**effect-background: add or edit */}
            <div
              className={
                `${imageHover && 'bg-black bg-opacity-60'
                } w-36 h-36 absolute flex flex-col justify-center items-center rounded-full hover:cursor-pointer transition-all`
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
                  imageHover ? 'visible text-color-text-clear' : 'hidden' :
                  'visible text-color-text-clear'} text-7xl flex flex-row justify-center cursor-default lg:cursor-pointer transition-all`}>
                {imageHover && <IconCamera />}
              </i>
            </div>
          </div>
          {/**Availability */}
          <div className='w-full h-[20%] flex border-t border-color-border-clear'>
            <div className='w-full h-full px-5 flex flex-row items-center'>
              <h3 className='w-full pr-2 text-slate-600 text-xs text-start transition-all'>
                Availability
              </h3>
              <div className='w-28 relative flex flex-row justify-center items-center rounded-full'>
                <button
                  className={`${available ? 'bg-green-300' : 'bg-color-tertiary border border-color-border-clear'} w-32 h-3 rounded-full transition-all`}
                  onClick={() => setAvailable(!available)}
                />
                <div className={
                  `${available ? 'bg-green-400 outline-green-400 translate-x-[5.75rem]'
                    : 'bg-slate-300 outline-slate-300 translate-x-0'} w-5 h-5 absolute left-0 border-2 border-color-clear outline-1 outline rounded-full transform transition-transform`
                } />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/**personal information */}
      <div className='w-full h-[55%] pt-2'>
        <div
          className='w-full h-full flex flex-col border border-color-border-clear bg-color-clear shadow-md rounded-lg'
          onMouseEnter={() => setListHover(true)}
          onMouseLeave={() => setListHover(false)}
        >
          {/**title */}
          <div className='w-full relative px-5 py-1 flex flex-row items-center border-b border-color-border-clear'>
            <SectionTitles
              sectionTitle='Personal info...'
              sectionType='account'
            />
            {/**edit and delete button */}
            <div className="w-fit h-full absolute top-0 right-0 p-2 flex flex-row items-center z-20">
              {userProfilePersonalInfo && listHover ?
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
                              py-[2px] pl-1 text-color-text-tertiary text-xl lg:text-2xl flex flex-row justify-center bg-color-clear rounded-full cursor-default lg:cursor-pointer animate-[appear_0.7s_ease] transition-all`
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
                :
                userProfilePersonalInfo &&
                <i className='py-[2px] text-color-text-tertiary text-2xl flex flex-row justify-center cursor-pointer animate-[appear_0.7s_ease] transition-all'>
                  <IconMenuI />
                </i>
              }
            </div>
          </div>
          {
            /**content */
            userProfilePersonalInfo ?
              <div className='w-full relative px-5 py-3 flex flex-col transform transition-all' >
                {/**information */}
                <ul className='w-full flex flex-col'>
                  {
                    personalInfo?.map((element: any, index: any) => {
                      return (
                        /**fullname, profession or occupation, preferred language, location and personal description */
                        <li key={index} className='w-full pb-2 flex flex-col'>
                          <h4 className='w-full text-color-text-secondary text-sm font-semibold'>
                            {element.description}
                          </h4>
                          <h5 className='w-full text-color-text-tertiary text-xs'>
                            {element.title}
                          </h5>
                        </li>
                      )
                    })
                  }
                </ul>
              </div>
              :
              /**button add information */
              <DashboardAddInfo
                id='post-item-profile'
                isDashboard={isDashboard}
                comment='Add information'
                click={() => {
                  setProfileModal(true);
                  setProfileModalAction('post');
                  setProfileModalType('personal information');
                  setCollectionToChange('personal_info');
                }}
              />
          }
        </div>
      </div>
    </>
  )
};