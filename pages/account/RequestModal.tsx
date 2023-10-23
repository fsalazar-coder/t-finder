import React, { useState, useEffect, useRef } from 'react';
import { useAuth, useScreenNarrow, useRequestModal } from "../../context/authContext";
import axios from 'axios';
import { IconCancel, IconCheckCircle } from '../../icons/icons';
import TemplateForm from './TemplateForm';



export default function RequestModal(props: any) {

  const { auth } = useAuth();
  const { screenNarrow } = useScreenNarrow();
  const { requestModal, setRequestModal } = useRequestModal();
  const [requestType, setRequestType] = useState(String);
  const [filledForm, setFilledForm] = useState(false);
  const [onClickSubmit, setOnClickSubmit] = useState(false);
  const carouselFormRef: any = useRef(null);
  const carouselFormSelected: any = carouselFormRef.current;
  const [carouselFormPosition, setCarouselFormPosition] = useState(Number);
  const [carouselTranslateX, setCarouselTranslateX] = useState(Number);

  {/**talent request form constants*/ }
  const [formDataTalent, setFormDataTalent] = useState({
    jobTitle: '',
    jobCategory: '',
    skillsRequired: '',
    jobDescription: '',
    experienceNeeded: '',
    location: '',
    compensation: '',
    applicationDeadline: '',
    companyInfo: '',
    additionalPerks: '',
  });
  const [changeDataTalent, setChangeDataTalent] = useState({
    jobTitle: false,
    jobCategory: false,
    skillsRequired: false,
    jobDescription: false,
    experienceNeeded: false,
    location: false,
    jobType: false,
    compensation: false,
    applicationDeadline: false,
    companyInfo: false,
    additionalPerks: false,
  });
  {/** */ }

  {/**job request form constants */ }
  const [formDataJob, setFormDataJob] = useState({
    talentTitle: '',
    talentCategory: '',
    skillsOffered: '',
    talentDescription: '',
    experienceLevel: '',
    locationPreference: '',
    availability: '',
    duration: '',
    rates: '',
    additionalRequirements: ''
  });
  const [changeDataJob, setChangeDataJob] = useState({
    talentTitle: false,
    talentCategory: false,
    skillsOffered: false,
    talentDescription: false,
    experienceLevel: false,
    locationPreference: false,
    availability: false,
    duration: false,
    rates: false,
    additionalRequirements: false
  });
  {/** */ }

  const handleChangeData = (e: any) => {
    const { name, value } = e.target;
    if (requestType === 'talent') {
      setFormDataTalent({ ...formDataTalent, [name]: value });
    }
    else {
      setFormDataJob({ ...formDataJob, [name]: value });
    }
  };

  const handleCloseModal = (e: any) => {
    setRequestModal(false);
    setCarouselFormPosition(0);
    setRequestType('');
    setFilledForm(false);
    setOnClickSubmit(false);
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios
        .post(`/api/${requestType}Request`, requestType === 'talent' ? formDataTalent : formDataJob);
      console.log(`${requestType} request saved: `, response.data);
    }
    catch (error) {
      console.error(`Error saving ${requestType} request: `, error);
    }
  };

  /**carousel transition effect control */
  useEffect(() => {
    setCarouselTranslateX(carouselFormPosition * (screenNarrow ? 260 : 500));
    if (carouselFormSelected) {
      carouselFormSelected.style.transition = 'all 1s ease';
      carouselFormSelected.style.transform = `translateX(-${carouselTranslateX}px)`;
    }
  });

  /**fill form control */
  useEffect(() => {
    let dataTalentFilled = Object.values(formDataTalent).some(value => value === '');
    let dataJobFilled = Object.values(formDataJob).some(value => value === '');
    if (requestType === 'talent' && !dataTalentFilled) {
      setFilledForm(true);
    }
    else if (requestType === 'job' && !dataJobFilled) {
      setFilledForm(true);
    }
    else {
      setFilledForm(false);
    }
  });

  /**header steps indicator */
  const stepsIndicator: any = [
    { step: 1, title: 'Add ', condition: true },
    { step: 2, title: 'Type', condition: carouselFormPosition > 0 },
    { step: 3, title: 'Fill', condition: filledForm },
    { step: 4, title: 'Send', condition: onClickSubmit },
  ];
  
  /**inputs for talent form */
  const talentInput = [
    { type: 'text', title: 'Job Category', value: 'jobCategory' },
    { type: 'text', title: 'Skills Required', value: 'skillsRequired' },
    { type: 'text', title: 'Job Description', value: 'jobDescription' },
    { type: 'text', title: 'Job Title', value: 'jobTitle' },
    {
      type: 'select',
      title: 'Experience Needed',
      value: 'experienceNeeded',
      options: [
        { value: 'entry', title: 'Entry Level' },
        { value: 'mid', title: 'Mid Level' },
        { value: 'senior', title: 'Senior Level' },
      ]
    },
    { type: 'text', title: 'Location', value: 'location' },
    { type: 'number', title: 'Compensation (USD)', value: 'compensation' },
    { type: 'date', title: 'Application Deadline', value: 'applicationDeadline' },
    { type: 'text', title: 'Company Info', value: 'companyInfo' },
    { type: 'text', title: 'Additional Perks', value: 'additionalPerks' }
  ];
  
  /**inputs for job form */
  const jobInput = [
    { type: 'text', title: 'Talent Title', value: 'talentTitle' },
    { type: 'text', title: 'Talent Category', value: 'talentCategory' },
    { type: 'text', title: 'Skills Offered', value: 'skillsOffered' },
    { type: 'text', title: 'Talent Description', value: 'talentDescription' },
    {
      type: 'select',
      title: 'Experience Level',
      value: 'experienceLevel',
      options: [
        { value: 'entry', title: 'Entry Level' },
        { value: 'mid', title: 'Mid Level' },
        { value: 'senior', title: 'Senior Level' },
      ]
    },
    {
      type: 'select',
      title: 'Location Preference',
      value: 'locationPreference',
      options: [
        { value: 'remote', title: 'Remote' },
        { value: 'on-site', title: 'On-site' },
        { value: 'flexible', title: 'Flexible' },
      ]
    },
    {
      type: 'select',
      title: 'Availability',
      value: 'availability',
      options: [
        { value: 'full-time', title: 'Full time' },
        { value: 'part-time', title: 'Part time' },
        { value: 'frelance', title: 'Frelance' },
      ]
    },
    { type: 'number', title: 'Rates', value: 'rates' },
    { type: 'number', title: 'Duration (months)', value: 'duration' },
    { type: 'text', title: 'Additional Requirements', value: 'additionalRequirements' }
  ];


  return (
    requestModal ?
      <div
        className={
          `${requestModal ? 'scale-100 animate-[fade-in_0.50s]'
            : 'hidden'
          } w-full h-full fixed top-0 flex flex-col justify-center items-center bg-black bg-opacity-75 z-50`
        }
        onClick={(e: any) => handleCloseModal(e)}
      >
        <div
          className={
            `${screenNarrow ? 'h-[85%]' : 'h-[90%]'}
            ${requestModal ?
              'scale-100 animate-[zoom-in_0.50s]'
              : 'scale-0 animate-[zoom-out_0.30s]'
            }  container w-[16rem] lg:w-[31rem] relative flex flex-col justify-center items-center list-none rounded-md shadow-lg transform`
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
              {`NEW REQUEST ${requestType.toUpperCase()}`}
            </h2>
            {/**steps indicator */}
            <div className='w-full py-1 px-4 flex flex-row justify-between'>
              {
                stepsIndicator.map((element: any, index: any) => (
                  <>
                    {/**steps: add, type selection, form filling and sending */}
                    <div
                      key={index}
                      className='w-[24px] lg:w-[30px] h-[48px] lg:h-[60px] flex flex-col items-center z-10'
                    >
                      <div className={
                        `${element.condition ?
                          '' :
                          'border-2 border-green-300 opacity-25'} w-full h-1/2 flex flex-row justify-center items-center bg-transparent rounded-full`}
                      >
                        {
                          element.condition ?
                            <i className='text-green-400 text-2xl lg:text-3xl flex justify-center items-center bg-slate-950'>
                              <IconCheckCircle />
                            </i>
                            :
                            <h5 className='w-5 h-5 lg:w-6 lg:h-6 text-green-300 text-xs lg:text-sm font-bold text-center flex flex-row justify-center items-center'>
                              {element.step}
                            </h5>
                        }
                      </div>
                      <div className='w-full h-1/2 flex flex-col items-center'>
                        <h5 className='w-full text-slate-50 text-xs lg:text-sm text-center flex flex-row justify-center items-center'>
                          {element.title}
                        </h5>
                      </div>
                    </div>
                    {
                      index < 3 ?
                        /**line */
                        <div className='w-full h-1/2 flex flex-row items-center'>
                          <div className={
                            `${element.condition ?
                              'opacity-25 animate-[width-change_1.0s_ease]' :
                              'opacity-0'} w-full h-0 flex border border-green-300 transform transition-all`
                          }
                          />
                        </div>
                        :
                        ''
                    }
                  </>
                ))
              }
            </div>
          </div>
          <div className='w-full h-full flex flex-row items-center bg-white rounded-b-md overflow-x-hidden'>
            {/***carousel form***/}
            <ul
              className='w-[9999px] flex flex-row items-center transform transition-all list-none'
              ref={carouselFormRef}
            >
              {/**step 1-2: select request type */}
              <li
                key='new-request-selection'
                className='w-[16rem] lg:w-[31rem] h-full px-2 lg:px-8 flex flex-col justify-center items-center transition-all'
              >
                <button
                  className='w-full p-5 lg:p-10 my-2 lg:my-3 bg-white border lg:hover:border-green-300 rounded-md drop-shadow-md'
                  onClick={() => {
                    setRequestType('talent');
                    setCarouselFormPosition(1);
                  }}
                >
                  <h3>Talent Request</h3>
                </button>
                <button
                  className='w-full p-5 lg:p-10 my-2 lg:my-3 bg-white border lg:hover:border-green-300 rounded-md drop-shadow-md'
                  onClick={() => {
                    setRequestType('job');
                    setCarouselFormPosition(1);
                  }}
                >
                  <h3>Job Request</h3>
                </button>
              </li>
              {/**step 3: complete talent or job request form */}
              <li
                key='new-request-filling'
                className='w-[16rem] lg:w-[31rem] h-full px-2 lg:px-8 flex flex-col justify-between items-center transition-all'
              >
                {/**form I */}
                <form
                  className='w-full h-full flex flex-col justify-between items-center transition-all z-0'
                  onSubmit={(e: any) => handleSubmit(e)}
                >
                  <div className='w-full h-full flex flex-col items-center'>
                    {
                      requestType === 'talent' ?
                        /**talent request I */
                        <TemplateForm
                          inputData={talentInput.slice(0, 5)}
                          formData={formDataTalent}
                          changeData={changeDataTalent}
                          onChange={(e: any) => handleChangeData(e)}
                          onFocus={(e: any) => setChangeDataTalent({ ...changeDataTalent, [e.target.name]: true })}
                          onBlur={(e: any) => setChangeDataTalent({ ...changeDataTalent, [e.target.name]: false })}
                        />
                        :
                        /**job request I */
                        <TemplateForm
                          inputData={jobInput.slice(0, 5)}
                          formData={formDataJob}
                          changeData={changeDataJob}
                          onChange={(e: any) => handleChangeData(e)}
                          onFocus={(e: any) => setChangeDataJob({ ...changeDataJob, [e.target.name]: true })}
                          onBlur={(e: any) => setChangeDataJob({ ...changeDataJob, [e.target.name]: false })}
                        />
                    }
                  </div>
                  {/**back and next button */}
                  <div className='w-full py-7 flex flex-row justify-between items-center'>
                    {/**back button */}
                    <button
                      className='w-[45%] text-slate-50 lg:hover:text-white lg:hover:font-bold px-6 py-2 flex flex-row justify-center items-center bg-slate-400 cursor-default lg:cursor-pointer rounded-md transition-all'
                      onClick={() => {
                        setRequestType('');
                        setCarouselFormPosition(0);
                      }}
                    >
                      <h5 className='w-full h-fit text-sm lg:text-base leading-none tracking-wider'>
                        Back
                      </h5>
                    </button>
                    {/**next button */}
                    <button
                      className='w-[45%] px-6 py-2 text-slate-50 lg:hover:text-white font-bold  flex flex-row justify-center items-center bg-green-500 lg:bg-green-300 lg:hover:bg-green-500 cursor-default lg:cursor-pointer rounded-md transition-all'
                      onClick={() => setCarouselFormPosition(2)}
                    >
                      <h5 className='w-full h-fit text-sm lg:text-base leading-none tracking-wider'>
                        Next
                      </h5>
                    </button>
                  </div>
                </form>
              </li>
              {/**step 4: complete and submit talent or job request talent form */}
              <li
                key='new-request-sending'
                className='w-[16rem] lg:w-[31rem] h-full px-2 lg:px-8 flex flex-col justify-between items-center transition-all'
              >
                {/**form II */}
                <form
                  className='w-full h-full flex flex-col justify-between items-center transition-all z-0'
                  onSubmit={(e: any) => handleSubmit(e)}
                >
                  <div className='w-full h-full flex flex-col items-center'>
                    {
                      requestType === 'talent' ?
                        /**talent request II */
                        <TemplateForm
                          inputData={talentInput.slice(5)}
                          formData={formDataTalent}
                          changeData={changeDataTalent}
                          onChange={(e: any) => handleChangeData(e)}
                          onFocus={(e: any) => setChangeDataTalent({ ...changeDataTalent, [e.target.value]: true })}
                          onBlur={(e: any) => setChangeDataTalent({ ...changeDataTalent, [e.target.value]: false })}
                        />
                        :
                        /**job request II */
                        <TemplateForm
                          formData={formDataJob}
                          inputData={jobInput.slice(5)}
                          changeData={changeDataJob}
                          onChange={(e: any) => handleChangeData(e)}
                          onFocus={(e: any) => setChangeDataJob({ ...changeDataJob, [e.target.value]: true })}
                          onBlur={(e: any) => setChangeDataJob({ ...changeDataJob, [e.target.value]: false })}
                        />
                    }
                  </div>
                  <div className='w-full py-7 flex flex-row justify-between items-center'>
                    {/**back button */}
                    <button
                      className='w-[45%] text-slate-50 lg:hover:text-white lg:hover:font-bold px-6 py-2 flex flex-row justify-center items-center bg-slate-400 cursor-default lg:cursor-pointer rounded-md transition-all'
                      onClick={() => setCarouselFormPosition(1)}
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
                        setOnClickSubmit(true);
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
      :
      ''
  )
}