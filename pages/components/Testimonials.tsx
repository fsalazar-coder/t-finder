import { useState, useEffect, useRef } from 'react';
import { useUI } from '@/context/ContextUI';
import SectionTitles from './SectionTitles';
import TestimonyElement from './TestimonyElement';
import { IconBxChevronLeft, IconBxChevronRight } from '../../icons/icons';


interface TestimonialsProps {
  sectionTitle: string;
  sectionSubtitle: string;
  sectionType: string;
  data: any[];
  testimonialsSectionActived: boolean;
  portfolioSectionActived?: boolean; // If used
}

interface CarouselArrowProps {
  direction: 'left' | 'right';
  carouselPosition: number;
  click: () => void;
}

interface CarouselProps {
  data: any[],
  carouselPosition: number;
  carouselTranslateX: number,
  handleTouchStart: any,
  handleTouchMove: any,
  testimonialsSectionActived: boolean
}


export default function Testimonials({ sectionTitle, sectionSubtitle, sectionType, data, testimonialsSectionActived }: TestimonialsProps) {
  const { screenNarrow } = useUI();
  const [carouselPosition, setCarouselPosition] = useState(0);
  const [startTouchPosition, setStartTouchPosition] = useState(0);
  const [carouselTranslateX, setCarouselTranslateX] = useState(0);
  const carouselLenght: number = data?.length;

  useEffect(() => {
    setCarouselTranslateX(carouselPosition * (screenNarrow ? 248 : 382.4));
  }, [carouselPosition, screenNarrow]);

  const handleTouchStart = (e: any) => {
    const touch = e.touches[0];
    setStartTouchPosition(touch.clientX);
  };

  const handleTouchMove = (e: any) => {
    const touch = e.touches[0];
    const move = startTouchPosition - touch.clientX;

    if (move > 50) {
      setCarouselPosition((prev: any) => prev + 1);     // Swipe Left
    } else if (move < -50) {
      setCarouselPosition((prev: any) => Math.max(0, prev - 1));     // Swipe Right
    }
  };


  return (
    <div className='container w-full min-h-screen pt-20 px-0 md:px-5 flex flex-col list-none transition-all'>
      {/**title */}
      <div className='w-full flex'>
        <SectionTitles
          sectionTitle={sectionTitle}
          sectionSubtitle={sectionSubtitle}
          sectionType={sectionType}
        />
      </div>
      <div className='w-full flex flex-row justify-center items-center'>
        <CarouselArrow
          direction='left'
          carouselPosition={carouselPosition}
          click={() => setCarouselPosition(carouselPosition > 0 ? carouselPosition - 1 : carouselPosition)}
        />
        <Carousel
          data={data}
          carouselPosition={carouselPosition}
          carouselTranslateX={carouselTranslateX}
          handleTouchStart={handleTouchStart}
          handleTouchMove={handleTouchMove}
          testimonialsSectionActived={testimonialsSectionActived}
        />
        <CarouselArrow
          direction='right'
          carouselPosition={carouselPosition}
          click={() => setCarouselPosition(carouselPosition < carouselLenght - 1 ? carouselPosition + 1 : carouselPosition)}
        />
      </div>
    </div>
  )
}

const CarouselArrow = ({ direction, carouselPosition, click }: CarouselArrowProps) => (
  <button
    className={`${direction === 'left' && carouselPosition === 0 ? 'opacity-0' : 'opacity-100'} 
  w-auto h-full pt-12 text-color-text-almost-clear text-3xl lg:text-5xl cursor-pointer lg:opacity-80 lg:hover:text-color-highlighted-clear flex flex-row justify-center items-center transition-opacity z-30`}
    aria-label={direction === 'left' ? 'Previous' : 'Next'}
    onClick={click}
  >
    {direction === 'left' ? <IconBxChevronLeft /> : <IconBxChevronRight />}
  </button>
);

const Carousel = ({ data, carouselPosition, carouselTranslateX, handleTouchStart, handleTouchMove, testimonialsSectionActived }: CarouselProps) => {
  const { screenNarrow } = useUI();
  const carouselRef = useRef<HTMLUListElement>(null);
  const [hovered, setHovered] = useState(false);
  const dataLength: number = data?.length;
  const animations = [
    'md:animate-[appear-right_1.0s_ease]',
    'md:animate-[appear-right_1.5s_ease]',
    'md:animate-[appear-right_2.0s_ease]',
    'md:animate-[appear-right_2.5s_ease]',
    'md:animate-[appear-right_3.0s_ease]',
    'md:animate-[appear-right_3.5s_ease]'
  ];

  useEffect(() => {
    const carouselSelected = carouselRef.current;
    if (carouselSelected) {
      carouselSelected.style.transform = `translateX(-${carouselPosition * (dataLength ? 100 / dataLength : 0)}%)`;
    }
  }, [carouselPosition, dataLength]);

  return (
    <div className={`${!screenNarrow && 'pt-16'} w-full h-full flex flex-row justify-start items-end overflow-x-hidden transition-all z-0`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <ul
        className='w-[9999px] h-auto my-4 flex flex-row justify-start items-center transform transition-all'
        style={{ transform: `translateX(-${carouselTranslateX}px)` }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        ref={carouselRef}
      >
        {data?.map((item, index) => (
          <TestimonyElement
            key={index}
            value={index}
            index={index}
            testimony={item}
            hovered={hovered}
            animationActived={testimonialsSectionActived}
            animation={animations[index]}
          />
        ))}
      </ul>
    </div>
  );
};

