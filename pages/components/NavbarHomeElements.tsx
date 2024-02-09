import { useUI } from "@/context/ContextUI";

const navbarHomeElements: any = [
  {
    title: 'Recruit', linkTo: 'recruit-section'
  },
  {
    title: 'Job', linkTo: 'job-section'
  },
  {
    title: 'Testimonials', linkTo: 'testimonials-section'
  },
  {
    title: 'Blog', linkTo: 'blog-section'
  },
  {
    title: 'Contact', linkTo: 'footer-section'
  },
];

export default function NavbarHomeElements({ shouldRender }: any) {
  const { screenNarrow, setDropdownHome, setHamburguerMenuActive, sectionHomeActived, setSectionHomeActived } = useUI();

  return (
    shouldRender &&
    navbarHomeElements?.map(({ title, linkTo }: any, index: any) => {
      return (
        <li
          key={index}
          className={
            `${sectionHomeActived === linkTo ?
              'text-color-highlighted font-bold' :
              'text-color-secondary hover:text-color-secondary-clear font-normal'
            } w-full h-auto flex flex-row items-center lg:hover:cursor-pointer`
          }
        >
          <div
            className={`${!screenNarrow && 'px-4 hover:cursor-pointer'} w-full py-1 cursor-default`}
            onClick={() => {
              setDropdownHome(false);
              setHamburguerMenuActive(false);
              setSectionHomeActived(linkTo)
            }}
          >
            <h3 className='text-sm lg:text-base'>
              {title}
            </h3>
          </div>
        </li>
      )
    })
  )
}
