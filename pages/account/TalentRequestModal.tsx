import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from "../../context/authContext";
import { IconCancel } from '../../icons/icons';



export default function TalentRequestModal(props: any) {

  const { auth } = useAuth();
  const [formData, setFormData] = useState({
    jobTitle: '',
    jobCategory: '',
    skillsRequired: '',
    jobDescription: '',
    experienceNeeded: '',
    location: '',
    jobType: '',
    compensation: '',
    applicationDeadline: '',
    companyInfo: '',
    additionalPerks: '',
  });
  const [change, setChange] = useState({
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

  const handleFormData = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Send formData to your backend API to save it in MongoDB
    try {
      const response = await axios.post('/api/jobRequest', formData);
      console.log('job request saved:', response.data);
    }
    catch (error) {
      console.error('Error saving job request:', error);
    }
  };


  return (
    props.talentRequestModal ?
      <div
        className={
          `w-screen h-screen fixed top-0 flex flex-col justify-center items-center bg-black bg-opacity-75 transform z-[60]
        ${props.talentRequestModal ?
            'scale-100 animate-[fade-in_0.50s]'
            : props.joinModalAnimationClose ?
              'scale-0 animate-[fade-out_0.30s]'
              : 'hidden'
          }`
        }
        onClick={() => props.talentRequestModalClose()}
      >
        <div
          className={
            `container w-64 lg:w-[22rem] relative flex flex-col justify-start items-center bg-white rounded-md shadow-lg transform
          ${props.talentRequestModal ?
              'scale-100 animate-[zoom-in_0.50s]'
              : 'scale-0 animate-[zoom-out_0.30s]'
            }`
          }
          onClick={(e) => e.stopPropagation()}
        >
          {/**icon-cancel to close modal */}
          <div className='w-6 h-6 absolute -top-5 -right-5 flex flex-col justify-center items-center rounded-full bg-white'>
            <i
              className='w-fit h-full text-gray-900 lg:text-gray-400 text-2xl lg:xl flex justify-center cursor-default lg:cursor-pointer lg:hover:text-gray-900'
              onClick={() => props.talentRequestModalClose()}
            >
              <IconCancel />
            </i>
          </div>
          {/**content */}
          <div className='w-full flex flex-col justify-start items-center'>
            {/**header form */}
            <div className='w-full h-24 lg:h-32 px-4 lg:px-8 pt-2 lg:pt-4 flex flex-col bg-slate-950 rounded-t-md'>
              <h2 className='w-full h-fit text-white text-xl lg:text-3xl font-bold z-10'>
                TALENT REQUEST
              </h2>
              <h4 className='w-full h-fit text-slate-500 text-sm lg:text-lg tracking-wide font-normal text-start flex'>
                Our AI finds the talent that best fits your profile and requirements.
              </h4>
            </div>
            {/**form container */}
            <div className='w-full px-4 lg:px-8 flex flex-col'>
              {/**form-box */}
              <form onSubmit={(e: any) => handleSubmit(e)}>
                {/**inputs */}
                {/**job title input */}
                <div className='w-full h-fit pt-6 relative flex flex-col justify-start items-start'>
                  <label htmlFor='jobTitle'>
                    <h5
                      className={
                        `${formData.jobTitle ?
                          'top-3 text-gray-600 text-xs lg:text-sm bg-white z-20'
                          : change.jobTitle ?
                            'top-3 text-gray-600 text-xs lg:text-sm bg-white z-20'
                            : 'top-[1.80rem] lg:top-[1.80rem] text-gray-400 text-sm lg:text-base bg-none z-0'
                        } w-fit h-fit absolute left-1 lg:left-2 pl-1 pr-2 font-normal transition-all`
                      }
                    >
                      Job title
                    </h5>
                  </label>
                  <input
                    type='text'
                    id='jobTitle'
                    name='jobTitle'
                    className={
                      `${formData.jobTitle ?
                        'border-green-200 shadow-input'
                        : change.jobTitle ?
                          'border-green-400'
                          : 'border-slate-300'
                      } w-full h-fit pl-2 sm:pl-3 py-1 text-sm lg:text-base bg-transparent border rounded-md outline-none transition-all z-10`
                    }
                    required
                    value={formData.jobTitle}
                    onFocus={() => setChange({ ...change, jobTitle: true })}
                    onBlur={() => setChange({ ...change, jobTitle: false })}
                    onChange={(e: any) => handleFormData(e)}
                  />
                </div>
                {/**job category input */}
                <div className='w-full h-fit pt-6 relative flex flex-col justify-start items-start'>
                  <label htmlFor='jobCategory'>
                    <h5
                      className={
                        `${formData.jobCategory ?
                          'top-3 text-gray-600 text-xs lg:text-sm bg-white z-20'
                          : change.jobCategory ?
                            'top-3 text-gray-600 text-xs lg:text-sm bg-white z-20'
                            : 'top-[1.80rem] lg:top-[1.80rem] text-gray-400 text-sm lg:text-base bg-none z-0'
                        } w-fit h-fit absolute left-1 lg:left-2 pl-1 pr-2 font-normal transition-all`
                      }
                    >
                      Job category
                    </h5>
                  </label>
                  <input
                    type='text'
                    id='jobCategory'
                    name='jobCategory'
                    className={
                      `${formData.jobCategory ?
                        'border-green-200 shadow-input'
                        : change.jobCategory ?
                          'border-green-400'
                          : 'border-slate-300'
                      } w-full h-fit pl-2 sm:pl-3 py-1 text-sm lg:text-base bg-transparent border rounded-md outline-none transition-all z-10`
                    }
                    required
                    value={formData.jobCategory}
                    onFocus={() => setChange({ ...change, jobCategory: true })}
                    onBlur={() => setChange({ ...change, jobCategory: false })}
                    onChange={(e: any) => handleFormData(e)}
                  />
                </div>
                {/**skills required input */}
                <div className='w-full h-fit pt-6 relative flex flex-col justify-start items-start'>
                  <label htmlFor='skillsRequired'>
                    <h5
                      className={
                        `${formData.skillsRequired ?
                          'top-3 text-gray-600 text-xs lg:text-sm bg-white z-20'
                          : change.skillsRequired ?
                            'top-3 text-gray-600 text-xs lg:text-sm bg-white z-20'
                            : 'top-[1.80rem] lg:top-[1.80rem] text-gray-400 text-sm lg:text-base bg-none z-0'
                        } w-fit h-fit absolute left-1 lg:left-2 pl-1 pr-2 font-normal transition-all`
                      }
                    >
                      Skills required
                    </h5>
                  </label>
                  <input
                    type='text'
                    id='skillsRequired'
                    name='skillsRequired'
                    className={
                      `${formData.skillsRequired ?
                        'border-green-200 shadow-input'
                        : change.skillsRequired ?
                          'border-green-400'
                          : 'border-slate-300'
                      } w-full h-fit pl-2 sm:pl-3 py-1 text-sm lg:text-base bg-transparent border rounded-md outline-none transition-all z-10`
                    }
                    required
                    value={formData.skillsRequired}
                    onFocus={() => setChange({ ...change, skillsRequired: true })}
                    onBlur={() => setChange({ ...change, skillsRequired: false })}
                    onChange={(e: any) => handleFormData(e)}
                  />
                </div>
                {/**job description input */}
                <div className='w-full h-fit pt-6 relative flex flex-col justify-start items-start'>
                  <label htmlFor='jobDescription'>
                    <h5
                      className={
                        `${formData.jobDescription ?
                          'top-3 text-gray-600 text-xs lg:text-sm bg-white z-20'
                          : change.jobDescription ?
                            'top-3 text-gray-600 text-xs lg:text-sm bg-white z-20'
                            : 'top-[1.80rem] lg:top-[1.80rem] text-gray-400 text-sm lg:text-base bg-none z-0'
                        } w-fit h-fit absolute left-1 lg:left-2 pl-1 pr-2 font-normal transition-all`
                      }
                    >
                      Job description
                    </h5>
                  </label>
                  <input
                    type='text'
                    id='jobDescription'
                    name='jobDescription'
                    className={
                      `${formData.jobDescription ?
                        'border-green-200 shadow-input'
                        : change.jobDescription ?
                          'border-green-400'
                          : 'border-slate-300'
                      } w-full h-fit pl-2 sm:pl-3 py-1 text-sm lg:text-base bg-transparent border rounded-md outline-none transition-all z-10`
                    }
                    required
                    value={formData.jobDescription}
                    onFocus={() => setChange({ ...change, jobDescription: true })}
                    onBlur={() => setChange({ ...change, jobDescription: false })}
                    onChange={(e: any) => handleFormData(e)}
                  />
                </div>
                {/**experience needed */}
                <div className='w-full h-fit pt-6 relative flex flex-col justify-start items-start'>
                  <label htmlFor='experienceNeeded'>
                    <h5 className='w-fit h-fit absolute left-1 lg:left-2 top-3 pl-1 pr-2 text-gray-600 text-xs lg:text-sm font-normal bg-white transition-all z-20'>
                      Experience Needed
                    </h5>
                  </label>
                  <select
                    id='experienceNeeded'
                    name='experienceNeeded'
                    className={
                      `${formData.experienceNeeded ?
                        'border-green-200 shadow-input'
                        : change.experienceNeeded ?
                          'border-green-400'
                          : 'border-slate-300'
                      } w-full h-fit pl-2 sm:pl-3 py-1 text-xs lg:text-sm bg-transparent border rounded-md outline-none transition-all z-10`
                    }
                    required
                    value={formData.experienceNeeded}
                    onFocus={() => setChange({ ...change, experienceNeeded: true })}
                    onBlur={() => setChange({ ...change, experienceNeeded: false })}
                    onChange={(e: any) => handleFormData(e)}
                  >
                    <option value="entry">Entry Level</option>
                    <option value="mid">Mid Level</option>
                    <option value="senior">Senior Level</option>
                  </select>
                </div>
                {/**location input */}
                <div className='w-full h-fit pt-6 relative flex flex-col justify-start items-start'>
                  <label htmlFor='location'>
                    <h5
                      className={
                        `${formData.location ?
                          'top-3 text-gray-600 text-xs lg:text-sm bg-white z-20'
                          : change.location ?
                            'top-3 text-gray-600 text-xs lg:text-sm bg-white z-20'
                            : 'top-[1.80rem] lg:top-[1.80rem] text-gray-400 text-sm lg:text-base bg-none z-0'
                        } w-fit h-fit absolute left-1 lg:left-2 pl-1 pr-2 font-normal transition-all`
                      }
                    >
                      Location
                    </h5>
                  </label>
                  <input
                    type='text'
                    id='location'
                    name='location'
                    className={
                      `${formData.location ?
                        'border-green-200 shadow-input'
                        : change.location ?
                          'border-green-400'
                          : 'border-slate-300'
                      } w-full h-fit pl-2 sm:pl-3 py-1 text-sm lg:text-base bg-transparent border rounded-md outline-none transition-all z-10`
                    }
                    required
                    value={formData.location}
                    onFocus={() => setChange({ ...change, location: true })}
                    onBlur={() => setChange({ ...change, location: false })}
                    onChange={(e: any) => handleFormData(e)}
                  />
                </div>
                {/**job type needed */}
                <div className='w-full h-fit pt-6 relative flex flex-col justify-start items-start'>
                  <label htmlFor='jobType'>
                    <h5 className='w-fit h-fit absolute left-1 lg:left-2 top-3 pl-1 pr-2 text-gray-600 text-xs lg:text-sm font-normal bg-white transition-all z-20'>
                      Job type
                    </h5>
                  </label>
                  <select
                    id='jobType'
                    name='jobType'
                    className={
                      `${formData.jobType ?
                        'border-green-200 shadow-input'
                        : change.jobType ?
                          'border-green-400'
                          : 'border-slate-300'
                      } w-full h-fit pl-2 sm:pl-3 py-1 text-xs lg:text-sm bg-transparent border rounded-md outline-none transition-all z-10`
                    }
                    required
                    value={formData.jobType}
                    onFocus={() => setChange({ ...change, jobType: true })}
                    onBlur={() => setChange({ ...change, jobType: false })}
                    onChange={(e: any) => handleFormData(e)}
                  >
                    <option value="full-time">Full Time</option>
                    <option value="part-time">Part Time</option>
                    <option value="contract">Contract</option>
                  </select>
                </div>
                {/**compensation input */}
                <div className='w-full h-fit pt-6 relative flex flex-col justify-start items-start'>
                  <label htmlFor='compensation'>
                    <h5
                      className={
                        `${formData.compensation ?
                          'top-3 text-gray-600 text-xs lg:text-sm bg-white z-20'
                          : change.compensation ?
                            'top-3 text-gray-600 text-xs lg:text-sm bg-white z-20'
                            : 'top-[1.80rem] lg:top-[1.80rem] text-gray-400 text-sm lg:text-base bg-none z-0'
                        } w-fit h-fit absolute left-1 lg:left-2 pl-1 pr-2 font-normal transition-all`
                      }
                    >
                      Compensation
                    </h5>
                  </label>
                  <input
                    type='text'
                    id='compensation'
                    name='compensation'
                    className={
                      `${formData.compensation ?
                        'border-green-200 shadow-input'
                        : change.compensation ?
                          'border-green-400'
                          : 'border-slate-300'
                      } w-full h-fit pl-2 sm:pl-3 py-1 text-sm lg:text-base bg-transparent border rounded-md outline-none transition-all z-10`
                    }
                    required
                    value={formData.compensation}
                    onFocus={() => setChange({ ...change, compensation: true })}
                    onBlur={() => setChange({ ...change, compensation: false })}
                    onChange={(e: any) => handleFormData(e)}
                  />
                </div>
                {/**application deadline input */}
                <div className='w-full h-fit pt-6 relative flex flex-col justify-start items-start'>
                  <label htmlFor='applicationDeadline'>
                    <h5 className='w-fit h-fit absolute left-1 lg:left-2 top-3 pl-1 pr-2 text-gray-600 text-xs lg:text-sm font-normal bg-white transition-all z-20'>
                      Application deadline
                    </h5>
                  </label>
                  <input
                    type='date'
                    id='applicationDeadline'
                    name='applicationDeadline'
                    className={
                      `${formData.applicationDeadline ?
                        'border-green-200 shadow-input'
                        : change.applicationDeadline ?
                          'border-green-400'
                          : 'border-slate-300'
                      } w-full h-fit pl-2 sm:pl-3 py-1 text-sm lg:text-base bg-transparent border rounded-md outline-none transition-all z-10`
                    }
                    required
                    value={formData.applicationDeadline}
                    onFocus={() => setChange({ ...change, applicationDeadline: true })}
                    onBlur={() => setChange({ ...change, applicationDeadline: false })}
                    onChange={(e: any) => handleFormData(e)}
                  />
                </div>
                {/**company info input */}
                <div className='w-full h-fit pt-6 relative flex flex-col justify-start items-start'>
                  <label htmlFor='companyInfo'>
                    <h5
                      className={
                        `${formData.companyInfo ?
                          'top-3 text-gray-600 text-xs lg:text-sm bg-white z-20'
                          : change.companyInfo ?
                            'top-3 text-gray-600 text-xs lg:text-sm bg-white z-20'
                            : 'top-[1.80rem] lg:top-[1.80rem] text-gray-400 text-sm lg:text-base bg-none z-0'
                        } w-fit h-fit absolute left-1 lg:left-2 pl-1 pr-2 font-normal transition-all`
                      }
                    >
                      Company info
                    </h5>
                  </label>
                  <input
                    type='text'
                    id='companyInfo'
                    name='companyInfo'
                    className={
                      `${formData.companyInfo ?
                        'border-green-200 shadow-input'
                        : change.companyInfo ?
                          'border-green-400'
                          : 'border-slate-300'
                      } w-full h-fit pl-2 sm:pl-3 py-1 text-sm lg:text-base bg-transparent border rounded-md outline-none transition-all z-10`
                    }
                    required
                    value={formData.companyInfo}
                    onFocus={() => setChange({ ...change, companyInfo: true })}
                    onBlur={() => setChange({ ...change, companyInfo: false })}
                    onChange={(e: any) => handleFormData(e)}
                  />
                </div>
                {/**additional perks input */}
                <div className='w-full h-fit pt-6 relative flex flex-col justify-start items-start'>
                  <label htmlFor='additionalPerks'>
                    <h5
                      className={
                        `${formData.additionalPerks ?
                          'top-3 text-gray-600 text-xs lg:text-sm bg-white z-20'
                          : change.additionalPerks ?
                            'top-3 text-gray-600 text-xs lg:text-sm bg-white z-20'
                            : 'top-[1.80rem] lg:top-[1.80rem] text-gray-400 text-sm lg:text-base bg-none z-0'
                        } w-fit h-fit absolute left-1 lg:left-2 pl-1 pr-2 font-normal transition-all`
                      }
                    >
                      Additional perks
                    </h5>
                  </label>
                  <input
                    type='text'
                    id='additionalPerks'
                    name='additionalPerks'
                    className={
                      `${formData.additionalPerks ?
                        'border-green-200 shadow-input'
                        : change.additionalPerks ?
                          'border-green-400'
                          : 'border-slate-300'
                      } w-full h-fit pl-2 sm:pl-3 py-1 text-sm lg:text-base bg-transparent border rounded-md outline-none transition-all z-10`
                    }
                    required
                    value={formData.additionalPerks}
                    onFocus={() => setChange({ ...change, additionalPerks: true })}
                    onBlur={() => setChange({ ...change, additionalPerks: false })}
                    onChange={(e: any) => handleFormData(e)}
                  />
                </div>
                {/**button submit form */}
                <div className='w-full pt-5 flex flex-col justify-center items-center'>
                  <button
                    type='submit'
                    className={
                      `${formData ?
                        'font-bold bg-green-400 lg:bg-green-300 lg:hover:bg-green-400 cursor-default lg:cursor-pointer' :
                        'bg-slate-400 cursor-default'
                      } w-full text-slate-50 lg:hover:text-white lg:hover:font-bold px-6 py-2 flex flex-row justify-center items-center rounded-md transition-all z-30`
                    }
                  >
                    <h5 className='w-full h-fit text-sm lg:text-base leading-none tracking-wider'>
                      Send job request
                    </h5>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      :
      ''
  )
};

