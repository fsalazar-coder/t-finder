import { useEffect, useState } from 'react';
import { useAuth } from "../../context/authContext";
import NavbarTopSlider from './NavbarTopSlider';
import {
  IconUser,
  IconProfile,
  IconFolderUserFill,
  IconUserSearchLine,
  IconBxPowerOff
} from '@/icons/icons';
import Dropdown from './Dropdown';

const dropdownUser = [
  { icon: <IconProfile />, title: 'Profile' },
  { icon: <IconFolderUserFill />, title: 'Job Request' },
  { icon: <IconUserSearchLine />, title: 'Talent Request' }
];



export default function Navbar(props: any) {

  const { auth } = useAuth();
  const { setAuth } = useAuth();
  const [transparentBackground, setTransparentBackground] = useState(true);              /***Transparent background state: boolean***/
  const [navbarNarrowActive, setNavbarNarrowActive] = useState(false);
  const [navbarFirstUse, setNavbarFirstUse] = useState(false);
  const [dropdown, setDropdown] = useState(false);


  const screenNarrow = props.screenNarrow;
  const navbarElementText = ['Talent', 'Job', 'Blog'];

  useEffect(() => {
    const backgroundScrollHandle = () => {
      scrollY > 5 ?
        setTransparentBackground(false)
        : setTransparentBackground(true)
    }
    document.addEventListener('scroll', backgroundScrollHandle);
  });

  return (
    <>
      {/**normal navbar */}
      <div
        className={
          `${transparentBackground ?
            `${navbarFirstUse ?
              'animate-[disappear-color_0.50s_ease-out]'
              : ''} bg-transparent`
            : 'bg-slate-950 border border-slate-800 animate-[appear-color_0.50s_ease-in]'
          } w-full h-10 lg:h-12 xl:h-14 2xl:h-16 fixed flex flex-row justify-center items-center z-50`
        }>

        <div className='container w-full h-full px-2 lg:px-8 flex flex-row justify-between items-center'>

          {/**Logo (left) */}
          <div className={
            `${screenNarrow ?
              'w-2/3 sm:w-1/2'
              : `md:w-1/6`
            } h-full flex flex-row justify-start items-center z-30`
          }>
            <div className='w-full h-full text-lg flex flex-col justify-center'>
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
          </div>

          {/**Navbar (right) */}
          <div className={
            `${screenNarrow ?
              'w-1/3'
              : 'w-5/6'
            } h-full flex flex-row justify-end items-center z-30`
          }>
            <nav className={
              `${screenNarrow ?
                'w-fit flex flex-col justify-end'
                : 'w-5/6 relative'
              } h-full`
            }>
              {
                screenNarrow ?
                  /**Navbar narrow: Menu hamburguer, navbar elements hidden-visible */
                  <div
                    className='w-5 h-6 relative flex flex-col justify-center items-center transition-all'
                    onClick={() => {
                      setNavbarNarrowActive(!navbarNarrowActive);
                      setNavbarFirstUse(true);
                    }}
                  >
                    {
                      navbarNarrowActive ?
                        <>
                          <div className='w-5 h-[2px] absolute top-[4px] bg-slate-50 transform rotate-45 transition-all' />
                          <div className='w-5 h-[2px] absolute top-[4px] bg-slate-50 transform -rotate-45 transition-all' />
                          <div className='w-5 h-[2px] absolute bg-slate-50 transform scale-0 transition-all' />
                          <div className='w-5 h-[2px] absolute bottom-[17px] bg-slate-50 transform -rotate-45 transition-all' />
                          <div className='w-5 h-[2px] absolute bottom-[17px] bg-slate-50 transform rotate-45 transition-all' />
                        </>
                        :
                        <>
                          <div className='w-5 h-[2px] absolute -top-1 bg-slate-50 transition-all' />
                          <div className='w-5 h-[2px] absolute -top-1 bg-slate-50 transition-all' />
                          <div className='w-5 h-[2px] absolute top-[3px] bg-slate-50 transition-all' />
                          <div className='w-5 h-[2px] absolute bottom-3 bg-slate-50 transition-all' />
                          <div className='w-5 h-[2px] absolute bottom-3 bg-slate-50 transition-all' />
                        </>
                    }
                  </div>
                  :
                  /**Navbar wide */
                  <>
                    {/**Navbar elements***/}
                    <ul className='w-full h-full flex flex-row justify-end items-center'>
                      {
                        navbarElementText.map((elementText: string, index: any) => {
                          return (
                            <li
                              key={index}
                              className='w-fit h-fit px-2 flex flex-row justify-center items-start list-none'>
                              <h2 className='w-full h-2/3 py-1 px-8 text-slate-50 hover:text-fuchsia-600 text-sm lg:text-base xl:text-lg font-light hover:font-bold tracking-wider flex flex-row justify-center items-center cursor-pointer transition-all'>
                                {elementText}
                              </h2>
                            </li>
                          )
                        })
                      }
                      {
                        auth ?
                          <>
                            <li
                              className='relative flex-col justify-start items-start cursor-pointer'
                              onMouseEnter={() => setDropdown(true)}
                              onMouseLeave={() => setDropdown(false)}
                            >
                              <i className='w-7 h-7 text-slate-50 text-sm lg:text-base xl:text-lg font-light flex flex-row justify-center items-center border border-slate-50 rounded-full cursor-pointer transition-all'>
                                <IconUser />
                              </i>
                              {/**dropdown */}
                              {
                                dropdown ?
                                  <Dropdown
                                    imageUser={false}
                                    emailUser={auth.email}
                                    dropdownUser={dropdownUser}
                                    buttonSignout={
                                      <button
                                        className='w-full h-full flex flex-row items-center'
                                        onClick={() => {
                                          setDropdown(false);
                                          setAuth(null);
                                        }}
                                      >
                                        <h3 className='h-auto text-slate-500 hover:text-slate-600 text-xs lg:text-sm xl:text-base font-light'>
                                          Sign out
                                        </h3>
                                      </button>
                                    }
                                  />
                                  : ''
                              }
                            </li>
                          </>
                          :
                          <>
                            {/**login buttom to open modal */}
                            <li className='w-fit h-fit flex flex-row justify-center items-start list-none'>
                              <button
                                className='w-auto h-auto px-4 py-2 flex flex-row justify-center items-center transition-all z-30'
                                onClick={props.loginModalOpen}
                              >
                                <h3 className='w-full h-2/3 py-1 px-8 text-slate-50 hover:text-white text-sm lg:text-base xl:text-lg font-semibold tracking-wider flex flex-row justify-center items-center border-2 border-fuchsia-300 hover:border-fuchsia-900 rounded-full cursor-pointer transition-all'>
                                  Login
                                </h3>
                              </button>
                            </li>
                            {/**Join buttom to open modal */}
                            <li className='w-fit h-fit flex flex-row justify-center items-start list-none'>
                              <button
                                className='w-auto h-auto px-4 py-2 flex flex-row justify-center items-center transition-all z-30'
                                onClick={props.joinModalOpen}
                              >
                                <h3 className='w-full h-2/3 py-1 px-8 text-slate-50 hover:text-white text-sm lg:text-base xl:text-lg font-semibold tracking-wider flex flex-row justify-center items-center bg-fuchsia-300 hover:bg-fuchsia-900 border-2 border-fuchsia-300 hover:border-fuchsia-900 rounded-full cursor-pointer transition-all'>
                                  Join
                                </h3>
                              </button>
                            </li>
                          </>
                      }
                    </ul>
                  </>
              }
            </nav>
          </div>
        </div>
      </div>

      {/**navbar-top-slider to narrow screen: hidden-visible */}
      {
        screenNarrow ?
          <NavbarTopSlider
            navbarElementText={navbarElementText}
            screenNarrow={screenNarrow}
            navbarNarrowActive={navbarNarrowActive}
            navbarFirstUse={navbarFirstUse}
            navbarNarrowActiveFalse={() => { setNavbarNarrowActive(false) }}
            loginModalOpen={props.loginModalOpen}                                  /**props to open login modal */
            joinModalOpen={props.joinModalOpen}                                    /**props to open join modal */
          />
          : ''
      }
    </>
  )
}