import { useUI } from '@/context/ContextUI';
import { useAuth } from '@/context/ContextAuth';
import ImageIconUser from '../account/ImageIconUser';
import HamburguerMenu from './HamburguerMenu';
import NavbarHomeElements from './NavbarHomeElements';
import ButtonsConnectionNotification from './ButtonsConnectionNotification';
import ButtonsLoginJoin from './ButtonsLoginJoin';


export default function Navbar() {
  const { token } = useAuth();
  const { screenNarrow, dropdownAuth, setDropdownAuth, setHamburguerMenuActive, sectionHomeActived, setSectionHomeActived } = useUI();
  const isHeaderActived: boolean = sectionHomeActived === 'header-section';

  const handleClickProfileImage = () => {
    setDropdownAuth(!dropdownAuth)
    setHamburguerMenuActive(false);
  }

  return (
    <div className={`${!isHeaderActived && 'bg-color-secondary-dark'
      } w-full h-14 fixed top-0 flex flex-col items-center transition-all z-50`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className='w-full h-full relative flex justify-center'>
        <div className={`container w-full h-14 px-0 md:px-5 flex flex-row justify-between items-center`}>
          <HamburguerMenu shouldRender={screenNarrow} />
          <Logo />
          <nav className='w-2/3 flex flex-row justify-end items-center'>
            <NavbarHomeElements />
            <ButtonsLoginJoin shouldRender={!token && !screenNarrow} />
            <ButtonsConnectionNotification shouldRender={token} />
            <ProfileImage shouldRender={token} />
            <DropdownIndicator shouldRender={token} />
          </nav>
        </div>
      </div>
    </div>
  )
};

const Logo = () => {
  const { setHamburguerMenuActive, setSectionHomeActived } = useUI();
  return (
    <div className='w-1/2 h-full flex flex-row justify-start items-center z-50'>
      <div className='text-lg text-color-secondary-clear font-normal'
        onClick={() => {
          setHamburguerMenuActive(false);
          setSectionHomeActived('header-section')
        }}>
        <a className='font-bold text-color-text-secondary'>T</a>alent-
        <a className='text-color-text-secondary font-semibold'>finder</a>
      </div>
    </div>
  )
};

const ProfileImage = ({ shouldRender }: any) => {
  const { screenNarrow } = useUI();

  return (
    shouldRender &&
    <div className={`${screenNarrow ? 'cursor-default' : 'justify-center items-center cursor-pointer'} relative flex flex-col z-50`}>
      <div className={`${screenNarrow ? 'w-6 h-6' : 'w-[26px] h-[26px]'} flex justify-center items-center`}>
        <ImageIconUser type='navbar-home' otherUserImageUrl={'none'} />
      </div>
    </div>
  )
}

const DropdownIndicator = ({ shouldRender }: any) => {
  const { dropdownAuth, setDropdownAuth } = useUI();

  return (
    shouldRender &&
    <div className={`${dropdownAuth ? 'pt-1' : 'pt-0'} h-full pl-1 flex flex-col justify-center lg:hover:cursor-pointer z-40`}
      onClick={() => setDropdownAuth(!dropdownAuth)}>
      <div className={`${dropdownAuth ? '-rotate-[135deg]' : 'rotate-45'} w-2 h-2 border-r-2 border-b-2 border-color-secondary-clear transform transition-all`} />
    </div>
  )
};
