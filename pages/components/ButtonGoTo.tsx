import { useUI } from '@/context/ContextUI';
import { useAuth } from '@/context/ContextAuth';
import { IconArrowRight } from '../../icons/icons';


export default function ButtonGoTo() {
  const { token, setJoinModal } = useAuth();
  const { setAccountActived, setAccountModule } = useUI();

  const handleClick = () => {
    if (token) {
      setAccountActived(true)
      setAccountModule('Dashboard')
    } else {
      setJoinModal(true)
    }
  }

  return (
    <button
      className='w-fit h-fit px-8 py-3 text-slate-50 hover:text-white md:hover:font-bold flex flex-row justify-center items-center bg-color-highlighted lg:bg-opacity-75 lg:hover:bg-opacity-100 border-[1px] border-white rounded-full cursor-pointer transform hover:scale-[1.1] transition-all z-30'
      onClick={handleClick}
    >
      <h3 className='w-full h-2/3 text-sm lg:text-base xl:text-lg font-semibold tracking-wider flex flex-row justify-center items-center rounded-full transition-all'>
        {token ? 'Go to my account' : 'Get started'}
      </h3>
      <i className='text-base xl:text-lg leading-none font-bold md:font-medium tracking-wider ml-1'>
        <IconArrowRight />
      </i>
    </button>
  )
}