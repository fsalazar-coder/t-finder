import { useState, useEffect } from 'react';
import {
  useJoinModal,
  useLoginModal,
  usePasswordResetModal,
  useMessageModal,
  useMessageModalType,
  useMessageModalText
} from "../../context/authContext";
import { IconCancel } from '../../icons/icons';



export default function PasswordReset(props: any) {

  const { setJoinModal } = useJoinModal();
  const { setLoginModal } = useLoginModal();
  const { passwordResetModal, setPasswordResetModal } = usePasswordResetModal();
  const { setMessageModal } = useMessageModal();
  const { setMessageModalType } = useMessageModalType();
  const { setMessageModalText } = useMessageModalText();
  const [email, setEmail] = useState('');
  const [emailChange, setEmailChange] = useState(false);

  const modalCloseEscapeHandle = (e: any) => {
    if (passwordResetModal) {
      if ((e.chartCode | e.keyCode) === 27) {
        setPasswordResetModal(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', modalCloseEscapeHandle);
  });

  useEffect(() => {
    passwordResetModal ?
      (document.body.style.overflowY = 'hidden')
      : (document.body.style.overflowY = 'auto');
  }, [passwordResetModal]);


  const passwordResetSubmitHandle = async (e: any) => {
    e.preventDefault();
    setEmail('');
    setPasswordResetModal(false);
    setMessageModal(true);
    setMessageModalType('successful');
    setMessageModalText('A recovery link has been sent to your email');
  }

  return (
    <div
      className={
        `w-screen h-screen fixed top-0 flex flex-col justify-center items-center bg-black bg-opacity-75 transform z-[60]
        ${passwordResetModal ?
          'scale-100 animate-[fade-in_0.50s]'
          : props.passwordResetModalAnimationClose ?
            'scale-0 animate-[fade-out_0.30s]'
            : 'hidden'
        }`
      }
      onClick={() => setPasswordResetModal(false)}
    >
      <div
        className={
          `container w-64 lg:w-[22rem] relative flex flex-col justify-start items-center bg-white rounded-md shadow-lg transform
          ${passwordResetModal ?
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
            onClick={() => setPasswordResetModal(false)}
          >
            <IconCancel />
          </i>
        </div>
        {/**content */}
        <div className='w-full flex flex-col justify-start items-center'>
          {/**header form */}
          <div className='w-full h-24 lg:h-32 px-4 lg:px-8 pt-2 lg:pt-4 flex flex-col bg-slate-950 rounded-t-md'>
            <h2 className='w-full h-fit text-white text-xl lg:text-3xl font-bold z-10'>
              Password reset
            </h2>
            <h4 className='w-full h-fit text-slate-500 text-sm lg:text-lg tracking-wide font-normal text-start flex'>
              Don&apos;t worry, <br /> let&apos;s get your password back
            </h4>
          </div>
          {/**form container */}
          <div className='w-full px-4 lg:px-8 flex flex-col'>
            {/**form-box */}
            <form
              className='w-full flex flex-col'
              onSubmit={(e) => passwordResetSubmitHandle(e)}
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
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {/**button submit form */}
              <div className='w-full py-5 flex flex-col justify-center items-center'>
                <button
                  type='submit'
                  className={
                    `${email ?
                      'font-bold bg-green-400 lg:bg-green-300 lg:hover:bg-green-400 cursor-default lg:cursor-pointer' :
                      'bg-slate-400 cursor-default'
                    } w-full text-slate-50 lg:hover:text-white lg:hover:font-bold px-6 py-2 flex flex-row justify-center items-center rounded-md transition-all z-30`
                  }
                >
                  <h5 className='w-full h-fit text-sm lg:text-base leading-none tracking-wider'>
                    Reset password
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