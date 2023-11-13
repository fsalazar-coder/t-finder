'use client';

import type { PutBlobResult } from '@vercel/blob';
import { useState, useRef, useCallback, useMemo, ChangeEvent } from 'react';
import { useAuthData, useAuthUI, useUI } from "../../context/authContext";
import Image from 'next/image';
import { IconUser } from '../../icons/icons';
import axios from 'axios';



export default function ProfileModalImage() {
  const [data, setData] = useState<{ image: string | null }>({ image: null });
  const [fileImage, setFileImage] = useState<File | null>(null);
  const { token, userId, userProfileImage, setUserProfileImage, collectionToChange, setUpdate } = useAuthData();
  const { setProfileModal, profileModalAction, setProfileModalAction, setProfileModalType } = useAuthUI();
  const { setMessageModal, setTypeMessageModal, setTextMessageModal, loading, setLoading } = useUI();
  const [previewImage, setPreviewImage] = useState<string | null>(userProfileImage || null);


  const onChangePicture = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files && e.currentTarget.files[0];
    if (file) {
      if (file.size / 1024 / 1024 > 50) {
        setMessageModal(true);
        setTypeMessageModal('error');
        setTextMessageModal('File size too big (max 50MB)');
      }
      else {
        setFileImage(file);
        setPreviewImage(URL.createObjectURL(file));
        const reader = new FileReader();
        reader.onload = (e) => {
          setData((prev) => ({ ...prev, image: e.target?.result as string }));
        }
        reader.readAsDataURL(file)
      }
    }
  },
    [setData]
  );

  setLoading(false);
  const saveDisabled = useMemo(() => {
    return !data.image || loading
  }, [data.image, loading])


  const profileimageHandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProfileModal(false);
    setLoading(true);

    if (fileImage) {
      fetch(`/api/profileImageVercelBlobApi`,
        {
          method: 'POST',
          headers: {
            'content-type': fileImage?.type || 'application/octet-strem'
          },
          body: fileImage,
        })
        .then(async (response) => {
          const { url } = (await response.json()) as PutBlobResult;
          if (url) {
            const config = {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            };
            axios
              .post(`/api/profileImageMongoApi`,
                {
                  id: userId,
                  data: url
                },
                config)
              .then((response) => {
                const { status, actionResponse } = response.data;
                console.log('Axios response: ', actionResponse);
                if (status === 'success') {
                  console.log('Success, action response: ', actionResponse);
                  console.log('Success, action response: ', actionResponse.image_url);
                  setUserProfileImage(actionResponse.image_url);
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
              })
          }
          else {
            const error = await response.text();
            setMessageModal(true);
            setTypeMessageModal('error');
            setTextMessageModal('An error ocurred');
          }
          setPreviewImage('');
          setProfileModalAction('');
          setProfileModalType('');
          setFileImage(null);
          setLoading(false);
        });
    }
  };


  return (
    <div className='w-full h-full flex flex-col justify-between items-center'>
      {/**icon user or profile image preview */}
      <div className='w-full h-full flex flex-col justify-center items-center'>
        <div className='w-72 h-72 flex flex-row justify-center items-center'>
          {
            previewImage ?
              <Image
                className='w-full h-full rounded-full'
                width={400}
                height={400}
                src={previewImage as string}
                alt='profile-image'
              />
              :
              userProfileImage ?
                <Image
                  className='w-full h-full rounded-full'
                  width={400}
                  height={400}
                  src={userProfileImage}
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
          onSubmit={profileimageHandleSubmit}
        >
          {/**profile image input */}
          <div className='w-full h-fit relative flex flex-col justify-start items-start'>
            <input
              id='image-upload'
              name="image"
              type="file"
              accept='image/*'
              className='w-full h-fit py-1 text-sm lg:text-base rounded-md outline-none shadow-input transition-all z-10'
              required
              onChange={onChangePicture}
            />
          </div>
          {/**button submit form */}
          <div className='w-full py-5 flex flex-col justify-center items-center'>
            <button
              type='submit'
              className={
                `${previewImage ?
                  'font-bold bg-green-400 lg:bg-green-300 lg:hover:bg-green-400 cursor-default lg:cursor-pointer' :
                  'bg-slate-400 cursor-default'
                } w-full text-slate-50 lg:hover:text-white lg:hover:font-bold px-6 py-2 flex flex-row justify-center items-center rounded-md transition-all z-30`
              }
              disabled={!previewImage ? true : false}
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