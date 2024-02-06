import { useEffect, useState } from 'react';
import { useUI } from '@/context/ContextUI';
import { useAuthData } from '@/context/ContextAuthData';

interface ModalConfigType {
  [key: string]: {
    title: string;
    textButton: string;
    strokeColor: string;
    buttonColor: string;
  };
}


export default function MessageModal() {
  const { messageModal, setMessageModal } = useUI();
  const { collectionToChange, setCollectionToChange } = useAuthData();
  const [animationState, setAnimationState] = useState({ circle: false, symbol: false, circleGrow: false });
  const [animationStep, setAnimationStep] = useState(0); // 0: ninguna, 1: circle, 2: symbol
  const { type, text, click } = messageModal[0] || {};
  const isCancelButton: boolean = type === 'question' || type === 'delete' || type === 'logout';
  const modalActived: boolean = messageModal.length > 0;

  const modalConfig: ModalConfigType = {
    'successful': {
      title: 'Successful',
      textButton: 'Ok',
      strokeColor: 'stroke-emerald-400',
      buttonColor: 'bg-emerald-500 lg:bg-emerald-500 lg:hover:bg-emerald-400'
    },
    'error': {
      title: 'Error',
      textButton: 'Try again',
      strokeColor: 'stroke-red-400',
      buttonColor: 'w-full bg-red-500 lg:bg-red-500 lg:hover:bg-red-400'
    },
    'question': {
      title: 'Are you sure?',
      textButton: 'I agree',
      strokeColor: 'stroke-color-highlighted-clear',
      buttonColor: 'bg-color-highlighted lg:hover:bg-color-highlighted-clear'
    },
    'delete': {
      title: 'Are you sure?',
      textButton: 'Delete',
      strokeColor: 'stroke-red-500',
      buttonColor: 'bg-red-500 lg:bg-red-500 lg:hover:bg-red-400'
    },
    'logout': {
      title: 'Are you sure?',
      textButton: 'Logout',
      strokeColor: 'stroke-color-highlighted',
      buttonColor: 'bg-color-highlighted lg:hover:bg-color-highlighted-clear'
    },
  };

  const getModalStyles = (type: string) => modalConfig[type] || {};
  const { title, textButton, strokeColor, buttonColor } = getModalStyles(type);

  useEffect(() => {
    if (modalActived) {
      setAnimationStep(1);                  // Inicia la animación del círculo primero
      animationStep === 1 && setAnimationState({ ...animationState, circle: true });

      const timer = setTimeout(() => {      // Espera a que termine la animación del círculo para iniciar la del símbolo
        setAnimationStep(2);
        animationStep === 2 && setAnimationState({ ...animationState, symbol: true })
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [modalActived, animationState]);

  const renderButton = (buttonType: 'medium' | 'large' | 'cancel') => {
    let largeButton: boolean = buttonType === 'large';
    let cancelButton: boolean = buttonType === 'cancel';
    return (
      <div className={`${largeButton ? 'w-full' : 'w-1/2'} flex flex-row justify-center items-center`}>
        <button
          className={
            `${cancelButton ? 'bg-slate-400 lg:bg-slate-300 lg:hover:bg-slate-500' : buttonColor} w-[95%] text-slate-50 lg:hover:text-white lg:hover:font-bold py-2 flex flex-row justify-center items-center cursor-default lg:cursor-pointer rounded-md transition-all`
          }
          onClick={() => {
            if (cancelButton) {
              setMessageModal([])
              setCollectionToChange(type === 'delete' ? '' : collectionToChange);
            }
            else {
              click()
            }
          }}
        >
          <h5 className='w-full text-sm lg:text-base font-bold leading-none'>
            {cancelButton ? 'cancel' : textButton}
          </h5>
        </button>
      </div>
    )
  };

  return modalActived && (
    <div className='w-screen h-screen fixed top-0 flex flex-col justify-center items-center bg-black bg-opacity-75 transition-all z-[60]'>
      <div className={
        `${modalActived ? 'scale-100 animate-[poing_0.50s]' : 'scale-0 animate-[zoom-out_0.30s]'
        } container w-[18rem] lg:w-[22rem] p-6 lg:p-8 relative flex flex-col bg-white rounded-lg shadow-md transform z-[100]`
      }>
        <div className='w-full flex flex-col'>
          <AnimatedSVG
            type={type}
            strokeColor={strokeColor}
            circleAnimation={animationState.circle}
            symbolAnimation={animationState.symbol}
          />
          <div className='w-full pb-3 flex flex-col justify-center items-center'>
            <h2 className='w-fit text-[20px] lg:text-[30px] text-slate-950 text-center flex flex-col justify-center items-center'>
              {title}
            </h2>
            <h4 className='w-full text-sm lg:text-base text-slate-600 text-center flex flex-col justify-center items-center'>
              {text}
            </h4>
          </div>
          <div className='w-full flex flex-row justify-between items-center'>
            {isCancelButton && renderButton('cancel')}
            {renderButton(isCancelButton ? 'medium' : 'large')}
          </div>
        </div>
      </div>
    </div>
  );
}


const AnimatedSVG = ({ type, strokeColor, circleAnimation, symbolAnimation }: any) => {

  const svgsTypes: any = {
    'successful':
      <svg
        className={`${strokeColor} w-10 h-10`}
        strokeWidth={4}
        viewBox='0 0 40 40'
        strokeLinecap='round'
      >
        <line
          className={`${symbolAnimation ? 'animate-[draw-check_0.75s_ease-in-out_delay_1.0s]' : 'hidden'}`}
          x1="4" y1="26" x2="16" y2="36"
          strokeMiterlimit={10}
          strokeDasharray={330}
          strokeDashoffset={0}
        />
        <line
          className={`${symbolAnimation ? 'animate-[draw-check_1.25s_ease-in-out_delay_0.75s]' : 'hidden'}`}
          x1="16" y1="36" x2="36" y2="12"
        />
      </svg>,
    'error':
      <svg className={`${strokeColor} w-10 lg:w-14 h-10 lg:h-14`} strokeWidth={4} viewBox='0 0 40 40' strokeLinecap='round'>
        <line className={`${symbolAnimation ? 'animate-something' : 'hidden'}`} x1="10" y1="10" x2="30" y2="30" />
        <line className={`${symbolAnimation ? 'animate-something' : 'hidden'}`} x1="30" y1="10" x2="10" y2="30" />
      </svg>,
    'question':
      <svg
        className={`w-10 lg:w-14 h-10 lg:h-14 flex fill-sky-400`}
        strokeWidth={1}
        viewBox='0 0 16 16'
        strokeLinecap='round'
      >
        <path
          fillRule="evenodd"
          className={`${symbolAnimation ? 'animate-[draw-check_1.0s_ease]' : 'hidden'}`}
          d="M4.475 5.458c-.284 0-.514-.237-.47-.517C4.28 3.24 5.576 2 7.825 2c2.25 0 3.767 1.36 3.767 3.215 0 1.344-.665 2.288-1.79 2.973-1.1.659-1.414 1.118-1.414 2.01v.03a.5.5 0 01-.5.5h-.77a.5.5 0 01-.5-.495l-.003-.2c-.043-1.221.477-2.001 1.645-2.712 1.03-.632 1.397-1.135 1.397-2.028 0-.979-.758-1.698-1.926-1.698-1.009 0-1.71.529-1.938 1.402-.066.254-.278.461-.54.461h-.777zM7.496 14c.622 0 1.095-.474 1.095-1.09 0-.618-.473-1.092-1.095-1.092-.606 0-1.087.474-1.087 1.091S6.89 14 7.496 14z"
        />
      </svg>,
    'delete':
      <svg
        className={`w-10 lg:w-14 h-10 lg:h-14 flex fill-red-500`}
        strokeWidth={1}
        viewBox='0 0 16 16'
        strokeLinecap='round'
      >
        <path
          fillRule="evenodd"
          className={`${symbolAnimation ? 'animate-[draw-check_1.0s_ease]' : 'hidden'}`}
          d="M4.475 5.458c-.284 0-.514-.237-.47-.517C4.28 3.24 5.576 2 7.825 2c2.25 0 3.767 1.36 3.767 3.215 0 1.344-.665 2.288-1.79 2.973-1.1.659-1.414 1.118-1.414 2.01v.03a.5.5 0 01-.5.5h-.77a.5.5 0 01-.5-.495l-.003-.2c-.043-1.221.477-2.001 1.645-2.712 1.03-.632 1.397-1.135 1.397-2.028 0-.979-.758-1.698-1.926-1.698-1.009 0-1.71.529-1.938 1.402-.066.254-.278.461-.54.461h-.777zM7.496 14c.622 0 1.095-.474 1.095-1.09 0-.618-.473-1.092-1.095-1.092-.606 0-1.087.474-1.087 1.091S6.89 14 7.496 14z"
        />
      </svg>,
    'logout':
      <svg
        className={`w-10 lg:w-14 h-10 lg:h-14 flex fill-sky-500`}
        strokeWidth={1}
        viewBox='0 0 16 16'
        strokeLinecap='round'
      >
        <path
          fillRule="evenodd"
          className={`${symbolAnimation ? 'animate-[draw-check_1.0s_ease]' : 'hidden'}`}
          d="M4.475 5.458c-.284 0-.514-.237-.47-.517C4.28 3.24 5.576 2 7.825 2c2.25 0 3.767 1.36 3.767 3.215 0 1.344-.665 2.288-1.79 2.973-1.1.659-1.414 1.118-1.414 2.01v.03a.5.5 0 01-.5.5h-.77a.5.5 0 01-.5-.495l-.003-.2c-.043-1.221.477-2.001 1.645-2.712 1.03-.632 1.397-1.135 1.397-2.028 0-.979-.758-1.698-1.926-1.698-1.009 0-1.71.529-1.938 1.402-.066.254-.278.461-.54.461h-.777zM7.496 14c.622 0 1.095-.474 1.095-1.09 0-.618-.473-1.092-1.095-1.092-.606 0-1.087.474-1.087 1.091S6.89 14 7.496 14z"
        />
      </svg>,
  };

  return (
    <div className='w-full h-20 lg:h-28 relative flex flex-col justify-center items-center rounded-t-md animate-[appear_1.0s]'>
      <svg
        className='w-20 lg:w-28 h-20 lg:h-28 absolute'
        viewBox='0 0 40 40'
      >
        <circle
          className={`${strokeColor} ${circleAnimation ? 'animate-[draw-circle_2.0s_ease]' : 'hidden'}`}
          cx="20" cy="20" r="19"
          strokeWidth={2}
          fill="none"
          strokeMiterlimit={10}
          strokeDasharray={330}
          strokeDashoffset={0}
        />
      </svg>
      {svgsTypes[type]}
    </div>
  )
}


