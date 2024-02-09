import { useEffect } from "react";
import { useAuth } from "@/context/ContextAuth";
import { useUI } from "@/context/ContextUI";
import NavbarHomeElements from "./NavbarHomeElements";


export default function DropdownHome() {
  const { token, setLoginModal, setJoinModal } = useAuth();
  const { screenNarrow, dropdownHome, setDropdownHome, setHamburguerMenuActive } = useUI();

  useEffect(() => {
    if (!screenNarrow) {
      setDropdownHome(false);
      setHamburguerMenuActive(false);
    }
  },[screenNarrow, setDropdownHome, setHamburguerMenuActive])

  return (
    dropdownHome &&
    <div className='w-full flex flex-col items-center transition-all z-40'>
      <div className={`${screenNarrow ? 'border-y-[1px]' : 'border-t-[1px]'} w-full flex flex-col items-center border-color-secondary`}>
        <ul className={`container w-full py-4 pl-8 lg:pl-[3.25rem] flex flex-col`}>
          <NavbarHomeElements shouldRender={screenNarrow} />
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

