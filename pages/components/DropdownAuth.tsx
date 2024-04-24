import { useUI } from "@/context/ContextUI";
import { useAuth } from "@/context/ContextAuth";
import { useAuthData } from "@/context/ContextAuthData";
import ButtonLogout from "../account/ButtonLogout";
import ImageIconUser from "../account/ImageIconUser";
import { IconDashboard, IconUserTie, IconHome, IconRequestJob, IconUserSearchFilled } from '@/icons/icons';

interface DropdownElement {
  key: string;
  title: string;
  value: string;
  icon: JSX.Element;
  renderCondition: boolean;
}

interface ProfileImageDropdownProps {
  userName: string | null;
}

interface DropdownElementsProps {
  dropdownElements: DropdownElement[];
}


export default function DropdownAuth() {
  const { token, userEmail } = useAuth();
  const { userProfileData } = useAuthData();
  const { screenNarrow, dropdownAuth, setDropdownAuth, accountActived } = useUI();
  const dropdownElements: DropdownElement[] = [
    { key: 'dropdown-link-dashboard', title: 'Dashboard', value: 'Dashboard', icon: <IconDashboard />, renderCondition: true },
    { key: 'dropdown-link-profile', title: 'Profile', value: 'Profile', icon: <IconUserTie />, renderCondition: true },
    { key: 'dropdown-link-talent-request', title: 'Talent request', value: 'Talent', icon: <IconUserSearchFilled />, renderCondition: true },
    { key: 'dropdown-link-job-request', title: 'Job request', value: 'Job', icon: <IconRequestJob />, renderCondition: true },
    { key: 'dropdown-link-home', title: 'Home', value: 'Home', icon: <IconHome />, renderCondition: accountActived },
  ];
  const nameProfile: any = userProfileData?.personalInfo[0]?.full_name;
  const userName: string = nameProfile ? nameProfile : userEmail;

  return (
    token && dropdownAuth &&
    <div className="w-full h-full fixed top-[58px] right-0 flex flex-row justify-center z-[80]"
      onClick={() => setDropdownAuth(false)}
    >
      <div className={`${accountActived ? 'px-5' : 'container'} w-full px-0 lg:px-5 flex flex-row justify-end`}>
        <ul className={`${screenNarrow ? 'w-52' : 'w-60'
          } h-fit animate-[zoom-in-top_0.2s_ease] flex-col justify-start items-start bg-color-navbar border border-color-border rounded-md transition-all z-50`
        } onClick={(e) => e.stopPropagation()}
        >
          <ProfileImageDropdown userName={userName} />
          <DropdownElements dropdownElements={dropdownElements} />
          <ButtonLogout type='dropdown-auth' />
        </ul>
      </div>
    </div>
  )
}

const ProfileImageDropdown: React.FC<ProfileImageDropdownProps> = ({ userName }) => {
  return (
    <li className='w-full h-auto py-4 px-4 mb-4 flex flex-row items-center border-b border-color-border'>
      <div className='flex flex-row items-center'>
        <div className='w-9 h-9 flex flex-col justify-center items-center'>
          <ImageIconUser
            type='dropdown-auth'
            otherUserImageUrl={'none'}
          />
        </div>
        <h5 className='text-color-text-dark pl-3 text-xs lg:text-sm xl:text-sm font-light'>
          Hello, <br /> {userName}
        </h5>
      </div>
    </li>
  )
};

const DropdownElements: React.FC<DropdownElementsProps> = ({ dropdownElements }) => {
  const { setDropdownAuth } = useUI();
  const { accountModule, setAccountActived, setAccountModule } = useUI();

  return (
    dropdownElements.map(({ key, title, value, icon, renderCondition }: any) => {
      let isAccountModuleValue: boolean = accountModule === value;
      return (
        renderCondition &&
        <li
          key={key}
          className={
            `${isAccountModuleValue ?
              'text-color-highlighted font-bold' :
              'text-color-text-almost-clear hover:text-color-secondary font-normal hover:bg-color-hover hover:cursor-pointer'
            } w-full h-auto flex flex-row items-center`
          }
          onClick={() => {
            setDropdownAuth(false);
            setAccountActived(value === 'Home' ? false : true);
            setAccountModule(value === 'Home' ? '' : value);
          }}
        >
          <i className='text-base pl-8 pr-3'>
            {icon}
          </i>
          <h3 className='py-2 px-4 text-sm lg:text-base text-start'>
            {title}
          </h3>
        </li>
      )
    })
  )
}

