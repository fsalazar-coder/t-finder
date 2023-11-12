import { useState } from 'react';
import { useAuthData, useAuthUI, useUI } from "../../context/authContext";
import axios from 'axios';
import Image from 'next/image';
import { IconUser } from '../../icons/icons';



export default function ProfileModalImageVieja() {

  const { userId, userProfileImage, setUserProfileImage, collectionToChange, setUpdate } = useAuthData();
  const { setProfileModal, profileModalAction, setProfileModalAction, setProfileModalType } = useAuthUI();
  const { setMessageModal, setTypeMessageModal, setTextMessageModal, setLoading } = useUI();
  const [fileImage, setFileImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState(userProfileImage?.url);

  const imageHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setFileImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  }

  const profileimageHandleSubmit = async (e: any, userId: string) => {
    e.preventDefault();
    setProfileModal(false);
    setLoading(true);
    if (!fileImage) return;
    const formData = new FormData();
    formData.append('image', fileImage);

    const config: any = {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      withCredentials: true
    };

    try {
      const response = await axios.post(`/api/profileImageApi?id=${userId}`,
        formData,
        config
      );
      const { status, actionResponse } = response.data;
      if (status === 'success') {
        setUserProfileImage(actionResponse);
        setUpdate(collectionToChange)
        setMessageModal(true);
        setTypeMessageModal('successful');
        setTextMessageModal(`Your profile image have been ${profileModalAction === 'post' ? 'posted' : 'updated'}`);
      }
      else {
        setMessageModal(true);
        setTypeMessageModal('error');
        setTextMessageModal('Profile image not uploaded');
      }
    }
    catch (error: any) {
      if (error.response) {
        let statusError = error.response.status;
        let messageError = error.response.data.message;
        setMessageModal(true);
        switch (statusError) {
          case 500:
            setTypeMessageModal('error');
            setTextMessageModal(messageError || 'An error occurred');
            break;
          default:
            setTypeMessageModal('error');
            setTextMessageModal('An unexpected error occurred.');
        }
      }
    }
    finally {
      setFileImage(null);
      setPreviewImage('');
      setLoading(false);
      setProfileModalAction('');
      setProfileModalType('');
    }
  };

  const profileImage = userProfileImage?.url;

  return (
    <div className='w-full h-full flex flex-col justify-between items-center'>
      {/**icon user or profile image preview */}
      <div className='w-full h-full flex flex-col justify-center items-center'>
        <div className='w-72 h-72 flex flex-row justify-center items-center'>
          {
            fileImage ?
              <Image
                className='w-full h-full rounded-full'
                width={400}
                height={400}
                src={previewImage as string}
                alt='profile-image'
              />
              :
              profileImage ?
                <Image
                  className='w-full h-full rounded-full'
                  width={400}
                  height={400}
                  src={profileImage}
                  alt='profile-image'
                />
                :
                <i className='w-full h-full text-slate-300 text-7xl font-light flex flex-row justify-center items-center border border-slate-300 rounded-full cursor-pointer transition-all'>
                  <IconUser />
                </i>
          }
        </div>
      </div>
      {/**form container */}
      <div className='w-full px-4 lg:px-8 flex flex-col'>
        {/**form-box */}
        <form
          className='w-full flex flex-col'
          onSubmit={(e: any) => profileimageHandleSubmit(e, userId as string)}
        >
          {/**profile image input */}
          <div className='w-full h-fit relative flex flex-col justify-start items-start'>
            <input
              type="file"
              id='image'
              name="image"
              className='w-full h-fit py-1 text-sm lg:text-base rounded-md outline-none shadow-input transition-all z-10'
              accept='image/*'
              required
              onChange={(e: any) => imageHandleChange(e)}
            />
          </div>
          {/**button submit form */}
          <div className='w-full py-5 flex flex-col justify-center items-center'>
            <button
              type='submit'
              className={
                `${fileImage ?
                  'font-bold bg-green-400 lg:bg-green-300 lg:hover:bg-green-400 cursor-default lg:cursor-pointer' :
                  'bg-slate-400 cursor-default'
                } w-full text-slate-50 lg:hover:text-white lg:hover:font-bold px-6 py-2 flex flex-row justify-center items-center rounded-md transition-all z-30`
              }
              disabled={!fileImage ? true : false}
            >
              <h5 className='w-full h-fit text-sm lg:text-base leading-none tracking-wider'>
                Upload
              </h5>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}