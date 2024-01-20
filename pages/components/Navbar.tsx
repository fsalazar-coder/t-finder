import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthData, useAuthUI, useUI } from "../../context/authContext";
import HamburguerMenu from './HamburguerMenu';
import ImageIconUser from '../account/ImageIconUser';
import { IconBxChevronUp, IconBxsBellRing, IconMessageNotification } from '@/icons/icons';
import UnreadNotificationIcon from '../account/UnreadNotificationIcon';



export default function Navbar() {

  const { token, unreadMessages } = useAuthData();
  const { setAccountActived, setAccountModule } = useAuthUI();
  const { screenNarrow, dropdown, setDropdown, setLoginModal, setJoinModal } = useUI();
  const [transparentBackground, setTransparentBackground] = useState(true);              /***Transparent background state: boolean***/
  const [navbarFirstUse, setNavbarFirstUse] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const backgroundScrollHandle = () => {
      scrollY > 5 ?
        setTransparentBackground(false)
        : setTransparentBackground(true)
    }
    document.addEventListener('scroll', backgroundScrollHandle);
  });


  return (
    <div
      className={
        `${transparentBackground ? navbarFirstUse ? 'animate-[disappear-color_0.50s_ease-out]'
          : 'bg-white border-color-navbar' : 'bg-color-navbar border-color-border-navbar'     // bg-transparent
        } w-full h-12 lg:h-14 fixed flex flex-row justify-center items-center border-b transition-colors z-50`
      }>
      <div className='container w-full h-full px-0 lg:px-5 flex flex-row justify-between items-center'>
        {
          !token ?
            screenNarrow ?
              /**unauthenticated: navbar narrow, menu hamburguer */
              <div className='relative transition-all z-50'>
                <HamburguerMenu />
              </div>
              :
              ''
            :
            ''
        }
        {/**Logo (left) */}
        <div className='w-1/2 h-full flex flex-row justify-start items-center'>
          <h2 className='text-lg text-color-highlighted-clear font-normal'>
            <a className='font-bold text-color-text-highlighted'>
              T
            </a>
            alent-
            <a className='text-color-text-highlighted font-semibold'>
              finder
            </a>
          </h2>
        </div>
        {/**Navbar (right) */}
        <nav className='w-1/2 relative flex flex-row justify-end items-center'>
          {
            token ?
              <div className='w-full h-full flex flex-row justify-end'>
                <UnreadNotificationIcon
                  icon={<IconMessageNotification />}
                  textDescription={'Messages'}
                  value={unreadMessages}
                  goClick={() => {
                    setAccountActived(true);
                    setAccountModule('Connections');
                    router.push('/Account');
                  }}
                />
                <UnreadNotificationIcon
                  icon={<IconBxsBellRing />}
                  textDescription={'Notifications'}
                  value={2}
                  goClick={() => {
                    setAccountActived(true);
                    setAccountModule('Notifications');
                    router.push('/Account');
                  }}
                />
                <div
                  className={
                    `${screenNarrow ?
                      'cursor-default' :
                      'cursor-pointer'
                    } relative flex flex-col items-center z-50`
                  }
                  onClick={() => setDropdown(!dropdown)}
                >
                  <div className={`${screenNarrow ? 'w-5 h-5' : 'w-[26px] h-[26px]'} flex flex-col justify-center items-center`}>
                    <ImageIconUser
                      type='navbar'
                      otherUserImageUrl={''}
                    />
                  </div>
                  <i className={`${!dropdown && 'rotate-180'} w-full h-fit text-color-text-almost-clear hover:text-color-highlighted-clear text-base flex flex-col justify-center items-center transform transition-all`}>
                    <IconBxChevronUp />
                  </i>
                </div>
              </div>
              :
              screenNarrow ?
                '' :
                /**unauthenticated: navbar wide, login and join button */
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
          }
        </nav>
      </div>
    </div>
  )
}