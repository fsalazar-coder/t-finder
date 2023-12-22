

export default function SectionTitles(props: any) {

  return (
    <div className={
      `${props.sectionType === 'account' ?
        'w-fit' :
        props.sectionType === 'home' ?
          'w-full lg:w-1/2' :
          ''} flex flex-col`
    }>
      <h1 className={
        `${props.sectionType === 'account' ?
          'bg-color-text-secondary text-base lg:text-lg font-semibold' :
          props.sectionType === 'home' && 'bg-color-text-secondary text-2xl lg:text-6xl font-bold'
        } text-transparent bg-clip-text text-start z-0`
      }>
        {props.sectionTitle}
      </h1>
      <h2 className={
        `${props.sectionType === 'account' ?
          'text-sm lg:base font-medium' :
          props.sectionType === 'home' ?
            'text-base lg:text-xl tracking-wide font-semibold' :
            ''} w-fit h-fit text-color-secondary-clear`
      }>
        {props.sectionSubtitle}
      </h2>
    </div>
  )
}
