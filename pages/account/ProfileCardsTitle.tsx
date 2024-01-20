import { useEffect, useRef } from "react";
import SectionTitles from "../components/SectionTitles";
import SubmenuCarsTitle from "./SubmenuCarsTitle";
import ButtonTitleCards from "./ButtonTitleCards";



export default function ProfileCardsTitle(
  {
    isDashboard,
    data,
    profileId,
    profileMenuIndex,
    profileMenuIndexRetro,
    profileMenuIndexNext,
  }: any) {

  const menuProfileRef = useRef(null);
  const menuProfileSelected: any = menuProfileRef.current;


  useEffect(() => {
    let movingPositionX: number = (112 * profileMenuIndex);
    if (menuProfileSelected) {
      menuProfileSelected.style.transition = 'all 0.5s ease-in';
      menuProfileSelected.style.transform = `translateX(-${movingPositionX}px)`;
    }
  }, [profileMenuIndex]);


  return (
    <div className={
      `${isDashboard ? 'px-5 border-b' : ''     /// bg-white border shadow-md rounded-lg
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
          !isDashboard &&
          <SubmenuCarsTitle
            elements={data}
            menuIndex={profileMenuIndex}
            menuIndexRetro={() => profileMenuIndexRetro()}
            menuIndexNext={() => profileMenuIndexNext()}
          />
        }
        <div className="w-fit h-full pl-5 flex flex-row items-center">
          <ButtonTitleCards
            id={`button-title-profile-${profileId}`}
            isData={true}
            buttonType={isDashboard ? 'profile-title-dashboard' : 'profile-title'}
            dataBaseCollection={isDashboard ? '' : data[profileMenuIndex].id}
            shouldRenderButton={true}
          />
        </div>
      </div>
    </div>
  )
};