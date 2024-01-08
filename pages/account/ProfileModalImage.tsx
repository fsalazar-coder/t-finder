'use client';

import type { PutBlobResult } from '@vercel/blob';
import { useState, useCallback, ChangeEvent } from 'react';
import { useAuthData, useAuthUI, useUI } from "../../context/authContext";
import Image from 'next/image';
import { IconUser } from '../../icons/icons';
import axios from 'axios';



export default function ProfileModalImage() {
  const { setMessageModal, setLoading } = useUI();
  const { token, userId, userImage, setUserImage, collectionToChange, setUpdate } = useAuthData();
  const { setProfileModal, profileModalAction, setProfileModalAction, setProfileModalType } = useAuthUI();
  const [previewImage, setPreviewImage] = useState<string | null>(userImage || null);
  const [fileImage, setFileImage] = useState<File | null>(null);


  const onChangePicture = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (file) {
      if (file.size / 1024 / 1024 > 50) {
        setMessageModal([{
          type: 'error',
          text: 'File size too big (max 50MB)',
          click: () => setMessageModal([])
        }]);
      }
      else {
        setFileImage(file);
        setPreviewImage(URL.createObjectURL(file));
      }
    }
  }, [setFileImage]);

  const profileimageHandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProfileModal(false);
    setLoading(true);

    if (fileImage && userId) {
      fetch(`/api/profileImageVercelBlobApi?id=${userId}`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
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
                const { status, imageUrl } = response.data;
                if (status === 'success') {
                  setUserImage(imageUrl);
                  setUpdate(collectionToChange)
                  setMessageModal([{
                    type: 'successful',
                    text: `Your profile image have been ${profileModalAction === 'post' ? 'posted' : 'updated'}`,
                    click: () => setMessageModal([])
                  }]);
                }
                else {
                  setMessageModal([{
                    type: 'error',
                    text: 'Profile image not uploaded',
                    click: () => setMessageModal([])
                  }]);
                }
              });
          }
          else {
            setMessageModal([{
              type: 'error',
              text: 'Url image not formed',
              click: () => setMessageModal([])
            }]);
          }
        })
        .finally(() => {
          setPreviewImage('');
          setProfileModalAction('');
          setProfileModalType('');
          setFileImage(null);
          setLoading(false);
        });
    }
    else {
      setMessageModal([{
        type: 'error',
        text: 'Url image not formed',
        click: () => setMessageModal([])
      }]);
    }
  };


  return (
    <div className='w-full h-full flex flex-col justify-between items-center'>
      {/**icon user or profile image preview */}
      <div className='w-full h-full flex flex-col justify-center items-center'>
        <div className='w-72 h-72 flex flex-row justify-center items-center'>
          <div className='w-52 h-52 flex flex-row justify-center items-center'>
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
                userImage ?
                  <Image
                    className='w-full h-full rounded-full'
                    width={400}
                    height={400}
                    src={userImage}
                    alt='profile-image'
                  />
                  :
                  <i className='w-full h-full text-color-text-clear text-9xl font-light flex flex-row justify-center items-center border border-color-border rounded-full cursor-pointer transition-all'>
                    <IconUser />
                  </i>
            }
          </div>
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