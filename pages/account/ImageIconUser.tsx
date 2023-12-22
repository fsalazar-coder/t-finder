import { useEffect } from 'react';
import { useAuthData } from "../../context/authContext";
import Image from 'next/image';
import { IconUser } from '@/icons/icons';
import axios from 'axios';
import { userDataHandlerFunction } from '../api/userDataHandlerFunction';



export default function ImageIconUser(props: any) {

  const { token, userId, userProfileImage, setUserProfileImage, update, setUpdate } = useAuthData();

  useEffect(() => {
    userDataHandlerFunction({
      token: token as string,
      userId: userId as string,
      action: 'get',
      collectionName: 'profile_image',
      data: '',
      onSuccess: (data: any) => {
        setUserProfileImage(data.image_url);
      },
      onError: (error: any) => console.error(error)
    });
  }, []);

  useEffect(() => {
    if (update === 'profile_image') {
      userDataHandlerFunction({
        token: token as string,
        userId: userId as string,
        action: 'get',
        collectionName: 'profile_image',
        data: '',
        onSuccess: (data: any) => {
          setUserProfileImage(data.image_url);
        },
        onError: (error: any) => console.error(error)
      });
      setUpdate('');
    }
  }, [update, setUpdate]);


  return (
    userProfileImage ?
      <div className='w-full h-full  flex flex-col justify-center items-center bg-gradient-to-br from-slate-50 via-fuchsia-400 to-fuchsia-950 rounded-full z-20'>
        <Image
          className={
            `${props.size === 'small' ?
              'border-[1px]' :
              props.size === 'large' ?
                'border-[2px]' :
                ''} w-[95%] h-[95%] flex flex-col justify-center items-center rounded-full border-white`}
          width={800}
          height={800}
          src={userProfileImage}
          alt='profile-image'
        />
      </div>
      :
      <i className={
        `${props.size === 'small' ?
          'text-2xl' :
          props.size === 'large' ?
            'text-6xl' :
            ''} w-full h-full text-slate-50 font-light flex flex-row justify-center items-center border border-slate-50 rounded-full transition-all`
      }>
        <IconUser />
      </i>
  )
}