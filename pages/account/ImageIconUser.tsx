import { useEffect } from 'react';
import { useAuthData } from "../../context/authContext";
import { userDataHandlerFunction } from '../api/userDataHandlerFunction';
import { IconUser } from '@/icons/icons';
import Image from 'next/image';

interface UserProfileImageParams {
  size: 'small' | 'large';
}



export default function ImageIconUser({ size }: UserProfileImageParams) {
  const { token, userId, userProfileImage, setUserProfileImage, update, setUpdate } = useAuthData();

  const fetchUserProfileImage = () => {
    userDataHandlerFunction({
      token: token as string,
      userId: userId as string,
      action: 'get',
      collectionName: 'profile_image',
      data: '',
      onSuccess: (responseData: any) => setUserProfileImage(responseData.image_url),
      onError: (error: any) => console.error(error)
    });
  };

  useEffect(() => {
    if (userId && token && (!update || update === 'profile_image')) {
      fetchUserProfileImage();
      setUpdate('');
    }
  }, [userId, token, update, setUpdate]);

  const imageClass = size === 'small' ? 'border-[1px]' : size === 'large' && 'border-[2px]';
  const iconClass = size === 'small' ? 'text-2xl' : size === 'large' && 'text-6xl';

  return (
    userProfileImage ?
      <div className='w-full h-full flex flex-col justify-center items-center bg-gradient-to-br from-color-clear via-sky-400 to-sky-950 rounded-full z-20'>
        <Image
          className={`${imageClass} w-[95%] h-[95%] flex flex-col justify-center items-center rounded-full border-white`}
          width={800}
          height={800}
          src={userProfileImage}
          alt='profile-image'
        />
      </div>
      :
      <i className={`${iconClass} w-full h-full text-color-clear font-light flex flex-row justify-center items-center border border-color-border rounded-full transition-all`}>
        <IconUser />
      </i>
  )
}
