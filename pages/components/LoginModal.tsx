import { useState, useEffect } from 'react';
import { useAuthData, useUI } from "../../context/authContext";
import { IconCancel } from '../../icons/icons';
import googleIcon from '../../public/images/google-icon.webp';
import Image from 'next/image';
import axios from 'axios';



export default function LoginModal(props: any) {

  const { setToken, setUserId, setUserEmail } = useAuthData();
  const {
    setJoinModal,
    loginModal, setLoginModal,
    setPasswordResetModal,
    setMessageModal,
    setLoading
  } = useUI();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailChange, setEmailChange] = useState(false);
  const [passwordChange, setPasswordChange] = useState(false);

  const modalCloseEscapeHandle = (e: any) => {
    if (loginModal) {
      if ((e.charCode | e.keyCode) === 27) {
        setLoginModal(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', modalCloseEscapeHandle);
    return () => {
      document.removeEventListener('keydown', modalCloseEscapeHandle);
    };
  });

  useEffect(() => {
    loginModal ?
      (document.body.style.overflowY = 'hidden')
      : (document.body.style.overflowY = 'auto');
  }, [loginModal]);


  const loginSubmitHandle = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const config: any = {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    };

    try {
      const response = await axios.post("/api/authApi", { email, password, action: "login" }, config);
      const { status } = response;
      const { token, user } = response.data;
      if (status === 200) {
        setToken(token);
        setUserId(user._id);
        setUserEmail(user.email);
        setLoginModal(false);
      }
    }
    catch (error: any) {
      if (error.response) {
        let statusError = error.response.status;
        let messageError = error.response.data.message;
        let errorText;
        switch (statusError) {
          case 401:
            errorText = messageError || 'Unauthorized access.';
            break;
          default:
            errorText = 'An unexpected error occurred.';
        }
        setMessageModal([{
          type: 'error',
          text: errorText,
          click: () => setMessageModal([])
        }]);
      }
    }
    finally {
      setEmail('');
      setPassword('');
      setLoading(false);
    }
  }

  return (
    loginModal ?
      <div
        className={
          `w-screen h-screen fixed top-0 flex flex-col justify-center items-center bg-black bg-opacity-75 transform z-[60]
        ${loginModal ?
            'scale-100 animate-[fade-in_0.50s]'
            : props.loginModalAnimationClose ?
              'scale-0 animate-[fade-out_0.30s]'
              : 'hidden'
          }`
        }
        onClick={() => setLoginModal(false)}
      >
        <div
          className={
            `container w-64 lg:w-[22rem] relative flex flex-col justify-start items-center bg-white rounded-md shadow-lg transform
          ${loginModal ?
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
              onClick={() => setLoginModal(false)}
            >
              <IconCancel />
            </i>
          </div>
          {/**content */}
          <div className='w-full flex flex-col justify-start items-center'>
            {/**header form */}
            <div className='w-full h-24 lg:h-32 px-4 lg:px-8 pt-2 lg:pt-4 flex flex-col bg-slate-950 rounded-t-md'>
              <h2 className='w-full h-fit text-white text-xl lg:text-3xl font-bold z-10'>
                LOGIN
              </h2>
              <h4 className='w-full h-fit text-slate-500 text-sm lg:text-lg tracking-wide font-normal text-start flex'>
                Wellcome back, <br /> login to your account
              </h4>
            </div>
            {/**form container */}
            <div className='w-full px-4 lg:px-8 flex flex-col'>
              {/**form-box */}
              <form
                className='w-full flex flex-col'
                onSubmit={(e) => { loginSubmitHandle(e) }}
              >
                {/**inputs */}
                {/**email input */}
                <div className='w-full h-fit pt-6 relative flex flex-col'>
                  <label htmlFor='email'>
                    <h5
                      className={
                        `${email ?
                          'top-3 text-gray-600 text-xs lg:text-sm bg-white z-20'
                          : emailChange ?
                            'top-3 text-gray-600 text-xs lg:text-sm bg-white z-20'
                            : 'top-[1.80rem] lg:top-[1.80rem] text-gray-400 text-sm lg:text-base bg-none z-0'
                        } w-fit h-fit absolute left-1 lg:left-2 pl-1 pr-2 font-normal transition-all`
                      }
                    >
                      Email
                    </h5>
                  </label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    className={
                      `${email ?
                        'border-green-200 shadow-input'
                        : emailChange ?
                          'border-green-400'
                          : 'border-slate-300'
                      } w-full h-fit pl-2 sm:pl-3 py-1 text-sm lg:text-base bg-transparent border rounded-md outline-none transition-all z-10`
                    }
                    required
                    value={email}
                    onFocus={() => { setEmailChange(true) }}
                    onBlur={(e) => { setEmailChange(false) }}
                    onChange={(e) => { setEmail(e.target.value) }}
                  />
                </div>
                {/**password input */}
                <div className='w-full h-fit pt-6 relative flex flex-col'>
                  <label htmlFor='password'>
                    <h5
                      className={
                        `${password ?
                          'top-3 text-gray-600 text-xs lg:text-sm bg-white z-20'
                          : passwordChange ?
                            'top-3 text-gray-600 text-xs lg:text-sm bg-white z-20'
                            : 'top-[1.8rem] lg:top-[1.80rem] text-gray-400 text-sm lg:text-base bg-none z-0'
                        } w-fit h-fit absolute left-1 lg:left-2 pl-1 pr-2 font-normal transition-all`
                      }
                    >
                      Password
                    </h5>
                  </label>
                  <input
                    type='password'
                    id='password'
                    name='password'
                    className={
                      `${password ?
                        'border-green-200 shadow-input'
                        : passwordChange ?
                          'border-green-400'
                          : 'border-gray-200'
                      } w-full h-fit pl-2 lg:pl-3 py-1 text-sm lg:text-base bg-transparent border rounded-md outline-none transition-all z-10`
                    }
                    required
                    value={password}
                    onFocus={() => { setPasswordChange(true) }}
                    onBlur={(e) => { setPasswordChange(false) }}
                    onChange={(e) => { setPassword(e.target.value) }}
                  />
                </div>


                {/**link to forgot password */}
                <div className='w-full h-fit pt-5 flex flex-row justify-end items-center'>
                  <h5 className='w-fit h-fit text-gray-600 text-xs lg:text-sm lg:hover:text-green-400 font-medium leading-none cursor-default lg:cursor-pointer'
                    onClick={() => {
                      setLoginModal(false);
                      setPasswordResetModal(true);
                    }}
                  >
                    Forgot password?
                  </h5>
                </div>
                {/**button submit form */}
                <div className='w-full pt-5 flex flex-col justify-center items-center'>
                  <button
                    type='submit'
                    className={
                      `${email ? password ?
                        'font-bold bg-green-400 lg:bg-green-300 lg:hover:bg-green-400 cursor-default lg:cursor-pointer' :
                        'bg-slate-400 cursor-default' :
                        'bg-slate-400 cursor-default'
                      } w-full text-slate-50 lg:hover:text-white lg:hover:font-bold px-6 py-2 flex flex-row justify-center items-center rounded-md transition-all z-30`
                    }
                  >
                    <h5 className='w-full h-fit text-sm lg:text-base leading-none tracking-wider'>
                      Login
                    </h5>
                  </button>
                </div>
                {/**login with google */}
                <div className='w-full h-fit pt-5 flex flex-col justify-center items-center'>
                  <button
                    type='submit'
                    className='w-full h-fit text-white lg:text-gray-400 lg:hover:text-white font-bold lg:font-normal lg:hover:font-bold px-6 py-2 flex flex-row justify-center items-center bg-slate-300 lg:bg-slate-50 border border-slate-200 lg:hover:bg-green-400 rounded-md cursor-default lg:cursor-pointer transition-all z-30'
                  >
                    <Image
                      className='w-3 lg:w-5 h-3 lg:h-5'
                      src={googleIcon}
                      alt='icon-google'
                    />
                    <h5 className='w-full h-fit text-sm lg:text-base leading-none tracking-wider'>
                      Continue with Google
                    </h5>
                  </button>
                </div>
                {/**link to register (join) */}
                <div className='w-full h-fit py-5 flex flex-row justify-center items-center'>
                  <h5 className='w-fit h-fit mr-2 text-gray-600 text-xs lg:text-sm leading-none tracking-wider'>
                    Don&apos;t have account yet?
                  </h5>
                  <p
                    className='text-slate-600 lg:hover:text-green-400 text-xs lg:text-sm font-bold cursor-default lg:cursor-pointer'
                    onClick={() => {
                      setLoginModal(false);
                      setJoinModal(true);
                    }}
                  >
                    Register here
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      :
      ''
  )
}