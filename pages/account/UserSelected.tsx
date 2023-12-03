import { useState, useEffect } from "react";
import { useAuthData, useAuthUI, useUI } from "../../context/authContext";
import { IconMenuI, IconAlert, IconAdd, IconEdit, IconDelete, IconCheckCircle, IconCircle, IconUser } from '../../icons/icons';
import ImageIconUser from "./ImageIconUser";
import Image from "next/image";
import SelectedUserActiveInfo from "./ActiveSelectedUserInfo";
import UserCard from "./UserCard";


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



export default function UserSelected({ data, listHover, requestStep, click }: RequestProps) {

  const { screenNarrow, setMessageModal, setTypeMessageModal, setTextMessageModal } = useUI();
  const [userItemMenu, setUserItemMenu] = useState('overview');


  const userInfoMenu = [
    { title: 'Overview', value: 'overview' },
    { title: 'Experience', value: 'experience' },
    { title: 'Education', value: 'education' },
    { title: 'Courses', value: 'courses' },
    { title: 'Publications', value: 'publications' },
    { title: 'Conferences', value: 'conferences' },
    { title: 'Certifications', value: 'certifications' },
    { title: 'Recommendations', value: 'recommendations' },
  ];


  return (
    <div className={`w-full h-full py-2 flex`}>
      {/**user information */}
      <div className="w-full h-full flex flex-col bg-color-clear border border-color-border-clear shadow-md rounded-lg transform transition-all">
        <UserCard
          data={data}
          listHover={listHover}
          requestStep={requestStep}
          click={click}
        />
        {/**submenu: overview, experirince, education, courses, ... */}
        <ul className={`w-full px-5 py-1 flex flex-row items-center border-y border-color-border-clear`}>
          {
            userInfoMenu?.map((itemMenu, index) => {
              return (
                <li
                  key={`item-menu-${index}`}
                  className={`${index === 0 ? 'pr-2' : 'px-2'} border-r border-color-border-clear`}
                >
                  <button
                    className='w-full'
                    value={itemMenu.value}
                    onClick={(e) => {
                      setUserItemMenu(e.currentTarget.value)
                    }}
                  >
                    <h4 className={`${userItemMenu === itemMenu.value ? 'text-color-secondary font-extrabold' : 'text-color-text-secondary font-extralight'} text-xs`}>
                      {itemMenu.title}
                    </h4>
                  </button>
                </li>
              )
            })
          }
        </ul>
        <div className="w-full">
          {
            userItemMenu === 'overview' ?
              <h1 className="w-full py-24 flex flex-row justify-center items-center">
                OVERVIEW
              </h1>
              :
              <SelectedUserActiveInfo
                userId={data?.user_id}
                userItemMenu={userItemMenu}
              />
          }
        </div>
      </div>
    </div>
  )
};