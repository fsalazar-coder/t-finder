import { useState, useEffect } from 'react';
import { useAuthUI, useAuthData } from "../../context/authContext";
import { userDataHandlerFunction } from '../api/userDataHandlerFunction';
import { IconCamera, IconUser } from '@/icons/icons';
import Image from 'next/image';

interface UserProfileImageParams {
  type: 'navbar' | 'dropdown' | 'account-navbar' | 'personal-info' | 'notifications' | 'request' | 'title-chat' | 'message-chat';
  otherUserImageUrl: string;
}



export default function ImageIconUser({ type, otherUserImageUrl }: UserProfileImageParams) {
  const { accountModule, setProfileModal, setProfileModalAction } = useAuthUI();
  const { token, userId, userImageUrl, setUserImageUrl, setCollectionToChange, update, setUpdate, updateCounter, setUpdateCounter } = useAuthData();
  const [imageHover, setImageHover] = useState(false);

  useEffect(() => {
    if (token && userId && (update === 'all' || update === 'profile-image')) {
      setUpdateCounter((counter) => counter + 1);
      const fetchUserProfileImage = async () => {
        userDataHandlerFunction({
          token: token as string,
          userId: userId as string,
          action: 'get',
          collectionName: 'profile_image',
          data: '',
          onSuccess: (responseData: any) => setUserImageUrl(responseData.image_url),
          onError: (error: any) => console.error(error)
        });
      };
      fetchUserProfileImage().then(() => {
        setUpdateCounter((counter) => counter - 1);  
        if ((update === 'all' && updateCounter === 0) || update === 'profile-image') {
          setUpdate('');
        }
      });
    }
  }, [token, userId, update]);

  const userImageUrlToRender: any = otherUserImageUrl === '' ? userImageUrl : otherUserImageUrl;

  const getImageClasses = () => {
    const baseClass = moduleType[type] && moduleType[type]['image-class'];
    return userImageUrlToRender && `${baseClass}`;
  };

  const getIconClasses = () => {
    const baseClass = moduleType[type] && moduleType[type]['icon-class'];
    return `${baseClass} w-[95%] h-[95%] text-color-text-almost-clear font-light bg-white rounded-full transition-all`;
  };

  const getBorderClass = () => {
    return userImageUrlToRender ? moduleBorderColor[type] || 'border-color-border' : 'border border-color-border';
  };

  const isDashboard = accountModule === 'Dashboard';
  const isEditableImage = type === 'personal-info';

  const moduleType: any = {
    'message-chat': { 'image-class': 'border-[1px]', 'icon-class': 'text-2xl' },
    'title-chat': { 'image-class': 'border-[1px]', 'icon-class': 'text-2xl' },
    'navbar': { 'image-class': 'w-[93%] h-[93%] border-[1px]', 'icon-class': 'text-2xl' },
    'dropdown': { 'image-class': 'w-[92%] h-[92%] border-[1px]', 'icon-class': 'text-2xl' },
    'notifications': { 'image-class': 'border-[2px]', 'icon-class': `${isDashboard ? 'text-2xl' : 'text-4xl'}` },
    'request': { 'image-class': 'border-[2px]', 'icon-class': 'text-4xl' },
    'account-navbar': { 'image-class': 'border-[2px]', 'icon-class': 'text-6xl' },
    'personal-info': { 'image-class': 'border-[2px]', 'icon-class': 'text-6xl' },
  };

  const moduleBorderColor: any = {
    'message-chat': 'bg-color-highlighted',
    'title-chat': 'bg-white',
    'navbar': 'bg-color-highlighted',
    'dropdown': 'bg-color-highlighted',
    'notifications': '',
    'request': '',
    'account-navbar': 'bg-gradient-to-br from-color-clear via-color-highlighted to-color-highlighted-dark',
    'personal-info': 'bg-gradient-to-br from-color-clear via-color-highlighted to-color-highlighted-dark',
  }


  return (
    <div className={`${getBorderClass()} w-full h-full relative flex justify-center items-center rounded-full z-0`}>
      {
        userImageUrlToRender ?
          <Image
            className={`${getImageClasses()} w-[94%] h-[94%] rounded-full border-white transition-all z-10`}
            width={800}
            height={800}
            src={userImageUrlToRender as string}
            alt='profile-image'
          />
          :
          <i className={`${getIconClasses()} flex flex-col text-color-text-clear justify-center items-center`}>
            <IconUser />
          </i>
      }
      {isEditableImage && renderEditOverlay()}
    </div>
  );

  function renderEditOverlay() {
    return (
      <div
        className={`${imageHover ? 'bg-opacity-25' : 'bg-opacity-0'} w-32 h-32 absolute flex justify-center items-center bg-black rounded-full hover:cursor-pointer transition-all z-20`}
        onMouseEnter={() => setImageHover(true)}
        onMouseLeave={() => setImageHover(false)}
        onClick={handleImageEditClick}
      >
        <i className={`${imageHover ? 'visible text-color-text-clear' : 'hidden'} text-7xl flex justify-center cursor-default lg:cursor-pointer transition-all z-20`}>
          {imageHover && <IconCamera />}
        </i>
      </div>
    );
  }

  function handleImageEditClick(e: any) {
    setProfileModal('profile-image');
    setProfileModalAction(userImageUrl ? 'edit' : 'post');
    setCollectionToChange('profile_image');
    console.log('Click on image: ', userImageUrl)
  }
}
