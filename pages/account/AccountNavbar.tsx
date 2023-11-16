import { useEffect, useState } from 'react';
import { useAuthData, useAuthUI, useUI } from "../../context/authContext";
import { useRouter } from 'next/navigation';
import ImageIconUser from './ImageIconUser';
import { IconDashboard, IconUserTie, IconRequest, IconBxsBellRing, IconHelpCircle, IconGear, IconHome } from '@/icons/icons';

const navbarElementAuth = [
  { title: 'Dashboard', accountModule: 'Dashboard', icon: <IconDashboard /> },
  { title: 'Profile', accountModule: 'Profile', icon: <IconUserTie /> },
  { title: 'Request', accountModule: 'Request', icon: <IconRequest /> },
  { title: 'Notifications', accountModule: 'Notifications', icon: <IconBxsBellRing /> },
  { title: 'Account Settings', accountModule: 'Account Settings', icon: <IconGear /> },
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


  return (
    <div
      className='w-full lg:w-60 h-10 lg:h-full fixed left-0 flex flex-row justify-center items-center bg-slate-950 z-50'>
      <div className='container w-full h-auto lg:h-full px-0 py-2 lg:py-0 flex flex-row lg:flex-col justify-between lg:justify-start items-center'>
        {/**Logo */}
        <div className='lg:w-full py-1 lg:py-4 flex flex-row justify-center items-center z-30'>
          <h2 className='text-slate-400 font-light'>
            <a className='text-white font-bold'>
              T
            </a>
            alent-
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
                <div className='w-full py-4 flex flex-col justify-center items-center border-y border-slate-900'>
                  <div className='w-32 h-32 flex flex-col justify-center items-center'>
                    <ImageIconUser size='large' />
                  </div>
                </div>
                <div className='w-full flex flex-row justify-center items-center'>
                  <h3 className='w-full py-3 text-slate-100 text-base text-center'>
                    {userEmail}
                  </h3>
                </div>
                <nav className='w-full h-full flex flex-col justify-start items-center border-y border-slate-900'>
                  {
                    navbarElementAuth?.map((item: any, index: any) => {
                      return (
                        <li
                          key={index}
                          className='w-full h-auto py-[0.3rem] flex flex-row items-center hover:bg-slate-900 cursor-pointer'
                          onClick={() => setAccountModule(item.accountModule)}
                        >
                          <i className='text-slate-500 pl-8 pr-3'>
                            {item.icon}
                          </i>
                          <h3 className={
                            `${accountModule === item.accountModule ?
                              'text-fuchsia-600 font-semibold' :
                              'text-slate-500 hover:text-white font-normal'
                            } text-base text-center`
                          }
                          >
                            {item?.title}
                          </h3>
                        </li>
                      )
                    })
                  }
                  <li
                    key='home-link'
                    className='w-full h-auto py-[0.3rem] flex flex-row items-center hover:bg-slate-900 cursor-pointer'
                    onClick={() => {
                      setAccountModule('');
                      setAccountActived(false);
                      router.push('/');
                    }}
                  >
                    <i className='text-slate-500 pl-8 pr-3'>
                      <IconHome />
                    </i>
                    <h3 className='text-slate-500 hover:text-white font-normal text-base text-center'>
                      Home
                    </h3>
                  </li>
                </nav>
                {/**logout button */}
                <div className='w-full py-8 px-8 flex flex-row justify-center items-center'>
                  <button
                    className='w-full h-full py-2 flex flex-row justify-center items-center bg-fuchsia-600 hover:bg-fuchsia-400 border border-fuchsia-300 rounded-full transition-all'
                    onClick={() => {
                      setMessageModal(true);
                      setTypeMessageModal('logout');
                      setTextMessageModal('Logout your session with this action');
                    }}
                  >
                    <h3 className='h-auto text-slate-200 hover:text-slate-50 text-base text-center font-light'>
                      Log out
                    </h3>
                  </button>
                </div>
              </div>
          }
        </div>
      </div>
    </div>
  )
}