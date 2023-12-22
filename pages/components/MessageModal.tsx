import { useEffect, useState } from 'react';
import { useAuthData, useUI } from "../../context/authContext";

interface TitlesModal {
  [key: string]: string;
};

interface ButtonsModal {
  [key: string]: string;
}



export default function MessageModal() {

  const { collectionToChange, setCollectionToChange } = useAuthData();
  const { messageModal, setMessageModal } = useUI();
  const [circleAnimation, setCircleAnimation] = useState(false);
  const [symbolAnimation, setSymbolAnimation] = useState(false);

  const type = messageModal[0]?.type;
  const text = messageModal[0]?.text;
  const click = messageModal[0]?.click;

  const validTypes = ['successful', 'error', 'question', 'delete', 'logout'];
  const modalActived = validTypes.includes(type);

  useEffect(() => {
    if (modalActived) {
      setCircleAnimation(true);
      setTimeout(() => {
        setSymbolAnimation(true)
      }, 1000);
    }
  }, [modalActived]);

  const modalCloseEscapeHandle = (e: any) => {
    (modalActived && ((e.charCode || e.keyCode) === 27)) && setMessageModal([]);
  };

  useEffect(() => {
    document.addEventListener('keydown', modalCloseEscapeHandle);
    return () => {
      document.removeEventListener('keydown', modalCloseEscapeHandle);
    };
  });

  useEffect(() => {
    modalActived ?
      (document.body.style.overflowY = 'hidden')
      : (document.body.style.overflowY = 'auto');
  }, [modalActived]);

  const titlesModal: TitlesModal = {
    'successful': 'Successful',
    'error': 'Error',
    'question': 'Are you sure?',
    'delete': 'Are you sure?',
    'logout': 'Are you sure?',
  };

  const buttonsModal: ButtonsModal = {
    'successful': 'Ok',
    'error': 'Try again',
    'question': 'I agree',
    'delete': 'Delete',
    'logout': 'Logout',
  };

  const title = titlesModal[type] || 'Default Title';
  const textButtonClick = buttonsModal[type] || 'Default button';

  const buttonCancelActived = type === 'question' || type === 'delete' || type === 'logout';
  const singleButton = type === 'successful' || type === 'error';


  return (
    modalActived &&
    <div className='w-screen h-screen fixed top-0 flex flex-col justify-center items-center bg-black bg-opacity-75 transition-all z-[60]'>
      {/**box */}
      <div className={
        `${modalActived ? 'scale-100 animate-[poing_0.50s]' : 'scale-0 animate-[zoom-out_0.30s]'
        } container w-64 lg:w-[22rem] p-4 lg:p-8 relative flex flex-col justify-start items-center bg-white rounded-lg shadow-md transform z-[100]`
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
                  `${type === 'successful' ? 'stroke-green-500' : type === 'error' ? 'stroke-red-600' : 'stroke-yellow-300'}
                  ${circleAnimation ? 'animate-[draw-circle_2.0s_ease]' : 'hidden'}`
                }
                cx="20" cy="20" r="18"
                strokeWidth="3"
                fill="none"
                strokeMiterlimit={10}
                strokeDasharray={330}
                strokeDashoffset={0}
              />
            </svg>
            {
              type === 'successful' ?
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
                type === 'error' ?
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
            {title}
          </h2>
          {/**text modal */}
          <h4 className='w-full pb-6 text-sm lg:text-base text-slate-600 text-center flex flex-col justify-center items-center'>
            {text}
          </h4>
          {/**buttons */}
          <div className='w-full flex flex-row justify-center items-center'>
            <div className={`${singleButton ? 'w-full' : 'w-1/2'} flex flex-row justify-center items-center`}>
              <button
                className={
                  `${type === 'successful' ? 'bg-green-400 lg:bg-green-300 lg:hover:bg-green-600' :
                    type === 'question' ? 'bg-blue-400 lg:bg-blue-300 lg:hover:bg-blue-600' :
                      type === 'logout' ? 'bg-yellow-400 lg:bg-yellow-300 lg:hover:bg-yellow-600' :
                        'w-full bg-red-400 lg:bg-red-300 lg:hover:bg-red-600'
                  } w-[95%] text-slate-50 lg:hover:text-white lg:hover:font-bold py-2 flex flex-row justify-center items-center cursor-default lg:cursor-pointer rounded-md transition-all`
                }
                onClick={() => click()}
              >
                <h5 className='w-full text-sm lg:text-base font-bold leading-none'>
                  {textButtonClick}
                </h5>
              </button>
            </div>
            {
              buttonCancelActived &&
              <div className='w-1/2 flex flex-row justify-center items-center'>
                <button
                  className='w-[95%] text-slate-50 lg:hover:text-white lg:hover:font-bold py-2 flex flex-row justify-center items-center bg-slate-400 lg:bg-slate-300 lg:hover:bg-slate-500 cursor-default lg:cursor-pointer rounded-md transition-all'
                  onClick={() => {
                    setMessageModal([])
                    setCollectionToChange(type === 'delete' ? '' : collectionToChange);
                  }}
                >
                  <h5 className='w-full text-sm lg:text-base font-bold leading-none'>
                    Cancel
                  </h5>
                </button>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

