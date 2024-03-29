import { useUI } from '@/context/ContextUI';
import { IconCancel } from '../../icons/icons';


export default function BlogModal({ blogActiveIndex, article }: any) {
  const { blogModal, setBlogModal } = useUI();

  return (
    <div
      className={
        `${blogModal ? 'scale-100 animate-[fade-in_0.50s]' : 'hidden'
        } w-screen h-screen fixed top-0 flex flex-col justify-center items-center bg-black bg-opacity-75 transform z-[60]`
      }
      onClick={() => setBlogModal(false)}
    >
      <div
        className={
          `${blogModal ?
            'scale-100 animate-[zoom-in_0.50s]'
            : 'scale-0 animate-[zoom-out_0.30s]'
          } container w-5/6 sm:w-2/3 lg:w-1/2 h-3/5 sm:h-2/3 lg:h-5/6 relative flex flex-col justify-start items-center bg-white rounded-md transform`
        }
        onClick={(e) => e.stopPropagation()}
      >
        {/**icon-cancel to close modal */}
        <div className='w-6 h-6 absolute -top-5 -right-5 flex flex-col justify-center items-center rounded-full bg-white'>
          <i
            className='w-fit h-full text-gray-900 sm:text-gray-400 text-2xl sm:xl flex justify-center cursor-pointer sm:hover:text-gray-900'
            onClick={() => {
              setBlogModal(false)
            }}
          >
            <IconCancel />
          </i>
        </div>
        {/**content */}
        <div className='w-full h-full px-4 md:px-8 flex flex-col'>
          {/**title */}
          <h2 className='w-full mt-2 lg:mt-4 text-slate-950 text-base lg:text-2xl font-bold'>
            {article?.title}
          </h2>
          {/**author */}
          <h4 className='w-full h-fit text-color-highlighted text-sm lg:text-lg font-semibold'>
            {article?.name}
          </h4>
          {/**date */}
          <h5 className='w-full h-fit text-slate-600 text-sm lg:text-base'>
            {article?.date}
          </h5>
          {/**line animate-decoration */}
          <div className={blogModal ? `w-full h-0.5 my-4 bg-color-highlighted animate-[width-change_1.0s_ease]` : 'hidden'} />
          {/**description */}
          <h4 className='w-full h-full px-2 lg:px-0 mb-4 lg:mb-8 text-gray-700 text-sm sm:text-lg lg:text-xl font-normal text-justify overflow-y-auto'>
            {article?.description}
          </h4>
        </div>
      </div>
    </div>
  )
}