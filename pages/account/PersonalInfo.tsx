import { useState, useEffect } from 'react';
import { useAuthData, useAuthUI } from "../../context/authContext";
import { userDataHandlerFunction } from '../api/userDataHandlerFunction';
import ImageIconUser from './ImageIconUser';
import SectionTitles from '../components/SectionTitles';
import CardsItems from './CardsItems';
import ButtonDashboardAddInfo from './ButtonDashboardAddInfo';
import ButtonTitleCards from './ButtonTitleCards';



export default function PersonalInfo() {

  const { token, userId, setCollectionToChange, update, setUpdate } = useAuthData();
  const { accountModule, setProfileModal, setProfileModalAction, setProfileModalType } = useAuthUI();
  const [personalInfoData, setPersonalInfoData] = useState<{}>({});

  const fetchData = async () => {
    userDataHandlerFunction({
      token: token as string,
      userId: userId as string,
      action: 'get',
      collectionName: 'personal_info',
      data: '',
      onSuccess: (responseData: any) => {
        setPersonalInfoData(responseData);
        console.log('Response data: ', responseData)
      },
      onError: (error: any) => console.error(error)
    });
  };

  useEffect(() => {
    if (accountModule === 'Dashboard' || update === 'personal_info') {
      fetchData();
      if (update === 'personal_info') {
        setUpdate('');
        setCollectionToChange('');
      }
    }
  }, [token, userId, update, accountModule]);

  const isDashboard = accountModule === 'Dashboard';
  const renderPersonalInfoData: boolean = Object.keys(personalInfoData).length > 0;


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
        <div className="w-1/3 h-full relative flex flex-row justify-end items-center">
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
              toUserId={userId as string}
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
                element={personalInfoData as any}
                carsModel='vertical'
              />
            </ul>
            :
            /**button add information */
            <ButtonDashboardAddInfo
              id='post-item-profile'
              isDashboard={isDashboard}
              comment='Add information'
              click={() => {
                setProfileModal(true);
                setProfileModalAction('post');
                setProfileModalType('personal information');
                setCollectionToChange('personal_info');
              }}
            />
        }
      </div>
    </div>
  )
};