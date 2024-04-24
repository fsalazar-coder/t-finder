import { useState } from 'react';
import { useUI } from "@/context/ContextUI";
import { useAuthData } from "@/context/ContextAuthData";
import { IconCamera, IconUser } from '@/icons/icons';
import Image from 'next/image';

interface UserProfileImageParams {
  type: 'navbar-home' | 'dropdown-auth' | 'navbar-account' | 'personal-info' | 'notifications' | 'request' | 'title-chat' | 'message-chat';
  otherUserImageUrl: string;
}


export default function ImageIconUser({ type, otherUserImageUrl }: UserProfileImageParams) {
  const { accountModule } = useUI();
  const { dropdownAuth, setDropdownAuth, setHamburguerMenuActive } = useUI();
  const { userImageUrl, setProfileModal, setProfileModalAction, setCollectionToChange } = useAuthData();
  const [imageHover, setImageHover] = useState(false);
  const isDashboard: boolean = accountModule === 'Dashboard';
  const isEditableImage: boolean = type === 'personal-info';
  const isHomeNavbar: boolean = type === 'navbar-home';
  const userImageUrlToRender: any = otherUserImageUrl === 'none' ? userImageUrl : otherUserImageUrl;

  const moduleType: any = {
    'message-chat': { 'image-class': '', 'icon-class': 'text-2xl', 'background': '' },
    'title-chat': { 'image-class': 'border-[2px] border-white', 'icon-class': 'text-2xl', 'background': ' bg-color-highlighted' },
    'navbar-home': { 'image-class': 'border-[1px] border-white', 'icon-class': 'text-[16px]', 'background': 'bg-color-secondary-clear lg:bg-color-secondary hover:bg-color-secondary-clear' },
    'dropdown-auth': { 'image-class': 'border-[2px] border-white', 'icon-class': 'text-2xl', 'background': 'bg-color-secondary' },
    'notifications': { 'image-class': 'border-[2px] border-white', 'icon-class': `${isDashboard ? 'text-2xl' : 'text-4xl'}`, 'background': '' },
    'request': { 'image-class': 'border-[2px] border-white', 'icon-class': 'text-4xl', 'background': '' },
    'navbar-account': { 'image-class': 'border-[2px] border-white', 'icon-class': 'text-4xl', 'background': 'bg-gradient-to-br from-color-clear via-color-secondary-clear to-color-secondary-dark' },
    'personal-info': { 'image-class': 'border-[3px] border-white', 'icon-class': 'text-7xl', 'background': 'bg-gradient-to-br from-color-clear via-color-secondary-clear to-color-secondary-dark' },
  };

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

  const handleClickOnNavbarHome = () => {
    setDropdownAuth(!dropdownAuth)
    setHamburguerMenuActive(false);
  }

  const handleClickOnPersonalInfo = () => {
    setProfileModal('profile-image');
    setProfileModalAction(userImageUrl ? 'edit' : 'post');
    setCollectionToChange('profile_image');
  }


  return (
    <div
      className={`${getBorderClass()} w-full h-full relative flex justify-center items-center rounded-full z-0`}
      onClick={() => isHomeNavbar && handleClickOnNavbarHome()}>
      <ProfileImage
        userImageUrlToRender={userImageUrlToRender}
        imageClass={getImageClasses()}
        iconClass={getIconClasses()}
      />
      <EditProfileImage
        shouldRender={isEditableImage}
        imageHover={imageHover}
        mouseEnter={() => setImageHover(true)}
        mouseLeave={() => setImageHover(false)}
        click={handleClickOnPersonalInfo}
      />
    </div>
  )
};

const ProfileImage = ({ userImageUrlToRender, imageClass, iconClass }: any) => {
  return (
    userImageUrlToRender ?
      <Image
        className={`${imageClass} w-[95%] h-[95%] flex flex-row justify-center items-center rounded-full transition-all z-10`}
        width={800}
        height={800}
        src={userImageUrlToRender as string}
        alt='profile-image'
      />
      :
      <i className={`${iconClass} flex flex-col justify-center items-center`}>
        <IconUser />
      </i>
  )
};

const EditProfileImage = ({ shouldRender, imageHover, mouseEnter, mouseLeave, click }: any) => {
  return (
    shouldRender &&
    <div
      className={`${imageHover ? 'bg-opacity-25' : 'bg-opacity-0'} w-32 h-32 absolute flex justify-center items-center bg-black rounded-full hover:cursor-pointer transition-all z-20`}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
      onClick={click}
    >
      <i className={`${imageHover ? 'visible text-color-text-clear' : 'hidden'} text-7xl flex justify-center cursor-default lg:cursor-pointer transition-all z-20`}>
        {imageHover && <IconCamera />}
      </i>
    </div>
  )
};