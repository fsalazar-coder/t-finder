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


export default function DropdownHome({ sectionActived }: any) {
  const { token, setLoginModal, setJoinModal } = useAuth();
  const { screenNarrow, dropdownHome, setDropdownHome, setHamburguerMenuActive } = useUI();

  return (
    dropdownHome &&
    <div className='w-full flex flex-col items-center transition-all z-40'>
      <div className={`${screenNarrow ? 'border-y' : 'border-t'} w-full flex flex-col items-center border-color-border`}>
        <ul className={`container w-full py-4 pl-8 lg:pl-[3.25rem] flex flex-col`}>
          {
            sidebarElements?.map(({ title, href, linkTo }: any, index: any) => {
              return (
                <li
                  key={index}
                  className={
                    `${sectionActived === linkTo ?
                      'text-color-highlighted font-bold' :
                      'text-color-text-almost-clear hover:text-color-text-medium font-normal'
                    } w-full h-auto flex flex-row items-center lg:hover:cursor-pointer`
                  }
                >
                  <Link
                    className='w-full py-1 cursor-default'
                    href={href}
                    scroll={false}
                    onClick={() => {
                      setDropdownHome(false);
                      setHamburguerMenuActive(false);
                    }}
                  >
                    <h3 className='text-sm lg:text-base'>
                      {title}
                    </h3>
                  </Link>
                </li>
              )
            })
          }
        </ul>
      </div>
      {
        !token && screenNarrow &&
        <ul className={`container w-full py-4 pl-8 lg:pl-[3.25rem] flex flex-col`}>
          {/**login button */}
          <ButtonAccount
            key='login-button'
            buttonType='Log in'
            icon={''}
            click={() => {
              setDropdownHome(false);
              setLoginModal(true);
              setHamburguerMenuActive(false);
            }}
          />
          {/**join button */}
          <ButtonAccount
            buttonType='Join'
            icon={''}
            click={() => {
              setDropdownHome(false);
              setJoinModal(true);
              setHamburguerMenuActive(false);
            }}
          />
        </ul>
      }
    </div>
  )
}

function ButtonAccount({ buttonType, icon, click }: any, index: any) {
  return (
    <li key={`button-${buttonType}-${index}`} className={
      `${buttonType === 'Log out' && 'py-4 justify-center hover:bg-color-hover'
      } w-full h-auto py-1 flex flex-row items-center text-color-text-almost-clear hover:text-color-text-medium lg:hover:cursor-pointer`
    }>
      <button
        className='w-full h-full flex flex-row items-center'
        onClick={() => click()}
      >
        {
          icon &&
          <i className='text-lg pl-8 pr-3'>
            {icon}
          </i>
        }
        <h3 className={`${buttonType === 'Log out' ? 'h-auto text-sm lg:text-base px-4' : 'flex text-sm lg:text-base'}`}>
          {buttonType}
        </h3>
      </button>
    </li>
  )
}

