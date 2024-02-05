import { useRef, useEffect } from 'react'
import { useUI } from "@/context/ContextUI";
import { IconDashboard, IconUserTie, IconBxsBellRing, IconHome, IconRequestJob, IconMessageNotification, IconUserSearchFilled } from '@/icons/icons';
import ImageIconUser from './ImageIconUser';
import IconUnread from './IconUnread';
import ButtonLogout from './ButtonLogout';
import { useAuthSocket } from '@/context/ContextAuthSocket';

interface NavbarElement {
  title: string;
  clickGoTo: string;
  icon: JSX.Element;
}

interface NavbarElementProps {
  navbarAccountElements: NavbarElement[];
  getClickAction: (element: string) => () => void;
}

interface NavbarAccountIndicatorProps {
  reference: React.RefObject<HTMLDivElement>;
}


export default function NavbarAccount() {
  const { setChatActived } = useAuthSocket();
  const { screenNarrow, dropdown, setDropdown, setAccountActived, accountModule, setAccountModule } = useUI();
  const indicatorRef = useRef<HTMLDivElement>(null);

  const isDashboard = accountModule === 'Dashboard';

  const navbarAccountElements: NavbarElement[] = [
    { title: 'Dashboard', clickGoTo: 'Dashboard', icon: <IconDashboard /> },
    { title: 'Profile', clickGoTo: 'Profile', icon: <IconUserTie /> },
    { title: 'Talent request', clickGoTo: 'Talent', icon: <IconUserSearchFilled /> },
    { title: 'Job request', clickGoTo: 'Job', icon: <IconRequestJob /> },
    { title: 'Connections', clickGoTo: 'Connections', icon: <IconMessageNotification /> },
    { title: 'Notifications', clickGoTo: 'Notifications', icon: <IconBxsBellRing /> },
    { title: 'Home', clickGoTo: 'Home', icon: <IconHome /> },
  ];

  const getClickAction = (element: string): () => void => {
    switch (element) {
      case 'Home':
        return () => {
          setAccountModule('');
          setAccountActived(false);
          setChatActived(false);
        };
      default:
        return () => {
          setAccountModule(element);
        };
    }
  };

  useEffect(() => {
    if (!screenNarrow) {
      const indicatorSelected: any = indicatorRef.current;
      let translateY = 60;
      let accountModuleArray: string[] = ['Dashboard', 'Profile', 'Talent', 'Job', 'Connections', 'Notifications', 'Settings'];
      let indicatorFactorPosition: any = accountModuleArray?.indexOf(accountModule);
      if (indicatorSelected) {
        indicatorSelected.style.transition = 'all 0.5s ease';
        indicatorSelected.style.transform = `translateY(${indicatorFactorPosition * translateY}px)`;
      }
    }
  }, [accountModule, isDashboard, screenNarrow])


  return (
    <div
      className={
        `${screenNarrow ? 'w-full h-12 justify-end border-b' : 'w-24 h-screen justify-center border-r'
        } fixed left-0 flex items-center bg-white border-color-border transition-all z-50`
      }>
      <div className={`${screenNarrow ? 'w-fit px-5 flex-row' : 'w-full flex-col'} h-full flex justify-between`}
        onClick={() => screenNarrow && setDropdown(!dropdown)}
      >
        <AccountElementActive />
        <ProfileImage />
        {
          !screenNarrow &&
          <>
            <nav className='w-full h-fit relative flex flex-col items-center'>
              <NavbarAccountElements
                navbarAccountElements={navbarAccountElements}
                getClickAction={getClickAction}
              />
              <NavbarAccountIndicator reference={indicatorRef} />
            </nav>
            <ButtonLogout type='navbar-account' />
          </>
        }
      </div>
    </div>
  )
};


/// account module element indicator: is actived only on screenarrow to active dropdown 
const AccountElementActive = () => {
  const { screenNarrow, accountModule } = useUI();

  return (
    screenNarrow &&
    <div className='w-full py-1 flex flex-row justify-end items-center z-30'>
      <div className="flex flex-row justify-end items-center">
        <h2 className='w-fit pr-1 text-color-text-dark'>
          {accountModule}
        </h2>
      </div>
    </div>
  )
};

const ProfileImage = () => {
  const { screenNarrow, dropdown } = useUI();

  return (
    <div className={`${screenNarrow ? 'w-fit relative' : 'w-full py-2 border-b border-color-border'} flex flex-row justify-center items-center`}>
      <div className={`${screenNarrow ? 'w-6 h-6 mx-1' : 'w-16 h-16'} flex flex-col justify-center items-center transition-all`}>
        <ImageIconUser
          type={screenNarrow ? 'navbar' : 'account-navbar'}
          otherUserImageUrl={'none'}
        />
      </div>
      {
        screenNarrow &&
        <div className={`${dropdown ? 'pt-3' : 'pt-1'} h-full flex flex-col justify-center`}>
          <div className={`${dropdown ? '-rotate-[135deg]' : 'rotate-45'} w-2 h-2 border-r-2 border-b-2 border-color-border transform transition-all`} />
        </div>
      }
    </div>
  )
};

const NavbarAccountElements: React.FC<NavbarElementProps> = ({ navbarAccountElements, getClickAction }) => {
  const { unreadNotifications, unreadMessages } = useAuthSocket();
  const { accountModule } = useUI();

  return (
    navbarAccountElements?.map(({ title, clickGoTo, icon }: any, index: number) => {
      return (
        <li key={index} className={
          `${clickGoTo === accountModule ? 'text-color-highlighted' : 'text-color-text-almost-clear hover:text-color-highlighted-clear cursor-pointer'}
          w-full h-[3.75rem] flex flex-col justify-center items-center transition-all z-[70]`
        }
          onClick={getClickAction(clickGoTo)}
        >
          <div className='flex relative'>
            <i className={`w-fit h-fit text-xl lg:text-2xl flex flex-col justify-center items-center`}>
              {icon}
            </i>
            {(title === 'Connections' && unreadMessages > 0) && <IconUnread value={unreadMessages} />}
            {(title === 'Notifications' && unreadNotifications > 0) && <IconUnread value={unreadNotifications} />}
          </div>
          <h6 className={`w-fit h-fit flex text-xs text-center`}>
            {title}
          </h6>
        </li>
      )
    }))
};

const NavbarAccountIndicator: React.FC<NavbarAccountIndicatorProps> = ({ reference }) => {
  return (
    <div className={`w-1 h-[3.75rem] absolute right-0 top-0 flex flex-row justify-end bg-color-highlighted rounded-full transform transition-all`}
      ref={reference}
    />
  )
};