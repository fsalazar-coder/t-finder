'use client';

import type { PutBlobResult } from '@vercel/blob';
import { useState, useRef, useEffect } from 'react';
import { useAuthData, useAuthUI, useUI } from "../../context/authContext";
import Image from 'next/image';
import { IconUser } from '../../icons/icons';
import axios from 'axios';



export default function ProfileModalImage() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);

  const { userId, userProfileImage, setUserProfileImage, collectionToChange, setUpdate } = useAuthData();
  const { setProfileModal, profileModalAction, setProfileModalAction, setProfileModalType } = useAuthUI();
  const { setMessageModal, setTypeMessageModal, setTextMessageModal, setLoading } = useUI();
  const [previewImage, setPreviewImage] = useState(userProfileImage?.image_url);
  const [fileImage, setFileImage] = useState<File | undefined>(undefined);

  const imageHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (inputFileRef.current?.files) {
      const file = inputFileRef.current.files[0];
      setPreviewImage(URL.createObjectURL(file));
      setFileImage(file);
    }
  };

  const profileimageHandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProfileModal(false);
    setLoading(true);

    if (fileImage) {
      try {
        const response = await fetch(
          `/api/profileImageVercelAPI?id=${userId}`,
          {
            method: 'POST',
            body: fileImage,
          },
        );

        const newBlob = (await response.json()) as PutBlobResult;
        console.log('new Blob before: ', newBlob);

        if (newBlob) {
          console.log('new Blob after: ', newBlob);
          console.log('new Blob: ', newBlob.url);
          console.log('new Blob: ', newBlob.pathname);
          setBlob(newBlob);
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
        console.error('Upload error:', error);
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
        setPreviewImage('');
        setLoading(false);
        setProfileModalAction('');
        setProfileModalType('');
      }
    }
    else {
      throw new Error('No file selected');
    }
  };

  const profileImage = userProfileImage?.image_url;


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
          onSubmit={profileimageHandleSubmit}
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
              ref={inputFileRef}
              onChange={imageHandleChange}
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