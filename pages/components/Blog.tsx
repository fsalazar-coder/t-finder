import { useState, useEffect } from 'react';
import SectionTitles from './SectionTitles';
import BlogElement from './BlogElement';
import BlogModal from './BlogModal';



export default function Blog(props: any) {

  const [animationActived, setAnimationActived] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [blogModal, setBlogModal] = useState(false);                                     /***State blog modal open: true or false***/
  const [blogModalAnimationClose, setBlogModalAnimationClose] = useState(false);
  const [blogActiveIndex, setBlogActiveIndex] = useState(Number);                        /***State blog active index to modal open***/
  const blogActived = props.blogSectionActived;                                          /**To active animation on blog section: true or false***/
  const animations = [                                                                   /***Animation order array: CSS animation to each element***/
    'md:animate-[appear-bottom_1.0s_ease]',
    'md:animate-[appear-bottom_1.5s_ease]',
    'md:animate-[appear-bottom_2.0s_ease]',
    'md:animate-[appear-bottom_2.5s_ease]'
  ];

  useEffect(() => {                                                                      /***UseEffect to controller that animation occurs only once***/
    if (blogActived === true) {
      setAnimationActived(true);
    }
  }, [blogActived]);

  return (
    <div className='w-full h-full flex flex-col justify-center items-center'>
      {/**Blog content */}
      <div className='container w-full h-full flex flex-col justify-center items-center lg:px-5 list-none transition-all'>
        {/**title */}
        <SectionTitles
          sectionTitleWatermark={props.sectionTitleWatermark}
          sectionTitle={props.sectionTitle}
          colorTitleDark={props.colorTitleDark}
        />
        {/**content */}
        <ul
          className='w-full h-fit my-4 flex flex-col justify-start items-center lg:flex-row lg:justify-between lg:items-center list-none transition-all z-20'
          onMouseEnter={() => { setHovered(true) }}
          onMouseLeave={() => { setHovered(false) }}
        >
          {
            props.posters?.map((item: any, index: any) => {
              return (
                <BlogElement
                  key={index}
                  value={index}
                  index={index}
                  article={item}
                  hovered={hovered}
                  animationActived={animationActived}
                  animation={animations[index]}
                  blogModalOpen={(e: any) => {
                    setBlogModal(true);
                    setBlogActiveIndex(e.currentTarget.value);
                  }}
                />
              )
            })
          }
        </ul>
      </div>
      {/**Hidden-visible blog modal */}
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