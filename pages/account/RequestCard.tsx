import { useState } from "react";
import { useAuthData, useAuthUI, useUI } from "../../context/authContext";
import SectionTitles from '../components/SectionTitles';
import { IconMenuI, IconAlert, IconAdd, IconEdit, IconDelete, IconCheckCircle, IconCircle } from '../../icons/icons';
import EditDeleteButtons from "./EditDeleteButtons";
import ItemContent from "./ItemContent";


interface RequestProps {
  id: string,
  title: string,
  value: string,
  data: [],
  shouldRender: boolean,
  stepsProcess: []
}


export default function RequestCard({ id, title, value, data, shouldRender, stepsProcess }: RequestProps) {

  const { setCollectionToChange, setItemIdToChange } = useAuthData();
  const { setRequestModal, setRequestModalAction, accountModule, setAccountModule } = useAuthUI();
  const { screenNarrow, setMessageModal, setTypeMessageModal, setTextMessageModal } = useUI();
  const [itemHover, setItemHover] = useState(null);
  const [listHover, setListHover] = useState(false);


  const buttons = [
    {
      id: 'edit-item-profile',
      icon: <IconEdit />,
      click: (requestType: string, elementId: string, value: string) => {
        setRequestModal(requestType);
        setRequestModalAction('edit');
        setCollectionToChange(value);
        setItemIdToChange(elementId);
      },
    },
    {
      id: 'delete-item-profile',
      icon: <IconDelete />,
      click: (elementId: string, value: string) => {
        setMessageModal(true);
        setTypeMessageModal('delete');
        setCollectionToChange(value);
        setItemIdToChange(elementId);
        setTextMessageModal(`Delete this ${value} information with this action`);
      }
    },
  ];


  return (
    <div
      className="w-full h-full flex flex-col bg-color-clear border border-color-border-clear shadow-md rounded-lg"
      onMouseEnter={() => setListHover(true)}
      onMouseLeave={() => setListHover(false)}
    >
      {/**section title */}
      <div className={`${shouldRender && 'border-b border-color-border-clear'} w-full relative px-5 py-1 flex flex-row items-center`}>
        <SectionTitles
          sectionTitle={title}
          sectionType='account'
        />
        {/**add request button */}
        <div className={
          `${!shouldRender ? 'h-full' : 'h-fit'
          } absolute right-0 top-0 px-5 py-1 flex flex-row justify-end items-center z-20`
        }>
          <button
            className="w-full flex flex-row justify-center items-center hover:cursor-default"
            onClick={() => {
              setRequestModal(id);
              setRequestModalAction('post');
              setCollectionToChange(value);
            }}
          >
            <h3 className='pr-2 text-sm text-color-text-tertiary transition-all'>
              {screenNarrow ? 'Add' : 'New request'}
            </h3>
            <i className='p-[2px] text-color-text-tertiary lg:hover:text-green-500 text-xl lg:text-2xl flex flex-row justify-center rounded-full cursor-default lg:cursor-pointer transition-all'>
              <IconAdd />
            </i>
          </button>
        </div>
      </div>
      {
        /**content */
        shouldRender &&
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
                        w-full relative py-3 flex flex-col transform transition-all`
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
                                  requestType={id}
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
      }
    </div>
  )
};