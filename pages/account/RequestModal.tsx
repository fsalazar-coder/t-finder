import React, { useState, useEffect, useRef } from 'react';
import { useAuthData, useAuthUI, useUI } from "../../context/authContext";
import { userDataHandlerFunction } from '../api/userDataHandlerFunction';
import { IconCancel } from '../../icons/icons';
import FormTemplate from './FormTemplate';


const initialUserRequestData = {
  /**request talent information: */
  jobDescription: '',
  jobCategory: '',
  requiredSkills: '',
  requiredExperienceYears: '',
  jobLocation: '',
  offeredWorkModality: '',
  offeredCompensation: '',
  companyInfo: '',
  /**job talent information: */
  talentCategory: '',
  talentDescription: '',
  offeredSkills: '',
  experienceYears: '',
  prefiredWorkModality: '',
  availability: '',
  location: '',
  desiredCompensation: '',
};



export default function RequestModal(props: any) {

  const { screenNarrow, setMessageModal, setLoading } = useUI();
  const { token, userId, collectionToChange, itemIdToChange, setUpdate } = useAuthData();
  const { requestModal, setRequestModal, requestModalAction, setRequestModalAction } = useAuthUI();
  const [filledForm, setFilledForm] = useState(false);

  const carouselFormRef: any = useRef(null);
  const carouselFormSelected: any = carouselFormRef.current;
  const [carouselFormPosition, setCarouselFormPosition] = useState(Number);
  const [carouselTranslateX, setCarouselTranslateX] = useState(Number);

  const [userRequestDataUpdate, setUserRequestDataUpdate] = useState(initialUserRequestData);

  const [changeUserRequestDataUpdate, setChangeUserrequestDataUpdate] = useState({
    /**request talent information: */
    jobDescription: '',
    jobCategory: '',
    requiredSkills: '',
    requiredExperienceYears: '',
    jobLocation: '',
    offeredWorkModality: '',
    offeredCompensation: '',
    companyInfo: '',
    /**job talent information: */
    talentCategory: '',
    talentDescription: '',
    offeredSkills: '',
    experienceYears: '',
    prefiredWorkModality: '',
    availability: '',
    location: '',
    desiredCompensation: '',
  });

  const handleChangeData = (e: any) => {
    const { name, value } = e.target;
    setUserRequestDataUpdate({ ...userRequestDataUpdate, [name]: value });
  };

  const handleCloseModal = (e: any) => {
    setRequestModal('');
    setCarouselFormPosition(0);
    setFilledForm(false);
  }

  const dataUpdate = (requestToChange: string) => {
    const data = {
      requestTalent: {
        title: userRequestDataUpdate.jobCategory,
        job_category: userRequestDataUpdate.jobCategory,
        job_description: userRequestDataUpdate.jobDescription,
        required_skills: userRequestDataUpdate.requiredSkills,
        required_experience_years: userRequestDataUpdate.requiredExperienceYears,
        modality_work: userRequestDataUpdate.offeredWorkModality,
        company_name: userRequestDataUpdate.companyInfo,
        location: userRequestDataUpdate.jobLocation,
        offeredCompensation: userRequestDataUpdate.offeredCompensation,
      },
      requestJob: {
        title: userRequestDataUpdate.talentCategory,
        talent_category: userRequestDataUpdate.talentCategory,
        talent_description: userRequestDataUpdate.talentDescription,
        offered_skills: userRequestDataUpdate.offeredSkills,
        experience_years: userRequestDataUpdate.experienceYears,
        modality_work: userRequestDataUpdate.prefiredWorkModality,
        availability: userRequestDataUpdate.availability,
        location: userRequestDataUpdate.location,
        desiredCompensation: userRequestDataUpdate.desiredCompensation,
      },
    };
    let dataToApi;
    requestToChange === 'request_talent' ?
      dataToApi = data['requestTalent' as keyof typeof data] : dataToApi = data['requestJob' as keyof typeof data]
    return dataToApi;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const actionUserId: any = requestModalAction === 'post' ? userId : itemIdToChange;
    const textMessage = `Your request have been ${requestModalAction === 'post' ? 'posted' : 'uploaded'}`;

    try {
      await userDataHandlerFunction({
        token: token as string,
        userId: actionUserId,
        action: requestModalAction,
        collectionName: collectionToChange,
        data: dataUpdate(collectionToChange),
        onSuccess: () => {
          setUpdate(collectionToChange);
          setMessageModal([{
            type: 'successful',
            text: textMessage,
            click: () => setMessageModal([])
          }]);
        },
        onError: (error: any) => console.error(error)
      });
    }
    catch (error) {
      console.error('Error in handleSubmit (Modal-profile):', error);
    }
    finally {
      setLoading(false);
      setRequestModal('');
      setRequestModalAction('');
    }
  };

  /**carousel transition effect control */
  useEffect(() => {
    setCarouselTranslateX(carouselFormPosition * (screenNarrow ? 256 : 352));
    if (carouselFormSelected) {
      carouselFormSelected.style.transition = 'all 1s ease';
      carouselFormSelected.style.transform = `translateX(-${carouselTranslateX}px)`;
    }
  });

  /**fill form control */
  useEffect(() => {
    let dataTalentUnfilled = Object.values(userRequestDataUpdate).some(value => value === '');
    let dataJobUnfilled = Object.values(userRequestDataUpdate).some(value => value === '');
    if (requestModal === 'Talent' && dataTalentUnfilled) {
      setFilledForm(false);
    }
    else if (requestModal === 'Job' && dataJobUnfilled) {
      setFilledForm(false);
    }
    else {
      setFilledForm(true);
    }
  });

  /**inputs for talent form */
  const talentInput = [
    {
      type: 'select',
      title: 'Job Category',
      value: 'jobCategory',
      options: [
        { value: 'Administrator', title: 'Administrator' },
        { value: 'Lawyer', title: 'Lawyer' },
        { value: 'Designer', title: 'Designer' },
        { value: 'Programmer', title: 'Programmer' },
        { value: 'Chemical', title: 'Chemical' },
        { value: 'Industrial engineer', title: 'Industrial engineer' },
        { value: 'Electrician', title: 'Electrician' },
        { value: 'Plumber', title: 'Plumber' },
        { value: 'Driver', title: 'Driver' },
        { value: 'Construction worker', title: 'Construction worker' },
        { value: 'Gardener', title: 'Gardener' },
      ]
    },
    { type: 'text', title: 'Job Description', value: 'jobDescription' },
    {
      type: 'select',
      title: 'Required experience years',
      value: 'requiredExperienceYears',
      options: [
        { value: '0-2', title: '0-2' },
        { value: '2-5', title: '2-5' },
        { value: '5-10', title: '5-10' },
        { value: '+10', title: '+10' },
      ]
    },
    { type: 'text', title: 'Required skills', value: 'requiredSkills' },
    { type: 'text', title: 'Job location', value: 'jobLocation' },
    {
      type: 'select',
      title: 'Modality Work',
      value: 'offeredWorkModality',
      options: [
        { value: 'Remote', title: 'Remote' },
        { value: 'On-site', title: 'On-site' },
        { value: 'Flexible', title: 'Flexible' },
      ]
    },
    { type: 'text', title: 'Offered compensation (USD)', value: 'offeredCompensation' },
    { type: 'text', title: 'Company Info', value: 'companyInfo' }
  ];

  /**inputs for job form */
  const jobInput = [
    {
      type: 'select',
      title: 'Talent Category',
      value: 'talentCategory',
      options: [
        { value: 'Administrator', title: 'Administrator' },
        { value: 'Lawyer', title: 'Lawyer' },
        { value: 'Designer', title: 'Designer' },
        { value: 'Programmer', title: 'Programmer' },
        { value: 'Chemical', title: 'Chemical' },
        { value: 'Industrial engineer', title: 'Industrial engineer' },
        { value: 'Electrician', title: 'Electrician' },
        { value: 'Plumber', title: 'Plumber' },
        { value: 'Driver', title: 'Driver' },
        { value: 'Construction worker', title: 'Construction worker' },
        { value: 'Gardener', title: 'Gardener' },
      ]
    },
    { type: 'text', title: 'Talent Description', value: 'talentDescription' },
    { type: 'text', title: 'Offered skills', value: 'offeredSkills' },
    {
      type: 'select',
      title: 'Experience years',
      value: 'experienceYears',
      options: [
        { value: '0-2', title: '0-2' },
        { value: '2-5', title: '2-5' },
        { value: '5-10', title: '5-10' },
        { value: '+10', title: '+10' },
      ]
    },
    {
      type: 'select',
      title: 'Prefered modality work',
      value: 'preferedWorkModality',
      options: [
        { value: 'Remote', title: 'Remote' },
        { value: 'On-site', title: 'On-site' },
        { value: 'Flexible', title: 'Flexible' },
      ]
    },
    {
      type: 'select',
      title: 'Availability',
      value: 'availability',
      options: [
        { value: 'Full-time', title: 'Full-time' },
        { value: 'Part-time', title: 'Part-time' },
        { value: 'Freelance', title: 'Freelance' },
      ]
    },
    { type: 'text', title: 'Location', value: 'location' },
    { type: 'text', title: 'Desired compensation', value: 'desiredCompensation' },
  ];

  const showRequestModal = requestModal !== '';


  return (
    showRequestModal &&
    <div
      className={
        `${showRequestModal ? 'scale-100 animate-[fade-in_0.50s]'
          : 'hidden'
        } w-full h-full fixed top-0 flex flex-col justify-center items-center bg-black bg-opacity-75 z-50`
      }
      onClick={(e: any) => handleCloseModal(e)}
    >
      <div
        className={
          `${screenNarrow ? 'h-[85%]' : 'h-[90%]'}
            ${showRequestModal ?
            'scale-100 animate-[zoom-in_0.50s]'
            : 'scale-0 animate-[zoom-out_0.30s]'
          }  container w-64 lg:w-[22rem] relative flex flex-col justify-center items-center list-none rounded-md shadow-lg transform`
        }
        onClick={(e) => e.stopPropagation()}
      >
        {/**icon-cancel to close modal */}
        <div className='w-6 h-6 absolute -top-5 -right-5 flex flex-col justify-center items-center rounded-full bg-white'>
          <i
            className='w-full h-full text-gray-900 lg:text-gray-400 text-2xl lg:xl flex justify-center cursor-default lg:cursor-pointer lg:hover:text-gray-900'
            onClick={(e: any) => handleCloseModal(e)}
          >
            <IconCancel />
          </i>
        </div>
        {/**header form */}
        <div className='w-full px-4 lg:px-8 py-1 lg:py-2 flex flex-col bg-color-highlighted rounded-t-md z-50'>
          <h2 className='w-full h-fit py-1 text-white text-xl lg:text-3xl font-bold transition-all z-10'>
            {`Request ${requestModal}`}
          </h2>
        </div>
        <div className='w-full h-full flex flex-row items-center bg-white rounded-b-md overflow-x-hidden'>
          {/***carousel form***/}
          <ul
            className='w-[9999px] flex flex-row items-center transform transition-all list-none'
            ref={carouselFormRef}
          >
            {/**step 1-2: complete talent or job request form */}
            <li
              key='new-request-filling'
              className='w-64 lg:w-[22rem] h-full px-2 lg:px-8 flex flex-col justify-between items-center transition-all'
            >
              {/**form I */}
              <div className='w-full h-full flex flex-col justify-between items-center transition-all z-0'>
                <div className='w-full h-full flex flex-col items-center'>
                  {
                    requestModal === 'Talent' ?
                      /**talent request I */
                      <FormTemplate
                        inputData={talentInput.slice(0, 5)}
                        formData={userRequestDataUpdate}
                        changeData={changeUserRequestDataUpdate}
                        onChange={(e: any) => handleChangeData(e)}
                        onFocus={(e: any) => setChangeUserrequestDataUpdate({ ...changeUserRequestDataUpdate, [e.target.name]: true })}
                        onBlur={(e: any) => setChangeUserrequestDataUpdate({ ...changeUserRequestDataUpdate, [e.target.name]: false })}
                      />
                      :
                      /**job request I */
                      <FormTemplate
                        inputData={jobInput.slice(0, 5)}
                        formData={userRequestDataUpdate}
                        changeData={changeUserRequestDataUpdate}
                        onChange={(e: any) => handleChangeData(e)}
                        onFocus={(e: any) => setChangeUserrequestDataUpdate({ ...changeUserRequestDataUpdate, [e.target.name]: true })}
                        onBlur={(e: any) => setChangeUserrequestDataUpdate({ ...changeUserRequestDataUpdate, [e.target.name]: false })}
                      />
                  }
                </div>
                {/**next button */}
                <div className='w-full py-7 flex flex-row justify-center items-center'>
                  {/**next button */}
                  <button
                    className='w-full px-6 py-2 text-slate-50 lg:hover:text-white font-bold  flex flex-row justify-center items-center bg-green-500 lg:bg-green-300 lg:hover:bg-green-500 cursor-default lg:cursor-pointer rounded-md transition-all'
                    onClick={() => setCarouselFormPosition(1)}
                  >
                    <h5 className='w-full h-fit text-sm lg:text-base leading-none tracking-wider'>
                      Next
                    </h5>
                  </button>
                </div>
              </div>
            </li>
            {/**step 4: complete and submit talent or job request talent form */}
            <li
              key='new-request-sending'
              className='w-64 lg:w-[22rem] h-full px-2 lg:px-8 flex flex-col justify-between items-center transition-all'
            >
              {/**form II */}
              <form
                className='w-full h-full flex flex-col justify-between items-center transition-all z-0'
                onSubmit={(e: any) => handleSubmit(e)}
              >
                <div className='w-full h-full flex flex-col items-center'>
                  {
                    requestModal === 'Talent' ?
                      /**talent request II */
                      <FormTemplate
                        inputData={talentInput.slice(5)}
                        formData={userRequestDataUpdate}
                        changeData={changeUserRequestDataUpdate}
                        onChange={(e: any) => handleChangeData(e)}
                        onFocus={(e: any) => setChangeUserrequestDataUpdate({ ...changeUserRequestDataUpdate, [e.target.value]: true })}
                        onBlur={(e: any) => setChangeUserrequestDataUpdate({ ...changeUserRequestDataUpdate, [e.target.value]: false })}
                      />
                      :
                      /**job request II */
                      <FormTemplate
                        formData={userRequestDataUpdate}
                        inputData={jobInput.slice(5)}
                        changeData={changeUserRequestDataUpdate}
                        onChange={(e: any) => handleChangeData(e)}
                        onFocus={(e: any) => setChangeUserrequestDataUpdate({ ...changeUserRequestDataUpdate, [e.target.value]: true })}
                        onBlur={(e: any) => setChangeUserrequestDataUpdate({ ...changeUserRequestDataUpdate, [e.target.value]: false })}
                      />
                  }
                </div>
                <div className='w-full py-7 flex flex-row justify-between items-center'>
                  {/**back button */}
                  <button
                    className='w-[45%] text-slate-50 lg:hover:text-white lg:hover:font-bold px-6 py-2 flex flex-row justify-center items-center bg-slate-400 cursor-default lg:cursor-pointer rounded-md transition-all'
                    onClick={() => setCarouselFormPosition(0)}
                  >
                    <h5 className='w-full h-fit text-sm lg:text-base leading-none tracking-wider'>
                      Back
                    </h5>
                  </button>
                  {/**button submit form */}
                  <button
                    type='submit'
                    className={
                      `${filledForm ?
                        'font-bold bg-green-400 lg:bg-green-30 lg:hover:bg-green-400 cursor-default lg:cursor-pointer' :
                        'bg-slate-400 cursor-default'
                      } w-[45%] text-slate-50 lg:hover:text-white lg:hover:font-bold px-6 py-2 flex flex-row justify-center items-center rounded-md transition-all z-30`
                    }
                    disabled={!filledForm}
                    onClick={() => {
                      setTimeout((e: any) => { handleCloseModal(e) }, 1000);
                    }}
                  >
                    <h5 className='w-full h-fit text-sm lg:text-base leading-none tracking-wider'>
                      Send
                    </h5>
                  </button>
                </div>
              </form>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}