import {
  useAuth,
  useDropdown,
  useHamburguerMenuActive,
  useLoginModal,
  useJoinModal,
  useAccountActived,
  useMessageModal,
  useMessageModalType,
  useMessageModalText
} from "../../context/authContext";
import { IconUser } from '@/icons/icons';
import Link from 'next/link';

const navbarElementAuth = [
  { title: 'Dashboard', accountModule: 'dashboard' },
  { title: 'Profile', accountModule: 'profile' },
  { title: 'Talent Request', accountModule: 'talent-request' },
  { title: 'Job Request', accountModule: 'job-request' },
  { title: 'Notifications', accountModule: 'notifications' }
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

  const { auth, setAuth } = useAuth();
  const { dropdown, setDropdown } = useDropdown();
  const { setHamburguerMenuActive } = useHamburguerMenuActive();
  const { setLoginModal } = useLoginModal();
  const { setJoinModal } = useJoinModal();
  const { accountActived, setAccountActived } = useAccountActived();
  const { setMessageModal } = useMessageModal();
  const { setMessageModalType } = useMessageModalType();
  const { setMessageModalText } = useMessageModalText();

  return (
    dropdown ?
      <ul className={
        `${!auth ?
          props.screenNarrow ?
            'w-52 h-full left-0'
            :
            ''
          :
          'w-64 right-0'

        } fixed top-0 pt-10 lg:pt-12 py-4 flex-col justify-start items-start bg-slate-950 rounded-sm transition-all z-40`}>
        {
          auth ?
            <>
              {/**user icon-image */}
              <li className='w-full h-auto py-4 px-4 mb-4 flex flex-row items-center border-y border-slate-900'>
                <div className='flex flex-row items-center'>
                  {
                    props.imageUser ?
                      props.imageUser
                      :
                      <i className='w-10 h-10 text-white text-sm lg:text-base xl:text-lg font-light flex flex-row justify-center items-center border border-white rounded-full transition-all'>
                        <IconUser />
                      </i>
                  }
                  <h5 className='text-white pl-3 text-xs lg:text-sm xl:text-sm font-light'>
                    Hello, <br /> {auth?.email}
                  </h5>
                </div>
              </li>
              {
                /**authenticated: dropdown options */
                navbarElementAuth.map((item: any, index: any) => {
                  return (
                    <li
                      key={index}
                      className='w-full h-auto flex flex-row items-center hover:bg-slate-900'>
                      <Link
                        className='w-full py-2 px-4'
                        href='/account/Account'
                        scroll={false}
                        onClick={() => {
                          setDropdown(false);
                          setHamburguerMenuActive(false);
                          setAccountActived(item.accountModule);
                        }}
                      >
                        <h3 className={
                          `${accountActived === item.accountModule ?
                            'text-fuchsia-600 font-semibold' :
                            'text-slate-500 hover:text-white font-normal'
                          } text-sm lg:text-base text-center`
                        }
                        >
                          {item?.title}
                        </h3>
                      </Link>
                    </li>
                  )
                })
              }
              {/**logout button */}
              <li className='w-full h-auto mt-4 py-4 px-4 flex flex-row justify-center items-center hover:bg-slate-900 border-t border-slate-900'>
                <button
                  className='w-full h-full flex flex-row items-center'
                  onClick={() => {
                    setDropdown(false);
                    setHamburguerMenuActive(false);
                    setMessageModal(true);
                    setMessageModalType('logout');
                    setMessageModalText('Logout your session with this action');
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
                      key={element.index}
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
                        <h3 className='w-full pr-4 text-slate-300 hover:text-white text-sm lg:text-base font-light text-end'>
                          {element.title}
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