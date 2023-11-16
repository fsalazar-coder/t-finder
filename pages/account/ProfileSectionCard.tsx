import { useState } from "react";
import { useAuthData, useAuthUI, useUI } from "../../context/authContext";
import SectionTitles from '../components/SectionTitles';
import { IconAdd, IconEdit, IconDelete } from '../../icons/icons';


interface ProfileSectionProps {
  id: string,
  index: number,
  title: string,
  value: string,
  data: [],
  shouldRender: boolean,
}


export default function ProfileSectionCard({ id, index, title, value, data, shouldRender }: ProfileSectionProps) {

  const { setCollectionToChange, setItemIdToChange } = useAuthData();
  const { setProfileModal, setProfileModalAction, setProfileModalType } = useAuthUI();
  const { screenNarrow, setMessageModal, setTypeMessageModal, setTextMessageModal } = useUI();
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
      key={`${index}-${title}`}
      className='w-full relative my-1 flex flex-col bg-white border border-slate-200 rounded-lg'
    >
      {/**section title */}
      <div className={
        `${shouldRender ?
          'border-b border-slate-200' :
          ''} w-full px-5 py-1 lg:py-2 flex flex-row items-center`
      }>
        <SectionTitles
          sectionTitle={title}
          sectionType='account'
        />
        {/**add button */}
        <div className={
          `${!shouldRender ? 'h-full' : 'h-fit'
          } absolute right-0 top-0 px-5 py-1 lg:py-2 flex flex-row justify-end items-center z-20`
        }>
          <button
            className="w-full flex flex-row justify-center items-center hover:cursor-default"
            onClick={() => {
              setProfileModal(true);
              setProfileModalAction('post');
              setProfileModalType(value);
              setCollectionToChange(value);
            }}
          >
            <h3 className='pr-2 text-sm text-slate-400 transition-all'>
              {screenNarrow ? 'Add' : 'Add information'}
            </h3>
            <i className='p-[2px] text-slate-300 lg:hover:text-green-500 text-xl lg:text-2xl flex flex-row justify-center bg-white rounded-full cursor-default lg:cursor-pointer transition-all'>
              <IconAdd />
            </i>
          </button>
        </div>
      </div>
      {/**showing section information */}
      {
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
                        ${index === data.length - 1 ? '' : 'border-b border-slate-200'}
                        w-full relative py-3 flex flex-col bg-white transform transition-all`
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
          </div>
        )
      }
    </li>
  )
};


const EditDeleteButtons = ({ id, icon, elementId, sectionValue, handleClick }: any) => (
  <button
    id={id}
    className="pl-1 flex flex-row justify-center items-center hover:cursor-default transition-all"
    onClick={() => handleClick(elementId, sectionValue)}
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

const ItemContent = ({ element }: any) => {

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
    <ul className='w-full flex flex-col cursor-default lg:hover:cursor-pointer'>
      {
        Object.entries(newElement).map(([key, value]) => (
          key !== ' id' && key !== 'User id' && (
            <li key={key}
              className="w-full"
            >
              <h3 className='text-sm lg:text-base text-slate-600'>
                <strong>{key}:</strong> {typeof value === 'string' ? value : ''}
              </h3>
            </li>
          )))
      }
    </ul>
  )
};