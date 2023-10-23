import { useState, useEffect } from 'react';
import {
  useAuth,
  useUserId,
  useProfileImageModal,
  useMessageModal,
  useMessageModalType,
  useMessageModalText,
  useLoadingSpinner
} from "../../context/authContext";
import axios from 'axios';
import Image from 'next/image';
import { IconCancel, IconUser } from '../../icons/icons';



export default function ProfileImageModal(props: any) {

  const { userId } = useUserId();
  const { profileImageModal, setProfileImageModal } = useProfileImageModal();
  const { setMessageModal } = useMessageModal();
  const { setMessageModalType } = useMessageModalType();
  const { setMessageModalText } = useMessageModalText();
  const { setLoading } = useLoadingSpinner();
  const [fileImage, setFileImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState('');

  const modalCloseEscapeHandle = (e: any) => {
    if (profileImageModal) {
      if ((e.chartCode | e.keyCode) === 27) {
        setProfileImageModal(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', modalCloseEscapeHandle);
    return () => {
      document.removeEventListener('keydown', modalCloseEscapeHandle);
    };
  }, []);

  useEffect(() => {
    profileImageModal ?
      (document.body.style.overflowY = 'hidden')
      : (document.body.style.overflowY = 'auto');
  }, [profileImageModal]);


  const imageHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setFileImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  }

  const profileimageHandleSubmit = async (e: any, userId: string) => {
    e.preventDefault();
    setLoading(true);
    if (!fileImage) return;
    const formData = new FormData();
    formData.append('image', fileImage);
    formData.append('id', userId);

    const config: any = {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      withCredentials: true
    };

    try {
      await axios
        .put("/api/profileImageApi", formData, config)
        .then((response: any) => {
          console.log('Status: ', response.data.status);
          console.log('File name: ', response.data.fileName);
          console.log('File path: ', response.data.filePath);
          let res = response.data.status;
          if (res === 'success') {
            setProfileImageModal(false);
            setMessageModal(true);
            setMessageModalType('successful');
            setMessageModalText('Your profile image have been uploaded');
          }
          else {
            setMessageModal(true);
            setMessageModalType('error');
            setMessageModalText('profile image not uploaded');
          }
        })
    }
    catch (error) {
      () => {
        console.log('Error on uploading: ', error);
        setMessageModal(true);
        setMessageModalType('error');
        setMessageModalText('An error occurred');
      }
    }
    finally {
      setFileImage(null);
      setPreviewImage('');
      setLoading(false);
    }
  };


  return (
    <div
      className={
        `w-screen h-screen fixed top-0 flex flex-col justify-center items-center bg-black bg-opacity-75 transform z-[60]
        ${profileImageModal ?
          'scale-100 animate-[fade-in_0.50s]'
          : props.joinModalAnimationClose ?
            'scale-0 animate-[fade-out_0.30s]'
            : 'hidden'
        }`
      }
      onClick={() => setProfileImageModal(false)}
    >
      <div
        className={
          `container w-64 lg:w-[22rem] relative flex flex-col justify-start items-center bg-white rounded-md shadow-lg transform
          ${profileImageModal ?
            'scale-100 animate-[zoom-in_0.50s]'
            : 'scale-0 animate-[zoom-out_0.30s]'
          }`
        }
        onClick={(e) => e.stopPropagation()}
      >
        {/**icon-cancel to close modal */}
        <div className='w-6 h-6 absolute -top-5 -right-5 flex flex-col justify-center items-center rounded-full bg-white'>
          <i
            className='w-fit h-full text-gray-900 lg:text-gray-400 text-2xl lg:xl flex justify-center cursor-default lg:cursor-pointer lg:hover:text-gray-900'
            onClick={() => setProfileImageModal(false)}
          >
            <IconCancel />
          </i>
        </div>
        {/**content */}
        <div className='w-full flex flex-col justify-start items-center'>
          {/**header form */}
          <div className='w-full h-24 lg:h-32 px-4 lg:px-8 pt-2 lg:pt-4 flex flex-col bg-slate-950 rounded-t-md'>
            <h2 className='w-full h-fit text-white text-xl lg:text-3xl font-bold z-10'>
              PROFILE IMAGE
            </h2>
            <h4 className='w-full h-fit text-slate-500 text-sm lg:text-base tracking-wide font-normal text-start flex'>
              Upload <br /> your profile image
            </h4>
          </div>
          {/**icon user or profile image preview */}
          <div className='w-40 h-40 p-5 flex flex-row justify-center items-center'>
            {
              fileImage ?
                <Image
                  className='w-full h-full rounded-full'
                  width={400}
                  height={400}
                  src={previewImage}
                  alt='profile-image'
                />
                :
                <i className='w-full h-full text-slate-300 text-7xl font-light flex flex-row justify-center items-center border border-slate-300 rounded-full cursor-pointer transition-all'>
                  <IconUser />
                </i>
            }
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
      </div>
    </div>
  )
}