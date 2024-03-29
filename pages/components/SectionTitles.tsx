import { useUI } from "@/context/ContextUI";


export default function SectionTitles(props: any) {
  const { accountModule } = useUI();

  const isDashboard = accountModule === 'Dashboard';

  return (
    <div className={
      `${props.sectionType === 'account' ? 'w-fit' :
        props.sectionType === 'home' && 'w-full lg:w-1/2'} flex flex-col`
    }>
      <h1 className={
        `${props.sectionType === 'account' ? isDashboard ? 'bg-color-text-dark text-base lg:text-lg' :
          'bg-color-text-dark text-base lg:text-lg font-semibold' :
          props.sectionType === 'home' && 'bg-color-highlighted text-2xl lg:text-6xl'
        } text-transparent bg-clip-text text-start z-0`
      }>
        {props.sectionTitle}
      </h1>
      <h2 className={
        `${props.sectionType === 'account' ? 'text-sm lg:base font-medium' :
          props.sectionType === 'home' && 'text-base lg:text-xl tracking-wide'} w-fit h-fit text-color-secondary`
      }>
        {props.sectionSubtitle}
      </h2>
    </div>
  )
}
