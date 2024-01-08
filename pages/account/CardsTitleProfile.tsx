import { useEffect, useRef } from "react";
import { useUI } from "@/context/authContext";
import SectionTitles from "../components/SectionTitles";
import SubmenuCarsTitle from "./SubmenuCarsTitle";
import ButtonTitleCards from "./ButtonTitleCards";



export default function CardsTitlesProfile(
  {
    isDashboard,
    data,
    profileId,
    profileMenuIndex,
    profileMenuIndexRetro,
    profileMenuIndexNext,
  }: any) {


  const { screenNarrow } = useUI();
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
      } w-full relative py-1 flex justify-between flex-row items-center border-color-border`
    }>
      <div className='w-full flex flex-row justify-between items-center'>
        <div className='w-2/3 flex flex-row items-center'>
          <div className="pr-5">
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
        </div>
        <div className="w-1/3 h-full relative flex flex-row justify-end items-center">
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