import { useAuthData, useAuthUI, useUI } from "../../context/authContext";
import { useRouter } from 'next/navigation';
import ImageIconUser from './ImageIconUser';
import { IconDashboard, IconUserTie, IconRequest, IconBxsBellRing, IconHelpCircle, IconGear, IconHome, IconBxPowerOff } from '@/icons/icons';

const navbarElementAuth = [
  { title: 'Dashboard', accountModule: 'Dashboard', icon: <IconDashboard /> },
  { title: 'Profile', accountModule: 'Profile', icon: <IconUserTie /> },
  { title: 'Request', accountModule: 'Request', icon: <IconRequest /> },
  { title: 'Notifications', accountModule: 'Notifications', icon: <IconBxsBellRing /> },
  { title: 'Settings', accountModule: 'Settings', icon: <IconGear /> },
  { title: 'Help & Support', accountModule: 'Help & Support', icon: <IconHelpCircle /> }
];



export default function AccountNavbar(props: any) {

  const { userEmail } = useAuthData();
  const { setAccountActived, accountModule, setAccountModule } = useAuthUI();

  const {
    dropdown, setDropdown,
    screenNarrow,
    setMessageModal,
    setTypeMessageModal,
    setTextMessageModal
  } = useUI();
  const router = useRouter();

  const isDashboard = accountModule === 'Dashboard';


  return (
    <div
      className={
        `${isDashboard ? 'w-24 flex-col justify-between' : 'w-full lg:w-60 flex-row justify-center'} 
        h-10 lg:h-full fixed left-0 flex items-center bg-slate-950 transition-all z-50`
      }>
      <div className='container w-full h-auto lg:h-full px-0 py-2 lg:py-0 flex flex-row lg:flex-col justify-between lg:justify-start items-center'>
        {/**Logo */}
        <div className='lg:w-full py-1 lg:py-4 flex flex-row justify-center items-center z-30'>
          <h2 className='text-slate-400 font-light'>
            <a className='text-white font-bold'>
              T
            </a>
            {isDashboard ? '-' : 'alent-'}
            <a className='text-white font-bold'>
              finder
            </a>
          </h2>
        </div>
        {/**content */}
        <div className='lg:w-full flex flex-row justify-center items-center lg:flex-col lg:justify-start lg:items-center z-50'>
          {
            screenNarrow ?
              <div className='relative flex flex-row justify-center items-center'>
                <div className='py-1 flex flex-row justify-center items-center z-30'>
                  <h2 className='text-white'>
                    {accountModule}
                  </h2>
                </div>
                <div
                  className='w-7 h-7 mx-3 flex flex-row justify-center items-center'
                  onClick={() => setDropdown(!dropdown)}
                >
                  <ImageIconUser size='small' />
                </div>
              </div>
              :
              <div className='w-full flex flex-col items-center'>
                {
                  !isDashboard &&
                  <>
                    <div className='w-full py-4 flex flex-col justify-center items-center border-y border-slate-900'>
                      <div className={`${isDashboard ? 'w-16 h-16' : 'w-32 h-32'} flex flex-col justify-center items-center transition-all`}>
                        <ImageIconUser size='large' />
                      </div>
                    </div>
                    <div className='w-full flex flex-row justify-center items-center transition-all'>
                      <h3 className='w-full py-3 text-slate-100 text-base text-center'>
                        {userEmail}
                      </h3>
                    </div>
                  </>
                }
                <nav className={
                  `${isDashboard ? 'py-3 justify-center' : 'py-[0.3rem] justify-start'} w-full h-full flex flex-col items-center border-y border-slate-900`}>
                  {
                    navbarElementAuth?.map((item: any, index: any) => {
                      return (
                        screenNarrow && item.title === 'Dashboard' ? '' :
                          <li
                            key={index}
                            className={
                              `${isDashboard ? 'py-3 justify-center' : 'py-[0.3rem]'} 
                              ${accountModule === item.accountModule ? 'border-r-4 border-fuchsia-600 rounded-tl-full rounded-bl-full' : 'hover:bg-slate-900 cursor-pointer'}
                            w-full h-auto flex flex-row items-center`
                            }
                            onClick={() => setAccountModule(item.accountModule)}
                          >
                            <i className={
                              `${isDashboard ? 'text-2xl' : 'pl-8 pr-3 text-base'} 
                              ${accountModule === item.accountModule ? 'text-fuchsia-600' : 'text-slate-800'} font-semibold`
                            }>
                              {item.icon}
                            </i>
                            {
                              !isDashboard && (
                                <h3 className={
                                  `${accountModule === item.accountModule ?
                                    'text-white font-semibold border-r-4 border-slate-50' :
                                    'text-slate-700 hover:text-white'
                                  } w-full text-sm text-start`
                                }
                                >
                                  {item?.title}
                                </h3>
                              )
                            }
                          </li>
                      )
                    })
                  }
                  <li
                    key='home-link'
                    className={
                      `${isDashboard ? 'py-3 justify-center' : 'py-[0.3rem]'} 
                      w-full h-auto flex flex-row items-center hover:bg-slate-900 cursor-pointer transition-all`
                    }
                    onClick={() => {
                      setAccountModule('');
                      setAccountActived(false);
                      router.push('/');
                    }}
                  >
                    <i className={`${isDashboard ? 'text-2xl' : 'text-base pl-8 pr-3'} text-slate-800 transition-all`}>
                      <IconHome />
                    </i>
                    {
                      !isDashboard && (
                        <h3 className='text-slate-500 hover:text-white font-normal text-base text-center transition-all'>
                          Home
                        </h3>
                      )
                    }
                  </li>
                  
                </nav>
                {/**logout button */}
                <div className={
                  `${isDashboard ? 'w-full' : 'w-full h-full px-8'} 
                  py-8 flex flex-row justify-center items-center transition-all`}>
                  <button
                    className={
                      `${isDashboard ? 'w-10 h-10' : 'w-full'} 
                      py-2 flex flex-row justify-center items-center bg-fuchsia-600 hover:bg-fuchsia-400 border border-fuchsia-300 rounded-full transition-all`}
                    onClick={() => {
                      setMessageModal(true);
                      setTypeMessageModal('logout');
                      setTextMessageModal('Logout your session with this action');
                    }}
                  >
                    {
                      isDashboard ?
                        <i className="text-2xl text-white transition-all">
                          <IconBxPowerOff />
                        </i>
                        :
                        <h3 className='h-auto text-slate-200 hover:text-slate-50 text-base text-center font-light transition-all'>
                          Log out
                        </h3>
                    }
                  </button>
                </div>
              </div>
          }
        </div>
      </div>
    </div>
  )
}