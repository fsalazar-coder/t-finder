import { useEffect, useRef } from "react";
import SectionTitles from "../components/SectionTitles";
import SubmenuCarsTitle from "./SubmenuCarsTitle";
import ButtonPostUpdateDelete from "./ButtonPostUpdateDelete";



export default function ProfileCardsTitle(
  {
    isDashboard,
    menuProfileElements,
    elementProfile,
    profileMenuIndex,
    elementProfilePrev,
    elementProfileNext,  
  }: any) {

  const menuProfileRef = useRef(null);
  const menuProfileSelected: any = menuProfileRef.current;

  useEffect(() => {
    let movingPositionX: number = (112 * profileMenuIndex);
    if (menuProfileSelected) {
      menuProfileSelected.style.transition = 'all 0.5s ease-in';
      menuProfileSelected.style.transform = `translateX(-${movingPositionX}px)`;
    }
  }, [elementProfile, menuProfileSelected, profileMenuIndex]);


  return (
    <div className={
      `${isDashboard && 'px-5 border-b'
      } w-full relative py-1 mb-2 flex justify-between flex-row items-center border-color-border`
    }>
      <div className='w-full flex flex-row items-center'>
        <div className="h-full pr-5">
          <SectionTitles
            sectionTitle={`Profile`}
            sectionType='account'
          />
        </div>
        {
          !isDashboard && menuProfileElements &&
          <SubmenuCarsTitle
            elements={menuProfileElements}
            menuIndex={profileMenuIndex}
            menuIndexRetro={() => elementProfilePrev()}
            menuIndexNext={() => elementProfileNext()}
          />
        }
        <div className="w-fit h-full pl-5 flex flex-row items-center">
          <ButtonPostUpdateDelete
            itemId={`button-title-profile-${elementProfile}`}
            action={isDashboard ? 'go-to-profile' : 'post'}
            buttonType={isDashboard ? 'menu-dashboard' : 'post-account'}
            dataBaseCollection={isDashboard ? '' : elementProfile}
            shouldRenderButton={true}
          />
        </div>
      </div>
    </div>
  )
};