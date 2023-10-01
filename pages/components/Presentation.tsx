import Image from 'next/image';
import {
  IconCheckCircle,
  IconArrowRight
} from '../../icons/icons';
import SectionTitles from './SectionTitles';



export default function Presentation(props: any) {

  return (
    <div className='w-full h-full py-3 flex flex-row justify-center items-center'>
      <div className={
        `${props.xDirectionReverse
          ? 'lg:flex-row-reverse'
          : 'lg:flex-row'
        } container w-full h-full flex flex-col justify-center items-center px-2 lg:px-5 lg:flex lg:justify-between lg:items-center list-none transition-all`
      }>
        {/**image container */}
        <div className='w-4/5 h-auto lg:w-1/2 lg:h-full flex flex-row justify-center items-center'>
          <Image
            className='w-full h-auto'
            width={800}
            height={400}
            src={props.image}
            alt='talents'
          />
        </div>
        {/**description container */}
        <div className='w-4/5 h-auto lg:w-1/2 lg:h-full flex flex-col justify-center'>
          {/**title */}
          <SectionTitles
            sectionTitleWatermark={props.sectionTitleWatermark}
            sectionTitle={props.sectionTitle}
            colorTitleDark={props.colorTitleDark}
          />
          {/**unorder list */}
          <ul className='w-full my-4 flex flex-col justify-center align-center'>
            {
              props.description?.map((obj: any, index: any) =>
                <li
                  key={index}
                  className='w-full flex flex-row'
                >
                  <i className='w-fit pr-3 pt-3 text-fuchsia-600 text-sm sm:text-xs md:text-sm lg:text-base xl:text-lg font-bold tracking-wider text-start flex flex-col justify-start'>
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
          {/**button to join */}
          <div className='w-full h-fit flex flex-row items-center z-[35]'>
            <button
              className='w-fit h-fit px-8 py-3 text-slate-50 hover:text-white md:hover:font-bold bg-fuchsia-400 hover:bg-fuchsia-900 flex flex-row justify-center items-center rounded-full cursor-pointer transform hover:scale-[1.1] transition-all z-30'
              onClick={props.joinModalOpen}
            >
              <h3 className='w-full h-2/3 text-sm lg:text-base xl:text-lg font-semibold tracking-wider flex flex-row justify-center items-center rounded-full transition-all'>
                {props.textButton}
              </h3>
              <i className='text-base xl:text-lg leading-none font-bold md:font-medium tracking-wider ml-1'>
                <IconArrowRight />
              </i>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
};