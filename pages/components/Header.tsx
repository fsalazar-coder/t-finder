import { useEffect, useState } from 'react';
import { useAuth } from '@/context/ContextAuth';
import { Typewriter } from 'react-simple-typewriter';
import { IconArrowRight } from '../../icons/icons';
import ButtonGoTo from './ButtonGoTo';


export default function Header(props: any) {
  const { token } = useAuth();
  const [animationActived, setAnimationActived] = useState(false);
  const headerActived = props.headerSectionActived;                                      /**To active animation on header section: true or false***/

  const animations = [                                                                   /***Animation sequence array: animate to each element***/
    'md:animate-[appear-bottom_1.0s_ease]',
    'md:animate-[appear-bottom_1.5s_ease]',
    'md:animate-[appear-bottom_2.0s_ease]'
  ];

  useEffect(() => {                                                                      /***UseEffect to controller that animation occurs only once***/
    if (headerActived) {
      setAnimationActived(true);
    }
  }, [headerActived]);

  return (
    <div className='w-full min-h-screen px-2 lg:px-8 relative flex flex-col justify-center items-center'>
      {/* Fondo con efecto de gradiente */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-color-secondary-dark to-color-secondary" />
      {/* Contenido del Encabezado */}
      <div className='w-full flex flex-col justify-center items-center z-[35]'>
        <h3 className='text-color-text-medium text-sm md:text-2xl lg:text-3xl xl:text-4xl tracking-wide font-normal flex'>
          The real app that
        </h3>
        <h1 className='text-color-clear text-lg md:text-2xl lg:text-3xl tracking-wide font-bold drop-shadow-2xl flex z-30'>
          {/* Componente Typewriter aquí */}
          <Typewriter
            words={['help you find Talent inteligently', 'looking for job to you!!']}
            cursor
            cursorStyle='|'
            cursorColor='rgb(255,255,255,0.20)'
            typeSpeed={100}
            deleteSpeed={50}
            loop={10}
          />
        </h1>
      </div>
      {/**Subtitle text */}
      <div className='w-full flex flex-col justify-center items-center z-[35]'>
        <h5 className='w-fit h-fit text-color-secondary text-sm sm:text-xs md:text-sm lg:text-base xl:text-lg font-medium tracking-wider text-start py-1 flex flex-col justify-start'>
          Improving your experience with recruitment
        </h5>
      </div>
      {/**button to open join modal (register) */}
      <div className='w-full pt-2 md:pt-4 flex justify-center items-center z-[35]'>
        <ButtonGoTo />
      </div>
    </div>
  )
}

