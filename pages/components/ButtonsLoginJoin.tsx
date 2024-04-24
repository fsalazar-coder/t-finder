import { useUI } from '@/context/ContextUI';
import { useAuth } from '@/context/ContextAuth';

interface ButtonsConfig {
  classList: string;
  classButton: string;
  classText: string;
};

interface ButtonProps {
  type: string;
  label: string;
  buttonsConfig: ButtonsConfig;
  onClick: () => void;
};

const buttonsConfig: Record<string, ButtonsConfig> = {
  narrow: {
    classList: 'w-full h-auto py-1 flex flex-row items-center text-color-text-almost-clear hover:text-color-text-medium lg:hover:cursor-pointer',
    classButton: 'w-full h-full flex flex-row items-center',
    classText: 'flex text-sm lg:text-base',
  },
  login: {
    classList: 'flex flex-row justify-center items-start list-none',
    classButton: 'w-full flex flex-row justify-center items-center cursor-pointer transition-all z-30',
    classText: 'py-1 px-6 text-white hover:text-color-secondary-clear text-sm lg:text-base font-bold tracking-wider flex flex-row justify-center items-center transition-all',
  },
  join: {
    classList: 'flex flex-row justify-center items-start list-none',
    classButton: 'py-1 px-6 flex flex-row justify-center items-center bg-color-secondary hover:bg-color-secondary-clear border-[1px] border-white rounded-full cursor-pointer transition-all z-30',
    classText: 'w-fit text-white hover:text-white text-sm lg:text-base font-bold tracking-wider flex transition-all',
  },
};


export default function ButtonLoginJoin({ shouldRender }: { shouldRender: boolean }) {
  const { setLoginModal, setJoinModal } = useAuth();
  const { screenNarrow, setHamburguerMenuActive } = useUI();

  const handleButtonClick = (type: 'login' | 'join') => () => {
    type === 'login' ? setLoginModal(true) : setJoinModal(true);
    screenNarrow && setHamburguerMenuActive(false);
  };

  if (!shouldRender) return null;


  return (
    <ul className={`${screenNarrow ? 'container w-full py-4 pl-8 flex-col' : 'w-fit flex-row justify-between items-center'} flex`}>
      {
        [{ type: 'login', label: 'Login' }, { type: 'join', label: 'Join' }].map(({ type, label }: { type: string, label: string }) => (
          <Buttons
            key={type}
            type={type}
            label={label}
            buttonsConfig={screenNarrow ? buttonsConfig['narrow'] : buttonsConfig[type]}
            onClick={handleButtonClick(type as 'login' | 'join')} />
        ))
      }
    </ul>
  )
};

function Buttons({ type, label, buttonsConfig, onClick }: ButtonProps) {
  const { screenNarrow } = useUI();
  const { classList, classButton, classText } = buttonsConfig;

  return (
    <li key={`button-${type}-${screenNarrow ? 'narrow' : 'large'}`} className={`${classList}`}>
      <button className={classButton} onClick={onClick}>
        <h3 className={`${classText}`}>
          {label}
        </h3>
      </button>
    </li>
  )
}