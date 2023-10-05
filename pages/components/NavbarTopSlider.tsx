export default function NavbarTopSlider(props: any) {

  const navbarTopSlider = props.navbarTopSlider;
  const navbarFirstUse = props.navbarFirstUse;


  return (
    <ul className={
      `w-full h-fit fixed right-0 top-0 py-16 flex flex-col justify-start items-center bg-slate-950 transition-all z-40
      ${navbarTopSlider ?
        'animate-[appear-top_0.50s_ease]'
        : navbarFirstUse ?
          'transform translate-y-[-500%] animate-[disappear-top_2.0s_ease]'
          : 'hidden'}`
    }>
      {/**login buttom to open modal */}
      <li
        key='login-navbar-buttom'
        className='w-fit h-fit px-2 flex flex-row justify-center items-start list-none'
        onClick={() => {
          props.loginModalOpen();
          props.navbarTopSliderClose();
        }}
      >
        <h2 className='w-full h-2/3 py-1 px-8 text-slate-50 hover:text-fuchsia-600 text-base lg:text-lg xl:text-xl font-light hover:font-bold tracking-wider flex flex-row justify-center items-center cursor-pointer transition-all'>
          Login
        </h2>
      </li>
      {/**Join buttom to open modal */}
      <li
        key='join-navbar-buttom'
        className='w-fit h-fit px-2 flex flex-row justify-center items-start list-none'
        onClick={() => {
          props.joinModalOpen();
          props.navbarTopSliderClose();
        }}
      >
        <h2 className='w-full h-2/3 py-1 px-8 text-slate-50 hover:text-fuchsia-600 text-base lg:text-lg xl:text-xl font-light hover:font-bold tracking-wider flex flex-row justify-center items-center cursor-pointer transition-all'>
          Join
        </h2>
      </li>
    </ul>
  )
}