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
        logoutModal ?
          `w-screen h-screen fixed top-0 flex flex-col justify-center items-center bg-black bg-opacity-75 transition-all animate-[appear_0.5s] z-[1000]`
          : 'absolute hidden'
      }
    >
      {/**box */}
      <div className='container w-full md:w-[650px] xl:w-[750px] h-full px-[2%] ml:px-[10%] md:px-0 py-10 flex flex-col justify-center items-center'>
        <div className='w-[90%] sm:w-1/2 h-1/2 flex flex-col justify-end items-center rounded-md bg-white animate-[appear_1.0s] z-[2000]'>
          {/**SVG: animation circle */}
          <div className='w-full h-1/2 relative flex flex-col justify-center items-center'>
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

          {/**message sent */}
          <h4 className='w-full h-[20%] px-4 text-sm sm:text-base text-center flex flex-col justify-center items-center'>
            Logout your session with this action
          </h4>
          <div className='w-full h-20 flex flex-row justify-around items-center'>
            {/**logout session button */}
            <button
              className='w-auto h-auto text-white px-6 py-3 flex flex-row justify-center items-center rounded-full bg-green-400 md:bg-green-300 md:hover:bg-green-600 md:hover:shadow-2xl transition-all z-30'
              onClick={() => props.logout() }
            >
              <h5 className='w-fit h-fit text-sm sm:text-xs md:text-sm lg:text-base xl:text-lg leading-none font-bold md:font-medium tracking-wider'>
                OK
              </h5>
            </button>
            {/**Cancel logout session button */}
            <button
              className='w-auto h-auto text-white px-6 py-3 flex flex-row justify-center items-center rounded-full bg-red-400 md:bg-red-300 md:hover:bg-red-600 md:hover:shadow-2xl transition-all z-30'
              onClick={() => props.logoutCancel() }
            >
              <h5 className='w-fit h-fit text-sm sm:text-xs md:text-sm lg:text-base xl:text-lg leading-none font-bold md:font-medium tracking-wider'>
                Cancel
              </h5>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}