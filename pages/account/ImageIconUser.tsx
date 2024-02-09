import { useState } from 'react';
import { useUI } from "@/context/ContextUI";
import { useAuthData } from "@/context/ContextAuthData";
import { IconCamera, IconUser } from '@/icons/icons';
import Image from 'next/image';

interface UserProfileImageParams {
  type: 'navbar' | 'dropdown-auth' | 'account-navbar' | 'personal-info' | 'notifications' | 'request' | 'title-chat' | 'message-chat';
  otherUserImageUrl: string;
}


export default function ImageIconUser({ type, otherUserImageUrl }: UserProfileImageParams) {
  const { accountModule } = useUI();
  const { userImageUrl, setProfileModal, setProfileModalAction, setCollectionToChange } = useAuthData();
  const [imageHover, setImageHover] = useState(false);

  const userImageUrlToRender: any = otherUserImageUrl === 'none' ? userImageUrl : otherUserImageUrl;

  const getImageClasses = () => {
    const baseClass = moduleType[type] && moduleType[type]['image-class'];
    return userImageUrlToRender && `${baseClass}`;
  };

  const getIconClasses = () => {
    const baseClass = moduleType[type] && moduleType[type]['icon-class'];
    return `${baseClass} w-[95%] h-[95%] text-white bg-color-text-almost-clear rounded-full transition-all`;
  };

  const getBorderClass = () => {
    return userImageUrlToRender ? moduleType[type]['background'] : 'bg-color-text-almost-clear';
  };

  const isDashboard: boolean = accountModule === 'Dashboard';
  const isEditableImage: boolean = type === 'personal-info';

  const moduleType: any = {
    'message-chat': { 'image-class': 'border-[1px]', 'icon-class': 'text-2xl', 'background': 'bg-color-highlighted' },
    'title-chat': { 'image-class': 'border-[1px]', 'icon-class': 'text-2xl', 'background': 'bg-white' },
    'navbar': { 'image-class': 'w-[93%] h-[93%] border-[1px]', 'icon-class': 'text-[16px]', 'background': 'bg-color-highlighted-clear lg:bg-white hover:bg-color-highlighted-clear' },
    'dropdown-auth': { 'image-class': 'w-[92%] h-[92%] border-[1px]', 'icon-class': 'text-2xl', 'background': 'bg-color-highlighted'},
    'notifications': { 'image-class': 'border-[2px]', 'icon-class': `${isDashboard ? 'text-2xl' : 'text-4xl'}`, 'background': '' },
    'request': { 'image-class': 'border-[2px]', 'icon-class': 'text-4xl', 'background': '' },
    'account-navbar': { 'image-class': 'border-[2px]', 'icon-class': 'text-4xl', 'background': 'bg-gradient-to-br from-color-clear via-color-highlighted-clear to-color-highlighted-dark' },
    'personal-info': { 'image-class': 'border-[2px]', 'icon-class': 'text-7xl', 'background': 'bg-gradient-to-br from-color-clear via-color-highlighted-clear to-color-highlighted-dark' },
  };


  return (
    <div className={`${getBorderClass()} w-full h-full relative flex justify-center items-center rounded-full z-0`}>
      {
        userImageUrlToRender ?
          <Image
            className={`${getImageClasses()} ${type === 'navbar' ? 'border-color-highlighted-clear lg:hover:border-color-highlighted-clear' : 'border-white' } w-[94%] h-[94%] rounded-full transition-all z-10`}
            width={800}
            height={800}
            src={userImageUrlToRender as string}
            alt='profile-image'
          />
          :
          <i className={`${getIconClasses()} flex flex-col justify-center items-center`}>
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
  }
}
