import { useEffect, useRef } from "react";
import { IconBxChevronLeft, IconBxChevronRight } from "@/icons/icons";



export default function SubmenuCarsTitle({ elements, menuIndex, menuIndexRetro, menuIndexNext }: any) {

  const menuProfileRef = useRef(null);
  const menuProfileSelected: any = menuProfileRef.current;
  const menuItemLast: number = Object.keys(elements).length - 1;
  const clickRetroDisabled: boolean = menuIndex === 0;
  const clickNextDisabled: boolean = menuIndex === menuItemLast;

  useEffect(() => {
    let movingPositionX: number = (112 * menuIndex);
    if (menuProfileSelected) {
      menuProfileSelected.style.transition = 'all 0.5s ease-in';
      menuProfileSelected.style.transform = `translateX(-${movingPositionX}px)`;
    }
  }, [menuIndex]);


  return (
    <div className={`w-72 flex flex-row justify-between items-center border-l border-color-border`}>
      <div className="w-52 h-full flex overflow-x-hidden">
        <ul
          className="w-[1000px] flex flex-row items-center transform"
          ref={menuProfileRef}
        >
          {
            elements.map(({ id, title }: any, index: any) => {
              let isItemHighlighted: boolean = index === menuIndex;
              return (
                <h4
                  key={id}
                  className={
                    `${isItemHighlighted ? 'text-color-text-highlighted font-semibold'
                      : 'text-color-text-almost-clear'} w-28 text-center`
                  }>
                  {title}
                </h4>
              )
            })
          }
        </ul>
      </div>
      <div className="w-12 h-full flex flex-row justify-center items-center transition-all">
        <button
          className="w-fit h-full border-r border-color-border"
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
        <button
          className="w-fit h-full"
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