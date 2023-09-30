import { useState, useEffect } from 'react';
import { useAuth } from "../../context/authContext";
import axios from 'axios';
import Image from 'next/image';
import googleIcon from '../../public/images/google-icon.webp';
import { IconCancel } from '../../icons/icons';



export default function JoinModal(props: any) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailChange, setEmailChange] = useState(false);
  const [passwordChange, setPasswordChange] = useState(false);
  const [loading, setLoading] = useState(false);       //AMPLIAR!!!  
  const { setAuth } = useAuth();

  const joinModal = props.joinModal;

  const modalCloseEscapeHandle = (e: any) => {
    if (joinModal) {
      if ((e.chartCode | e.keyCode) === 27) {
        props.joinModalClose();
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', modalCloseEscapeHandle);
  });

  useEffect(() => {
    joinModal ?
      (document.body.style.overflowY = 'hidden')
      : (document.body.style.overflowY = 'auto');
  }, [joinModal]);

  const handleSubmitJoin = async (e: any) => {
    e.preventDefault();
    setLoading(true);     //ampliar

    const config: any = {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    };

    try {
      await axios
        .post("/api/auth", { email, password, action: "register" }, config)
        .then((response: any) => {
          let res = response.data.status;
          if (res === 'success') {
            props.joinModalClose();
            props.messageModalOpen('Successfull user created!!!');
          }
          else if (res === 'User already exists') {
            props.messageModalOpen('User already exists');
          }
        })
    }
    catch (error) {
      console.log('An error occurred during registration')
    }
    finally {
      setEmail('');
      setPassword('');
      setLoading(false);
    }
  };


  return (
    <div
      className={
        `w-screen h-screen fixed top-0 flex flex-col justify-center items-center bg-black bg-opacity-75 transform z-[60]
        ${joinModal ?
          'scale-100 animate-[fade-in_0.50s]'
          : props.joinModalAnimationClose ?
            'scale-0 animate-[fade-out_0.30s]'
            : 'hidden'
        }`
      }
      onClick={() => props.joinModalClose()}
    >
      <div
        className={
          `container w-5/6 sm:w-2/3 lg:w-1/3 h-3/5 sm:h-3/4 lg:h-5/6 relative flex flex-col justify-start items-center bg-white rounded-md shadow-lg transform
          ${joinModal ?
            'scale-100 animate-[zoom-in_0.50s]'
            : 'scale-0 animate-[zoom-out_0.30s]'
          }`
        }
        onClick={(e) => e.stopPropagation()}
      >

        {/**icon-cancel to close modal */}
        <div className='w-6 h-6 absolute -top-5 -right-5 flex flex-col justify-center items-center rounded-full bg-white'>
          <i
            className='w-fit h-full text-gray-900 sm:text-gray-400 text-2xl sm:xl flex justify-center cursor-pointer sm:hover:text-gray-900'
            onClick={() => {
              props.joinModalClose()
            }}
          >
            <IconCancel />
          </i>
        </div>

        {/**content */}
        <div className='w-full h-full flex flex-col justify-start items-center'>
          {/**header form */}
          <div className='w-full h-fit px-4 lg:px-10 py-6 bg-slate-50 border-b border-slate-100 rounded-t-md'>
            <h2 className='w-full h-fit text-gray-950 text-xl md:text-2xl lg:text-3xl font-bold z-10'>
              REGISTER
            </h2>
            <h4 className='w-full h-fit text-gray-600 text-sm md:text-base lg:text-lg tracking-wide font-normal text-start flex'>
              Join to T-finder, <br /> we appreciate your trust in us
            </h4>
          </div>
          {/**form container */}
          <div className='w-full h-full px-2 lg:px-8 flex flex-col'>
            {/**form-box */}
            <form
              className='w-full h-full px-2 flex flex-col justify-between items-center'
              onSubmit={(e) => handleSubmitJoin(e)}
            >
              {/**inputs */}
              <div className='w-full h-fit flex flex-col justify-start items-center'>
                {/**email input */}
                <div className='w-full h-fit pt-6 relative flex flex-col justify-start items-start'>
                  <label htmlFor='email'>
                    <h5
                      className={
                        `${email ?
                          'top-3 text-gray-600 text-xs sm:text-sm bg-white z-20'
                          : emailChange ?
                            'top-3 text-gray-600 text-xs sm:text-sm bg-white z-20'
                            : 'top-[1.80rem] sm:top-[1.90rem] text-gray-400 text-sm sm:text-base bg-none z-0'
                        } w-fit h-fit absolute left-1 sm:left-2 pl-1 pr-2 font-normal transition-all`
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
                        'border-fuchsia-200 shadow-input'
                        : emailChange ?
                          'border-fuchsia-400'
                          : 'border-gray-200'
                      } w-full h-fit pl-2 sm:pl-3 py-1 text-sm sm:text-base bg-transparent border rounded-md outline-none transition-all z-10`
                    }
                    required
                    value={email}
                    onFocus={() => { setEmailChange(true) }}
                    onBlur={(e) => { setEmailChange(false) }}
                    onChange={(e) => { setEmail(e.target.value) }}
                  />
                </div>

                {/**password input */}
                <div className='w-full h-fit pt-6 relative flex flex-col justify-start items-start'>
                  <label htmlFor='password'>
                    <h5
                      className={
                        `${password ?
                          'top-3 text-gray-600 text-xs sm:text-sm bg-white z-20'
                          : passwordChange ?
                            'top-3 text-gray-600 text-xs sm:text-sm bg-white z-20'
                            : 'top-[1.8rem] sm:top-[1.90rem] text-gray-400 text-sm sm:text-base bg-none z-0'
                        } w-fit h-fit absolute left-1 sm:left-2 pl-1 pr-2 font-normal transition-all`
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
                        'border-fuchsia-200 shadow-input'
                        : passwordChange ?
                          'border-fuchsia-400'
                          : 'border-gray-200'
                      } w-full h-fit pl-2 sm:pl-3 py-1 text-sm sm:text-base bg-transparent border rounded-md outline-none transition-all z-10`
                    }
                    required
                    value={password}
                    onFocus={() => { setPasswordChange(true) }}
                    onBlur={(e) => { setPasswordChange(false) }}
                    onChange={(e) => { setPassword(e.target.value) }}
                  />
                </div>
              </div>

              {/**button submit form */}
              <div className='w-full h-fit flex flex-col justify-center items-center'>
                <button
                  type='submit'
                  className='w-full h-fit text-slate-50 hover:text-white md:hover:font-bold bg-fuchsia-300 hover:bg-fuchsia-600 px-6 py-2 flex flex-row justify-center items-center rounded-full transition-all z-30'
                >
                  <h5 className='w-full h-fit text-sm sm:text-xs md:text-sm lg:text-base xl:text-lg leading-none tracking-wider'>
                    Create account
                  </h5>
                </button>
              </div>

              {/**Join with google */}
              <div className='w-full h-fit flex flex-col justify-center items-center'>
                <button
                  type='submit'
                  className='w-full h-fit text-gray-400 hover:text-white md:hover:font-bold bg-slate-50 border border-slate-200 hover:bg-fuchsia-400 px-6 py-2 flex flex-row justify-center items-center rounded-full transition-all z-30'
                >
                  <Image
                    className='w-6 h-6'
                    src={googleIcon}
                    alt='icon-google'
                  />
                  <h5 className='w-full h-fit text-sm sm:text-xs md:text-sm lg:text-base xl:text-lg leading-none tracking-wider'>
                    Join with Google
                  </h5>
                </button>
              </div>

              {/**link to login */}
              <div className='w-full h-fit pb-4 flex flex-row justify-center items-center'>
                <h5 className='w-fit h-fit mr-2 text-gray-600 text-sm md:text-base leading-none tracking-wider'>
                  Already registred?
                </h5>
                <p
                  className='text-fuchsia-400 hover:text-fuchsia-600 text-sm md:text-base font-semibold tracking-wider cursor-pointer'
                  onClick={props.loginModalOpen}
                >
                  Login here
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}