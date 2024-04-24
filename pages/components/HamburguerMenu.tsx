import { useUI } from "@/context/ContextUI";


export default function HamburguerMenu({ shouldRender }: { shouldRender: boolean }) {
  const { hamburguerMenuActive, setHamburguerMenuActive, setDropdownAuth } = useUI();

  const renderMenuLines = () => {
    return hamburguerMenuActive ?
      <>
        <div className='w-5 h-[2px] absolute bg-color-secondary-clear transform rotate-45 transition-all' />
        <div className='w-5 h-[2px] absolute bg-color-secondary-clear transform -rotate-45 transition-all' />
      </>
      :
      <>
        <div className='w-5 h-[2px] absolute top-1 bg-color-secondary-clear transition-all' />
        <div className='w-5 h-[2px] absolute top-[0.7rem] bg-color-secondary-clear transition-all' />
        <div className='w-5 h-[2px] absolute bottom-1 bg-color-secondary-clear transition-all' />
      </>
      ;
  };

  return (
    shouldRender &&
    <div
      className='relative transition-all z-50'
      onClick={() => {
        setDropdownAuth(false);
        setHamburguerMenuActive(!hamburguerMenuActive);
      }}>
      <div className='w-5 h-6 mr-3 relative flex flex-col justify-center items-center transition-all'>
        {renderMenuLines()}
      </div>
    </div>
  );
}
