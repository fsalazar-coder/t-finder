import { useEffect, useState } from 'react';
import { useAuthData, useAuthUI, useUI } from "../../context/authContext";
import Link from 'next/link';
import axios from 'axios';



export default function MessageModal(props: any) {

  const { token, userId, setUserProfilePersonalInfo, setUserProfileExperience, setUserProfileEducation,
    collectionToChange, setCollectionToChange, itemIdToChange, setItemIdToChange, update, setUpdate, logout } = useAuthData();
  const { setAccountActived, setAccountModule, setProfileModalAction } = useAuthUI();
  const { messageModal, setMessageModal, typeMessageModal,
    setTypeMessageModal, textMessageModal, setTextMessageModal, setLoading } = useUI();
  const [circleAnimation, setCircleAnimation] = useState(false);
  const [symbolAnimation, setSymbolAnimation] = useState(false);

  useEffect(() => {
    if (messageModal) {
      setCircleAnimation(true);
      setTimeout(() => {
        setSymbolAnimation(true)
      }, 1000);
    }
  }, [messageModal]);

  const modalCloseEscapeHandle = (e: any) => {
    (messageModal && ((e.charCode || e.keyCode) === 27)) && setMessageModal(false);
  };

  useEffect(() => {
    document.addEventListener('keydown', modalCloseEscapeHandle);
    return () => {
      document.removeEventListener('keydown', modalCloseEscapeHandle);
    };
  });

  useEffect(() => {
    messageModal ?
      (document.body.style.overflowY = 'hidden')
      : (document.body.style.overflowY = 'auto');
  }, [messageModal]);


  const deleteDataHandle = async () => {
    setLoading(true);
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
    try {
      const response = await axios.post('/api/userApi',
        {
          id: collectionToChange === 'personal_info' ? userId : itemIdToChange,
          collectionName: collectionToChange,
          action: 'delete',
          data: '',
        },
        config
      );
      const { status, message } = response.data;
      if (status === 'success') {
        setMessageModal(false);
        setTimeout(() => {
          setMessageModal(true);
          setTypeMessageModal('successful');
          setTextMessageModal(message);
          setUpdate(collectionToChange);
          collectionToChange === 'personal_info' && setUserProfilePersonalInfo(null);
        }, 500);
      }
    }
    catch (error: any) {
      if (error.response) {
        let statusError = error.response.status;
        let messageError = error.response.data.message;
        setMessageModal(true);
        switch (statusError) {
          case 404:
            setTypeMessageModal('error');
            setTextMessageModal(messageError || 'User information not found');
            break;
          default:
            setTypeMessageModal('error');
            setTextMessageModal('An unexpected error occurred.');
        }
      }
    }
    finally {
      setLoading(false);
      setProfileModalAction('');
      setItemIdToChange('');
    }
  };


  return (
    messageModal ?
      <div className={
        `w-screen h-screen fixed top-0 flex flex-col justify-center items-center bg-black bg-opacity-75 transform z-[60]
      ${messageModal ?
          'scale-100 animate-[fade-in_0.50s]'
          : props.messageModalAnimationClose ?
            'scale-0 animate-[fade-out_0.30s]'
            : 'hidden'
        }`
      }
      >
        {/**box */}
        <div className={
          `container w-64 lg:w-[22rem] p-4 lg:p-8 relative flex flex-col justify-start items-center bg-white rounded-md shadow-lg transform
          ${messageModal ?
            'scale-100 animate-[zoom-in_0.50s]'
            : 'scale-0 animate-[zoom-out_0.30s]'
          }`
        }>
          <div className='w-full flex flex-col justify-start items-center'>
            {/**SVG: animation circle: successful, error & alert */}
            <div className='w-full h-20 lg:h-28 relative flex flex-col justify-center items-center rounded-t-md animate-[appear_1.0s]'>
              <svg
                className='w-20 lg:w-28 h-20 lg:h-28 absolute'
                viewBox='0 0 40 40'
              >
                <circle
                  className={
                    `${typeMessageModal === 'successful' ?
                      'stroke-green-500' : typeMessageModal === 'error' ?
                        'stroke-red-600' : 'stroke-yellow-300'
                    }
                  ${circleAnimation ?
                      'animate-[draw-circle_2.0s_ease]'
                      : 'hidden'
                    }`
                  }
                  cx="20"
                  cy="20"
                  r="18"
                  strokeWidth="3"
                  fill="none"
                  strokeMiterlimit={10}
                  strokeDasharray={330}
                  strokeDashoffset={0}
                />
              </svg>
              {
                typeMessageModal === 'successful' ?
                  /**successful SVG animation */
                  <svg
                    className='w-10 h-10 stroke-green-600'
                    strokeWidth={8}
                    viewBox='0 0 40 40'
                    strokeLinecap='round'
                  >
                    <line
                      className={
                        `${symbolAnimation ?
                          'animate-[draw-check_0.75s_ease-in-out_delay_1.0s]'
                          : 'hidden'
                        }`
                      }
                      x1="4"
                      y1="26"
                      x2="16"
                      y2="36"
                      strokeMiterlimit={10}
                      strokeDasharray={330}
                      strokeDashoffset={0}
                    />
                    <line
                      className={
                        `${symbolAnimation ?
                          'animate-[draw-check_1.25s_ease-in-out_delay_0.75s]'
                          : 'hidden'
                        }`
                      }
                      x1="16" y1="36" x2="36" y2="12"
                    />
                  </svg>
                  :
                  typeMessageModal === 'error' ?
                    /**error SVG animation */
                    <svg
                      className='w-10 lg:w-14 h-10 lg:h-14 stroke-red-600 flex'
                      strokeWidth={8}
                      viewBox='0 0 40 40'
                      strokeLinecap='round'
                    >
                      <line
                        className={
                          `${symbolAnimation ?
                            'animate-[draw-check_2.0s_ease]'
                            : 'hidden'
                          }`
                        }
                        x1="6"
                        y1="6"
                        x2="35"
                        y2="35"
                      />
                      <line
                        className={
                          `${symbolAnimation ?
                            'animate-[draw-check_3.0s_ease]'
                            : 'hidden'
                          }`
                        }
                        x1="6"
                        y1="35"
                        x2="35"
                        y2="6"
                      />
                    </svg>
                    :
                    /**alert SVG animation */
                    <>
                      <svg
                        className='w-10 lg:w-14 h-10 lg:h-14 stroke-yellow-300 flex'
                        strokeWidth={8}
                        viewBox='0 0 40 40'
                        strokeLinecap='round'
                      >
                        <line
                          className={
                            `${symbolAnimation ?
                              'animate-[draw-check_2.0s_ease]'
                              : 'hidden'
                            }`
                          }
                          x1="20"
                          y1="4"
                          x2="20"
                          y2="27"
                        />
                        <line
                          className={
                            `${symbolAnimation ?
                              'animate-[draw-check_3.0s_ease]'
                              : 'hidden'
                            }`
                          }
                          x1="20"
                          y1="36"
                          x2="20"
                          y2="36"
                        />
                      </svg>
                    </>
              }
            </div>
            {/**message title */}
            <h2 className='w-full pt-4 text-xl lg:text-3xl text-slate-950 text-center flex flex-col justify-center items-center'>
              {typeMessageModal === 'successful' ? 'Successful' :
                typeMessageModal === 'error' ? 'Error' : 'Are you sure?'}
            </h2>
            {/**message sub-title */}
            <h4 className='w-full pb-6 text-sm lg:text-base text-slate-600 text-center flex flex-col justify-center items-center'>
              {textMessageModal}
            </h4>
            {/**buttons */}
            <div className='w-full flex flex-row justify-between items-center'>
              {
                typeMessageModal === 'logout' ?
                  <>
                    {/**logout session button */}
                    <button className='w-[45%] text-slate-50 lg:hover:text-white lg:hover:font-bold py-2 flex flex-row justify-center items-center bg-green-400 lg:bg-green-300 lg:hover:bg-green-400 cursor-default lg:cursor-pointer rounded-md transition-all'>
                      <Link
                        className='w-full'
                        href='/'
                        scroll={false}
                        onClick={() => {
                          setMessageModal(false);
                          setAccountActived(false);
                          setAccountModule('');
                          logout();
                        }}>
                        <h5 className='w-full text-sm lg:text-base font-bold leading-none'>
                          Logout
                        </h5>
                      </Link>
                    </button>
                    {/**Cancel logout session button */}
                    <button
                      className='w-[45%] text-slate-50 lg:hover:text-white lg:hover:font-bold py-2 flex flex-row justify-center items-center bg-red-400 lg:bg-red-300 lg:hover:bg-red-400 cursor-default lg:cursor-pointer rounded-md transition-all'
                      onClick={() => setMessageModal(false)}
                    >
                      <h5 className='w-full text-sm lg:text-base font-bold leading-none'>
                        Cancel
                      </h5>
                    </button>
                  </>
                  :
                  typeMessageModal === 'delete' ?
                    <>
                      {/**delete button */}
                      <button className='w-[45%] text-slate-50 lg:hover:text-white lg:hover:font-bold py-2 flex flex-row justify-center items-center bg-green-400 lg:bg-green-300 lg:hover:bg-green-400 cursor-default lg:cursor-pointer rounded-md transition-all'>
                        <div
                          className='w-full'
                          onClick={() => deleteDataHandle()}>
                          <h5 className='w-full text-sm lg:text-base font-bold leading-none'>
                            Delete
                          </h5>
                        </div>
                      </button>
                      {/**Cancel delete button */}
                      <button
                        className='w-[45%] text-slate-50 lg:hover:text-white lg:hover:font-bold py-2 flex flex-row justify-center items-center bg-red-400 lg:bg-red-300 lg:hover:bg-red-400 cursor-default lg:cursor-pointer rounded-md transition-all'
                        onClick={() => {
                          setCollectionToChange('');
                          setMessageModal(false);
                        }}
                      >
                        <h5 className='w-full text-sm lg:text-base font-bold leading-none'>
                          Cancel
                        </h5>
                      </button>
                    </>
                    :
                    <>
                      {/**OK or try-again button */}
                      <button
                        className='w-full text-slate-50 lg:hover:text-white lg:hover:font-bold py-2 flex flex-row justify-center items-center bg-green-400 lg:bg-green-300 lg:hover:bg-green-400 cursor-default lg:cursor-pointer rounded-md transition-all'
                        onClick={() => setMessageModal(false)}
                      >
                        <h5 className='w-full text-sm lg:text-base font-bold leading-none'>
                          {
                            typeMessageModal === 'successful' ?
                              'Ok' : 'Try again'
                          }
                        </h5>
                      </button>
                    </>
              }
            </div>
          </div>
        </div>
      </div>
      :
      ''
  )
}