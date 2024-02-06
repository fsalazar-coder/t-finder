import { useAuth } from "@/context/ContextAuth";
import { useAuthData } from "@/context/ContextAuthData";
import ImageIconUser from './ImageIconUser';
import SectionTitles from '../components/SectionTitles';
import ItemsCards from './ItemsCards';
import ButtonPostUpdateDelete from './ButtonPostUpdateDelete';


export default function PersonalInfo() {
  const { userId } = useAuth();
  const { userProfileData } = useAuthData();
  const personalInfoData: any = userProfileData?.personalInfo;
  const renderPersonalInfoData: boolean = userProfileData?.personalInfo?.length > 0;

  return (
    <div className='w-full h-full pb-4 flex flex-col border border-color-border bg-white shadow-md rounded-lg'>
      {/**title */}
      <div className='w-full relative px-5 py-1 flex flex-row items-center border-b border-color-border'>
        <div className='w-2/3 flex flex-row'>
          <SectionTitles
            sectionTitle='Personal info...'
            sectionType='account'
          />
        </div>
        <div className="w-1/3 h-full flex flex-row justify-end items-center">
          <ButtonPostUpdateDelete
            itemId={userId as string}
            action='update-default'
            buttonType='menu-dashboard'
            dataBaseCollection='personal_info'
            shouldRenderButton={renderPersonalInfoData}
          />
        </div>
      </div>
      {/**profile image */}
      <div className='w-full h-fit px-5 relative flex flex-col justify-center items-center'>
        <div className='w-full py-4 flex flex-row justify-center items-center border-b border-color-border'>
          <div className='w-32 h-32 flex flex-col justify-center items-center'>
            <ImageIconUser
              type='personal-info'
              otherUserImageUrl={'none'}
            />
          </div>
        </div>
      </div>
      <div className={`w-full h-full relative px-5 flex flex-col transform transition-all`} >
        {
          renderPersonalInfoData ?
            /**information */
            <ul className='w-full pt-4 flex flex-col'>
              <ItemsCards
                element={personalInfoData[0] as any}
                carsModel='vertical'
              />
            </ul>
            :
            ///**button add information */
            <ButtonPostUpdateDelete
              itemId='post-item-profile'
              action='post'
              buttonType='post-dashboard'
              dataBaseCollection='personal_info'
              shouldRenderButton={!renderPersonalInfoData}
            />
        }
      </div>
    </div>
  )
};