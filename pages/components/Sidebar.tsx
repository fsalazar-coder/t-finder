import { useAuth } from "@/context/ContextAuth";
import { useUI } from "@/context/ContextUI";
import Link from 'next/link';

const sidebarElements: any = [
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


export default function Sidebar({ sectionActived }: any) {
  const { token, setLoginModal, setJoinModal } = useAuth();
  const { screenNarrow, sidebar, setSidebar, setHamburguerMenuActive } = useUI();

  return (
    sidebar &&
    <div className={`${screenNarrow ? 'w-36' : 'w-40'
      } h-full pt-[50px] lg:pt-[58px] fixed left-0 flex animate-[appear-left_0.5s_ease] transition-all z-40`
    }>
      <div className="w-full h-full flex flex-col justify-between bg-color-navbar border border-color-border-navbar rounded-sm">
        <ul className={`w-full h-fit flex flex-col justify-start items-start`}>
          {
            sidebarElements.map(({ title, href, linkTo }: any, index: any) => {
              return (
                <li
                  key={index}
                  className={
                    `${sectionActived === linkTo ?
                      'text-color-highlighted font-bold' :
                      'text-color-text-almost-clear hover:text-color-text-medium font-normal hover:bg-color-hover hover:cursor-pointer'
                    } w-full h-auto flex flex-row items-center`
                  }
                >
                  <Link
                    className='w-full py-2 cursor-default'
                    href={href}
                    scroll={false}
                    onClick={() => {
                      setSidebar(false);
                      setHamburguerMenuActive(false);
                    }}
                  >
                    <h3 className='w-full pr-4 text-sm lg:text-base text-end'>
                      {title}
                    </h3>
                  </Link>
                </li>
              )
            })
          }
        </ul>
        {
          (!token && screenNarrow) &&
          <ul className={`w-full h-fit flex flex-col justify-start items-start border-t border-color-border-navbar`}>
            {/**login button */}
            <ButtonAccount
              key='login-button'
              buttonType='Log in'
              icon={''}
              click={() => {
                setSidebar(false);
                setLoginModal(true);
                setHamburguerMenuActive(false);
              }}
            />
            {/**join button */}
            <ButtonAccount
              buttonType='Join'
              icon={''}
              click={() => {
                setSidebar(false);
                setJoinModal(true);
                setHamburguerMenuActive(false);
              }}
            />
          </ul>
        }
      </div>
    </div>
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

