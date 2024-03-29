import { useState, useEffect } from 'react';
import Image from 'next/image';


export default function TestimonyElement(props: any) {
  const [indexHovered, setIndexHovered] = useState(null);
  const [animationDone, setAnimationDone] = useState(false);
  const hovered = props.hovered;
  const index = props.index;
  const animationActived = props.animationActived;
  const animation = props.animation;
  const data = props.testimony;

  useEffect(() => {
    if (animationActived) {
      setTimeout(() => {
        setAnimationDone(true);
      }, 2500);
    }
  });

  return (
    <li
      className={
        `${animationActived ? animationDone ? hovered ?
          indexHovered === index ? 'border-color-secondary-clear'
            : 'md:filter md:grayscale md:opacity-40 md:scale-[0.95]'
          : 'border-color-border'
          : animation
          : 'opacity-100 md:opacity-0'
        } w-56 lg:w-[22.40rem] mt-12 lg:mt-0 mx-3 h-56 lg:h-52 relative px-4 flex flex-col justify-between items-center border shadow-md rounded-lg lg:cursor-pointer lg:transform lg:hover:scale-[1.05] transition-all`
      }
      value={props.value}
      onMouseEnter={(e: any) => { setIndexHovered(e.currentTarget.value) }}
      onMouseLeave={() => { setIndexHovered(null) }}
    >
      {/**testimony image */}
      <div className={
        `${indexHovered === index ?
          'from-color-clear via-color-secondary  to-color-secondary-dark'
          : 'from-color-clear via-color-text-almost-clear to-color-text-medium'
        } w-[4.25rem] h-[4.25rem] lg:w-[6.5rem] lg:h-[6.5rem] absolute -top-10 lg:-top-14 flex flex-col justify-center items-center bg-gradient-to-br rounded-full z-20`
      }>
        <Image
          className='w-16 h-16 lg:w-24 lg:h-24  border-2 border-white rounded-full'
          src={data?.image}
          alt={data?.alt}
          width={400}
          height={400}
        />
      </div>
      {/**testimony */}
      <h3 className='w-full mt-10 lg:mt-14 text-color-text-medium text-sm lg:text-base text-justify'>
        &quot;{data?.testimony}&quot;
      </h3>
      <div className='w-full h-fit pb-2 flex flex-col'>
        {/**name */}
        <h4 className={
          `${indexHovered === index ?
            'text-color-highlighted'
            : 'text-color-text-medium'
          } w-full text-sm md:text-base font-semibold`
        }>
          {data?.fullName}
        </h4>
        {/**category */}
        <h5 className='w-full text-color-text-dark text-sm md:text-base'>
          {data?.category} {data?.talent ? `- ${data?.talent}` : ''}
        </h5>
      </div>
    </li>
  )
}