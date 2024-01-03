import { useState, useEffect } from 'react';
import { useAuthData, useAuthUI, useUI } from "../../context/authContext";
import { IconMenuI, IconCamera, IconEdit, IconDelete } from '../../icons/icons';
import { userDataHandlerFunction } from '../api/userDataHandlerFunction';
import ImageIconUser from './ImageIconUser';
import SectionTitles from '../components/SectionTitles';
import ButtonDashboardCardAddInfo from './ButtonDashboardCardAddInfo';
import axios from 'axios';



export default function ProfilePersonalInfoCard() {

  const { token, userId, userProfilePersonalInfo, setUserProfilePersonalInfo,
    userProfileImage, setUserProfileImage, setCollectionToChange, update, setUpdate } = useAuthData();
  const { accountModule, setProfileModal, setProfileModalAction, setProfileModalType } = useAuthUI();
  const { setMessageModal } = useUI();
  const [imageHover, setImageHover] = useState(false);
  const [listHover, setListHover] = useState(false);
  const [available, setAvailable] = useState(false);


  const fetchData = async (collection: string) => {
    userDataHandlerFunction({
      token: token as string,
      userId: userId as string,
      action: 'get',
      collectionName: collection,
      data: '',
      onSuccess: (responseData: any) => {
        if (collection === 'personal_info') {
          setUserProfilePersonalInfo(responseData);
        }
        else if (collection === 'profile_image') {
          setUserProfileImage(responseData.image_url);
        }
      },
      onError: (error: any) => console.error(error)
    });
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
        setMessageModal([{
          type: 'delete',
          text: 'Delete your personal information with this action',
          click: () => {
            setMessageModal([])
            setTimeout(() => {
              userDataHandlerFunction({
                token: token as string,
                userId: userId as string,
                action: 'delete',
                collectionName: 'personal_info',
                data: '',
                onSuccess: (status: string) => {
                  status === 'success' &&
                    setMessageModal([{
                      type: 'successful',
                      text: 'Your personal information had been deleted',
                      click: () => setMessageModal([])
                    }])
                },
                onError: (error: any) => console.error(error)
              });
              setUserProfilePersonalInfo(null);
            }, 500);
          }
        }]);
      },
    },
  ];

  const isDashboard = accountModule === 'Dashboard';


  return (
    <div
      className='w-full h-full flex flex-col border border-color-border bg-white shadow-md rounded-lg'
      onMouseEnter={() => setListHover(true)}
      onMouseLeave={() => setListHover(false)}
    >
      {/**title */}
      <div className='w-full relative px-5 py-1 flex flex-row items-center border-b border-color-border'>
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
                              py-[2px] pl-1 text-color-text-almost-clear text-xl lg:text-2xl flex flex-row justify-center rounded-full cursor-default lg:cursor-pointer animate-[appear_0.7s_ease] transition-all`
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
            <i className='py-[2px] text-color-text-almost-clear text-2xl flex flex-row justify-center cursor-pointer animate-[appear_0.7s_ease] transition-all'>
              <IconMenuI />
            </i>
          }
        </div>
      </div>
      {/**profile image */}
      <div className='w-full h-fit py-4 relative flex flex-col justify-center items-center'>
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
      {
        /**content */
        userProfilePersonalInfo ?
          <div className='w-full relative px-5 flex flex-col transform transition-all' >
            {/**information */}
            <ul className='w-full pt-4 flex flex-col border-t border-color-border'>
              {
                personalInfo?.map((element: any, index: any) => {
                  return (
                    /**fullname, profession or occupation, preferred language, location and personal description */
                    <li key={index} className='w-full pb-2 flex flex-col'>
                      <h4 className='w-full text-color-text-dark text-sm font-semibold'>
                        {element.description}
                      </h4>
                      <h5 className='w-full text-color-text-almost-clear text-xs'>
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
          <ButtonDashboardCardAddInfo
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
  )
};