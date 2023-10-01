import React, { useState, useEffect } from 'react';
import SectionTitles from './SectionTitles';
import BlogElement from './BlogElement';
import BlogModal from './BlogModal';

import Data from '../data/data.json';

const posters = Data?.blog;

interface BlogProps {
  blogSectionActived: boolean;
  sectionTitleWatermark: string;
  sectionTitle: string;
  colorTitleDark: boolean;
  posters: []
}

export default function Blog(props: any) {
  const [animationActived, setAnimationActived] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [blogModal, setBlogModal] = useState(false);
  const [blogModalAnimationClose, setBlogModalAnimationClose] = useState(false);
  const [blogActiveIndex, setBlogActiveIndex] = useState<number>(0);
  const blogActived = props.blogSectionActived;
  const animations = [
    'md:animate-[appear-bottom_1.0s_ease]',
    'md:animate-[appear-bottom_1.5s_ease]',
    'md:animate-[appear-bottom_2.0s_ease]',
    'md:animate-[appear-bottom_2.5s_ease]'
  ];

  useEffect(() => {
    if (blogActived) {
      setAnimationActived(true);
    }
  }, [blogActived]);

  return (
    <div className='w-full h-full flex flex-col justify-center items-center'>
      <div className='container w-full h-full flex flex-col justify-center items-center lg:px-5 list-none transition-all'>
        <SectionTitles
          sectionTitleWatermark={props.sectionTitleWatermark}
          sectionTitle={props.sectionTitle}
          colorTitleDark={props.colorTitleDark}
        />
        <ul
          className='w-full h-fit my-4 flex flex-col justify-start items-center lg:flex-row lg:justify-between lg:items-center list-none transition-all z-20'
          onMouseEnter={() => { setHovered(true) }}
          onMouseLeave={() => { setHovered(false) }}
        >
          {
            props.posters?.map((item: any, index: any) => (
              <BlogElement
                key={index}
                value={index}
                index={index}
                article={item}
                hovered={hovered}
                animationActived={animationActived}
                animation={animations[index]}
                blogModalOpen={(e: React.MouseEvent<HTMLButtonElement>) => {
                  setBlogModal(true);
                  setBlogActiveIndex(Number(e.currentTarget.value));
                }}
              />
            ))
          }
        </ul>
      </div>
      <BlogModal
        blogModal={blogModal}
        blogActiveIndex={blogActiveIndex}
        blogModalAnimationClose={blogModalAnimationClose}
        blogModalClose={() => {
          setBlogModal(false);
          setBlogModalAnimationClose(true);
        }}
        article={props.posters[blogActiveIndex]}
      />
    </div>
  )
}
