import { useEffect, useRef } from "react";
import SectionTitles from "../components/SectionTitles";
import SubmenuCardTitle from "./SubmenuCardTitle";
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
    <div className={`w-full relative px-5 py-2 flex justify-between flex-row items-center border-b border-color-border`}>
      <div className='w-auto flex flex-row items-center'>
        <div className="h-full pr-5">
          <SectionTitles
            sectionTitle={`Profile`}
            sectionType='account'
          />
        </div>
        <SubmenuCardTitle
          elements={menuProfileElements}
          menuIndex={profileMenuIndex}
          menuIndexRetro={() => elementProfilePrev()}
          menuIndexNext={() => elementProfileNext()}
          shouldRenderSubmenu={!isDashboard && menuProfileElements}
        />
      </div>
      <div className="w-fit h-full flex flex-row items-center">
        <ButtonPostUpdateDelete
          itemId={`button-title-profile-${elementProfile}`}
          action={isDashboard ? 'go-to-profile' : 'post'}
          buttonType={isDashboard ? 'menu-dashboard' : 'post-account'}
          dataBaseCollection={isDashboard ? '' : elementProfile}
          shouldRenderButton={true}
        />
      </div>
    </div>
  )
};