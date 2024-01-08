import { useEffect, useState } from 'react';
import { useAuthData, useUI } from "../../context/authContext";
import HamburguerMenu from './HamburguerMenu';
import ImageIconUser from '../account/ImageIconUser';



export default function Navbar() {

  const { token, userId } = useAuthData();
  const {
    screenNarrow,
    dropdown, setDropdown,
    setLoginModal,
    setJoinModal
  } = useUI();
  const [transparentBackground, setTransparentBackground] = useState(true);              /***Transparent background state: boolean***/
  const [navbarFirstUse, setNavbarFirstUse] = useState(false);


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
        `${transparentBackground ?
          `${navbarFirstUse ?
            'animate-[disappear-color_0.50s_ease-out]' :
            ''
          } bg-transparent border-slate-200 ` :
          'bg-color-navbar border-color-border-navbar'
        } w-full h-10 lg:h-12 fixed flex flex-row justify-center items-center border-b transition-colors z-50`
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
          <h2 className='text-lg text-white font-light'>
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
              /**authenticated: Icon-image user*/
              <div
                className={
                  `${screenNarrow ?
                    'px-2 cursor-default' :
                    'cursor-pointer'
                  } relative flex flex-col justify-center items-center z-50`
                }
                onClick={() => setDropdown(!dropdown)}
              >
                <div className='w-9 h-9 flex flex-col justify-center items-center'>
                  <ImageIconUser
                    type='navbar'
                    toUserId={userId as string}
                  />
                </div>
              </div>
              :
              screenNarrow ?
                '' :
                /**unauthenticated: navbar wide, login and join button */
                <ul className='h-full flex flex-row justify-center items-center'>
                  {/**login butto to open modal */}
                  <li className='w-fit h-fit flex flex-row justify-center items-start list-none'>
                    <button
                      className='w-auto h-auto px-4 py-2 flex flex-row justify-center items-center transition-all z-30'
                      onClick={() => setLoginModal(true)}
                    >
                      <h3 className='w-full h-2/3 py-1 px-8 text-color-highlighted-clear hover:text-color-highlighted text-sm lg:text-base xl:text-lg font-semibold tracking-wider flex flex-row justify-center items-center border-2 border-color-highlighted-clear hover:border-color-highlighted rounded-full cursor-pointer transition-all'>
                        Login
                      </h3>
                    </button>
                  </li>
                  {/**Join butto to open modal */}
                  <li className='w-fit h-fit flex flex-row justify-center items-start list-none'>
                    <button
                      className='w-auto h-auto px-4 py-2 flex flex-row justify-center items-center transition-all z-30'
                      onClick={() => setJoinModal(true)}
                    >
                      <h3 className='w-full h-2/3 py-1 px-8 text-slate-50 hover:text-white text-sm lg:text-base xl:text-lg font-semibold tracking-wider flex flex-row justify-center items-center bg-color-highlighted-clear hover:bg-color-highlighted border-2 border-color-highlighted-clear hover:border-color-highlighted rounded-full cursor-pointer transition-all'>
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