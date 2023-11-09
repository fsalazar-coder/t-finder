import { useState } from "react";
import { useAuthData, useAuthUI, useUI } from "../../context/authContext";
import SectionTitles from '../components/SectionTitles';
import { IconAdd, IconEdit, IconDelete } from '../../icons/icons';


interface ProfileSectionProps {
  id: string,
  key: string,
  title: string,
  value: string,
  sectionName: string,
  collectionName: string,
  data: [],
  shouldRender: boolean,
}


export default function ProfileSectionCard({ id, key, title, value, sectionName, collectionName, data, shouldRender }: ProfileSectionProps) {

  const { setCollectionToChange, setItemIdToChange } = useAuthData();
  const { setProfileModal, setProfileModalAction, setProfileModalType } = useAuthUI();
  const { setMessageModal, setTypeMessageModal, setTextMessageModal } = useUI();
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
        setMessageModal(true);
        setTypeMessageModal('delete');
        setCollectionToChange(sectionValue);
        setItemIdToChange(elementId);
        setTextMessageModal(`Delete this ${sectionValue} information with this action`);
      }
    },
  ];


  return (
    <li
      id={id}
      key={key}
      className='w-full relative p-2 lg:p-5 my-3 lg:my-2 flex flex-col bg-slate-50 border border-white rounded-md drop-shadow-md'
    >
      {/**add button */}
      <div className={
        `${!shouldRender ? 'h-full' : 'h-fit'
        } absolute right-0 top-0 p-2 flex flex-row justify-end items-center z-20`
      }>
        <div
          id='post-item-profile'
          className='flex flex-col justify-center items-center transition-all'>
          <button
            className="w-full flex flex-row justify-center items-center hover:cursor-default"
            onClick={() => {
              value && (() => {
                setProfileModal(true);
                setProfileModalAction('post');
                setProfileModalType(value);
                setCollectionToChange(value);
              })
            }}
          >
            <h3 className='pr-2 text-sm text-slate-400 transition-all'>
              {shouldRender ? 'Add' : 'Add information'}
            </h3>
            <i className='p-[2px] text-slate-300 lg:hover:text-green-500 text-xl lg:text-2xl flex flex-row justify-center bg-white rounded-full cursor-default lg:cursor-pointer transition-all'>
              <IconAdd />
            </i>
          </button>
        </div>
      </div>
      {/**section title */}
      <div className='w-full flex flex-row'>
        <SectionTitles
          sectionTitle={title}
          sectionSubtitle=''
          sectionType='account'
        />
      </div>
      {/**showing information */}
      <div className='w-full mt-1 lg:mt-2 flex flex-col'>
        {shouldRender && (
          <div className='w-full flex flex-col lg:flex-row-reverse lg:justify-between'>
            <ul className='w-full flex flex-col'>
              {
                data?.map((element: any, index: any) => {
                  return (
                    <li key={element._id}
                      className={
                        `${listHover && (itemHover === index ? 'hover:scale-[1.02]' : 'opacity-25')
                        } w-full relative p-1 lg:p-2 my-2 flex flex-col bg-white rounded-md transform transition-all`
                      }
                      onMouseEnter={() => { setItemHover(index); setListHover(true); }}
                      onMouseLeave={() => { setItemHover(null); setListHover(false); }}
                    >
                      <div className="w-full absolute top-0 right-0 p-2 flex flex-row justify-end items-center transition-all z-20">
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
                      <ItemContent
                        element={element as any}
                      />
                    </li>
                  )
                })
              }
            </ul>
          </div>
        )}
      </div>
    </li>
  )
};


const EditDeleteButtons = ({ id, icon, elementId, sectionValue, handleClick }: any) => (
  <button
    id={id}
    className="pl-1 flex flex-row justify-center items-center hover:cursor-default transition-all"
    onClick={() => {
      handleClick(elementId, sectionValue);
      console.log('Section value: ', sectionValue)
    }}
  >
    <i className={
      `${id === 'edit-item-profile' ?
        'text-green-300 lg:text-slate-300 lg:hover:text-green-500' :
        'text-red-300 lg:text-slate-300 lg:hover:text-red-500'
      } text-xl lg:text-2xl flex flex-row justify-center bg-white rounded-full cursor-default lg:cursor-pointer animate-[appear_0.7s_ease] transition-all`
    }
    >
      {icon}
    </i>
  </button>
);

const ItemContent = ({ element, itemHover, buttonHidden }: any) => {

  function formatKeys(element: any) {
    const formattedElement: Record<string, any> = {};
    for (const key in element) {
      const formattedKey = key
        .split('_')
        .map((word, index) => {
          if (index === 0) {
            return word.charAt(0).toUpperCase() + word.slice(1); // Capitaliza la primera palabra
          }
          else {
            return word.charAt(0).toLowerCase() + word.slice(1); // Mantén las otras palabras en minúscula
          }
        })
        .join(' ');
      formattedElement[formattedKey] = element[key];
    }
    return formattedElement;
  }


  let newElement = formatKeys(element)

  return (
    <ul className='w-full p-2 flex flex-col cursor-default lg:hover:cursor-pointer'>
      {
        Object.entries(newElement).map(([key, value]) => (
          key !== ' id' && key !== 'User id' && (
            <li key={key}
              className=""
            >
              <h3 className='text-sm lg:text-base text-slate-600'>
                <strong>{key}:</strong> {typeof value === 'string' ? value : ''}
              </h3>
            </li>)
        ))
      }
    </ul>
  )
};
