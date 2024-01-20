import { useAuthData, useAuthUI, useUI } from "../../context/authContext";
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import ImageIconUser from "../account/ImageIconUser";
import { IconDashboard, IconUserTie, IconBxsBellRing, IconGear, IconHome, IconBxPowerOff, IconUserConnections, IconRequestTalent, IconRequestJob } from '@/icons/icons';

const navbarElementAuth = [
  { title: 'Dashboard', accountModule: 'Dashboard', icon: <IconDashboard /> },
  { title: 'Profile', accountModule: 'Profile', icon: <IconUserTie /> },
  { title: 'Talent request', accountModule: 'Talent', icon: <IconRequestTalent /> },
  { title: 'Job request', accountModule: 'Job', icon: <IconRequestJob /> },
  //{ title: 'Notifications', accountModule: 'Notifications', icon: <IconBxsBellRing /> },
  { title: 'Connections', accountModule: 'Connections', icon: <IconUserConnections /> },
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

  const { token, userId, userEmail, logout } = useAuthData();
  const { accountActived, setAccountActived, accountModule, setAccountModule, setChatActived } = useAuthUI();
  const { screenNarrow, dropdown, setDropdown, setHamburguerMenuActive,
    setLoginModal, setJoinModal, setMessageModal } = useUI();

  const router = useRouter();


  return (
    dropdown &&
    <ul className={
      `${!token ? screenNarrow && 'w-52 h-full left-0 animate-[appear-left_0.5s_ease]' : 'w-64 right-0 animate-[zoom-in-top_0.2s_ease]'
      } fixed top-[50px] lg:top-[58px] flex-col justify-start items-start bg-color-navbar border border-color-border-navbar rounded-sm transition-all z-40`}>
      {
        token ?
          <>
            {/**user icon-image */}
            <li className='w-full h-auto py-4 px-4 mb-4 flex flex-row items-center border-y border-color-border-navbar'>
              <div className='flex flex-row items-center'>
                <div className='w-9 h-9 flex flex-col justify-center items-center'>
                  <ImageIconUser
                    type='dropdown'
                    otherUserImageUrl={''}
                  />
                </div>
                <h5 className='text-color-text-dark pl-3 text-xs lg:text-sm xl:text-sm font-light'>
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
                    className={
                      `${accountModule === item.accountModule ?
                        'text-color-highlighted font-bold' :
                        'text-color-text-almost-clear hover:text-color-text-medium font-normal hover:bg-color-hover hover:cursor-pointer'
                      } w-full h-auto flex flex-row items-center`
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
                className='w-full h-auto flex flex-row items-center text-color-text-almost-clear hover:text-color-text-medium font-normal hover:bg-color-hover hover:cursor-pointer'
                onClick={() => {
                  setDropdown(false);
                  setAccountModule('');
                  setAccountActived(false);
                  setChatActived(false);
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
            <ButtonAccount
              key='logout-button'
              buttonType='Log out'
              icon={<IconBxPowerOff />}
              click={() => {
                setDropdown(false);
                setHamburguerMenuActive(false);
                setMessageModal([{
                  type: 'logout',
                  text: 'Logout your session with this action',
                  click: () => {
                    logout()
                    setMessageModal([])
                    router.push('/')
                  }
                }]);
              }}
            />
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
                        'text-color-highlighted font-bold' :
                        'text-color-text-almost-clear hover:text-color-text-medium font-normal hover:bg-color-hover hover:cursor-pointer'
                      } ${index === navbarElementUnauth.length - 1 && 'border-b border-color-border-navbar'} w-full h-auto flex flex-row items-center`
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
            <ButtonAccount
              key='login-button'
              buttonType='Log in'
              icon={''}
              click={() => {
                setDropdown(false);
                setLoginModal(true);
                setHamburguerMenuActive(false);
              }}
            />

            {/**join button */}
            <ButtonAccount
              buttonType='Join'
              icon={''}
              click={() => {
                setDropdown(false);
                setHamburguerMenuActive(false);
                setJoinModal(true);
              }}
            />
          </>
      }
    </ul >
  )
}

function ButtonAccount({ buttonType, icon, click }: any, index: any) {
  return (
    <li key={`button-${buttonType}-${index}`} className={
      `${buttonType === 'Log out' && 'mt-4 justify-center border-t border-color-border-navbar'
      } w-full h-auto py-4 flex flex-row items-center text-color-text-almost-clear hover:text-color-text-medium hover:bg-color-hover hover:cursor-pointer`
    }>
      <button
        className='w-full h-full flex flex-row items-center'
        onClick={() => click()}
      >
        <i className='text-lg pl-8 pr-3'>
          {icon}
        </i>
        <h3 className={
          `${buttonType === 'Log out' ?
            'h-auto text-sm lg:text-base px-4 text-start'
            : 'w-full pr-4 text-sm lg:text-base text-end'}`
        }>
          {buttonType}
        </h3>
      </button>
    </li>
  )
}

