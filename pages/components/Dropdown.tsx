import { useAuthData, useAuthUI, useUI } from "../../context/authContext";
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import ImageIconUser from "../account/ImageIconUser";

const navbarElementAuth = [
  { title: 'Dashboard', accountModule: 'Dashboard' },
  { title: 'Profile', accountModule: 'Profile' },
  { title: 'Request', accountModule: 'Request' },
  { title: 'Notifications', accountModule: 'Notifications' },
  { title: 'Account Settings', accountModule: 'Account Settings' },
  { title: 'Help & Support', accountModule: 'Help & Support' }
];

const navbarElementUnauth = [
  {
    title: 'Home', href: '#header-section', linkTo: 'header-section'
  },
  {
    title: 'Recruit', href: '#recruit-section', linkTo: 'recruit-section'
  },
  {
    title: 'Job', href: '#job-section', linkTo: 'job-section'
  },
  {
    title: 'Testimonials', href: '#testimonials-section', linkTo: 'testimonials-section'
  },
  {
    title: 'Blog', href: '#blog-section', linkTo: 'blog-section'
  },
  {
    title: 'Contact', href: '#footer-section', linkTo: 'footer-section'
  },
];



export default function Dropdown(props: any) {

  const { token, userEmail } = useAuthData();
  
  const {
    accountActived, setAccountActived,
    accountModule, setAccountModule
  } = useAuthUI();
  
  const {
    screenNarrow,
    dropdown, setDropdown,
    setHamburguerMenuActive,
    setLoginModal,
    setJoinModal,
    setMessageModal,
    setTypeMessageModal,
    setTextMessageModal
  } = useUI();
  
  const router = useRouter();


  return (
    dropdown ?
      <ul className={
        `${!token ?
          screenNarrow ?
            'w-52 h-full left-0 animate-[appear-left_0.5s_ease] '
            :
            ''
          :
          'w-64 right-0 animate-[appear-top_0.5s_ease]'
        } fixed top-0 pt-10 lg:pt-12 py-4 flex-col justify-start items-start bg-slate-950 rounded-sm transition-all z-40`}>
        {
          token ?
            <>
              {/**user icon-image */}
              <li className='w-full h-auto py-4 px-4 mb-4 flex flex-row items-center border-y border-slate-900'>
                <div className='flex flex-row items-center'>
                  <div className='w-10 h-10 flex flex-col justify-center items-center'>
                    <ImageIconUser size='small' />
                  </div>
                  <h5 className='text-white pl-3 text-xs lg:text-sm xl:text-sm font-light'>
                    Hello, <br /> {userEmail}
                  </h5>
                </div>
              </li>
              {
                /**authenticated: dropdown options */
                navbarElementAuth.map((item: any, index: any) => {
                  return (
                    <li
                      key={index}
                      className='w-full h-auto flex flex-row items-center hover:bg-slate-900'
                      onClick={() => {
                        setDropdown(false);
                        setAccountActived(true);
                        setAccountModule(item.accountModule);
                        router.push('/Account')
                      }}
                    >
                      <h3 className={
                        `${accountModule === item.accountModule ?
                          'text-fuchsia-600 font-semibold' :
                          'text-slate-500 hover:text-white font-normal'
                        } py-2 px-4 text-sm lg:text-base text-start`
                      }
                      >
                        {item?.title}
                      </h3>
                    </li>
                  )
                })
              }
              {
                accountActived ?
                  <li
                    key='home-link'
                    className='w-full h-auto flex flex-row items-center hover:bg-slate-900'
                    onClick={() => {
                      setDropdown(false);
                      setAccountModule('');
                      setAccountActived(false);
                      router.push('/');
                    }}
                  >
                    <h3 className='py-2 px-4 text-slate-500 hover:text-white font-normal text-sm lg:text-base text-start'>
                      Home
                    </h3>
                  </li>
                  :
                  ''
              }
              {/**logout button */}
              <li className='w-full h-auto mt-4 py-4 px-4 flex flex-row justify-center items-center hover:bg-slate-900 border-t border-slate-900'>
                <button
                  className='w-full h-full flex flex-row items-center'
                  onClick={() => {
                    setDropdown(false);
                    setHamburguerMenuActive(false);
                    setMessageModal(true);
                    setTypeMessageModal('logout');
                    setTextMessageModal('Logout your session with this action');
                  }}
                >
                  <h3 className='h-auto text-slate-500 hover:text-white text-sm lg:text-base font-light'>
                    Log out
                  </h3>
                </button>
              </li>
            </>
            :
            <>
              <div className="w-full h-1 mb-2 border-t border-slate-900" />
              {
                navbarElementUnauth.map((element: any, index: any) => {
                  return (
                    <li
                      key={index}
                      className='w-full h-auto flex flex-row items-center hover:bg-slate-900'
                    >
                      <Link
                        className='w-full py-2 cursor-default'
                        href={element.href}
                        scroll={false}
                        onClick={() => {
                          setDropdown(false);
                          setHamburguerMenuActive(false);
                        }}
                      >
                        <h3 className={
                          `${props.sectionActived === element.linkTo ?
                            'text-fuchsia-600 font-semibold' :
                            'text-slate-500 hover:text-white font-normal'
                          } w-full pr-4 text-sm lg:text-base text-end`
                        }
                        >
                          {element?.title}
                        </h3>
                      </Link>
                    </li>
                  )
                })
              }
              {/**login button */}
              <li
                key='login-button'
                className='w-full h-auto mt-4 pt-4 py-2 flex flex-row items-center hover:bg-slate-900 border-t border-slate-900'
                onClick={() => {
                  setDropdown(false);
                  setHamburguerMenuActive(false);
                  setLoginModal(true);
                }}>
                <h3 className='w-full pr-4 text-slate-300 hover:text-white text-sm lg:text-base text-end font-light'>
                  Log in
                </h3>
              </li>
              {/**join button */}
              <li
                key='join-button'
                className='w-full h-auto py-2 flex flex-row items-center hover:bg-slate-900'
                onClick={() => {
                  setDropdown(false);
                  setHamburguerMenuActive(false);
                  setJoinModal(true);
                }}>
                <h3 className='w-full pr-4 text-slate-300 hover:text-white text-sm lg:text-base text-end font-light'>
                  Join
                </h3>
              </li>
            </>
        }
      </ul>
      : ''
  )
}