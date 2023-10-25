import { useEffect, useState } from 'react';
import { useAuthData, useUI } from "../../context/authContext";
import { Typewriter } from 'react-simple-typewriter';
import { IconArrowRight } from '../../icons/icons';



export default function Header(props: any) {

  const { auth } = useAuthData();
  const { joinModal, setJoinModal } = useUI();
  const [animationActived, setAnimationActived] = useState(false);
  const headerActived = props.headerSectionActived;                                      /**To active animation on header section: true or false***/

  const animations = [                                                                   /***Animation sequence array: animate to each element***/
    'md:animate-[appear-bottom_1.0s_ease]',
    'md:animate-[appear-bottom_1.5s_ease]',
    'md:animate-[appear-bottom_2.0s_ease]'
  ];

  useEffect(() => {                                                                      /***UseEffect to controller that animation occurs only once***/
    if (headerActived === true) {
      setAnimationActived(true);
    }
  }, [headerActived]);

  return (
    <div className='w-full h-full px-2 lg:px-8 relative flex flex-col justify-center items-center bg-slate-800'>

      {/**Title text */}
      <div className='w-full h-fit flex flex-col justify-center items-center z-[35]'>
        <h3 className='w-fit h-fit text-gray-600 text-sm sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl tracking-wide font-normal flex'>
          The real app that
        </h3>
        <h1 className='w-fit h-fit text-slate-50 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-5xl tracking-wide font-bold drop-shadow-2xl flex z-30'>
          <Typewriter
            words={['help you find Talent inteligently', 'looking for job to you!!']}
            cursor
            cursorStyle='|'
            cursorColor='rgb(255,255,255,0.20)'
            typeSpeed={100}
            deleteSpeed={50}
            loop={10}
          />
        </h1>
      </div>

      {/**Subtitle text */}
      <div className='w-full h-fit flex flex-col justify-center items-center z-[35]'>
        <h5 className='w-fit h-fit text-fuchsia-400 text-sm sm:text-xs md:text-sm lg:text-base xl:text-lg font-medium tracking-wider text-start py-1 flex flex-col justify-start'>
          Improving your experience with recruitment
        </h5>
      </div>
      {/**button to open join modal (register) */}
      < div className='w-full h-fit pt-10 flex justify-center items-center z-[35]'>
        <button
          className='w-fit h-fit px-8 py-3 text-slate-50 hover:text-white md:hover:font-bold bg-fuchsia-400 hover:bg-fuchsia-900 flex flex-row justify-center items-center rounded-full cursor-pointer transform hover:scale-[1.1] transition-all z-30'
          onClick={() => setJoinModal(true)}
        >
          <h3 className='w-full h-2/3 text-sm lg:text-base xl:text-lg font-semibold tracking-wider flex flex-row justify-center items-center rounded-full transition-all'>
            {auth ? 'Go to my account' : 'Get started'}
          </h3>
          <i className='text-base xl:text-lg leading-none font-bold md:font-medium tracking-wider ml-1'>
            <IconArrowRight />
          </i>
        </button>
      </div>
    </div >
  )
}