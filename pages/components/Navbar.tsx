import { useEffect, useState } from 'react';
import { useUI } from '@/context/ContextUI';
import { useAuth } from '@/context/ContextAuth';
import { useAuthSocket } from '@/context/ContextAuthSocket';
import { IconBxChevronUp, IconBxsBellRing, IconMessageNotification } from '@/icons/icons';
import ImageIconUser from '../account/ImageIconUser';
import HamburguerMenu from './HamburguerMenu';
import IconUnread from '../account/IconUnread';
import DropdownHome from './DropdownHome';

interface NavbarElementsProps {
  navbarAccountElements: NavbarElement[];
};

interface NavbarElement {
  title: string;
  clickGoTo: string;
  icon: JSX.Element;
}


export default function Navbar({ sectionActived }: any) {
  const [transparentBackground, setTransparentBackground] = useState(true);              /***Transparent background state: boolean***/

  const navbarAccountElements = [
    { title: 'Connections', clickGoTo: 'Connections', icon: <IconMessageNotification /> },
    { title: 'Notifications', clickGoTo: 'Notifications', icon: <IconBxsBellRing /> },
  ];

  useEffect(() => {
    const backgroundScrollHandle = () => {
      window.scrollY > 5 ? setTransparentBackground(false) : setTransparentBackground(true);
    };
    window.addEventListener('scroll', backgroundScrollHandle);
    return () => window.removeEventListener('scroll', backgroundScrollHandle);
  }, []);


  return (
    <div className={`w-full fixed flex flex-col items-center bg-color-navbar bg-opacity-90 border-b border-color-border transition-all z-50`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className={`container w-full h-12 lg:h-14 px-0 lg:px-5 flex flex-row justify-between items-center`}>
        <HamburguerMenu />
        <Logo />
        <nav className='w-1/2 relative flex flex-row justify-end items-center'>
          <NavbarElementsAuthenticated navbarAccountElements={navbarAccountElements} />
          <NavbarElementsUnauthenticated />
        </nav>
      </div>
      <DropdownHome sectionActived={sectionActived} />
    </div>
  )
};

const Logo: React.FC = () => (
  <div className='w-1/2 h-full flex flex-row justify-start items-center'>
    <h2 className='text-lg text-color-highlighted-clear font-normal'>
      <a className='font-bold text-color-text-highlighted'>T</a>alent-
      <a className='text-color-text-highlighted font-semibold'>finder</a>
    </h2>
  </div>
);

const NavbarElementsAuthenticated: React.FC<NavbarElementsProps> = ({ navbarAccountElements }) => {
  const { token } = useAuth();
  const { setAccountActived, setAccountModule, screenNarrow, dropdownAuth, setDropdownAuth, setDropdownHome, setHamburguerMenuActive } = useUI();
  const { unreadMessages, unreadNotifications } = useAuthSocket();

  return (
    token &&
    <div className='w-full h-full flex flex-row justify-end items-center'>
      <nav className='w-fit h-full flex flex-row items-center'>
        {
          navbarAccountElements?.map(({ title, clickGoTo, icon }: any, index: any) => {
            return (
              <li key={index} className={
                `${'text-color-highlighted-clear lg:text-color-text-almost-clear lg:hover:text-color-highlighted-clear lg:cursor-pointer'}
                      w-full h-[3.75rem] px-2 flex flex-col justify-center items-center transition-all z-[70]`
              }
                onClick={() => {
                  setAccountActived(true);
                  setAccountModule(clickGoTo);
                }}
              >
                <div className='flex relative'>
                  <i className={`w-fit h-fit text-[1.35rem] lg:text-2xl flex flex-col justify-center items-center`}>
                    {icon}
                  </i>
                  {(title === 'Connections' && unreadMessages > 0) && <IconUnread value={unreadMessages} />}
                  {(title === 'Notifications' && unreadNotifications > 0) && <IconUnread value={unreadNotifications} />}
                </div>
                {
                  !screenNarrow &&
                  <h6 className={`w-fit h-fit flex text-xs text-center`}>
                    {title}
                  </h6>
                }
              </li>
            )
          })
        }
      </nav>
      <div
        className={
          `${screenNarrow ? 'cursor-default' : 'justify-center items-center cursor-pointer'
          } relative pl-2 flex flex-col z-50`
        }
        onClick={() => {
          setDropdownAuth(!dropdownAuth)
          setDropdownHome(false)
          setHamburguerMenuActive(false);
        }}
      >
        <div className={`${screenNarrow ? 'w-6 h-6' : 'w-[26px] h-[26px]'} flex justify-center items-center`}>
          <ImageIconUser
            type='navbar'
            otherUserImageUrl={'none'}
          />
        </div>
        {
          !screenNarrow &&
          <div className='w-fit flex items-end'>
            <h6 className={`w-full h-fit flex text-xs text-center text-color-text-almost-clear hover:text-color-highlighted-clear`}>
              Me
            </h6>
            <i className={`${!dropdownAuth && 'rotate-180'} w-fit h-fit -mb-[2px]  text-color-text-almost-clear hover:text-color-highlighted-clear text-base text-center flex flex-col transform transition-all`}>
              <IconBxChevronUp />
            </i>
          </div>
        }
      </div>
    </div>
  )
};

const NavbarElementsUnauthenticated: React.FC = () => {
  const { screenNarrow } = useUI();
  const { token, setLoginModal, setJoinModal } = useAuth();

  return (
    (!token && !screenNarrow) &&
    <ul className='w-48 lg:w-60 flex flex-row justify-between items-center'>
      {/**login butto to open modal */}
      <li className='w-[45%] flex flex-row justify-center items-start list-none'>
        <button
          className='w-full py-1 px-4 flex flex-row justify-center items-center border-2 border-color-highlighted-clear hover:border-color-highlighted rounded-full cursor-pointer transition-all z-30'
          onClick={() => setLoginModal(true)}
        >
          <h3 className='w-full text-color-highlighted-clear hover:text-color-highlighted text-sm lg:text-base font-bold tracking-wider flex flex-row justify-center items-center transition-all'>
            Login
          </h3>
        </button>
      </li>
      {/**Join button to open modal */}
      <li className='w-[45%] flex flex-row justify-center items-start list-none'>
        <button
          className='w-full py-1 px-4 flex flex-row justify-center items-center bg-color-highlighted-clear hover:bg-color-highlighted border-2 border-color-highlighted-clear hover:border-color-highlighted rounded-full cursor-pointer transition-all z-30'
          onClick={() => setJoinModal(true)}
        >
          <h3 className='text-white hover:text-white text-sm lg:text-base font-bold tracking-wider flex flex-row justify-center items-center transition-all'>
            Join
          </h3>
        </button>
      </li>
    </ul>
  )
};