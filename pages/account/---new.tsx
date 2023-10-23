import React, { useState, useEffect, useRef } from 'react';
import {
  useAuth,
  useScreenNarrow,
  useNewRequestModal
} from "../../context/authContext";
import axios from 'axios';
import { IconCancel, IconCheckCircle } from '../../icons/icons';
import RequestForm from './RequestForm';

const talentInput = [
  { type: 'input', title: 'Job Title', value: 'jobTitle' },
  { type: 'input', title: 'Job Category', value: 'jobCategory' },
  { type: 'input', title: 'Skills Required', value: 'skillsRequired' },
  { type: 'input', title: 'Job Description', value: 'jobDescription' },
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
  { type: 'input', title: 'Location', value: 'location' },
  { type: 'input', title: 'Compensation', value: 'compensation' },
  { type: 'input', title: 'Application Deadline', value: 'applicationDeadline' },
  { type: 'input', title: 'Company Info', value: 'companyInfo' },
  { type: 'input', title: 'Additional Perks', value: 'additionalPerks' }
];

const jobInput = [
  { type: 'input', title: 'Talent Title', value: 'talentTitle' },
  { type: 'input', title: 'Talent Category', value: 'talentCategory' },
  { type: 'input', title: 'Skills Offered', value: 'skillsOffered' },
  { type: 'input', title: 'Talent Description', value: 'talentDescription' },
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
  { type: 'input', title: 'Rates', value: 'rates' },
  { type: 'input', title: 'Duration', value: 'duration' },
  { type: 'input', title: 'Additional Requirements', value: 'additionalRequirements' }
];



export default function NewRequestModal(props: any) {

  const { auth } = useAuth();
  const { screenNarrow } = useScreenNarrow();
  const { newRequestModal, setNewRequestModal } = useNewRequestModal();
  const [requestType, setRequestType] = useState(String);
  const [nextButtonActive, setNextButtonActive] = useState(false);
  const [submitButtonActive, setSubmitButtonActive] = useState(false);
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

  const handleChangeData = (e: any) => {
    const { name, value } = e.target;
    if (requestType === 'talent') {
      setFormDataTalent({ ...formDataTalent, [name]: value });
    }
    else {
      setFormDataJob({ ...formDataJob, [name]: value });
    }
  };

  useEffect(() => {
    setCarouselTranslateX(carouselFormPosition * (screenNarrow ? 260 : 500));
    if (carouselFormSelected) {
      carouselFormSelected.style.transition = 'all 1s ease';
      carouselFormSelected.style.transform = `translateX(-${carouselTranslateX}px)`;
      console.log('position: ', carouselFormPosition);
      console.log('translateX: ', `translateX(-${carouselTranslateX}px)`);
    }
  }, [carouselFormPosition]);

  useEffect(() => {
    if (requestType === 'talent' && !formDataTalent) {
      setNextButtonActive(false);
    }
  });

  return (
    newRequestModal ?
      <div
        className={
          `${newRequestModal ?
            'scale-100 animate-[fade-in_0.50s]' :
            'hidden'
          } w-full h-full fixed top-0 flex flex-col justify-center items-center bg-black bg-opacity-75`
        }
        onClick={() => {
          setNewRequestModal(false);
          setCarouselFormPosition(0)
        }}
      >
        <div
          className={
            `${newRequestModal ?
              'scale-100 animate-[zoom-in_0.50s]'
              : 'scale-0 animate-[zoom-out_0.30s]'
            } 
            ${screenNarrow ? 'h-[85%]' : 'h-[90%]'
            } container w-[260px] lg:w-[500px] relative flex flex-col justify-center items-center list-none rounded-md shadow-lg transform`
          }
          onClick={(e) => e.stopPropagation()}
        >
          {/**icon-cancel to close modal */}
          <div className='w-6 h-6 absolute -top-5 -right-5 flex flex-col justify-center items-center rounded-full bg-white'>
            <i
              className='w-full h-full text-gray-900 lg:text-gray-400 text-2xl lg:xl flex justify-center cursor-default lg:cursor-pointer lg:hover:text-gray-900'
              onClick={() => {
                setNewRequestModal(false);
                setCarouselFormPosition(0);
              }}
            >
              <IconCancel />
            </i>
          </div>
          {/**content */}
          <div className='w-full h-full flex flex-col justify-center items-center bg-white rounded-md'>
            {/**header form */}
            <div className='w-full px-4 lg:px-8 py-1 lg:py-2 flex flex-col bg-slate-950 rounded-t-md z-50'>
              <h2 className='w-full h-fit py-1 text-white text-xl lg:text-3xl font-bold z-10'>
                NEW REQUEST
              </h2>
              <div className='w-full pt-1 px-4 flex flex-row justify-between items-center'>
                {/**step 01: adding */}
                <div className='w-1/12 flex flex-col items-center'>
                  <div className='flex flex-row justify-center items-center bg-transparent rounded-full z-20'>
                    <i className='w-4 h-4 text-green-400 text-2xl lg:xl flex justify-center items-center'>
                      <IconCheckCircle />
                    </i>
                  </div>
                </div>
                <div className='w-[20%] h-0 flex border-dotted border border-green-300 z-10' />
                {/**step 02: selection */}
                <div className='w-1/12 flex flex-col items-center'>
                  <div className='p-1 flex flex-row justify-center items-center bg-white rounded-full border-4 border-green-300 z-20'>
                    <h5 className='w-4 h-4 text-slate-950 text-xs lg:text-sm text-center flex flex-row justify-center items-center'>
                      2
                    </h5>
                  </div>
                </div>
                <div className='w-[20%] h-0 flex border-dotted border border-green-300 z-10' />
                {/**step 03: filling */}
                <div className='w-1/12 flex flex-col items-center'>
                  <div className='p-1 flex flex-row justify-center items-center bg-white rounded-full border-4 border-green-300 z-20'>
                    <h5 className='w-4 h-4 text-slate-950 text-sm text-center flex flex-row justify-center items-center'>
                      3
                    </h5>
                  </div>
                </div>
                <div className='w-[20%] h-0 flex border-dotted border border-green-300 z-10' />
                {/**step 04: sending */}
                <div className='w-1/12 flex flex-col items-center'>
                  <div className='p-1 flex flex-row justify-center items-center bg-white rounded-full border-4 border-green-300 z-20'>
                    <h5 className='w-4 h-4 text-slate-950 text-sm text-center flex flex-row justify-center items-center'>
                      4
                    </h5>
                  </div>
                </div>
              </div>
              <div className='w-full pb-1 px-4 flex flex-row justify-between items-center'>
                <div className='w-1/12 flex flex-col items-center'>
                  <h5 className='w-full text-slate-50 text-xs lg:text-sm text-center flex flex-row justify-center items-center'>
                    Add
                  </h5>
                </div>
                <div className='w-1/12 flex flex-col items-center'>
                  <h5 className='w-full text-slate-50 text-xs lg:text-sm text-center flex flex-row justify-center items-center'>
                    Type
                  </h5>
                </div>
                <div className='w-1/12 flex flex-col items-center'>
                  <h5 className='w-full text-slate-50 text-xs lg:text-sm text-center flex flex-row justify-center items-center'>
                    Fill
                  </h5>
                </div>
                <div className='w-1/12 flex flex-col items-center'>
                  <h5 className='w-full text-slate-50 text-xs lg:text-sm text-center flex flex-row justify-center items-center'>
                    Send
                  </h5>
                </div>
              </div>
            </div>
            {/**form container */}
            <form
              className='w-full rounded-bl-md rounded-br-md transition-all z-0'
              onSubmit={(e: any) => handleSubmit(e)}
            >
              {/**carousel request*/}
              <ul
                className='w-[9999px] flex flex-row items-center transform transition-all list-none'
                onSubmit={(e: any) => handleSubmit(e)}
                ref={carouselFormRef}
              >
                {/**step 1-2: select request type */}
                <li className='w-[16rem] lg:w-[31rem] h-full px-2 lg:px-8 flex flex-col justify-center items-center transform transition-all'>
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
                <li className='w-[16rem] lg:w-[31rem] h-full px-2 lg:px-8 flex flex-col justify-between items-center transform transition-all'>
                  <div className='w-full pt-5 flex flex-col items-center'>
                    {
                      requestType === 'talent' ?
                        /**talent request I */
                        <RequestForm
                          inputData={talentInput.slice(0, 5)}
                          formData={formDataTalent}
                          changeData={changeDataTalent}
                          onChange={(e: any) => handleChangeData(e)}
                          onFocus={(e: any) => setChangeDataTalent({ ...changeDataTalent, [e.target.value]: true })}
                          onBlur={(e: any) => setChangeDataTalent({ ...changeDataTalent, [e.target.value]: false })}
                        />
                        :
                        /**job request I */
                        <RequestForm
                          inputData={jobInput.slice(0, 5)}
                          formData={formDataJob}
                          changeData={changeDataJob}
                          onChange={(e: any) => handleChangeData(e)}
                          onFocus={(e: any) => setChangeDataJob({ ...changeDataJob, [e.target.value]: true })}
                          onBlur={(e: any) => setChangeDataJob({ ...changeDataJob, [e.target.value]: false })}
                        />
                    }
                  </div>
                  {/**next button */}
                  <div className='w-full py-5 flex flex-col justify-center items-center'>
                    <button
                      className={
                        `${nextButtonActive ?
                          'font-bold bg-green-500 lg:bg-green-300 lg:hover:bg-green-500 cursor-default lg:cursor-pointer' :
                          'bg-slate-400 cursor-default'
                        } w-full text-slate-50 lg:hover:text-white lg:hover:font-bold px-6 py-2 flex flex-row justify-center items-center rounded-md transition-all`
                      }
                      /**disabled={!nextButtonActive}*/
                      onClick={() => setCarouselFormPosition(2)}
                    >
                      <h5 className='w-full h-fit text-sm lg:text-base leading-none tracking-wider'>
                        Next
                      </h5>
                    </button>
                  </div>
                </li>
                {/**step 4: complete and submit talent or job request talent form */}
                <li className='w-[16rem] lg:w-[31rem] h-full px-2 lg:px-8 flex flex-col justify-between items-center transform transition-all'>
                  <div className='w-full h-full pt-5 flex flex-col items-center'>
                    {
                      requestType === 'talent' ?
                        /**talent request II */
                        <RequestForm
                          inputData={talentInput.slice(5)}
                          formData={formDataTalent}
                          changeData={changeDataTalent}
                          onChange={(e: any) => handleChangeData(e)}
                          onFocus={(e: any) => setChangeDataTalent({ ...changeDataTalent, [e.target.value]: true })}
                          onBlur={(e: any) => setChangeDataTalent({ ...changeDataTalent, [e.target.value]: false })}
                        />
                        :
                        /**job request II */
                        <RequestForm
                          formData={formDataJob}
                          inputData={jobInput.slice(5)}
                          changeData={changeDataJob}
                          onChange={(e: any) => handleChangeData(e)}
                          onFocus={(e: any) => setChangeDataJob({ ...changeDataJob, [e.target.value]: true })}
                          onBlur={(e: any) => setChangeDataJob({ ...changeDataJob, [e.target.value]: false })}
                        />
                    }
                  </div>
                  {/**button submit form */}
                  <div className='w-full py-5 flex flex-col justify-center items-center'>
                    <button
                      type='submit'
                      className={
                        `${submitButtonActive ?
                          'font-bold bg-green-400 lg:bg-green-30 lg:hover:bg-green-400 cursor-default lg:cursor-pointer' :
                          'bg-slate-400 cursor-default'
                        } w-full text-slate-50 lg:hover:text-white lg:hover:font-bold px-6 py-2 flex flex-row justify-center items-center rounded-md transition-all z-30`
                      }
                      disabled={!submitButtonActive}
                      onClick={() => {
                        setNewRequestModal(false);
                        setCarouselFormPosition(0);
                      }}
                    >
                      <h5 className='w-full h-fit text-sm lg:text-base leading-none tracking-wider'>
                        {`Send ${requestType} request`}
                      </h5>
                    </button>
                  </div>
                </li>
              </ul>
            </form>
          </div>
        </div>
      </div>
      :
      ''
  )
};