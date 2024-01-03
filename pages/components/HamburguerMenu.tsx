import { useUI } from "../../context/authContext";



export default function HamburguerMenu(props: any) {
  const {
    hamburguerMenuActive, setHamburguerMenuActive,
    dropdown, setDropdown
  } = useUI();

  return (
    <div
      className='w-5 h-6 mr-3 relative flex flex-col justify-center items-center transition-all'
      onClick={() => {
        setHamburguerMenuActive(!hamburguerMenuActive)
        setDropdown(!dropdown)
      }}
    >
      {
        hamburguerMenuActive ?
          <>
            <div className='w-5 h-[2px] absolute bg-color-highlighted-clear transform rotate-45 transition-all' />
            <div className='w-5 h-[2px] absolute bg-color-highlighted-clear transform -rotate-45 transition-all' />
            <div className='w-5 h-[2px] absolute bg-color-highlighted-clear transform scale-0 transition-all' />
            <div className='w-5 h-[2px] absolute bg-color-highlighted-clear transform -rotate-45 transition-all' />
            <div className='w-5 h-[2px] absolute bg-color-highlighted-clear transform rotate-45 transition-all' />
          </>
          :
          <>
            <div className='w-5 h-[2px] absolute top-1 bg-color-highlighted-clear transition-all' />
            <div className='w-5 h-[2px] absolute top-1 bg-color-highlighted-clear transition-all' />
            <div className='w-5 h-[2px] absolute top-[0.7rem] bg-color-highlighted-clear transition-all' />
            <div className='w-5 h-[2px] absolute bottom-1 bg-color-highlighted-clear transition-all' />
            <div className='w-5 h-[2px] absolute bottom-1 bg-color-highlighted-clear transition-all' />
          </>
      }
    </div>
  )
}