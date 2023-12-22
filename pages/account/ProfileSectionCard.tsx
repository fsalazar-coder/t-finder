import { useState } from "react";
import { useAuthData, useAuthUI, useUI } from "../../context/authContext";
import SectionTitles from '../components/SectionTitles';
import { IconAdd, IconEdit, IconDelete } from '../../icons/icons';
import ItemContent from "./ItemContent";
import EditDeleteButtons from "./EditDeleteButtons";
import ButtonTitleMenuAddEdit from "./ButtonTitleMenuAddEdit";
import { userDataHandlerFunction } from "../api/userDataHandlerFunction";



interface ProfileSectionProps {
  id: string,
  title: string,
  value: string,
  data: [],
  shouldRender: boolean,
}


export default function ProfileSectionCard({ id, title, value, data, shouldRender }: ProfileSectionProps) {

  const { token, userId, setCollectionToChange, setItemIdToChange, setUpdate } = useAuthData();
  const { setProfileModal, setProfileModalAction, setProfileModalType } = useAuthUI();
  const { screenNarrow, setMessageModal } = useUI();
  const [itemHover, setItemHover] = useState(null);
  const [listHover, setListHover] = useState(false);


  const buttons = [
    {
      id: 'edit-item-profile',
      icon: <IconEdit />,
      click: (elementId: string, sectionValue: string) => {
        setProfileModal(true);
        setProfileModalAction('edit');
        setProfileModalType(sectionValue);
        setCollectionToChange(sectionValue);
        setItemIdToChange(elementId);
      },
    },
    {
      id: 'delete-item-profile',
      icon: <IconDelete />,
      click: (elementId: string, sectionValue: string) => {
        console.log('section Value profile: ', sectionValue)
        setMessageModal([{
          type: 'delete',
          text: `Delete this ${sectionValue} information with this action`,
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
                    console.log('section value to Update profile: ', sectionValue)
                    setMessageModal([{
                      type: 'successful',
                      text: `This ${sectionValue} information has been deleted`,
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


  return (
    <>
      {/**section title */}
      <div className={
        `${shouldRender ?
          'border-b border-color-border-clear' :
          ''} w-full px-5 py-1 lg:py-2 flex flex-row justify-between items-center`
      }>
        <SectionTitles
          sectionTitle={title}
          sectionType='account'
        />
        <ButtonTitleMenuAddEdit
          id={`button-title-profile-${title}`}
          isRequest={shouldRender}
          isDashboard={false}
          cardHover={false}
          screenNarrow={screenNarrow}
          addButtonName={`New ${id}`}
          openAccountModule={() => { }}
          openModalForm={() => {
            setProfileModal(true);
            setProfileModalAction('post');
            setProfileModalType(value);
            setCollectionToChange(value);
          }}
        />
      </div>
      {/**showing section information */
        shouldRender && (
          <div className='w-full px-5 py-1 flex flex-col'>
            <div className='w-full flex flex-col lg:flex-row-reverse lg:justify-between'>
              <ul className='w-full flex flex-col'>
                {
                  data?.map((element: any, index: any) => {
                    return (
                      <li key={element._id}
                        className={
                          `${listHover && (itemHover === index ? '' : 'opacity-25')
                          } 
                        ${index === data.length - 1 ? '' : 'border-b border-color-border-clear'}
                        w-full relative py-3 flex flex-col bg-color-clear transform transition-all`
                        }
                        onMouseEnter={() => { setItemHover(index); setListHover(true); }}
                        onMouseLeave={() => { setItemHover(null); setListHover(false); }}
                      >
                        <div className="w-full absolute top-0 right-0 py-2 flex flex-row justify-end items-center transition-all z-20">
                          {
                            (listHover) && (itemHover === index) && (
                              buttons.map((button: any) => {
                                return (
                                  <EditDeleteButtons
                                    id={button.id}
                                    key={button.key}
                                    icon={button.icon}
                                    elementId={element._id}
                                    sectionValue={value}
                                    handleClick={button.click}
                                  />
                                )
                              })
                            )
                          }
                        </div>
                        <ItemContent element={element as any} />
                      </li>
                    )
                  })
                }
              </ul>
            </div>
          </div>
        )
      }
    </>
  )
};
