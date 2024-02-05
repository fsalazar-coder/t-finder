import { useEffect, useRef } from "react";
import { IconBxChevronLeft, IconBxChevronRight } from "@/icons/icons";

interface SubmenuCardsTitleProps {
  elements: { id: string; title: string }[]; 
  menuIndex: number; 
  menuIndexRetro: () => void; 
  menuIndexNext: () => void;
}


export default function SubmenuCarsTitle({ elements = [], menuIndex, menuIndexRetro, menuIndexNext }: SubmenuCardsTitleProps) {
  const menuProfileRef = useRef(null);
  const menuItemLast: number = elements ? Object.keys(elements).length - 1 : 0;
  const clickRetroDisabled: boolean = menuIndex === 0;
  const clickNextDisabled: boolean = menuIndex === menuItemLast;

  useEffect(() => {
    let movingPositionX: number = (128 * menuIndex);
    let menuProfileSelected: any = menuProfileRef?.current;
    if (menuProfileSelected) {
      menuProfileSelected.style.transition = 'all 0.5s ease-in';
      menuProfileSelected.style.transform = `translateX(-${movingPositionX}px)`;
    }
  }, [menuIndex, menuProfileRef]);


  return (
    elements &&
    <div className={`px-3 flex flex-row justify-between items-center border-x border-color-border`}>
      <div className="h-full flex flex-row justify-center items-center transition-all">
        <button
          className="w-fit h-full mt-1"
          disabled={clickRetroDisabled}
        >
          <i className={`${clickRetroDisabled ? 'opacity-20' : 'opacity-100 hover:text-color-highlighted cursor-pointer'
            } w-6 flex flex-row justify-center text-color-text-medium text-lg text-center transition-all`
          }
            onClick={() => menuIndexRetro()}
          >
            <IconBxChevronLeft />
          </i>
        </button>
      </div>
      <div className="w-32 h-full flex overflow-x-hidden">
        <ul
          className="w-[1000px] flex flex-row items-center transform"
          ref={menuProfileRef}
        >
          {
            elements?.map(({ id, title }: { id: string, title: string }, index: any) => {
              let isItemHighlighted: boolean = index === menuIndex;
              return (
                <h4
                  key={id}
                  className={
                    `${isItemHighlighted ? 'text-color-text-highlighted font-semibold'
                      : 'text-color-text-almost-clear'} w-32 text-center`
                  }>
                  {title}
                </h4>
              )
            })
          }
        </ul>
      </div>
      <div className="h-full flex flex-row justify-center items-center transition-all">
        <button
          className="w-fit h-full mt-1"
          disabled={clickNextDisabled}
        >
          <i className={`${clickNextDisabled ? 'opacity-20' : 'opacity-100 hover:text-color-highlighted cursor-pointer'
            } w-6 flex flex-row justify-center text-color-text-medium text-lg`
          }
            onClick={() => menuIndexNext()}
          >
            <IconBxChevronRight />
          </i>
        </button>
      </div>
    </div>
  )
};