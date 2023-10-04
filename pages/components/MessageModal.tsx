import { useEffect, useState } from 'react';



export default function MessageModal(props: any) {

  const [circleAnimation, setCircleAnimation] = useState(false);
  const [symbolAnimation, setSymbolAnimation] = useState(false);
  const activedModal = props.activedModal;
  const typeMessageModal = props.typeMessageModal;
  const subtitle = props.subtitle;

  useEffect(() => {
    if (activedModal) {
      setCircleAnimation(true);
      setTimeout(() => {
        setSymbolAnimation(true)
      }, 1000);
    }
  }, [activedModal]);

  const modalCloseEscapeHandle = (e: any) => {
    if (activedModal) {
      if ((e.chartCode | e.keyCode) === 27) {
        props.messageModalClose();
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', modalCloseEscapeHandle);
  });

  useEffect(() => {
    activedModal ?
      (document.body.style.overflowY = 'hidden')
      : (document.body.style.overflowY = 'auto');
  }, [activedModal]);


  return (
    <div
      className={
        `w-screen h-screen fixed top-0 flex flex-col justify-center items-center bg-black bg-opacity-75 transform z-[60]
      ${activedModal ?
          'scale-100 animate-[fade-in_0.50s]'
          : props.messageModalAnimationClose ?
            'scale-0 animate-[fade-out_0.30s]'
            : 'hidden'
        }`
      }
    >
      {/**box */}
      <div className={
        `container w-64 lg:w-[22rem] relative flex flex-col justify-start items-center bg-white rounded-md shadow-lg transform
          ${activedModal ?
          'scale-100 animate-[zoom-in_0.50s]'
          : 'scale-0 animate-[zoom-out_0.30s]'
        }`
      }>
        <div className='w-full flex flex-col justify-start items-center'>

          {/**SVG: animation circle: successful, error & alert */}
          <div className='w-full h-32 relative px-4 lg:px-8 pt-2 lg:pt-4 flex flex-col justify-center items-center rounded-t-md animate-[appear_1.0s]'>
            <svg className={
              `${typeMessageModal === 'successful' ?
                'stroke-green-200' : typeMessageModal === 'error' ?
                  'stroke-red-200' : 'stroke-yellow-200'
              } w-[110px] h-[110px]`
            }>
              <circle
                className={
                  `${circleAnimation ?
                    'animate-[draw-circle_2.0s_ease-in-out_forwards]'
                    : 'hidden'
                  }`
                }
                cx="55"
                cy="55"
                r="50"
                fill="none"
                strokeWidth="5"
                strokeMiterlimit={10}
                strokeDasharray={330}
                strokeDashoffset={0}
                strokeLinecap='round'
              />
            </svg>
            {
              typeMessageModal === 'successful' ?
                /**successful SVG animation */
                <svg className='w-[55px] h-[41px] absolute stroke-green-600'
                  strokeWidth={8}
                  strokeLinecap='round'
                >
                  <g transform="matrix(0.80,8.70e-32,8.40e-32,0.80,-489.57,-205.68)">
                    <path
                      className={
                        `${symbolAnimation ?
                          'animate-[draw-check_0.5s_ease-in-out_forwards]'
                          : 'hidden'
                        }`
                      }
                      fill="none"
                      d="M616.306,283.025 L634.087,300.805 L673.361,261.53"
                    />
                  </g>
                </svg>
                :
                typeMessageModal === 'error' ?
                  /**error SVG animation */
                  <svg
                    className='w-[55px] h-[55px] absolute stroke-red-600'
                    strokeWidth={8}
                    strokeLinecap='round'
                  >
                    <g transform="matrix(1,0,0,1,-1,-1)">
                      <line
                        className={
                          `${symbolAnimation ?
                            'animate-[draw-check_0.5s_ease-in-out_forwards]'
                            : 'hidden'
                          }`
                        }
                        x1="5" y1="5" x2="50" y2="50"
                      />
                      <line
                        className={
                          `${symbolAnimation ?
                            'animate-[draw-check_1.0s_ease-in]'
                            : 'hidden'
                          }`
                        }
                        x1="5" y1="50" x2="50" y2="5"
                      />
                    </g>
                  </svg>
                  :
                  /**alert SVG animation */
                  <>
                  </>
            }
          </div>

          {/**message title */}
          <h2 className='w-full pt-4 lg:pt-6 px-4 lg:px-8 text-xl lg:text-3xl text-slate-950 text-center flex flex-col justify-center items-center'>
            {typeMessageModal === 'successful' ? 'Successful' :
              typeMessageModal === 'error' ? 'Error' : 'Are you sure?'}
          </h2>
          {/**message sub-title */}
          <h4 className='w-full px-4 lg:px-8 text-sm lg:text-base text-slate-600 text-center flex flex-col justify-center items-center'>
            {subtitle}
          </h4>
          {/**buttons */}
          <div className='w-full py-5 lg:py-6 px-4 lg:px-8 flex flex-row justify-between items-center'>
            {
              typeMessageModal === 'logout' ?
                <>
                  {/**logout session button */}
                  <button
                    className='w-[45%] text-slate-50 lg:hover:text-white lg:hover:font-bold py-2 flex flex-row justify-center items-center bg-green-400 lg:bg-green-300 lg:hover:bg-green-400 cursor-default lg:cursor-pointer rounded-md transition-all'
                    onClick={() => props.logout()}
                  >
                    <h5 className='w-full text-sm lg:text-base font-bold leading-none'>
                      Logout
                    </h5>
                  </button>
                  {/**Cancel logout session button */}
                  <button
                    className='w-[45%] text-slate-50 lg:hover:text-white lg:hover:font-bold py-2 flex flex-row justify-center items-center bg-red-400 lg:bg-red-300 lg:hover:bg-red-400 cursor-default lg:cursor-pointer rounded-md transition-all'
                    onClick={() => props.messageModalClose()}
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
                    onClick={() => props.messageModalClose()}
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
  )
}