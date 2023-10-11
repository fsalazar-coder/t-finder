import { useAuth, useJoinModal } from "../../context/authContext";
import {
  IconArrowRight,
  IconBxlLinkedin,
  IconFacebook,
  IconInstagram,
  IconTwitter
} from '../../icons/icons';



export default function Footer(props: any) {

  const { auth } = useAuth();
  const { setJoinModal } = useJoinModal();

  const navegationA = [
    'Find Talent',
    'Find Job',
    'About Us',
    'Blog',
  ];

  const navegationB = [
    'Terms of service',
    'Privacy',
    'Accessibility',
    'Help'
  ];

  const navegationC: any = [
    { id: 'icon-facebook', icon: <IconFacebook /> },
    { id: 'icon-twitter', icon: <IconTwitter /> },
    { id: 'icon-linkedin', icon: <IconBxlLinkedin /> },
    { id: 'icon-instagram', icon: <IconInstagram /> }
  ];

  return (
    <div className='w-full h-full relative flex flex-col justify-start'>
      <div className='w-full h-auto flex flex-col justify-center items-center bg-slate-50'>
        <div className='container w-full h-[230px] ml:h-[240px] sm:h-[280px] md:h-[360px] lg:h-[400px] px-5 lg:px-36 flex flex-col justify-center items-center'>
          <h3 className='w-full h-fit text-gray-600 text-sm sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl tracking-wide font-normal text-center flex justify-center'>
            {auth ? 'The way of manager talent' : 'Discover the way of manager talent'}
          </h3>
          <h1 className='w-full h-fit text-gray-950 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-5xl tracking-wide font-bold text-center drop-shadow-2xl flex justify-center z-30'>
            intelligently
          </h1>
          {/**button to open join modal (register) */}
          <div className='w-full h-fit pt-6 flex flex-row justify-center items-center z-[35]'>
            <button
              className='w-fit h-fit px-8 py-3 text-slate-50 hover:text-white md:hover:font-bold bg-fuchsia-400 hover:bg-fuchsia-900 flex flex-row justify-center items-center rounded-full cursor-pointer transform hover:scale-[1.1] transition-all z-30'
              onClick={() => setJoinModal(true)}
            >
              <h3 className='w-full h-2/3 text-sm lg:text-base xl:text-lg font-semibold tracking-wider flex flex-row justify-center items-center rounded-full transition-all'>
                {auth ? 'Go to my account' : 'Join to T-finder'}
              </h3>
              <i className='text-base xl:text-lg leading-none font-bold md:font-medium tracking-wider ml-1'>
                <IconArrowRight />
              </i>
            </button>
          </div>
        </div>
      </div>

      {/***Links***/}
      <div className='w-full h-auto py-3 flex flex-row justify-center items-center bg-slate-600 z-10'>
        <div className='container w-full h-full px-5 flex flex-row justify-between items-start'>
          {/**location and phone */}
          <div className='w-1/2 h-full flex flex-col justify-center items-start'>
            <ul className='w-fit h-full text-sm md:text-base lg:text-lg xl:text-xl text-white font-light flex flex-col justify-center items-start'>
              <li
                key='location'
                className='flex flex-row items-start'>
                <h2 className='text-left list-none'>
                  San Antonio city, Venezuela
                </h2>
              </li>
              <li
                key='phone'
                className='flex flex-row items-center'>
                <h2 className='text-left list-none'>
                  +58 416-6187049 <br />
                  +58 424-1170805
                </h2>
              </li>
            </ul>
          </div>
          {/**links */}
          <div className='w-fit sm:w-1/2 h-full text-sm sm:text-xs md:text-sm lg:text-base flex flex-col justify-between items-end sm:flex-row sm:items-start'>
            <div className='w-full h-full pb-4 sm:pb-0 flex flex-col justify-start items-start sm:items-end'>
              <ul className='w-fit h-full flex flex-col items-center'>
                {
                  navegationA.map((element: any, index: any) => {
                    return (
                      <li
                        key={index}
                        className='w-full text-white sm:text-slate-400 text-start list-none transition-all sm:cursor-pointer sm:hover:text-white sm:hover:font-semibold'>
                        <h2>{element}</h2>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
            <div className='w-full h-full flex flex-col justify-start items-start sm:items-end'>
              <ul className='w-fit h-full flex flex-col items-center'>
                {
                  navegationB.map((element: any, index: any) => {
                    return (
                      <li
                        key={index}
                        className='w-full text-white sm:text-slate-400 text-start list-none transition-all sm:cursor-pointer sm:hover:text-white sm:hover:font-semibold'>
                        <h2>{element}</h2>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/***Copyright footer***/}
      <div
        id='contact'
        className='w-full h-auto sm:h-[5%] py-5 sm:py-2 flex flex-row justify-center items-center border-t border-slate-300 bg-slate-950 z-10'
      >
        <div className='container h-auto px-5 flex flex-col-reverse sm:flex-row justify-between items-center'>
          <h2 className='w-full sm:w-1/2 h-full text-white text-sm sm:text-xs md:text-sm lg:text-base text-center sm:text-start pt-2 sm:pt-0 z-40'>
            © 2023 - Decalin-stack all right reserved
          </h2>
          <ul className='w-full sm:w-1/2 h-full flex flex-row justify-center sm:justify-end items-center list-none z-40'>
            {
              navegationC.map((element: any) => {
                return (
                  <li
                    key={element.id}
                    className='w-fit h-full px-5 sm:px-0 sm:pl-10 flex flex-col justify-center sm:items-center cursor-pointer'>
                    <i className='w-fit h-fit text-white sm:text-slate-400 text-2xl sm:text-lg md:text-xl text-center sm:hover:transform hover:text-white sm:hover:scale-[1.2] transition-all'>
                      {element.icon}
                    </i>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    </div>
  )
}