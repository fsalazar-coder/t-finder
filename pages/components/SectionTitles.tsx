

export default function SectionTitles(props: any) {

  return (
    <div className={
      `${props.sectionType === 'account' ?
        'w-full' :
        props.sectionType === 'home' ?
          'w-full lg:w-1/2' :
          ''} flex flex-col`
    }>
      <h1 className={
        `${props.sectionType === 'account' ?
          'text-base lg:text-xl font-bold' :
          props.sectionType === 'home' ?
            'text-2xl lg:text-6xl font-extrabold' :
            ''} text-transparent bg-slate-600 bg-clip-text text-start z-0`
      }>
        {props.sectionTitle}
      </h1>
      <h2 className={
        `${props.sectionType === 'account' ?
          'text-sm lg:base font-medium' :
          props.sectionType === 'home' ?
            'text-base lg:text-xl tracking-wide font-bold' :
            ''} w-fit h-fit text-fuchsia-400`
      }>
        {props.sectionSubtitle}
      </h2>
    </div>
  )
}
