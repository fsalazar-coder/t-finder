import { useUI } from '@/context/ContextUI';
import { useAuth } from '@/context/ContextAuth';
import { useAuthSocket } from '@/context/ContextAuthSocket';
import { IconBxsBellRing, IconMessageNotification } from '@/icons/icons';
import ImageIconUser from '../account/ImageIconUser';
import HamburguerMenu from './HamburguerMenu';
import IconUnread from '../account/IconUnread';
import DropdownHome from './DropdownHome';
import NavbarHomeElements from './NavbarHomeElements';

interface NavbarElementsProps {
  navbarAccountElements: NavbarElement[];
};

interface NavbarElement {
  title: string;
  clickGoTo: string;
  icon: JSX.Element;
}


export default function Navbar() {
  const { screenNarrow, dropdownHome, setDropdownHome, setHamburguerMenuActive, sectionHomeActived, setSectionHomeActived } = useUI();
  const isHeaderActived: boolean = sectionHomeActived === 'header-section';

  const navbarAccountElements = [
    { title: 'Connections', clickGoTo: 'Connections', icon: <IconMessageNotification /> },
    { title: 'Notifications', clickGoTo: 'Notifications', icon: <IconBxsBellRing /> },
  ];


  return (
    <div className={`${(!isHeaderActived || dropdownHome) && 'bg-color-secondary-dark'
  } ${dropdownHome? 'h-auto' : 'h-14'} w-full fixed top-0 flex flex-col items-center transition-all z-50`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className={`container w-full h-14 px-0 lg:px-5 flex flex-row justify-between items-center`}>
        <HamburguerMenu shouldRender={screenNarrow} />
        <Logo
          click={() => {
            setDropdownHome(false);
            setHamburguerMenuActive(false);
            setSectionHomeActived('header-section')
          }}
        />
        <nav className='w-2/3 relative flex flex-row justify-end items-center'>
          <ul className={`h-full pr-2 flex flex-row justify-between items-center border-r border-color-secondary`}>
            <NavbarHomeElements shouldRender={!screenNarrow} />
          </ul>
          <NavbarElementsAuthenticated navbarAccountElements={navbarAccountElements} />
          <NavbarElementsUnauthenticated />
        </nav>
      </div>
      <DropdownHome />
    </div>
  )
};

const Logo = ({ click }: any) => (
  <div className='w-1/2 h-full flex flex-row justify-start items-center'>
    <div className='text-lg text-color-secondary-clear font-normal' onClick={click}>
      <a className='font-bold text-color-text-secondary'>T</a>alent-
      <a className='text-color-text-secondary font-semibold'>finder</a>
    </div>
  </div>
);

const NavbarElementsAuthenticated: React.FC<NavbarElementsProps> = ({ navbarAccountElements }) => {
  const { token } = useAuth();
  const { setAccountActived, setAccountModule, screenNarrow, dropdownAuth, setDropdownAuth, setDropdownHome, setHamburguerMenuActive } = useUI();
  const { unreadMessages, unreadNotifications } = useAuthSocket();

  return (
    token &&
    <div className={`${screenNarrow ? 'w-full' : ''} h-full flex flex-row justify-end items-center`}>
      <nav className='w-fit h-full px-3 flex flex-row items-center'>
        {
          navbarAccountElements?.map(({ title, clickGoTo, icon }: any, index: any) => {
            return (
              <li key={index} className={
                `${'text-color-secondary-clear lg:text-color-secondary lg:hover:text-color-secondary-clear lg:cursor-pointer'}
                      w-full h-[3.75rem] px-3 flex flex-col justify-center items-center transition-all z-[70]`
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
              </li>
            )
          })
        }
      </nav>
      <div
        className={
          `${screenNarrow ? 'cursor-default' : 'justify-center items-center cursor-pointer'
          } relative flex flex-col z-50`
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
      </div>
    </div>
  )
};

const NavbarElementsUnauthenticated: React.FC = () => {
  const { screenNarrow } = useUI();
  const { token, setLoginModal, setJoinModal } = useAuth();

  return (
    (!token && !screenNarrow) &&
    <ul className='flex flex-row justify-between items-center'>
      {/**login butto to open modal */}
      <li className='flex flex-row justify-center items-start list-none'>
        <button
          className='w-full flex flex-row justify-center items-center cursor-pointer transition-all z-30'
          onClick={() => setLoginModal(true)}
        >
          <h3 className='py-1 px-6 text-white hover:text-color-secondary-clear text-sm lg:text-base font-bold tracking-wider flex flex-row justify-center items-center transition-all'>
            Login
          </h3>
        </button>
      </li>
      {/**Join button to open modal */}
      <li className='flex flex-row justify-center items-start list-none'>
        <button
          className='py-1 px-6 flex flex-row justify-center items-center bg-color-secondary-clear hover:bg-color-secondary border-2 border-white hover:border-color-secondary-clear rounded-full cursor-pointer transition-all z-30'
          onClick={() => setJoinModal(true)}
        >
          <h3 className='w-fit text-white hover:text-white text-sm lg:text-base font-bold tracking-wider flex transition-all'>
            Join
          </h3>
        </button>
      </li>
    </ul>
  )
};