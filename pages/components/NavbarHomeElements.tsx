import { useUI } from "@/context/ContextUI";
import ButtonsLoginJoin from "./ButtonsLoginJoin";
import { useAuth } from "@/context/ContextAuth";

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

export default function NavbarHomeElements() {
  const { screenNarrow, hamburguerMenuActive, setHamburguerMenuActive } = useUI();

  return (
    <>
      <HomeElementsNarrow shouldRender={screenNarrow && hamburguerMenuActive} />
      <HomeElementsLarge shouldRender={!screenNarrow} />
    </>
  )
};

const HomeElementsNarrow = ({ shouldRender }: { shouldRender: boolean }) => {
  const { token } = useAuth();

  return (
    shouldRender &&
    <div className='w-full absolute top-0 left-0 pt-14 flex flex-col items-center bg-color-secondary-dark transition-all z-40'>
      <div className={`border-y-[1px] w-full flex flex-col items-center border-color-secondary`}>
        <ul className={`w-full container py-4 pl-8 px-0 md:px-5 flex flex-col`}>
          <NavbarHomeItemsRender />
        </ul>
      </div>
      <div className={`border-b-[1px] w-full flex flex-col items-center border-color-secondary`}>
        <ButtonsLoginJoin shouldRender={!token} />
      </div>
    </div>
  )
};

const HomeElementsLarge = ({ shouldRender }: { shouldRender: boolean }) => (
  shouldRender &&
  <ul className={`h-full pr-2 flex flex-row justify-between items-center border-r border-color-secondary`}>
    <NavbarHomeItemsRender />
  </ul>
);

const NavbarHomeItemsRender = () => {
  const { screenNarrow, sectionHomeActived, setSectionHomeActived, setHamburguerMenuActive } = useUI();

  return (
    <>
      {
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
        })}
    </>
  )
}

