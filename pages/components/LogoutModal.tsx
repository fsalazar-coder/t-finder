import { useEffect, useState } from 'react';



export default function LogoutModal(props: any) {

  const [circleAnimation, setCircleAnimation] = useState(false);
  const [symbolAnimation, setSymbolAnimation] = useState(false);
  const logoutModal = props.logoutModal;

  useEffect(() => {
    if (logoutModal) {
      setCircleAnimation(true);
      setTimeout(() => {
        setSymbolAnimation(true)
      }, 1000);
    }
  }, [logoutModal]);

  useEffect(() => {
    logoutModal ?
      (document.body.style.overflowY = 'hidden')
      : (document.body.style.overflowY = 'auto');
  }, [logoutModal]);


  return (
    <div
      className={
        `w-screen h-screen fixed top-0 flex flex-col justify-center items-center bg-black bg-opacity-75 transform z-[60]
      ${logoutModal ?
          'scale-100 animate-[fade-in_0.50s]'
          : props.logoutModalAnimationClose ?
            'scale-0 animate-[fade-out_0.30s]'
            : 'hidden'
        }`
      }
    >
      {/**box */}
      <div className={
        `container w-64 lg:w-[22rem] relative flex flex-col justify-start items-center bg-white rounded-md shadow-lg transform
        ${logoutModal ?
          'scale-100 animate-[zoom-in_0.50s]'
          : 'scale-0 animate-[zoom-out_0.30s]'
        }`
      }>
        <div className='w-full flex flex-col justify-start items-center'>
          {/**SVG: animation circle */}
          <div className='w-full h-32 relative px-4 lg:px-8 pt-2 lg:pt-4 flex flex-col justify-center items-center rounded-t-md animate-[appear_1.0s]'>
            <svg className='w-[110px] h-[110px] stroke-red-200'>
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
          </div>
          {/**message container */}
          <h2 className='w-full pt-4 lg:pt-6 px-4 lg:px-8 text-xl lg:text-3xl text-slate-950 text-center flex flex-col justify-center items-center'>
            Are you sure?
          </h2>
          <h4 className='w-full px-4 lg:px-8 text-sm lg:text-base text-slate-600 text-center flex flex-col justify-center items-center'>
            Logout your session with this action
          </h4>
          {/**OK & cancel buttons */}
          <div className='w-full py-4 lg:py-6 px-4 lg:px-8 flex flex-row justify-between items-center'>
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
              onClick={() => props.logoutCancel()}
            >
              <h5 className='w-full text-sm lg:text-base font-bold leading-none'>
                Cancel
              </h5>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}