import { useState } from "react";
import { useAuthUI } from "../../context/authContext";
import {
  IconAdd,
  IconEdit,
  IconDelete,
  IconCheckCircle
} from '../../icons/icons';
import SectionTitles from '../components/SectionTitles';



export default function Request(props: any) {

  const { setRequestModal } = useAuthUI();

  const requests = [
    {
      id: '01-request',
      key: '01-request',
      title: 'Talent request',
      comment: 'Your request is been processed',
      content: ''
    },
    {
      id: '02-request',
      key: '02-request',
      title: 'Job request',
      comment: 'Your request is been processed',
      content: ''
    },
  ];

  const buttons = [
    {
      id: 'add-item-profile',
      key: 'add-item-profile',
      title: 'Add',
      value: 'add',
      icon: <IconAdd />,
      click: () => setRequestModal(true)
    },
    {
      id: 'edit-item-profile',
      key: 'edit-item-profile',
      title: 'Edit',
      value: 'edit',
      icon: <IconEdit />,
      click: ''
    },
    {
      id: 'delete-item-profile',
      key: 'delete-item-profile',
      title: 'Delete',
      value: 'delete',
      icon: <IconDelete />,
      click: ''
    },
  ];

  return (
    <div className='w-full h-screen pl-0 lg:px-60 flex flex-row justify-center items-center bg-slate-50'>
      <ul className='container w-full h-full pt-14 lg:pt-10 p-5 lg:p-10 flex flex-col items-center transition-all'>
        {/**title principal*/}
        <li
          key='title-profile'
          id='title-profile'
          className="w-full p-2 lg:p-5 mb-10 lg:mb-7 flex flex-row justify-between items-center bg-white border border-slate-200 rounded-md"
        >
          <div className='w-full flex flex-row'>
            <SectionTitles
              sectionTitle='TALENT AND JOB REQUEST'
              sectionSubtitle=''
              sectionType='account'
            />
          </div>
          {/**add, edit and delete button */}
          <ul className="flex flex-row justify-end items-center">
            {
              buttons.map((button: any, index: any) => {
                return (
                  <li
                    key={button.key}
                    id={button.id}
                    value={button.value}
                    className={
                      `${index !== 2 ?
                        'border-r border-slate-100' :
                        ''} w-16 flex flex-col justify-center items-center`
                    }>
                    <button
                      className="w-full flex flex-row justify-center items-center"
                      onClick={button.click}
                    >
                      <i className={
                        `${button.value === 'delete' ?
                          'text-red-300 lg:hover:text-red-300' :
                          'text-green-300 lg:hover:text-green-300'
                        } w-full px-1 lg:text-slate-200 text-2xl lg:text-3xl flex flex-row justify-center cursor-default lg:cursor-pointer`
                      }>
                        {button.icon}
                      </i>
                    </button>
                    <h3 className="w-full text-sm text-slate-400 font-bold text-center">
                      {button.title}
                    </h3>
                  </li>
                )
              })
            }
          </ul>
        </li>
        {
          /**talent and job requests */
          requests.map((request: any) => {
            return (
              <li
                key={request.id}
                id={request.id}
                className="w-full p-2 lg:p-5 mb-10 lg:mb-7 flex flex-col bg-white border border-slate-200 rounded-lg"
              >
                {/**title */}
                <div className='w-full flex flex-row'>
                  <SectionTitles
                    sectionTitle={request.title}
                    sectionSubtitle=''
                    sectionType='account'
                  />
                </div>
                {/**IA comment */}
                <div className='w-full flex flex-col items-start list-none transition-all'>
                  {request.comment}
                </div>
                {/**showing content */}
                <div className='w-full mt-1 lg:mt-2 flex flex-col'>
                  {request.content}
                </div>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
};