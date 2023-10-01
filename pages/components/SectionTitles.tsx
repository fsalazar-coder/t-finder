

export default function SectionTitles(props: any) {

  return (
    <div className='w-full flex flex-col'>
      <h1 className='text-2xl md:text-4xl lg:text-6xl text-transparent bg-slate-600 bg-clip-text font-extrabold text-start z-0'>
        {props.sectionTitle}
      </h1>
      <h2 className='w-fit h-fit text-fuchsia-400 text-base md:text-lg lg:text-xl tracking-wide font-bold'>
        {props.sectionSubtitle}
      </h2>
    </div>
  )
}
