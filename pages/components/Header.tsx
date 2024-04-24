import { useEffect, useState } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import { useUI } from '@/context/ContextUI';
import ButtonGoTo from './ButtonGoTo';
import Image from 'next/image';
import headerImageNarrow from '@/public/images/Background_ai_narrow.jpg';
import headerImageLarge from '@/public/images/Background_ai_large_2.jpg';


export default function Header(props: any) {
  const { screenNarrow } = useUI();
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
    <div className='w-full min-h-screen relative flex flex-col justify-center items-center bg-gradient-to-b from-black via-color-secondary-dark to-color-secondary'>
      {/* Fondo con efecto de gradiente */}
      <div className='w-full h-full absolute flex bg-custom-header bg-right-top bg-cover bg-no-repeat' />
      {/* Contenido del Encabezado */}
      <div className='w-full md:pt-[10%] flex flex-col justify-center items-center z-[35]'>
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




///  <div className="w-full h-full absolute flex flex-row md:justify-end opacity-20">
///  <Image
///    className={`w-auto h-full flex flex-row justify-center items-center`}
///    width={1350}
///    height={900}
///    src={screenNarrow ? headerImageNarrow : headerImageLarge}
///    alt='header-image'
///  />
///  </div>