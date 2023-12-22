import { useAuthData, useAuthUI, useUI } from "../../context/authContext";
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import ImageIconUser from "../account/ImageIconUser";
import { IconDashboard, IconUserTie, IconRequest, IconBxsBellRing, IconHelpCircle, IconGear, IconHome, IconBxPowerOff } from '@/icons/icons';

const navbarElementAuth = [
  { title: 'Dashboard', accountModule: 'Dashboard', icon: <IconDashboard /> },
  { title: 'Profile', accountModule: 'Profile', icon: <IconUserTie /> },
  { title: 'Talent request', accountModule: 'Talent', icon: <IconRequest /> },
  { title: 'Job request', accountModule: 'Job', icon: <IconRequest /> },
  { title: 'Notifications', accountModule: 'Notifications', icon: <IconBxsBellRing /> },
  { title: 'Settings', accountModule: 'Settings', icon: <IconGear /> },
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

  const { token, userEmail, logout } = useAuthData();
  const { accountActived, setAccountActived, accountModule, setAccountModule } = useAuthUI();
  const { screenNarrow, dropdown, setDropdown, setHamburguerMenuActive,
    setLoginModal, setJoinModal, setMessageModal } = useUI();

  const router = useRouter();


  return (
    dropdown &&
    <ul className={
      `${!token ?
        screenNarrow ?
          'w-52 h-full left-0 animate-[appear-left_0.5s_ease] '
          :
          ''
        :
        'w-64 right-0 animate-[appear-top_0.5s_ease]'
      } fixed top-0 pt-10 lg:pt-12 flex-col justify-start items-start bg-color-primary rounded-sm transition-all z-40`}>
      {
        token ?
          <>
            {/**user icon-image */}
            <li className='w-full h-auto py-4 px-4 mb-4 flex flex-row items-center border-y border-color-primary-clear'>
              <div className='flex flex-row items-center'>
                <div className='w-10 h-10 flex flex-col justify-center items-center'>
                  <ImageIconUser size='small' />
                </div>
                <h5 className='text-color-text-clear pl-3 text-xs lg:text-sm xl:text-sm font-light'>
                  Hello, <br /> {userEmail}
                </h5>
              </div>
            </li>
            {
              /**authenticated: dropdown options */
              navbarElementAuth.map((item: any, index: any) => {
                return (
                  screenNarrow && item.title === 'Dashboard' ? '' :
                    <li
                      key={index}
                      className={
                        `${accountModule === item.accountModule ?
                          'text-color-secondary font-semibold' :
                          'text-color-text-secondary hover:text-color-text-clear font-normal'
                        } w-full h-auto flex flex-row items-center hover:bg-color-primary-clear hover:cursor-pointer`
                      }
                      onClick={() => {
                        setDropdown(false);
                        setAccountActived(true);
                        setAccountModule(item.accountModule);
                        router.push('/Account')
                      }}
                    >
                      <i className='text-base pl-8 pr-3'>
                        {item.icon}
                      </i>
                      <h3 className='py-2 px-4 text-sm lg:text-base text-start'>
                        {item?.title}
                      </h3>
                    </li>
                )
              })
            }
            {
              accountActived &&
              <li
                key='home-link'
                className='w-full h-auto flex flex-row items-center text-color-text-secondary hover:text-color-text-clear font-normal hover:bg-color-primary-clear hover:cursor-pointer'
                onClick={() => {
                  setDropdown(false);
                  setAccountModule('');
                  setAccountActived(false);
                  router.push('/');
                }}
              >
                <i className='pl-8 pr-3'>
                  <IconHome />
                </i>
                <h3 className='py-2 px-4 text-sm lg:text-base text-start'>
                  Home
                </h3>
              </li>
            }
            {/**logout button */}
            <li className='w-full h-auto mt-4 py-4 flex flex-row justify-center items-center text-color-text-secondary hover:text-color-text-clear font-normal hover:bg-color-primary-clear hover:cursor-pointer border-t border-color-primary-clear'>
              <button
                className='w-full h-full flex flex-row items-center'
                onClick={() => {
                  setDropdown(false);
                  setHamburguerMenuActive(false);
                  setMessageModal([{
                    type: 'logout',
                    text: 'Logout your session with this action',
                    click: () => {
                      logout()
                      setAccountActived(false)
                      setAccountModule('')
                      setMessageModal([])
                      router.push('/')
                    }
                  }]);
                }}
              >
                <i className='text-lg pl-8 pr-3'>
                  <IconBxPowerOff />
                </i>
                <h3 className='h-auto text-sm lg:text-base px-4 text-start'>
                  Log out
                </h3>
              </button>
            </li>
          </>
          :
          <>
            <div className="w-full h-1 mb-2 border-t border-color-primary-clear" />
            {
              navbarElementUnauth.map((element: any, index: any) => {
                return (
                  <li
                    key={index}
                    className={
                      `${props.sectionActived === element.linkTo ?
                        'text-color-secondary font-semibold' :
                        'text-color-text-secondary hover:text-color-text-clear font-normal'
                      } w-full h-auto flex flex-row items-center hover:bg-color-primary-clear hover:cursor-pointer`
                    }
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
                      <h3 className='w-full pr-4 text-sm lg:text-base text-end'>
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
              className='w-full h-auto mt-4 pt-4 py-2 flex flex-row items-center text-color-text-secondary hover:text-color-clear hover:bg-color-primary-clear border-t border-color-primary-clear'
              onClick={() => {
                setDropdown(false);
                setHamburguerMenuActive(false);
                setLoginModal(true);
              }}>
              <h3 className='w-full pr-4 text-sm lg:text-base text-end'>
                Log in
              </h3>
            </li>
            {/**join button */}
            <li
              key='join-button'
              className='w-full h-auto py-2 flex flex-row items-center text-color-text-secondary hover:text-color-clear hover:bg-color-primary-clear'
              onClick={() => {
                setDropdown(false);
                setHamburguerMenuActive(false);
                setJoinModal(true);
              }}>
              <h3 className='w-full pr-4 text-sm lg:text-base text-end'>
                Join
              </h3>
            </li>
          </>
      }
    </ul>
  )
}