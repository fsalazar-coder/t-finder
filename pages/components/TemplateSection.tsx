import Image from 'next/image';
import { IconCheckCircle } from '../../icons/icons';
import SectionTitles from './SectionTitles';
import { useAuth } from '@/context/ContextAuth';



export default function Presentation(props: any) {

  const { token, setJoinModal } = useAuth();


  return (
    <div className='w-full h-full py-3 flex flex-row justify-center items-center'>
      <div className='container w-full px-0 lg:px-5 flex flex-col items-center list-none transition-all'>
        {/**title */}
        <div className={
          `${props.xDirectionReverse
            ? 'lg:justify-start'
            : 'lg:justify-end'
          } w-full flex flex-row`
        }>
          <SectionTitles
            sectionTitle={props.sectionTitle}
            sectionSubtitle={props.sectionSubtitle}
            sectionType={props.sectionType}
          />
        </div>
        {/**container content */}
        <div className={
          `${props.xDirectionReverse
            ? 'lg:flex-row-reverse'
            : 'lg:flex-row'
          } w-full flex flex-col items-center list-none transition-all`}
        >
          {/**image container */}
          <div className='w-4/5 h-auto lg:w-1/2 flex flex-row justify-between items-center'>
            <Image
              className='w-full h-auto px-2'
              width={800}
              height={400}
              src={props.image}
              alt='talents'
            />
          </div>
          <div className='w-full lg:w-1/2 px-2 flex flex-col justify-center'>
            {/**unorder list */}
            <ul className='w-full my-4 flex flex-col justify-center align-center'>
              {
                props.description?.map((obj: any, index: any) =>
                  <li
                    key={index}
                    className='w-full flex flex-row'
                  >
                    <i className='w-fit pr-3 pt-3 text-color-highlighted text-sm sm:text-xs md:text-sm lg:text-base xl:text-lg font-bold tracking-wider text-start flex flex-col justify-start'>
                      <IconCheckCircle />
                    </i>
                    <div className='w-full py-2 flex flex-col align-center'>
                      <h3 className='w-fit text-slate-600 text-sm lg:text-base xl:text-lg font-medium text-start flex flex-col justify-start'>
                        {obj.subTitle}:
                      </h3>
                      <p className='w-fit h-fit text-slate-400 text-xs md:text-sm xl:text-base font-medium text-start flex flex-col justify-start'>
                        {obj.text}
                      </p>
                    </div>
                  </li>
                )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
};