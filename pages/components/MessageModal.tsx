import { useEffect, useState } from 'react';



export default function MessageModal(props: any) {

  const [circleAnimation, setCircleAnimation] = useState(false);
  const [checkAnimation, setCheckAnimation] = useState(false);
  const messageModal = props.messageModal;
  const textMessageModal = props.textMessageModal;
  const messageModalSuccessfull = props.messageModalSuccessfull;

  useEffect(() => {
    if (messageModal) {
      setCircleAnimation(true);
      setTimeout(() => {
        setCheckAnimation(true)
      }, 4000);
    }
  }, [messageModal]);

  const modalCloseEscapeHandle = (e: any) => {
    if (messageModal) {
      if ((e.chartCode | e.keyCode) === 27) {
        props.messageModalClose();
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', modalCloseEscapeHandle);
  });

  useEffect(() => {
    messageModal ?
      (document.body.style.overflowY = 'hidden')
      : (document.body.style.overflowY = 'auto');
  }, [messageModal]);


  return (
    <div
      className={
        messageModal ?
          `w-screen h-screen fixed top-0 flex flex-col justify-center items-center bg-black bg-opacity-75 transition-all animate-[appear_0.5s] z-[1000]`
          : 'absolute hidden'
      }
    >
      {/**box */}
      <div className='container w-full md:w-[650px] xl:w-[750px] h-full px-[2%] ml:px-[10%] md:px-0 py-10 flex flex-col justify-center items-center'>
        <div className='w-[90%] sm:w-1/2 h-1/2 flex flex-col justify-end items-center rounded-md bg-white animate-[appear_1.0s] z-[2000]'>
          {/**SVG: animation circle-check or circle-error */}
          <div className='w-full h-1/2 relative flex flex-col justify-center items-center'>
            <svg className={
              `${messageModalSuccessfull ?
                'stroke-green-100' :
                'stroke-red-100'
              } w-[110px] h-[110px]`
            }>
              <circle
                className={
                  `${circleAnimation ?
                    'animate-[draw-circle_2.5s_ease-in]'
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
              messageModalSuccessfull ?
                <svg className='w-[55px] h-[41px] absolute stroke-green-600'
                  strokeWidth={8}
                  strokeLinecap='round'
                >
                  <g transform="matrix(0.80,8.70e-32,8.40e-32,0.80,-489.57,-205.68)">
                    <path
                      className={
                        `${checkAnimation ?
                          'animate-[draw-check_0.5s_ease-in]'
                          : 'hidden'
                        }`
                      }
                      fill="none"
                      d="M616.306,283.025 L634.087,300.805 L673.361,261.53"
                    />
                  </g>
                </svg>
                :
                <>
                  <svg className='w-[55px] h-[41px] absolute stroke-red-600'
                    strokeWidth={8}
                    strokeLinecap='round'
                  >
                    <g transform="matrix(0.80,8.70e-32,8.40e-32,0.80,-489.57,-205.68)">
                      <path
                        className={
                          `${checkAnimation ?
                            'animate-[draw-check_0.5s_ease-in]'
                            : 'hidden'
                          }`
                        }
                        fill="none"
                        d="M616.306,283.025 L634.087,300.805 L673.361,261.53"
                      />
                    </g>
                  </svg>
                </>
            }
          </div>

          {/**message sent */}
          <h4 className='w-full h-[20%] px-4 text-sm sm:text-base text-center flex flex-col justify-center items-center'>
            {textMessageModal}
          </h4>
          {/**OK: close button */}
          <div className='w-full h-[30%] flex flex-col justify-center items-center'>
            <button
              className='w-auto h-auto text-white px-6 py-3 flex flex-row justify-center items-center rounded-full bg-green-400 md:bg-violet-900 md:hover:bg-green-400 hover:shadow-2xl transition-all z-30'
              onClick={() => props.messageModalClose()}
            >
              <h5 className='w-fit h-fit text-sm sm:text-xs md:text-sm lg:text-base xl:text-lg leading-none font-bold md:font-medium tracking-wider'>
                OK
              </h5>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}