import { useState, useEffect } from 'react';
import { IconCancel } from '../../icons/icons';



export default function PasswordReset(props: any) {

  const [email, setEmail] = useState('');
  const [emailChange, setEmailChange] = useState(false);

  const passwordResetModal = props.passwordResetModal;

  const modalCloseEscapeHandle = (e: any) => {
    if (passwordResetModal) {
      if ((e.chartCode | e.keyCode) === 27) {
        props.passwordResetModalClose();
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


  const passwordResetHandle = () => {

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
      onClick={() => props.passwordResetModalClose()}
    >
      <div
        className={
          `container w-5/6 sm:w-2/3 lg:w-1/3 h-auto relative flex flex-col justify-start items-center bg-white rounded-md shadow-lg transform
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
            className='w-fit h-full text-gray-900 sm:text-gray-400 text-2xl sm:xl flex justify-center cursor-pointer sm:hover:text-gray-900'
            onClick={() => {
              props.passwordResetModalClose()
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
              Password reset
            </h2>
            <h4 className='w-full h-fit text-gray-600 text-sm md:text-base lg:text-lg tracking-wide font-normal text-start flex'>
              Don&Apos;t worry, <br /> let&Apos;s get your password back
            </h4>
          </div>
          {/**form container */}
          <div className='w-full h-full px-2 lg:px-8 flex flex-col'>
            {/**form-box */}
            <form
              className='w-full h-full px-2 flex flex-col justify-between items-center'
              onSubmit={() => passwordResetHandle()}
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
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/**button submit form */}
              <div className='w-full h-fit py-5 flex flex-col justify-center items-center'>
                <button
                  type='submit'
                  className='w-full h-fit text-slate-50 hover:text-white md:hover:font-bold bg-fuchsia-300 hover:bg-fuchsia-600 px-6 py-2 flex flex-row justify-center items-center rounded-full transition-all z-30'
                >
                  <h5 className='w-full h-fit text-sm sm:text-xs md:text-sm lg:text-base xl:text-lg leading-none tracking-wider'>
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