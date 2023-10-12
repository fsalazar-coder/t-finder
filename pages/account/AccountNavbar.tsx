import { useEffect, useState } from 'react';
import {
  useAuth,
  useDropdown,
  useScreenNarrow,
  useAccountActived,
  useMessageModal,
  useMessageModalType,
  useMessageModalText
} from "../../context/authContext";
import { IconUser } from '@/icons/icons';

const navbarElementAuth = [
  { title: 'Dashboard', accountModule: 'Dashboard' },
  { title: 'Profile', accountModule: 'Profile' },
  { title: 'Talent Request', accountModule: 'Talent request' },
  { title: 'Job Request', accountModule: 'Job request' },
  { title: 'Notifications', accountModule: 'Notifications' }
];



export default function AccountNavbar(props: any) {

  const { auth } = useAuth();
  const { dropdown, setDropdown } = useDropdown();
  const { accountActived, setAccountActived } = useAccountActived();
  const { screenNarrow } = useScreenNarrow();
  const { setMessageModal } = useMessageModal();
  const { setMessageModalType } = useMessageModalType();
  const { setMessageModalText } = useMessageModalText();             /**navbar element to show on screen narrow */


  return (
    <div
      className='w-full lg:w-60 h-10 lg:h-full fixed flex flex-row justify-center items-center bg-slate-950 z-50'>
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
                    {accountActived}
                  </h2>
                </div>
                <i
                  className='w-7 h-7 mx-3 text-slate-50 text-base font-light flex flex-row justify-center items-center border border-slate-50 rounded-full cursor-pointer transition-all'
                  onClick={() => setDropdown(!dropdown)}
                >
                  <IconUser />
                </i>
              </div>
              :
              <div className='w-full flex flex-col justify-center items-center'>
                <div className='py-4 flex flex-col justify-center items-center'>
                  <i className='w-32 h-32 text-slate-50 text-6xl font-light flex flex-row justify-center items-center border border-slate-50 rounded-full cursor-pointer transition-all'>
                    <IconUser />
                  </i>
                </div>
                <nav className='w-full flex flex-col justify-center items-center'>
                  {
                    navbarElementAuth?.map((item: any, index: any) => {
                      return (
                        <li
                          key={index}
                          className='w-full h-auto py-2 flex flex-row justify-center items-center hover:bg-slate-900 cursor-pointer'
                          onClick={() => setAccountActived(item.accountModule)}
                        >
                          <h3 className={
                            `${accountActived === item.accountModule ?
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
                  {/**logout button */}
                  <li className='w-full h-1/2 py-20 px-8 flex flex-row justify-center items-center'>
                    <button
                      className='w-full h-full py-2 flex flex-row justify-center items-center bg-fuchsia-600 hover:bg-fuchsia-400 border border-fuchsia-300 rounded-full transition-all'
                      onClick={() => {
                        setMessageModal(true);
                        setMessageModalType('logout');
                        setMessageModalText('Logout your session with this action');
                      }}
                    >
                      <h3 className='h-auto text-slate-200 hover:text-slate-50 text-base text-center font-light'>
                        Log out
                      </h3>
                    </button>
                  </li>
                </nav>
              </div>
          }
        </div>
      </div>
    </div>
  )
}