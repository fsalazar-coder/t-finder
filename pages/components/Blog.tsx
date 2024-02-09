import { useState, useEffect } from 'react';
import { useUI } from '@/context/ContextUI';
import SectionTitles from './SectionTitles';
import BlogElement from './BlogElement';
import BlogModal from './BlogModal';



export default function Blog(props: any) {

  const { setBlogModal } = useUI();
  const [animationActived, setAnimationActived] = useState(false);
  const [hovered, setHovered] = useState(false);
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
    <div className='container w-full min-h-screen pt-20 px-0 md:px-5 flex flex-col items-center list-none transition-all'>
      <div className='w-full flex'>
        <SectionTitles
          sectionTitle={props.sectionTitle}
          sectionSubtitle={props.sectionSubtitle}
          sectionType={props.sectionType}
        />
      </div>
      <ul
        className='w-full h-fit md:pt-4 flex flex-col justify-center items-center lg:flex-row lg:justify-between lg:items-center list-none transition-all z-20'
        onMouseEnter={() => { setHovered(true) }}
        onMouseLeave={() => { setHovered(false) }}
      >
        {
          props.data?.map((item: any, index: any) => {
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
      {/**Hidden-visible blog modal */}
      <BlogModal
        blogActiveIndex={blogActiveIndex}
        article={props.data ? props.data[blogActiveIndex] : undefined}
      />
    </div>
  )
}
