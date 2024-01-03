import { useState, useRef, useEffect } from 'react'
import { useAuthData, useAuthUI, useUI } from "../../context/authContext";
import { useRouter } from 'next/navigation';
import ImageIconUser from './ImageIconUser';
import { IconDashboard, IconUserTie, IconRequest, IconBxsBellRing, IconHelpCircle, IconGear, IconHome, IconBxPowerOff } from '@/icons/icons';

const navbarElementAuth = [
  { title: 'Dashboard', accountModule: 'Dashboard', icon: <IconDashboard /> },
  { title: 'Profile', accountModule: 'Profile', icon: <IconUserTie /> },
  { title: 'Talent request', accountModule: 'Talent', icon: <IconRequest /> },
  { title: 'Job request', accountModule: 'Job', icon: <IconRequest /> },
  { title: 'Notifications', accountModule: 'Notifications', icon: <IconBxsBellRing /> },
  { title: 'Settings', accountModule: 'Settings', icon: <IconGear /> },
];



export default function AccountNavbar(props: any) {

  const { userEmail, userProfilePersonalInfo, logout } = useAuthData();
  const { setAccountActived, accountModule, setAccountModule, setChatActived } = useAuthUI();
  const { dropdown, setDropdown, screenNarrow, setMessageModal } = useUI();
  const indicatorRef: any = useRef(null);
  const router = useRouter();
  const isDashboard = accountModule === 'Dashboard';

  useEffect(() => {
    const indicatorSelected: any = indicatorRef.current;
    let translateY = isDashboard ? 56 : 36;
    if (indicatorSelected) {
      switch (accountModule) {
        case 'Profile':
          indicatorSelected.style.transition = 'all 0.5s ease';
          indicatorSelected.style.transform = `translateY(${translateY}px)`;
          break;
        case 'Talent':
          indicatorSelected.style.transition = 'all 0.5s ease';
          indicatorSelected.style.transform = `translateY(${2 * translateY}px)`;
          break;
        case 'Job':
          indicatorSelected.style.transition = 'all 0.5s ease';
          indicatorSelected.style.transform = `translateY(${3 * translateY}px)`;
          break;
        case 'Notifications':
          indicatorSelected.style.transition = 'all 0.5s ease';
          indicatorSelected.style.transform = `translateY(${4 * translateY}px)`;
          break;
        case 'Settings':
          indicatorSelected.style.transition = 'all 0.5s ease';
          indicatorSelected.style.transform = `translateY(${5 * translateY}px)`;
          break;
        default:
          indicatorSelected.style.transition = 'all 0.5s ease';
          indicatorSelected.style.transform = `translateY(0px)`;
          break;
      }
    }
  }, [accountModule, isDashboard])


  return (
    <div
      className={
        `${screenNarrow ? 'w-full h-10 border-b'
          : isDashboard ? 'w-24 h-screen border-r'
            : 'w-60 h-screen border-r'
        } fixed left-0 flex justify-center items-center bg-white border-color-border transition-all z-50`
      }>
      <div className={
        `${screenNarrow ? 'px-1 flex-row justify-between'
          : 'flex-col justify-start'
        } container w-full h-full flex`
      }>
        {/**Logo */}
        <div className={
          `${isDashboard ? 'h-24 py-4' : 'py-2'} w-full flex flex-row justify-center items-center`
        }>
          {isDashboard ?
            <div className="w-16 h-16 flex flex-col justify-center items-center outline outline-1 outline-color-clear border-2 border-color-secondary rounded-full transition-all">
              <h2 className='flex flex-row text-color-text-highlighted text-3xl font-bold transition-all'>
                T
              </h2>
            </div>
            :
            <h2 className='flex flex-row text-color-text-medium font-light'>
              <a className='text-color-text-highlighted font-extrabold'>T</a>
              <a className='text-color-secondary font-extralight'>alent</a>-
              <a className='text-color-text-clear font-bold'>finder</a>
            </h2>
          }
        </div>
        {/**account module indicator: is actived only on screenarrow to active dropdown */
          screenNarrow &&
          <div className='w-full py-1 flex flex-row justify-end items-center z-30'>
            <div
              className="flex flex-row justify-end items-center hover:cursor-pointer"
              onClick={() => setDropdown(!dropdown)}
            >
              <h2 className='w-fit pr-1 text-color-text-dark'>
                {accountModule}
              </h2>
              <div className={`${dropdown ? 'pt-3' : 'pt-1'} h-full flex flex-col justify-center`}>
                <div className={`${dropdown ? '-rotate-[135deg]' : 'rotate-45'} w-2 h-2 border-r-2 border-b-2 border-color-border transform transition-all`} />
              </div>
            </div>
          </div>
        }
        {
          /**image profile */
          !isDashboard &&
          <div className={
            `${screenNarrow ? 'w-fit relative' : 'w-full border-y border-color-border'} py-4 flex flex-col justify-center items-center`
          }>
            <div
              className={
                `${screenNarrow ? 'w-7 h-7 mx-3' : isDashboard ? 'w-16 h-16' : 'w-32 h-32'
                } flex flex-col justify-center items-center transition-all`
              }>
              <ImageIconUser size={screenNarrow ? 'small' : 'large'} />
            </div>
          </div>
        }
        {
          !screenNarrow &&
          <>
            {
              /**name or email user */
              !isDashboard &&
              <div className='w-full flex flex-row justify-center items-center transition-all'>
                <h3 className='w-full py-3 text-color-text-dark text-base text-center'>
                  {userProfilePersonalInfo?.full_name ? userProfilePersonalInfo?.full_name : userEmail}
                </h3>
              </div>
            }
            {/**nav elements */}
            <nav className='w-full h-full relative flex flex-col items-center border-y border-color-border'>
              {
                navbarElementAuth?.map((item: any, index: any) => {
                  return (
                    screenNarrow && item.title === 'Dashboard' ? '' :
                      <li
                        key={index}
                        className={
                          `${isDashboard ? 'h-14 py-3 justify-center' : 'h-9 py-1'} 
                              ${accountModule === item.accountModule ? 'text-color-highlighted font-bold' : 'text-color-text-almost-clear hover:text-color-text-medium hover:bg-color-clear cursor-pointer'}
                            w-full flex flex-row items-center z-[70]`
                        }
                        onClick={() => setAccountModule(item.accountModule)}
                      >
                        <i className={`${isDashboard ? 'text-2xl' : 'pl-8 pr-3 text-base'} font-semibold`}>
                          {item.icon}
                        </i>
                        {
                          !isDashboard && (
                            <h3 className='w-full text-sm text-start'>
                              {item?.title}
                            </h3>
                          )
                        }
                      </li>
                  )
                })
              }
              {/**home button */}
              <li
                key='home-link'
                className={
                  `${isDashboard ? 'h-14 py-3 justify-center' : 'h-9 py-1'} 
                  w-full flex flex-row items-center text-color-text-almost-clear hover:text-color-text-medium hover:bg-color-clear cursor-pointer z-[70]`
                }
                onClick={() => {
                  setAccountModule('');
                  setAccountActived(false);
                  setChatActived(false);
                  router.push('/');
                }}
              >
                <i className={`${isDashboard ? 'text-2xl' : 'pl-8 pr-3 text-base'}`}>
                  <IconHome />
                </i>
                {
                  !isDashboard && (
                    <h3 className='w-full text-sm text-start'>
                      Home
                    </h3>
                  )
                }
              </li>
              {/**indicator */}
              <div
                className={
                  `${isDashboard ? 'w-24 h-14' : 'w-60 h-9'} 
                absolute left-0 top-0 flex flex-row justify-end bg-color-highlighted-clear bg-opacity-10 transform transition-all`
                }
                ref={indicatorRef}
              />
            </nav>
            {/**logout button */}
            <div className={
              `${isDashboard ? 'py-8' : 'p-8'} 
                  w-full flex flex-row justify-center items-center transition-all`
            }>
              <button
                className={
                  `${isDashboard ? 'w-10 h-10' : 'w-full'} 
                      py-2 flex flex-row justify-center items-center text-color-text-clear hover:font-extrabold bg-color-highlighted hover:bg-color-highlighted-clear border border-color-border shadow-md rounded-full transition-all`}
                onClick={() => {
                  setMessageModal([{
                    type: 'logout',
                    text: 'Logout your session with this action',
                    click: () => {
                      logout()
                      setAccountActived(false)
                      setAccountModule('')
                      setMessageModal([])
                      router.push('/')
                    }
                  }]);
                }}
              >
                {
                  isDashboard ?
                    <i className="text-2xl text-white transition-all">
                      <IconBxPowerOff />
                    </i>
                    :
                    <h3 className='h-auto text-base text-center font-light transition-all'>
                      Log out
                    </h3>
                }
              </button>
            </div>
          </>
        }
      </div>
    </div>
  )
}