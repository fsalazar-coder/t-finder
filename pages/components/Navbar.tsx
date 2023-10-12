import { useEffect, useState } from 'react';
import {
  useAuth,
  useDropdown,
  useScreenNarrow,
  useLoginModal,
  useJoinModal
} from "../../context/authContext";
import HamburguerMenu from './HamburguerMenu';
import { IconUser } from '@/icons/icons';



export default function Navbar(props: any) {

  const { auth } = useAuth();
  const { dropdown, setDropdown } = useDropdown();
  const { screenNarrow } = useScreenNarrow();
  const { setLoginModal } = useLoginModal();
  const { setJoinModal } = useJoinModal();
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
          } bg-transparent` :
          'bg-slate-950 border border-slate-800 animate-[appear-color_0.50s_ease-in]'
        } w-full h-10 lg:h-12 fixed flex flex-row justify-center items-center z-50`
      }>
      <div className='container w-full h-full px-0 lg:px-5 flex flex-row justify-between items-center'>
        {
          !auth ?
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
            <a className='font-bold'>
              T
            </a>
            alent-
            <a className='text-white font-bold'>
              finder
            </a>
          </h2>
        </div>
        {/**Navbar (right) */}
        <nav className='w-1/2 relative flex flex-row justify-end items-center'>
          {
            auth ?
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
                <i className='w-7 h-7 text-slate-50 text-sm lg:text-base xl:text-lg font-light flex flex-row justify-center items-center border border-slate-50 rounded-full transition-all'>
                  <IconUser />
                </i>
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
                      <h3 className='w-full h-2/3 py-1 px-8 text-slate-50 hover:text-white text-sm lg:text-base xl:text-lg font-semibold tracking-wider flex flex-row justify-center items-center border-2 border-fuchsia-300 hover:border-fuchsia-900 rounded-full cursor-pointer transition-all'>
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
                      <h3 className='w-full h-2/3 py-1 px-8 text-slate-50 hover:text-white text-sm lg:text-base xl:text-lg font-semibold tracking-wider flex flex-row justify-center items-center bg-fuchsia-300 hover:bg-fuchsia-900 border-2 border-fuchsia-300 hover:border-fuchsia-900 rounded-full cursor-pointer transition-all'>
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