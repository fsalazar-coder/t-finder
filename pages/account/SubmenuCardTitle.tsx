import { useEffect, useRef } from "react";
import { IconBxChevronLeft, IconBxChevronRight } from "@/icons/icons";

interface SubmenuCardsTitleProps {
  elements: { id: string; title: string }[];
  menuIndex: number;
  menuIndexRetro: () => void;
  menuIndexNext: () => void;
  shouldRenderSubmenu: boolean
}


export default function SubmenuCardTitle({ elements = [], menuIndex, menuIndexRetro, menuIndexNext, shouldRenderSubmenu }: SubmenuCardsTitleProps) {
  const menuProfileRef = useRef(null);
  const menuItemLast: number = elements ? Object.keys(elements).length - 1 : 0;
  const clickRetroDisabled: boolean = menuIndex === 0;
  const clickNextDisabled: boolean = menuIndex === menuItemLast;

  useEffect(() => {
    let movingPositionX: number = (155 * menuIndex);
    let menuProfileSelected: any = menuProfileRef?.current;
    if (menuProfileSelected) {
      menuProfileSelected.style.transition = 'all 0.5s ease-in';
      menuProfileSelected.style.transform = `translateX(-${movingPositionX}px)`;
    }
  }, [menuIndex, menuProfileRef]);


  return (
    shouldRenderSubmenu &&
    <div className={`flex flex-row justify-between items-center`}>
      <ButtondSubmenu
        type='retro'
        clickDisabled={clickRetroDisabled}
        menuIndex={menuIndexRetro}
      />
      <div className="w-[155px] h-full flex overflow-x-hidden">
        <ul className="w-[9999px] flex flex-row items-center transform" ref={menuProfileRef}>
          {
            elements?.map(({ id, title }: { id: string, title: string }, index: any) => {
              let isItemHighlighted: boolean = index === menuIndex;
              return (
                <li key={id} className='w-[155px] flex flex-row justify-center items-center'>
                  <h4 className={
                    `${isItemHighlighted ? 'text-color-highlighted font-semibold' : 'text-color-text-almost-clear'}`}>
                    {title}
                  </h4>
                </li>
              )
            })
          }
        </ul>
      </div>
      <ButtondSubmenu
        type='next'
        clickDisabled={clickNextDisabled}
        menuIndex={menuIndexNext}
      />
    </div>
  )
};


const ButtondSubmenu = ({ type, clickDisabled, menuIndex }: any) => (
  <div className="w-6 h-full flex flex-row justify-center items-center transition-all">
    <button
      className="w-full h-full"
      disabled={clickDisabled}
    >
      <i className={`${clickDisabled ? 'opacity-20' : 'opacity-100 hover:text-color-highlighted cursor-pointer'
        } w-6 flex flex-row justify-center text-color-text-medium text-lg`
      }
        onClick={menuIndex}
      >
        {type === 'retro' ? <IconBxChevronLeft /> : <IconBxChevronRight />}
      </i>
    </button>
  </div>
)