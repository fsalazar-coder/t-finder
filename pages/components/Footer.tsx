import { useUI } from '@/context/ContextUI';
import { useAuth } from '@/context/ContextAuth';
import {
  IconArrowRight,
  IconBxlLinkedin,
  IconFacebook,
  IconInstagram,
  IconTwitter
} from '../../icons/icons';
import ButtonGoTo from './ButtonGoTo';


export default function Footer(props: any) {
  const { screenNarrow } = useUI();
  const { token, setJoinModal } = useAuth();
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
    <div className='w-full min-h-screen relative flex flex-col justify-end bg-color-clear'>
      <div className={`${screenNarrow && 'pt-14'} w-full h-full flex flex-col justify-center items-center`}>
        <div className='container w-full h-full px-5 lg:px-36 flex flex-col justify-center items-center'>
          <h3 className='text-gray-600 text-sm sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl tracking-wide font-normal text-center flex justify-center'>
            {token ? 'The way of manager talent' : 'Discover the way of manager talent'}
          </h3>
          <h1 className='text-gray-950 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-5xl tracking-wide font-bold text-center drop-shadow-2xl flex justify-center z-30'>
            intelligently
          </h1>
          {/**button to open join modal (register) */}
          <div className='w-full pt-2 md:pt-4 flex flex-row justify-center items-center z-[35]'>
            <ButtonGoTo />
          </div>
        </div>
      </div>
      {/***Links***/}
      <div className='w-full h-52 md:h-36 flex justify-center bg-color-dark z-10'>
        <div className='container w-full h-full py-5 md:px-5 flex flex-row justify-between items-start'>
          {/**location and phone */}
          <div className='w-1/2 md:w-1/3 h-full flex flex-col'>
            <ul className='w-full h-fit text-sm md:text-base lg:text-lg xl:text-xl text-color-text-medium font-light flex flex-col justify-center items-start'>
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
          <div className='w-1/2 md:w-2/3 h-full text-sm sm:text-xs md:text-sm lg:text-base flex flex-col justify-between items-end sm:flex-row sm:items-start'>
            <div className='w-full h-full pb-4 sm:pb-0 flex flex-col justify-start items-start sm:items-end'>
              <ul className='w-fit h-full flex flex-col items-center'>
                {
                  navegationA.map((element: any, index: any) => {
                    return (
                      <li
                        key={index}
                        className='w-full text-color-text-medium text-start list-none transition-all sm:cursor-pointer lg:hover:text-color-text-dark font-normal'>
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
                        className='w-full text-color-text-medium text-start list-none transition-all sm:cursor-pointer lg:hover:text-color-text-dark font-normal'>
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
        className='w-full h-20 md:h-14 py-5 md:py-2 flex flex-row justify-center items-center bg-color-secondary-dark z-10'
      >
        <div className='container h-full px-5 flex flex-col-reverse md:flex-row justify-between items-center'>
          <h2 className='w-full md:w-1/2 text-white text-sm md:text-sm lg:text-base text-center md:text-start flex z-40'>
            © 2023 - Decalin-stack all right reserved
          </h2>
          <ul className='w-full md:w-1/2 flex flex-row justify-center md:justify-end items-center list-none z-40'>
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