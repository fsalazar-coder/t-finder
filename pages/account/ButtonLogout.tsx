import { useUI } from "@/context/ContextUI";
import { useAuth } from "@/context/ContextAuth";
import { IconBxPowerOff } from "@/icons/icons";

interface ButtonLogoutParams {
  type: 'navbar-account' | 'dropdown-auth';
};

interface LogoutConfigType {
  [key: string]: {
    classList: string,
    classButton: string,
    classIcon: string,
    classText: string
  };
}


export default function ButtonLogout({ type }: ButtonLogoutParams) {
  const { logout } = useAuth();
  const { setDropdownAuth, setMessageModal, setHamburguerMenuActive } = useUI();

  const handleLogout = () => {
    const actions = {
      'navbar-account': () =>
        setMessageModal([{
          type: 'logout',
          text: 'Logout your session with this action',
          click: () => {
            logout();
            setMessageModal([])
          }
        }]),
      'dropdown-auth': () => {
        setDropdownAuth(false);
        setHamburguerMenuActive(false);
        setMessageModal([{
          type: 'logout',
          text: 'Logout your session with this action',
          click: () => {
            logout();
            setMessageModal([])
          }
        }]);
      }
    };
    actions[type]();
  };

  const logoutConfigType: LogoutConfigType = {
    'navbar-account': {
      classList: '',
      classButton: 'h-14 py-2 flex-col justify-center',
      classIcon: 'text-xl lg:text-2xl',
      classText: 'text-xs text-center'
    },
    'dropdown-auth': {
      classList: 'mt-4 py-4 text-color-text-almost-clear hover:text-color-text-medium hover:bg-color-hover hover:cursor-pointer',
      classButton: 'h-full flex-row',
      classIcon: 'pl-8 pr-3 text-lg',
      classText: 'px-4 text-sm lg:text-base text-start',
    },
  };

  const logoutStyles = (type: string) => logoutConfigType[type] || {};
  const { classList, classButton, classIcon, classText } = logoutStyles(type);


  return (
    <li className={`${classList} w-full flex flex-row justify-center items-center border-t border-color-secondary transition-all`}>
      <button className={`${classButton} w-full flex items-center text-color-secondary hover:text-color--clear lg:cursor-pointer z-[70]`}
        onClick={() => handleLogout()}
      >
        <i className={`${classIcon} w-fit h-fit flex flex-col justify-center items-center`}>
          <IconBxPowerOff />
        </i>
        <h6 className={`${classText} w-fit h-fit flex`}>
          Log out
        </h6>
      </button>
    </li>
  )
};