import { useEffect, useState } from 'react';
import { useAuth } from "../../context/authContext";
import { IconUser } from '@/icons/icons';
import Dropdown from './Dropdown';

const navbarElement = [
  { title: 'Account', href: '/Account' },
  { title: 'Profile', href: '' },
  { title: 'Job Request', href: '' },
  { title: 'Talent Request', href: '' },
  { title: 'Notifications', href: '' }
];



export default function AccountNavbar(props: any) {

  const { auth } = useAuth();
  const { setAuth } = useAuth();
  const [dropdown, setDropdown] = useState(false);
  const screenNarrow = props.screenNarrow;

  return (
    <div
      className='w-full lg:w-1/6 h-auto lg:h-full fixed flex flex-row justify-center items-center bg-slate-950 z-50'>
      <div className='container w-full h-auto lg:h-full px-0 py-2 lg:py-0 flex flex-row lg:flex-col justify-between lg:justify-start items-center'>
        {/**Logo */}
        <div className='lg:w-full flex flex-row justify-start items-center z-30'>
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
        <div className='lg:w-full flex flex-row justify-center items-center lg:flex-col lg:justify-start lg:items-center z-30'>
          {
            screenNarrow ?
              <div
                className='relative flex flex-col justify-start items-start cursor-pointer'
                onMouseEnter={() => setDropdown(true)}
                onMouseLeave={() => setDropdown(false)}
              >
                <i className='w-7 h-7 text-slate-50 text-base font-light flex flex-row justify-center items-center border border-slate-50 rounded-full cursor-pointer transition-all'>
                  <IconUser />
                </i>
                {/**dropdown */}
                {
                  dropdown ?
                    <Dropdown
                      imageUser={false}
                      emailUser={auth?.email}
                      navbarElement={navbarElement}
                      buttonLogout={(e: any) => {
                        setDropdown(false);
                        props.messageLogout('Logout your session with this action');
                      }}
                    />
                    : ''
                }
              </div>
              :
              <div className='w-full flex flex-col justify-start items-center'>
                <div className='py-6 flex flex-col justify-center items-center'>
                  <i className='w-32 h-32 text-slate-50 text-6xl font-light flex flex-row justify-center items-center border border-slate-50 rounded-full cursor-pointer transition-all'>
                    <IconUser />
                  </i>
                </div>
                <nav className='w-full flex flex-col justify-start items-center'>
                  {
                    navbarElement?.map((item: any, index: any) => {
                      return (
                        <li
                          key={index}
                          className='w-full h-auto py-2 px-4 flex flex-row items-center hover:bg-fuchsia-900 cursor-pointer'>
                          <h3 className='text-slate-200 hover:text-slate-50 text-base font-light'>
                            {item?.title}
                          </h3>
                        </li>
                      )
                    })
                  }
                  {/**logout button */}
                  <li className='w-full h-auto py-2 px-4 flex flex-row justify-center items-center hover:bg-fuchsia-900 cursor-pointer'>
                    <button
                      className='w-full h-full flex flex-row items-center'
                      onClick={(e: any) => {
                        props.messageLogout('Logout your session with this action');
                      }}
                    >
                      <h3 className='h-auto text-slate-200 hover:text-slate-50 text-base font-light'>
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