import { useState, useEffect } from "react";
import { useAuthData, useAuthUI, useUI } from "../../context/authContext";
import { userDataHandlerFunction } from "../api/userDataHandlerFunction";
import { IconUser, IconEdit, IconDelete, IconUserSearchLine } from '../../icons/icons';
import EditDeleteButtons from "./EditDeleteButtons";
import CandidateSelectedActiveInfo from "./CandidateSelectedActiveInfo";
import Image from "next/image";

interface UserCardParams {
  data: { [key: string]: string },
  userCardType: string,
  requestMenu: string,
  listHover: boolean,
  itemHover: null,
  indexCard: number,
  goClickCondition: boolean,
  goClickTitleEnabled: string,
  goClickTitleDisabled: string,
  value: string,
  goClick: (e: any) => void,
}

interface DataUser {
  user_id: string,
  user_name: string,
  user_image: string
}


export default function UserCard({ data, userCardType, requestMenu, listHover,
  itemHover, indexCard, goClickCondition, goClickTitleEnabled, goClickTitleDisabled, value, goClick }: UserCardParams) {
  const { token, userId, setCollectionToChange, setItemIdToChange, setUpdate } = useAuthData();
  const { setRequestModal, setRequestModalAction, setChatActived, setChatDataUser } = useAuthUI();
  const { screenNarrow, setMessageModal } = useUI();
  const [itemReviewMenu, setItemReviewMenu] = useState('overview');
  const [isRequestContactAccepted, setIsRequestContactAccepted] = useState(false);
  const [isGoClickDisabled, setIsGoClickDisabled] = useState(true);
  const [goClickTitle, setGoClickTitle] = useState('');

  const requestTalentData = [
    { key: 'Required talent', value: data?.job_category },
    { key: 'Required experience level', value: data?.experience_level },
    { key: 'Company name', value: data?.company_info },
    { key: 'Description job', value: data?.job_title },
    { key: 'Required experience years', value: data?.experience_years },
    { key: 'Location', value: data?.location },
    { key: 'Modality work', value: data?.modality_work },
    { key: 'Required skills', value: data?.skills_required },
    { key: 'Compensation', value: data?.compensation },
  ];

  const requestJobData = [
    { key: 'Profession or talent', value: data?.talent_category },
    { key: 'Request created date', value: data?.created_at },
    { key: 'Description talent', value: data?.talent_title },
    { key: 'Location', value: data?.location },
    { key: 'Experience level', value: data?.experience_level },
    { key: 'Offered skills', value: data?.skills_offered },
    { key: 'Work modality', value: data?.modality_work },
    { key: 'Availability', value: data?.availability },
    { key: 'Rates', value: data?.rates },
  ];

  const candidateData = [
    { key: 'Profession or occupation', value: data?.profession_occupation },
    { key: 'Location', value: data?.location },
    { key: 'Preferred language', value: data?.preferred_language },
    { key: 'Experience level', value: data?.experience_level },
    { key: 'Skills', value: data?.skills_offered },
    { key: 'Work modality ', value: data?.modality_work },
    { key: 'Availability', value: data?.availability },
    { key: 'Rates', value: data?.rates },
    { key: 'Profile score', value: data?.profile_score },


  ];

  const buttonsEditDeleteRequest = [
    {
      id: 'edit-item-request',
      icon: <IconEdit />,
      click: (requestType: string, elementId: string, value: string) => {
        setRequestModal(requestType);
        setRequestModalAction('edit');
        setCollectionToChange(value);
        setItemIdToChange(elementId);
      },
    },
    {
      id: 'delete-item-request',
      icon: <IconDelete />,
      click: (elementId: string, sectionValue: string) => {
        setMessageModal([{
          type: 'delete',
          text: `Delete this request with this action`,
          click: () => {
            let collectionName = sectionValue;
            let itemIdToChange: string = elementId;
            userDataHandlerFunction({
              token: token as string,
              userId: collectionName === 'personal_info' ? userId as string : itemIdToChange,
              action: 'delete',
              collectionName: collectionName,
              data: '',
              onSuccess: (status: string) => {
                status === 'success' &&
                  setTimeout(() => {
                    setUpdate(sectionValue);
                    setMessageModal([{
                      type: 'successful',
                      text: `This request has been deleted`,
                      click: () => setMessageModal([])
                    }])
                  }, 500);
              },
              onError: (error: any) => console.error(error)
            });
            setMessageModal([])
          }
        }]);
      }
    },
  ];

  const dataModule: any = {
    'talent request': requestTalentData,
    'job request': requestJobData,
    'offers': requestTalentData,
    'candidates': candidateData,
    'candidate review': candidateData,
  };

  const collectionModule: any = {
    'talent request': 'request_talent',
    'job request': 'request_job',
  };

  const dataToRender = dataModule[userCardType];
  const activedCollection = collectionModule[userCardType];
  const isCardTypeSubmitted = userCardType === 'talent request' || userCardType === 'job request';
  const isRequestMenuReview = requestMenu === 'candidate review';
  const isEditDeleteButton = isCardTypeSubmitted && (listHover && (itemHover === indexCard));

  const candidateReviewMenu = [
    { title: 'Overview', value: 'overview' },
    { title: 'Experience', value: 'experience' },
    { title: 'Education', value: 'education' },
    { title: 'Courses', value: 'courses' },
    { title: 'Publications', value: 'publications' },
    { title: 'Conferences', value: 'conferences' },
    { title: 'Certifications', value: 'certifications' },
    { title: 'Recommendations', value: 'recommendations' },
  ];

  useEffect(() => {
    if (requestMenu === 'candidate review') {
      let requestJobId = data.request_job_id;
      userDataHandlerFunction({
        token: token as string,
        userId: userId as string,
        action: 'get-request-contact-accepted',
        collectionName: 'notifications',
        data: requestJobId,
        onSuccess: (responseData: any) => {
          let isOfferAccepted = responseData.length !== 0;
          setIsRequestContactAccepted(isOfferAccepted);
        },
        onError: (error: any) => console.error(error)
      });
    }
  }, [token, userId, requestMenu]);

  useEffect(() => {
    let disabled = true;
    let title = '';
    switch (requestMenu) {
      case 'talent submitted':
        disabled = goClickCondition;
        title = goClickCondition ? 'Awaiting candidates' : 'Candidates';
        break;
      case 'job submitted':
        disabled = goClickCondition;
        title = goClickCondition ? 'Awaiting offers' : 'Offers';
        break;
      case 'candidates':
        disabled = false;
        title = 'Review';
        break;
      case 'offers':
        disabled = false;
        title = goClickCondition ? 'Chat' : 'Acceptance';
        break;
      case 'candidate review':
        if (goClickCondition) {
          disabled = !isRequestContactAccepted;
          title = isRequestContactAccepted ? 'Chat' : 'Contacting';
        }
        else {
          disabled = false;
          title = 'Contact';
        }
        break;
      default:
        //disabled = true; // or some default value
        //title = ''; // or some default value
        break;
    };
    setIsGoClickDisabled(disabled);
    setGoClickTitle(title);
  }, [requestMenu, goClickCondition, isRequestContactAccepted]);



  const goToClick: any = () => {
    switch (requestMenu) {
      case 'candidates':
        return goClick(data.user_id);
      case 'offers':
        if (goClickTitle === 'Chat') {
          let dataUser: DataUser = {
            user_id: data?.user_id,
            user_name: data?.full_name,
            user_image: data?.profile_image
          };
          setChatDataUser(dataUser);
          setChatActived(true);
        }
        else {
          return goClick(data.user_id);
        }
        break;
      case 'candidate review':
        if (goClickTitle === 'Chat') {
          let dataUser: DataUser = {
            user_id: data?.user_id,
            user_name: data?.full_name,
            user_image: data?.profile_image
          };
          setChatDataUser(dataUser);
          setChatActived(true);
        }
        else {
          return goClick(data.request_job_id);
        }
        break;
      default:
        return goClick(value);
    }
  }

  useEffect(() => {
    if (requestMenu === 'offers') {
      console.log('data offer acepted: ', data)
    }
  }, [requestMenu])


  return (
    <>
      {/**user fullname */}
      <div className="w-full flex pb-1 border-b border-color-border-clear">
        <h2 className='w-fit text-color-primary-clear font-semibold'>
          {data?.full_name || requestTalentData[0].value || requestJobData[0].value}  {/** userCardType === 'candidates' ? data?.full_name : 'data?.talent_category' */}
        </h2>
      </div>
      {
        /**edit delete buttons */
        isEditDeleteButton &&
        <div className="w-full absolute top-1 right-5 py-2 flex flex-row justify-end items-center transition-all z-20">
          {
            buttonsEditDeleteRequest.map((button: any) => {
              return (
                <EditDeleteButtons
                  id={button.id}
                  key={button.key}
                  icon={button.icon}
                  elementId={data._id}
                  collection={activedCollection}
                  handleClick={button.click}
                />
              )
            })
          }
        </div>
      }
      {/**header */}
      <div className={
        `${screenNarrow ? !isCardTypeSubmitted ? 'flex-col-reverse' : 'flex-row justify-between' : 'flex-row justify-between'
        } w-full flex py-1 items-center`
      }>
        <div className={`${screenNarrow ? 'w-full' : 'w-4/5 h-full'} flex flex-col`}>
          <ul className={`w-full flex flex-wrap cursor-default lg:hover:cursor-pointer`}>
            {
              /**user information to render*/
              dataToRender?.map((element: any, index: any) => {
                return (
                  <li key={index} className='w-1/3 py-1 flex flex-col'>
                    <h4 className='w-full text-color-text-secondary text-sm font-semibold'>
                      {element.value}
                    </h4>
                    <h5 className='w-full text-color-text-tertiary text-xs'>
                      {element.key}
                    </h5>
                  </li>
                )
              })
            }
          </ul>
        </div>
        <div className={`${screenNarrow ? 'w-full border-b flex-row justify-center' : 'w-1/5 h-full flex-col justify-center'} flex items-center border-color-border-clear`}>
          {
            isCardTypeSubmitted ?
              <i className='w-28 h-28 my-2 text-6xl text-slate-100 flex flex-row justify-center items-center border border-slate-100 rounded-full transition-all'>
                <IconUserSearchLine />
              </i>
              :
              /**user profile image */
              data?.profile_image ?
                <div className='w-32 h-32 my-2 flex flex-row justify-center'>
                  <Image
                    className='w-full h-full flex flex-col justify-center items-center rounded-full'
                    width={800}
                    height={800}
                    src={data?.profile_image}
                    alt='user-image'
                  />
                </div>
                :
                <i className='w-28 h-28 my-2 text-6xl text-slate-100 flex flex-row justify-center items-center border border-slate-100 rounded-full transition-all'>
                  <IconUser />
                </i>
          }
          {/**buttons go to: candidates, offers or rivew */}
          <div className={`${screenNarrow ? 'w-1/2 pl-3' : 'w-full'} h-fit flex flex-row justify-end`}>
            <button
              id='button-go-to'
              className={
                `${isGoClickDisabled ? 'bg-slate-400 bg-opacity-40'
                  : 'bg-green-400 hover:bg-green-500 bg-opacity-40 hover:bg-opacity-100'
                } w-full px-4 py-2 flex flex-row justify-center items-center rounded-lg font-semibold transition-all`}
              disabled={isGoClickDisabled}
              onClick={() => goToClick()}
            >
              <h4 className="h-4 text-color-text-clear text-[14px] flex flex-row items-center">
                {goClickTitle}
              </h4>
            </button>
          </div>
        </div>
      </div>
      {
        /**submenu: overview, experience, education, courses, ... */
        isRequestMenuReview &&
        <>
          <div className="w-full">
            <ul className={`w-full px-2 py-1 flex flex-row items-center border-y border-color-border-clear`}>
              {
                candidateReviewMenu?.map((itemMenu, index) => {
                  return (
                    <li
                      key={`item-menu-${index}`}
                      className={`${index === 0 ? 'pr-2' : 'px-2'} border-r border-color-border-clear`}
                    >
                      <button
                        className='w-full'
                        value={itemMenu.value}
                        onClick={(e) => {
                          setItemReviewMenu(e.currentTarget.value)
                        }}
                      >
                        <h4 className={`${itemReviewMenu === itemMenu.value ? 'text-color-secondary font-extrabold' : 'text-color-text-secondary font-extralight'} text-xs`}>
                          {itemMenu.title}
                        </h4>
                      </button>
                    </li>
                  )
                })
              }
            </ul>
          </div>
          <div className="w-full flex flex-col">
            {
              itemReviewMenu === 'overview' ?
                <h1 className="w-full py-24 flex flex-row justify-center items-center">
                  OVERVIEW
                </h1>
                :
                <CandidateSelectedActiveInfo
                  userId={data?.user_id}
                  itemReviewMenu={itemReviewMenu}
                />
            }
          </div>
        </>
      }
    </>
  )
};


