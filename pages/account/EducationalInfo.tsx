import { useAuthData, useAuthUI, useUI } from "../../context/authContext";
import { IconAdd, IconEdit, IconDelete } from '../../icons/icons';



export default function EducationalInfo(props: any) {

  const { userEducationalInfo } = useAuthData();
  const { setEducationalInfoModal } = useAuthUI();
  const { setMessageModal, setTypeMessageModal, setTextMessageModal } = useUI();

  const educationalInfo = [
    { title: 'Fullname:', description: userEducationalInfo?.degree },
    { title: 'Profession or ocupation:', description: userEducationalInfo?.major_field_study },
    { title: 'Preferred language:', description: userEducationalInfo?.university_school },
    { title: 'Location:', description: userEducationalInfo?.graduation_year },
  ];

  const handleDeleteEducationalInfo = () => {
    setMessageModal(true);
    setTypeMessageModal('delete');
    setTextMessageModal('Delete your personal information with this action');
  }


  return (
    <div className='w-full flex flex-col lg:flex-row-reverse lg:justify-between'>
      {/**educational information */}
      <div className='w-full p-1 lg:p-2 lg:mr-1 flex flex-col bg-white rounded-md'>
        {
          userEducationalInfo ?
            <>
              {/**edit and delete button */}
              <div className="w-full flex flex-row justify-end items-center">
                <button className="flex flex-row justify-center items-center">
                  <i
                    className='px-1 text-green-300 lg:text-slate-200 lg:hover:text-green-300 text-xl lg:text-2xl flex justify-center cursor-default lg:cursor-pointer'
                    onClick={() => setEducationalInfoModal(true)}
                  >
                    <IconEdit />
                  </i>
                </button>
                <button className="flex flex-row justify-center items-center">
                  <i
                    className='px-1 text-green-300 lg:text-slate-200 lg:hover:text-red-300 text-xl lg:text-2xl flex justify-center cursor-default lg:cursor-pointer'
                    onClick={() => handleDeleteEducationalInfo()}>
                    <IconDelete />
                  </i>
                </button>
              </div>
              {/**personal information */}
              <ul className='w-full px-2 flex flex-col'>
                {
                  educationalInfo.map((element: any, index: any) => {
                    return (
                      /**full name, profession or occupation, preferred language, location and personal description */
                      <li
                        key={index}
                        className='w-full flex flex-row items-center'
                      >
                        <h3 className='text-sm lg:text-base text-slate-600'>
                          <strong>{element.title}</strong>  {element.description}
                        </h3>
                      </li>
                    )
                  })
                }
              </ul>
            </>
            :
            /**add information */
            <div className="w-full flex flex-row justify-end">
              <div className="px-1 flex flex-col justify-center">
                <h3 className='text-[1rem]'>
                  Add educational information
                </h3>
              </div>
              <button className="flex flex-row justify-center items-center">
                <i
                  className='px-1 text-green-300 lg:text-slate-200 lg:hover:text-green-300 text-xl lg:text-2xl flex justify-center cursor-default lg:cursor-pointer'
                  onClick={() => setEducationalInfoModal(true)}
                >
                  <IconAdd />
                </i>
              </button>
            </div>
        }
      </div>
    </div>
  )
};