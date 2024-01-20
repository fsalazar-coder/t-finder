import React, { useState, useEffect, useRef } from 'react';
import { useAuthData, useAuthUI, useUI } from "../../context/authContext";
import { userDataHandlerFunction } from '../api/userDataHandlerFunction';
import { IconCancel } from '../../icons/icons';
import FormTemplate from './FormTemplate';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';


const initialUserRequestData = {
  /**request talent information: */
  jobDescription: '',
  jobCategory: '',
  requiredSkills: '',
  requiredExperienceYears: '',
  jobLocation: '',
  offeredWorkModality: '',
  offeredCompensation: '',
  companyName: '',
  /**job talent information: */
  talentCategory: '',
  talentDescription: '',
  offeredSkills: '',
  experienceYears: '',
  preferredWorkModality: '',
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
    companyName: '',
    /**job talent information: */
    talentCategory: '',
    talentDescription: '',
    offeredSkills: '',
    experienceYears: '',
    preferredWorkModality: '',
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
        company_name: userRequestDataUpdate.companyName,
        location: userRequestDataUpdate.jobLocation,
        offered_compensation: userRequestDataUpdate.offeredCompensation,
        status: 'Submitted'
      },
      requestJob: {
        title: userRequestDataUpdate.talentCategory,
        talent_category: userRequestDataUpdate.talentCategory,
        talent_description: userRequestDataUpdate.talentDescription,
        offered_skills: userRequestDataUpdate.offeredSkills,
        experience_years: userRequestDataUpdate.experienceYears,
        modality_work: userRequestDataUpdate.preferredWorkModality,
        availability: userRequestDataUpdate.availability,
        location: userRequestDataUpdate.location,
        desired_compensation: userRequestDataUpdate.desiredCompensation,
        status: 'Submitted'
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
      setRequestModal('');
      setLoading(false);
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
    let requestDataAll = Object.entries(userRequestDataUpdate);
    switch (requestModal) {
      case 'Talent':
        let requestTalentEntries = requestDataAll.slice(0, 8);
        let requestTalentData = Object.fromEntries(requestTalentEntries);
        let dataTalentUnfilled = Object.values(requestTalentData).some(value => value === '');
        if (dataTalentUnfilled) { setFilledForm(false) } else { setFilledForm(true) }
        break;
      case 'Job':
        let requestJobEntries = requestDataAll.slice(8);
        let requestJobData = Object.fromEntries(requestJobEntries);
        let dataJobUnfilled = Object.values(requestJobData).some(value => value === '');
        if (dataJobUnfilled) { setFilledForm(false) } else { setFilledForm(true) }
        break;
      default:
        break;
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
    { type: 'text', title: 'Required skills', value: 'requiredSkills' },
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
    { type: 'text', title: 'Company Name', value: 'companyName' },
    { type: 'text', title: 'Job location', value: 'jobLocation' },
    { type: 'text', title: 'Offered compensation (USD)', value: 'offeredCompensation' },
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
      title: 'Preferred modality work',
      value: 'preferredWorkModality',
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
    { type: 'text', title: 'Desired compensation (USD)', value: 'desiredCompensation' },
  ];

  const renderRequestModal = requestModal !== '';


  return (
    renderRequestModal &&
    <div
      className={
        `${renderRequestModal ? 'scale-100 animate-[fade-in_0.50s]' : 'hidden'
        } w-full h-full fixed top-0 flex flex-col justify-center items-center bg-black bg-opacity-75 z-50`
      }
      onClick={(e: any) => handleCloseModal(e)}
    >
      <div
        className={
          `${renderRequestModal ? 'scale-100 animate-[zoom-in_0.50s]' : 'scale-0 animate-[zoom-out_0.30s]'
          } container w-64 max-h-[80%] lg:w-[22rem] relative flex flex-col list-none rounded-md shadow-lg transform`
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
        <div className='w-full px-2 lg:px-6 py-1 lg:py-2 flex flex-col bg-color-highlighted rounded-t-md z-50'>
          <h2 className='w-full h-fit py-1 text-white text-xl lg:text-3xl font-bold transition-all z-10'>
            {`${requestModal} request`}
          </h2>
        </div>
        {/**content */}
        <div className='w-full min-h-[450px] flex bg-white rounded-b-md overflow-x-hidden transition-all'>
          <SimpleBar
            className='simplebar-scrollbar w-full h-full px-4 lg:px-8 flex flex-row justify-center'
            style={{ maxHeight: 440 }}
          >
            <form className='w-full pt-5 flex flex-col transition-all z-0' onSubmit={(e: any) => handleSubmit(e)}>
              <div className='w-full flex flex-col items-center'>
                {
                  requestModal === 'Talent' ?
                    <FormTemplate
                      inputData={talentInput}
                      formData={userRequestDataUpdate}
                      changeData={changeUserRequestDataUpdate}
                      onChange={(e: any) => handleChangeData(e)}
                      onFocus={(e: any) => setChangeUserrequestDataUpdate({ ...changeUserRequestDataUpdate, [e.target.value]: true })}
                      onBlur={(e: any) => setChangeUserrequestDataUpdate({ ...changeUserRequestDataUpdate, [e.target.value]: false })}
                    />
                    :
                    requestModal === 'Job' &&
                    <FormTemplate
                      formData={userRequestDataUpdate}
                      inputData={jobInput}
                      changeData={changeUserRequestDataUpdate}
                      onChange={(e: any) => handleChangeData(e)}
                      onFocus={(e: any) => setChangeUserrequestDataUpdate({ ...changeUserRequestDataUpdate, [e.target.value]: true })}
                      onBlur={(e: any) => setChangeUserrequestDataUpdate({ ...changeUserRequestDataUpdate, [e.target.value]: false })}
                    />
                }
              </div>
              <div className='w-full py-8 flex flex-row justify-between items-center'>
                <button
                  type='submit'
                  disabled={!filledForm}
                  className={`${filledForm ?
                    'font-bold bg-green-400 lg:bg-green-30 lg:hover:bg-green-400 cursor-default lg:cursor-pointer' :
                    'bg-slate-400 cursor-default'
                    } w-full text-slate-50 lg:hover:text-white lg:hover:font-bold px-6 py-2 flex flex-row justify-center items-center rounded-md transition-all z-30`
                  }
                >
                  <h5 className='w-full h-fit text-sm lg:text-base leading-none tracking-wider'>
                    Send
                  </h5>
                </button>
              </div>
            </form>
          </SimpleBar>
        </div>
      </div>
    </div>
  )
}