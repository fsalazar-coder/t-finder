import { useRef, useEffect } from 'react'
import { useAuthData, useAuthUI, useUI } from "../../context/authContext";
import { useRouter } from 'next/navigation';
import ImageIconUser from './ImageIconUser';
import { IconDashboard, IconUserTie, IconBxsBellRing, IconGear, IconHome, IconBxPowerOff, IconUserConnections, IconRequestTalent, IconRequestJob, IconMessageNotification } from '@/icons/icons';

const navbarElementAuth = [
  { title: 'Dashboard', accountModule: 'Dashboard', icon: <IconDashboard /> },
  { title: 'Profile', accountModule: 'Profile', icon: <IconUserTie /> },
  { title: 'Talent request', accountModule: 'Talent', icon: <IconRequestTalent /> },
  { title: 'Job request', accountModule: 'Job', icon: <IconRequestJob /> },
  { title: 'Notifications', accountModule: 'Notifications', icon: <IconBxsBellRing /> },
  { title: 'Connections', accountModule: 'Connections', icon: <IconMessageNotification /> },
  { title: 'Settings', accountModule: 'Settings', icon: <IconGear /> },
];



export default function AccountNavbar(props: any) {

  const { userId, userEmail, userProfileData, logout } = useAuthData();
  const { setAccountActived, accountModule, setAccountModule, setChatActived } = useAuthUI();
  const { dropdown, setDropdown, screenNarrow, setMessageModal } = useUI();
  const indicatorRef: any = useRef(null);
  const router = useRouter();
  const isDashboard = accountModule === 'Dashboard';

  useEffect(() => {
    const indicatorSelected: any = indicatorRef.current;
    let translateY = isDashboard ? 56 : 36;
    let accountModuleArray: any = ['Dashboard', 'Profile', 'Talent', 'Job', 'Notifications', 'Connections', 'Settings' ];
    let indicatorFactorPosition: any = accountModuleArray.indexOf(accountModule);
    if (indicatorSelected) {
      indicatorSelected.style.transition = 'all 0.5s ease';
      indicatorSelected.style.transform = `translateY(${indicatorFactorPosition * translateY}px)`;
    }
  }, [accountModule, isDashboard])


  const userFullName: any = userProfileData?.personalInfo[0]?.full_name;
  const userFullNameAccountNavbar: string = userFullName ? userFullName : (userEmail || '')

  return (
    <div
      className={
        `${screenNarrow ? 'w-full h-12 border-b'
          : isDashboard ? 'w-24 h-screen border-r'
            : 'w-60 h-screen border-r'
        } fixed left-0 flex justify-center items-center bg-white border-color-border transition-all z-50`
      }>
      <div className={
        `${screenNarrow ? 'px-5 flex-row justify-between'
          : 'flex-col justify-start'
        } w-full h-full flex`
      }>

        {/**Logo */}
        <div className={
          `${isDashboard ? screenNarrow ? 'py-2' : 'h-24 py-4 justify-center' : 'py-2 justify-center'} w-full flex flex-row items-center`
        }>
          {(!screenNarrow && isDashboard) ?
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
          ((isDashboard && screenNarrow) || !isDashboard) &&
          /**image profile */
          <div className={
            `${screenNarrow ? 'w-fit relative' : 'w-full py-4 border-y border-color-border'} flex flex-col justify-center items-center`
          }>
            <div
              className={
                `${screenNarrow ? 'w-9 h-9 mx-3' : 'w-32 h-32'
                } flex flex-col justify-center items-center transition-all`
              }>
              <ImageIconUser
                type={screenNarrow ? 'navbar' : 'account-navbar'}
                otherUserImageUrl={''}
              />
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
                  {userFullNameAccountNavbar}
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
                              ${accountModule === item.accountModule ? 'text-white font-bold' : 'text-color-text-almost-clear hover:text-color-text-medium hover:bg-color-hover cursor-pointer'}
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
                  w-full flex flex-row items-center text-color-text-almost-clear hover:text-color-text-medium hover:bg-color-hover cursor-pointer z-[70]`
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
                absolute left-0 top-0 flex flex-row justify-end bg-color-highlighted-clear transform transition-all`
                }
                ref={indicatorRef}
              />
            </nav>
            {/**logout button */}
            <div className={
              `${isDashboard ? '' : 'px-8 py-2'} 
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