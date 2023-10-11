import { useHamburguerMenuActive, useDropdown } from "../../context/authContext";



export default function HamburguerMenu(props: any) {
  const { hamburguerMenuActive, setHamburguerMenuActive } = useHamburguerMenuActive();
  const { dropdown, setDropdown } = useDropdown();

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
            <div className='w-5 h-[2px] absolute bg-slate-50 transform rotate-45 transition-all' />
            <div className='w-5 h-[2px] absolute bg-slate-50 transform -rotate-45 transition-all' />
            <div className='w-5 h-[2px] absolute bg-slate-50 transform scale-0 transition-all' />
            <div className='w-5 h-[2px] absolute bg-slate-50 transform -rotate-45 transition-all' />
            <div className='w-5 h-[2px] absolute bg-slate-50 transform rotate-45 transition-all' />
          </>
          :
          <>
            <div className='w-5 h-[2px] absolute top-1 bg-slate-50 transition-all' />
            <div className='w-5 h-[2px] absolute top-1 bg-slate-50 transition-all' />
            <div className='w-5 h-[2px] absolute top-[0.7rem] bg-slate-50 transition-all' />
            <div className='w-5 h-[2px] absolute bottom-1 bg-slate-50 transition-all' />
            <div className='w-5 h-[2px] absolute bottom-1 bg-slate-50 transition-all' />
          </>
      }
    </div>
  )
}