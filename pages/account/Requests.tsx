import { useState } from "react";
import {
  useAuth,
  useRequestModal,
  useAccountModule
} from "../../context/authContext";
import {
  IconAdd,
  IconEdit,
  IconDelete,
  IconCheckCircle
} from '../../icons/icons';
import SectionTitles from '../components/SectionTitles';



export default function Request(props: any) {

  const { auth } = useAuth();
  const { setRequestModal } = useRequestModal();
  const { accountModule } = useAccountModule();

  return (
    accountModule === 'Request' ?
      <div className='w-full h-screen pl-0 lg:pl-60 flex flex-row justify-center items-center'>
        <div className='container w-full h-full pt-14 lg:pt-10 p-5 lg:p-10 flex flex-col items-center transition-all'>
          {/**section title */}
          <div className="w-full p-2 lg:p-5 mb-2 lg:mb-5 bg-white border rounded-lg drop-shadow-md">
            <div className='w-full flex flex-row'>
              <SectionTitles
                sectionTitle='TALENT AND JOB REQUEST'
                sectionSubtitle=''
                sectionType='account'
              />
            </div>
            {/**container content */}
            <div className='w-full flex flex-col items-start list-none transition-all'>
              Your have one talent request and one job request
            </div>
          </div>
          {/**section content */}
          <div className="w-full h-full flex flex-col">
            {/**add new request */}
            <div className='w-full p-2 lg:p-4 my-1 lg:my-2 flex flex-row items-center bg-white border rounded-md drop-shadow-md'>
              <button className="mr-2 lg:mr-4 flex flex-row justify-center items-center">
                <i
                  className='text-green-600 lg:text-gray-400 lg:hover:text-green-500 text-xl lg:text-2xl flex justify-center cursor-default lg:cursor-pointer'
                  onClick={() => setRequestModal(true)}
                >
                  <IconAdd />
                </i>
              </button>
              <h3 className="w-full h-full text-gray-900 text-sm lg:text-base font-normal">
                New Request
              </h3>
            </div>
            {/**active talent request */}
            <div className='w-full p-2 lg:p-4 my-1 lg:my-2 flex flex-row bg-white border rounded-md drop-shadow-md'>
              <div className="h-full mr-2 lg:mr-4 flex flex-col items-center">
                <button className="my-1 flex flex-row justify-center items-center">
                  <i
                    className='text-green-600 lg:text-gray-400 lg:hover:text-green-500 text-xl lg:text-2xl flex justify-center cursor-default lg:cursor-pointer'
                    onClick={() => console.log('Editar talent Request')}
                  >
                    <IconEdit />
                  </i>
                </button>
                <button className="my-1 flex flex-row justify-center items-center">
                  <i
                    className='text-green-600 lg:text-gray-400 lg:hover:text-red-500 text-xl lg:text-2xl flex justify-center cursor-default lg:cursor-pointer'
                    onClick={() => console.log('borrar talent Request')}
                  >
                    <IconDelete />
                  </i>
                </button>
              </div>
              <h3 className="w-full flex-row">
                Talen Request (title)
              </h3>
            </div>
            {/**active job request */}
            <div className='w-full p-2 lg:p-4 my-1 lg:my-2 flex flex-row bg-white border rounded-md drop-shadow-md'>
              <div className="mr-2 lg:mr-4 flex flex-col items-center">
                <button className="my-1 flex flex-row justify-center items-center">
                  <i
                    className='text-green-600 lg:text-gray-400 lg:hover:text-green-500 text-xl lg:text-2xl flex justify-center cursor-default lg:cursor-pointer'
                    onClick={() => console.log('Editar job Request')}
                  >
                    <IconEdit />
                  </i>
                </button>
                <button className="my-1 flex flex-row justify-center items-center">
                  <i
                    className='text-green-600 lg:text-gray-400 lg:hover:text-red-500 text-xl lg:text-2xl flex justify-center cursor-default lg:cursor-pointer'
                    onClick={() => console.log('borrar job Request')}>
                    <IconDelete />
                  </i>
                </button>
              </div>
              <h3 className="w-full flex-row">
                Job Request (title)
              </h3>
            </div>
          </div>
        </div>
      </div>
      :
      ''
  )
};