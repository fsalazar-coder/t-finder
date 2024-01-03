import { useEffect, useRef } from "react";
import SectionTitles from "../components/SectionTitles";
import ButtonTitleMenuAddEdit from "./ButtonTitleMenuAddEdit";
import SubmenuCarsTitle from "./SubmenuCarsTitle";



export default function CardsTitlesProfile(
  {
    screenNarrow,
    isDashboard,
    userType,
    data,
    profileId,
    cardHover,
    profileMenuIndex,
    profileMenuIndexRetro,
    profileMenuIndexNext,
    openModalFormClick,
  }: any) {

  const menuProfileRef = useRef(null);
  const menuProfileSelected: any = menuProfileRef.current;
  const isCandidateUser: boolean = userType === 'candidate';


  useEffect(() => {
    let movingPositionX: number = (112 * profileMenuIndex);
    if (menuProfileSelected) {
      menuProfileSelected.style.transition = 'all 0.5s ease-in';
      menuProfileSelected.style.transform = `translateX(-${movingPositionX}px)`;
    }
  }, [profileMenuIndex]);


  return (
    <div className={
      `${isDashboard ? 'border-b' : 'bg-white border shadow-md rounded-lg'
      } w-full relative px-5 py-1 flex justify-between flex-row items-center border-color-border`
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
        {
          !isCandidateUser &&
          <div className="w-1/3 h-full relative flex flex-row justify-end items-center">
            <ButtonTitleMenuAddEdit
              id={`button-title-profile-${profileId}`}
              isData={data.shouldRender}
              isDashboard={isDashboard}
              cardHover={cardHover}
              screenNarrow={screenNarrow}
              addButtonName={`New ${profileId}`}
              openAccountModuleClick={() => { }}
              openModalFormClick={() => openModalFormClick()}
            />
          </div>
        }
      </div>
    </div>
  )
};