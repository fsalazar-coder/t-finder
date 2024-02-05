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
  const [circleAnimation, setCircleAnimation] = useState(false);
  const [symbolAnimation, setSymbolAnimation] = useState(false);
  const [circleGrowAnimation, setCircleGrowAnimation] = useState(false);
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
      strokeColor: 'stroke-red-400',
      buttonColor: 'bg-red-500 lg:bg-red-500 lg:hover:bg-red-400'
    },
    'logout': {
      title: 'Are you sure?',
      textButton: 'Logout',
      strokeColor: 'stroke-color-highlighted-clear',
      buttonColor: 'bg-color-highlighted lg:hover:bg-color-highlighted-clear'
    },
  };

  const getModalStyles = (type: string) => modalConfig[type] || {};
  const { title, textButton, strokeColor, buttonColor } = getModalStyles(type);

  useEffect(() => {
    if (modalActived) {
      setAnimationState({ ...animationState, circle: true });
      setCircleAnimation(true);
      setSymbolAnimation(false)
      setTimeout(() => {
        setSymbolAnimation(true);
        setCircleGrowAnimation(false);
        setTimeout(() => {
          setCircleGrowAnimation(true);
        }, 1000);
      }, 1000);
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
        } container w-64 lg:w-[22rem] p-4 lg:p-8 relative flex flex-col justify-start items-center bg-white rounded-lg shadow-md transform z-[100]`
      }>
        <div className='w-full flex flex-col justify-start items-center'>
          <AnimatedSVG
            type={type}
            strokeColor={strokeColor}
            circleAnimation={circleAnimation}
            symbolAnimation={symbolAnimation}
          />
          {/**message title */}
          <h2 className='w-full pt-4 text-xl lg:text-3xl text-slate-950 text-center flex flex-col justify-center items-center'>
            {title}
          </h2>
          {/**text modal */}
          <h4 className='w-full pb-6 text-sm lg:text-base text-slate-600 text-center flex flex-col justify-center items-center'>
            {text}
          </h4>
          <div className='w-full flex flex-row justify-center items-center'>
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
        strokeWidth={8}
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
        className={`${strokeColor} w-10 lg:w-14 h-10 lg:h-14 flex`}
        strokeWidth={4}
        viewBox='0 0 40 40'
        strokeLinecap='round'
      >
        <line
          className={`${symbolAnimation ? 'animate-[draw-check_1.0s_ease]' : 'hidden'}`}
          x1="20" y1="4" x2="20" y2="27"
        />
        <line
          className={`${symbolAnimation ? 'animate-[draw-check_1.5s_ease]' : 'hidden'}`}
          x1="20" y1="36" x2="20" y2="36"
        />
      </svg>,
    'delete':
      <svg
        className={`${strokeColor} w-10 lg:w-14 h-10 lg:h-14 flex`}
        strokeWidth={4}
        viewBox='0 0 40 40'
        strokeLinecap='round'
      >
        <line
          className={`${symbolAnimation ? 'animate-[draw-check_1.0s_ease]' : 'hidden'}`}
          x1="20" y1="4" x2="20" y2="27"
        />
        <line
          className={`${symbolAnimation ? 'animate-[draw-check_1.5s_ease]' : 'hidden'}`}
          x1="20" y1="36" x2="20" y2="36"
        />
      </svg>,
    'logout':
      <svg
        className={`${strokeColor} w-10 lg:w-14 h-10 lg:h-14 flex`}
        strokeWidth={4}
        viewBox='0 0 40 40'
        strokeLinecap='round'
      >
        <line
          className={`${symbolAnimation ? 'animate-[draw-check_1.0s_ease]' : 'hidden'}`}
          x1="20" y1="4" x2="20" y2="27"
        />
        <line
          className={`${symbolAnimation ? 'animate-[draw-check_1.5s_ease]' : 'hidden'}`}
          x1="20" y1="36" x2="20" y2="36"
        />
      </svg>
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


