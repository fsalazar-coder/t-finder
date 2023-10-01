

export default function SectionTitles(props: any) {

  return (
    <div className='w-full flex flex-col'>
      <h1 className={
        `${props.colorTitleDark ?
          'bg-slate-200' :
          'bg-slate-100'
        } w-full h-fit text-2xl md:text-4xl lg:text-6xl text-transparent bg-clip-text font-extrabold text-start z-0`
      }>
        {props.sectionTitleWatermark}
      </h1>
      <h2 className='w-fit h-fit text-slate-800 text-lg md:text-xl lg:text-2xl xl:text-3xl tracking-wide font-bold'>
        {props.sectionTitle}
      </h2>
    </div>
  )
}
