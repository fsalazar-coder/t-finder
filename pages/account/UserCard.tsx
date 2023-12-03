import { useState, useEffect } from "react";
import { useAuthData, useAuthUI, useUI } from "../../context/authContext";
import { IconMenuI, IconAlert, IconAdd, IconEdit, IconDelete, IconCheckCircle, IconCircle, IconUser } from '../../icons/icons';
import Image from "next/image";


interface RequestProps {
  data: {
    user_id: string,
    profile_image: string,
    full_name: string,
    profession_occupation: string,
    talent_description: string,
    skills_offered: string,
    experience_level: string,
    location: string,
    modality_work: string,
    availability: string,
    preferred_language: string,
    rates: string
  },
  listHover: boolean,
  requestStep: string,
  click: () => void
}


export default function UserCard({ data, listHover, requestStep, click }: RequestProps) {

  const { screenNarrow, setMessageModal, setTypeMessageModal, setTextMessageModal } = useUI();
  const [itemHover, setItemHover] = useState('');

  const userData = [
    { key: 'Profession or occupation', value: data?.profession_occupation },
    { key: 'Location', value: data?.location },
    { key: 'Preferred language', value: data?.preferred_language },
    { key: 'Experience level', value: data?.experience_level },
    { key: 'Skills', value: data?.skills_offered },
    { key: 'Work modality ', value: data?.modality_work },
    { key: 'Availability', value: data?.availability },
    { key: 'Rates', value: data?.rates }
  ];

  const itemHighlighted = itemHover === data?.user_id;

  return (
    <div
      className={
        `${listHover ? itemHighlighted ? 'cursor-pointer z-50' : 'opacity-20 z-0' : 'opacity-100'}
        ${requestStep === 'candidates' ? 'border border-color-border-clear rounded-lg shadow-md' : 'rounded-t-lg'}
          w-full h-full flex flex-col bg-color-clear transform transition-all`}
      onMouseEnter={() => setItemHover(requestStep === 'candidates' ? data?.user_id : '')}
      onMouseLeave={() => setItemHover('')}
    >
      {/**user fullname */}
      <div className="w-full flex px-3 py-1 border-b border-color-border-clear">
        <h2 className='w-fit text-color-primary-clear font-semibold'>
          {data?.full_name}
        </h2>
      </div>
      {/**header */}
      <div className={`${screenNarrow ? 'flex-col-reverse' : 'flex-row justify-between items-center'} w-full p-3 flex`}>
        <ul className={`${screenNarrow ? 'w-full' : 'w-4/5 h-full'} flex flex-wrap`}>
          {
            /**user information */
            userData?.map((element: any, index: any) => {
              return (
                <li key={index} className='w-1/3 py-1 px-2 flex flex-col'>
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
        {/**user profile image */}
        <div className={`${screenNarrow ? 'w-full border-b flex-row justify-between' : 'w-1/5 h-full flex-col pl-3 border-l'} flex items-center border-color-border-clear`}>
          {
            data?.profile_image ?
              <div className='w-36 h-36 mb-3 flex flex-col justify-center items-center'>
                <Image
                  className='w-full h-full flex flex-col justify-center items-center rounded-full'
                  width={800}
                  height={800}
                  src={data?.profile_image}
                  alt='user-image'
                />
              </div>
              :
              <i className='w-full h-full text-6xl text-slate-50 font-light flex flex-row justify-center items-center border border-slate-50 rounded-full transition-all'>
                <IconUser />
              </i>
          }
          {/**select or contact button */}
          <div className={`${screenNarrow ? 'w-2/3' : 'w-full'} h-8 flex flex-row justify-center items-center z-20`}>
            <button
              id='button-user-contact'
              className={
                `${screenNarrow ? 'w-1/2' : 'w-full'} 
                px-4 py-[6px] flex flex-row justify-center items-center rounded-full bg-slate-400 hover:bg-green-500 bg-opacity-40 hover:bg-opacity-100 font-semibold hover:font-bold transition-all`}
              onClick={() => click()}
            >
              <h4 className="h-4 text-color-text-clear text-[14px] flex flex-row items-center">
                {requestStep === 'candidates' ? 'Select' : requestStep === 'selected' && 'Contact'}
              </h4>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
};                  
