import React, { useState, useEffect, useRef } from 'react';
import { useAuthData, useAuthUI, useUI } from "../../context/authContext";
import axios from 'axios';
import { IconCancel } from '../../icons/icons';
import FormTemplate from './FormTemplate';



export default function RequestModal(props: any) {

  const { token, userId, setUserRequestTalent, setUserRequestJob, collectionToChange, itemIdToChange, setUpdate } = useAuthData();
  const { requestModal, setRequestModal, requestModalAction, setRequestModalAction } = useAuthUI();
  const { setMessageModal, setTypeMessageModal, setTextMessageModal, setLoading } = useUI();
  const { screenNarrow } = useUI();
  const [filledForm, setFilledForm] = useState(false);
  const carouselFormRef: any = useRef(null);
  const carouselFormSelected: any = carouselFormRef.current;
  const [carouselFormPosition, setCarouselFormPosition] = useState(Number);
  const [carouselTranslateX, setCarouselTranslateX] = useState(Number);

  {/**talent request form constants*/ }
  const [requestTalentData, setRequestTalentData] = useState({
    jobTitle: '',
    jobCategory: '',
    skillsRequired: '',
    experienceLevel: '',
    experienceYears: '',
    location: '',
    modalityWork: '',
    compensation: '',
    companyInfo: '',
  });
  const [changeRequestTalentData, setChangeRequestTalentData] = useState({
    jobTitle: false,
    jobCategory: false,
    skillsRequired: false,
    experienceLevel: false,
    experienceYears: false,
    location: false,
    modalityWork: false,
    compensation: false,
    companyInfo: false,
  });
  {/** */ }

  {/**job request form constants */ }
  const [requestJobData, setRequestJobData] = useState({
    talentTitle: '',
    talentCategory: '',
    skillsOffered: '',
    experienceLevel: '',
    modalityWork: '',
    availability: '',
    rates: '',
  });
  const [changeRequestJobData, setChangeRequestJobData] = useState({
    talentTitle: false,
    talentCategory: false,
    skillsOffered: false,
    experienceLevel: false,
    modalityWork: false,
    availability: false,
    rates: false,
  });
  {/** */ }

  const handleChangeData = (e: any) => {
    const { name, value } = e.target;
    if (requestModal === 'talent') {
      setRequestTalentData({ ...requestTalentData, [name]: value });
    }
    else {
      setRequestJobData({ ...requestJobData, [name]: value });
    }
  };

  const handleCloseModal = (e: any) => {
    setRequestModal('');
    setCarouselFormPosition(0);
    setFilledForm(false);
  }

  const dataUpdate = (requestToChange: string) => {
    const data = {
      requestTalent: {
        job_title: requestTalentData.jobTitle,
        job_category: requestTalentData.jobCategory,
        skills_required: requestTalentData.skillsRequired,
        experience_level: requestTalentData.experienceLevel,
        experience_years: requestTalentData.experienceYears,
        location: requestTalentData.location,
        modality_work: requestTalentData.modalityWork,
        compensation: requestTalentData.compensation,
        company_info: requestTalentData.companyInfo,
      },
      requestJob: {
        talent_title: requestJobData.talentTitle,
        talent_category: requestJobData.talentCategory,
        skills_offered: requestJobData.skillsOffered,
        experience_level: requestJobData.experienceLevel,
        modality_work: requestJobData.modalityWork,
        availability: requestJobData.availability,
        rates: requestJobData.rates,
      },
    };
    let dataToApi;
    requestToChange === 'request_talent' ?
      dataToApi = data['requestTalent' as keyof typeof data] : dataToApi = data['requestJob' as keyof typeof data]
    return dataToApi;
  };

  const setUserRequest = (userRequest: string, data: any) => {
    switch (userRequest) {
      case 'request_talent':
        return setUserRequestTalent(data);
      case 'request_job':
        return setUserRequestJob(data);
      default:
        break;
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    try {
      const response = await axios.post('/api/userApi',
        {
          id: requestModalAction === 'post' ? userId : itemIdToChange,
          collectionName: collectionToChange,
          action: requestModalAction,
          data: dataUpdate(collectionToChange),
        },
        config
      );
      const { status, actionResponse } = response.data;

      if (status === 'success') {
        setUserRequest(collectionToChange, actionResponse);
        setUpdate(collectionToChange);
        setMessageModal(true);
        setTypeMessageModal('successful');
        setTextMessageModal(`Your request have been ${requestModalAction === 'post' ? 'posted' : 'uploaded'}`);
      }
    }
    catch (error: any) {
      if (error.response) {
        let statusError = error.response.status;
        let messageError = error.response.data.message;
        setMessageModal(true);
        switch (statusError) {
          case 404:
            setTypeMessageModal('error');
            setTextMessageModal(messageError || 'User not found');
            break;
          default:
            setTypeMessageModal('error');
            setTextMessageModal('An unexpected error occurred.');
        }
      }
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
    let dataTalentUnfilled = Object.values(requestTalentData).some(value => value === '');
    let dataJobUnfilled = Object.values(requestJobData).some(value => value === '');
    if (requestModal === 'talent' && dataTalentUnfilled) {
      setFilledForm(false);
    }
    else if (requestModal === 'job' && dataJobUnfilled) {
      setFilledForm(false);
    }
    else {
      setFilledForm(true);
    }
  });

  /**inputs for talent form */
  const talentInput = [
    { type: 'text', title: 'Job Title', value: 'jobTitle' },
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
    {
      type: 'select',
      title: 'Experience Level',
      value: 'experienceLevel',
      options: [
        { value: 'Junior', title: 'Junior' },
        { value: 'Mid', title: 'Mid' },
        { value: 'Senior', title: 'Senior' },
      ]
    },
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
    { type: 'text', title: 'Skills Required', value: 'skillsRequired' },
    { type: 'text', title: 'Location', value: 'location' },
    {
      type: 'select',
      title: 'Modality Work',
      value: 'modalityWork',
      options: [
        { value: 'Remote', title: 'Remote' },
        { value: 'On-site', title: 'On-site' },
        { value: 'Flexible', title: 'Flexible' },
      ]
    },
    { type: 'text', title: 'Compensation (USD)', value: 'compensation' },
    { type: 'text', title: 'Company Info', value: 'companyInfo' }
  ];

  /**inputs for job form */
  const jobInput = [
    { type: 'text', title: 'Talent Title', value: 'talentTitle' },
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
    { type: 'text', title: 'Skills Offered', value: 'skillsOffered' },
    {
      type: 'select',
      title: 'Experience Level',
      value: 'experienceLevel',
      options: [
        { value: 'Entry', title: 'Entry' },
        { value: 'Mid', title: 'Mid' },
        { value: 'Senior', title: 'Senior' },
      ]
    },
    {
      type: 'select',
      title: 'Modality Work',
      value: 'modalityWork',
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
    { type: 'text', title: 'Rates', value: 'rates' },
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
        <div className='w-full px-4 lg:px-8 py-1 lg:py-2 flex flex-col bg-slate-950 rounded-t-md z-50'>
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
                    requestModal === 'talent' ?
                      /**talent request I */
                      <FormTemplate
                        inputData={talentInput.slice(0, 5)}
                        formData={requestTalentData}
                        changeData={changeRequestTalentData}
                        onChange={(e: any) => handleChangeData(e)}
                        onFocus={(e: any) => setChangeRequestTalentData({ ...changeRequestTalentData, [e.target.name]: true })}
                        onBlur={(e: any) => setChangeRequestTalentData({ ...changeRequestTalentData, [e.target.name]: false })}
                      />
                      :
                      /**job request I */
                      <FormTemplate
                        inputData={jobInput.slice(0, 5)}
                        formData={requestJobData}
                        changeData={changeRequestJobData}
                        onChange={(e: any) => handleChangeData(e)}
                        onFocus={(e: any) => setChangeRequestJobData({ ...changeRequestJobData, [e.target.name]: true })}
                        onBlur={(e: any) => setChangeRequestJobData({ ...changeRequestJobData, [e.target.name]: false })}
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
                    requestModal === 'talent' ?
                      /**talent request II */
                      <FormTemplate
                        inputData={talentInput.slice(5)}
                        formData={requestTalentData}
                        changeData={changeRequestTalentData}
                        onChange={(e: any) => handleChangeData(e)}
                        onFocus={(e: any) => setChangeRequestTalentData({ ...changeRequestTalentData, [e.target.value]: true })}
                        onBlur={(e: any) => setChangeRequestTalentData({ ...changeRequestTalentData, [e.target.value]: false })}
                      />
                      :
                      /**job request II */
                      <FormTemplate
                        formData={requestJobData}
                        inputData={jobInput.slice(5)}
                        changeData={changeRequestJobData}
                        onChange={(e: any) => handleChangeData(e)}
                        onFocus={(e: any) => setChangeRequestJobData({ ...changeRequestJobData, [e.target.value]: true })}
                        onBlur={(e: any) => setChangeRequestJobData({ ...changeRequestJobData, [e.target.value]: false })}
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