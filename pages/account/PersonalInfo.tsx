import { useAuthData, useAuthUI } from "../../context/authContext";
import ImageIconUser from './ImageIconUser';
import SectionTitles from '../components/SectionTitles';
import CardsItems from './CardsItems';
import ButtonDashboardAddInfo from './ButtonDashboardAddInfo';
import ButtonTitleCards from './ButtonTitleCards';



export default function PersonalInfo() {

  const { userId, userProfileData, setCollectionToChange } = useAuthData();
  const { accountModule, setProfileModal, setProfileModalAction } = useAuthUI();

  const isDashboard = accountModule === 'Dashboard';
  const personalInfoData: any = userProfileData.personalInfo;
  const renderPersonalInfoData: boolean = userProfileData?.personalInfo?.length > 0;


  return (
    <div className='w-full h-full flex flex-col border border-color-border bg-white shadow-md rounded-lg'>
      {/**title */}
      <div className='w-full relative px-5 py-1 flex flex-row items-center border-b border-color-border'>
        <div className='w-2/3 flex flex-row'>
          <SectionTitles
            sectionTitle='Personal info...'
            sectionType='account'
          />
        </div>
        <div className="w-1/3 h-full flex flex-row justify-end items-center">
          <ButtonTitleCards
            id={userId as string}
            isData={renderPersonalInfoData}
            buttonType='personal-info'
            dataBaseCollection='personal_info'
            shouldRenderButton={true}
          />
        </div>
      </div>
      {/**profile image */}
      <div className='w-full h-fit px-5 relative flex flex-col justify-center items-center'>
        <div className='w-full py-4 flex flex-row justify-center items-center border-b border-color-border'>
          <div className='w-32 h-32 flex flex-col justify-center items-center'>
            <ImageIconUser
              type='personal-info'
              otherUserImageUrl={''}
            />
          </div>
        </div>
      </div>
      <div className='w-full h-full px-5 flex flex-col transform transition-all' >
        {
          renderPersonalInfoData ?
            /**information */
            <ul className='w-full pt-4 flex flex-col'>
              <CardsItems
                element={personalInfoData[0] as any}
                carsModel='vertical'
              />
            </ul>
            :
            /**button add information */
            <ButtonDashboardAddInfo
              id='post-item-profile'
              comment='Add information'
              click={() => {
                setProfileModal('personal-info');
                setProfileModalAction('post');
                setCollectionToChange('personal_info');
              }}
            />
        }
      </div>
    </div>
  )
};