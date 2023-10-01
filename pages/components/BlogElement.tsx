import { useState, useEffect } from 'react';
import Image from 'next/image';



export default function BlogElement(props: any) {

  const [indexHovered, setIndexHovered] = useState(null);
  const [animationDone, setAnimationDone] = useState(false);
  const article = props.article;
  const hovered = props.hovered;
  const index = props.index;
  const animationActived = props.animationActived;
  const animation = props.animation;

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
        `${animationActived ?
          animationDone ?
            hovered ?
              indexHovered === index ?
                ''
                : 'md:filter sm:grayscale md:opacity-40'
              : ''
            : animation
          : 'opacity-100 md:opacity-0'
        } w-full h-fit sm:w-[95%] lg:w-[calc(0.33*95%)] my-5 lg:my-0 flex flex-col justify-center items-center shadow-lg rounded-sm lg:cursor-pointer lg:transform lg:hover:scale-[1.05] transition-all z-40`
      }
      value={props.value}
      onMouseEnter={(e: any) => { setIndexHovered(e.currentTarget.value) }}
      onMouseLeave={() => { setIndexHovered(null) }}
      onClick={props.blogModalOpen}
    >
      <div className='w-full h-fit relative flex flex-col justify-end'>
        {/**poster image */}
        <Image
          className='w-full h-auto rounded-sm z-0'
          src={article.image}
          alt={article.alt}
          width={800}
          height={550}
        />
        {/**Poster description */}
        <div className='w-full absolute bottom-0 p-3 flex flex-col justify-end items-start bg-gradient-to-b from-transparent via-black to-black opacity-80 z-10'>
          {/**title */}
          <h3 className='w-full text-white text-base lg:text-xl font-semibold text-start'>
            {article.title}
          </h3>
          {/**subtitle */}
          <h6 className='w-full text-slate-600 text-sm md:text-base font-semibold'>
            {article.date}
          </h6>
        </div>
      </div>
    </li>
  )
}