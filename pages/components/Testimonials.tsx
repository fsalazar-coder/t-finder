import { useState, useEffect, useRef } from 'react';
import { useUI } from '@/context/authContext';
import SectionTitles from './SectionTitles';
import TestimonyElement from './TestimonyElement';
import {
  IconBxChevronLeft,
  IconBxChevronRight
} from '../../icons/icons';



export default function Testimonials(props: any) {


  const carouselRef: any = useRef(null);                                                 /***Carousel Ref.***/
  const { screenNarrow } = useUI();
  const [testimonyActiveIndex, setTestimonyActiveIndex] = useState(Number);              /***State testimony active index***/
  const testimonialsActived = props.testimonialsSectionActived;                          /**To active animation on testimonials section: true or false***/

  const [animationActived, setAnimationActived] = useState(false);                       /***Animation actived state***/
  const [hovered, setHovered] = useState(false);
  const [carouselPosition, setCarouselPosition] = useState(0);
  const [carouselTranslateX, setCarouselTranslateX] = useState(Number);

  const portfolioActived = props.portfolioSectionActived;                                /***To active animation on works section: true or false***/
  const carouselSelected: any = carouselRef.current;
  const carousel = props.data;                                                            /***Carousel-Works kind mirror***/
  const carouselLength = carousel?.length;
  const carouselPositionMaxLimit = carouselLength - 1;
  const animations = [                                                                   /***CSS Animation to close-open modal and each work element***/
    'md:animate-[appear-right_1.0s_ease]',
    'md:animate-[appear-right_1.5s_ease]',
    'md:animate-[appear-right_2.0s_ease]',
    'md:animate-[appear-right_2.5s_ease]',
    'md:animate-[appear-right_3.0s_ease]',
    'md:animate-[appear-right_3.5s_ease]'
  ];

  useEffect(() => {                                                                      /***UseEffect to controller that animation occurs only once***/
    if (testimonialsActived === true) {
      setAnimationActived(true);
    }
  }, [testimonialsActived]);

  const carouselMovingHandle = () => {                                                   /**Carousel x-moving infinity controller*/
    let cp = carouselPosition;
    let cpml = carouselPositionMaxLimit;

    if (carouselSelected) {
      carouselSelected.style.transition = 'all 1s ease';
      if (cp >= 0 && cp <= cpml) {
        carouselSelected.style.transform = `translateX(-${carouselTranslateX}px)`;
      }
      else if (cp > cpml) {
        carouselSelected.style.transform = `translateX(0px)`;
        setCarouselPosition(0);
      }
    }
  }

  useEffect(() => {
    setCarouselTranslateX(carouselPosition * (screenNarrow ? 248 : 382.4));
  }, [carouselPosition, screenNarrow]);

  useEffect(() => {                                                                      /***UseEffect to controller that animation occurs only once***/
    if (portfolioActived === true) {
      setAnimationActived(true);
    }
  }, [portfolioActived]);

  useEffect(() => {                                                                      /***UseEffect to controller the carousel moving when carousel position change***/
    carouselMovingHandle();
  });


  return (
    <div className='w-full h-full flex flex-col justify-center items-center'>
      <div className='container w-full h-full flex flex-col justify-center px-0 lg:px-5 list-none transition-all'>
        {/**title */}
        <SectionTitles
          sectionTitle={props.sectionTitle}
          sectionSubtitle={props.sectionSubtitle}
          sectionType={props.sectionType}
        />
        <div className='w-full h-full flex flex-row justify-between items-center'>
          {/***Carousel left arrow***/}
          <div className={
            `${carouselPosition > 0 ?
              'opacity-100'
              : 'opacity-0'
            } w-auto h-full pt-12 lg:pt-0 flex flex-row justify-center items-center transition-all z-40`
          }
          >
            <i
              className={
                `${animationActived ?
                  'md:animate-[appear_4.5s]'
                  : 'md:opacity-0'
                } w-auto h-fit text-gray-400 text-3xl lg:text-5xl md:cursor-pointer md:opacity-80 md:hover:text-fuchsia-300`
              }
              onClick={() => {
                carouselPosition > 0 ?
                  setCarouselPosition(carouselPosition - 1)
                  : ''
              }}
            >
              <IconBxChevronLeft />
            </i>
          </div>

          {/***Carousel testimonials***/}
          <div className='w-full h-full flex flex-row justify-start items-center overflow-x-hidden transition-all z-0'>
            <ul
              className='w-[9999px] h-auto my-4 flex flex-row justify-start items-center transform transition-all'
              onMouseEnter={() => { setHovered(true) }}
              onMouseLeave={() => { setHovered(false) }}
              ref={carouselRef}
            >
              {
                props.data?.map((item: any, index: any) => {
                  return (
                    <TestimonyElement
                      key={index}
                      value={index}
                      index={index}
                      testimony={item}
                      hovered={hovered}
                      animationActived={animationActived}
                      animation={animations[index]}
                    />
                  )
                })
              }
            </ul>
          </div>

          {/***Carousel right arrow***/}
          <div className='w-auto h-full pt-12 lg:pt-0 flex flex-row justify-center items-center transition-all z-40'>
            <i
              className={
                `${animationActived ?
                  'md:animate-[appear_4.5s]'
                  : 'md:opacity-0'
                } w-auto h-fit text-gray-400 text-3xl lg:text-5xl md:cursor-pointer md:opacity-80 md:hover:text-fuchsia-300`
              }
              onClick={() => setCarouselPosition(carouselPosition + 1)}
            >
              <IconBxChevronRight />
            </i>
          </div>
        </div>
      </div>
    </div>
  )
}