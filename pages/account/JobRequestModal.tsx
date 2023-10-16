import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from "../../context/authContext";
import { IconCancel } from '../../icons/icons';



export default function JobRequestModal(props: any) {

  const { auth } = useAuth();
  const [formData, setFormData] = useState({
    talentTitle: '',
    talentCategory: '',
    skillsOffered: [],
    talentDescription: '',
    experienceLevel: '',
    locationPreference: '',
    availability: '',
    duration: '',
    rates: '',
    additionalRequirements: ''
  });
  const [change, setChange] = useState({
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

  const handleFormData = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Send formData to your backend API to save it in MongoDB
    try {
      const response = await axios.post('/api/talentRequest', formData);
      console.log('Talent request saved:', response.data);
    } 
    catch (error) {
      console.error('Error saving talent request:', error);
    }
  };


  return (
    props.jobRequestModal ?
      <div
        className={
          `w-screen h-screen fixed top-0 flex flex-col justify-center items-center bg-black bg-opacity-75 transform z-[60]
        ${props.jobRequestModal ?
            'scale-100 animate-[fade-in_0.50s]'
            : props.joinModalAnimationClose ?
              'scale-0 animate-[fade-out_0.30s]'
              : 'hidden'
          }`
        }
        onClick={() => props.jobRequestModalClose()}
      >
        <div
          className={
            `container w-64 lg:w-[22rem] relative flex flex-col justify-start items-center bg-white rounded-md shadow-lg transform
          ${props.jobRequestModal ?
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
              onClick={() => props.jobRequestModalClose()}
            >
              <IconCancel />
            </i>
          </div>
          {/**content */}
          <div className='w-full flex flex-col justify-start items-center'>
            {/**header form */}
            <div className='w-full h-24 lg:h-32 px-4 lg:px-8 pt-2 lg:pt-4 flex flex-col bg-slate-950 rounded-t-md'>
              <h2 className='w-full h-fit text-white text-xl lg:text-3xl font-bold z-10'>
                JOB REQUEST
              </h2>
              <h4 className='w-full h-fit text-slate-500 text-sm lg:text-lg tracking-wide font-normal text-start flex'>
                Our AI finds the job that best fits your profile and requirements.
              </h4>
            </div>
            {/**form container */}
            <div className='w-full px-4 lg:px-8 flex flex-col'>
              {/**form-box */}
              <form onSubmit={(e: any) => handleSubmit(e)}>
                {/**inputs */}
                {/**talent title input */}
                <div className='w-full h-fit pt-6 relative flex flex-col justify-start items-start'>
                  <label htmlFor='talentTitle'>
                    <h5
                      className={
                        `${formData.talentTitle ?
                          'top-3 text-gray-600 text-xs lg:text-sm bg-white z-20'
                          : change.talentTitle ?
                            'top-3 text-gray-600 text-xs lg:text-sm bg-white z-20'
                            : 'top-[1.80rem] lg:top-[1.80rem] text-gray-400 text-sm lg:text-base bg-none z-0'
                        } w-fit h-fit absolute left-1 lg:left-2 pl-1 pr-2 font-normal transition-all`
                      }
                    >
                      Talent title
                    </h5>
                  </label>
                  <input
                    type='text'
                    id='talentTitle'
                    name='talentTitle'
                    className={
                      `${formData.talentTitle ?
                        'border-green-200 shadow-input'
                        : change.talentTitle ?
                          'border-green-400'
                          : 'border-slate-300'
                      } w-full h-fit pl-2 sm:pl-3 py-1 text-sm lg:text-base bg-transparent border rounded-md outline-none transition-all z-10`
                    }
                    required
                    value={formData.talentTitle}
                    onFocus={() => setChange({ ...change, talentTitle: true })}
                    onBlur={() => setChange({ ...change, talentTitle: false })}
                    onChange={(e: any) => handleFormData(e)}
                  />
                </div>
                {/**talent category input */}
                <div className='w-full h-fit pt-6 relative flex flex-col justify-start items-start'>
                  <label htmlFor='talentCategory'>
                    <h5
                      className={
                        `${formData.talentCategory ?
                          'top-3 text-gray-600 text-xs lg:text-sm bg-white z-20'
                          : change.talentCategory ?
                            'top-3 text-gray-600 text-xs lg:text-sm bg-white z-20'
                            : 'top-[1.80rem] lg:top-[1.80rem] text-gray-400 text-sm lg:text-base bg-none z-0'
                        } w-fit h-fit absolute left-1 lg:left-2 pl-1 pr-2 font-normal transition-all`
                      }
                    >
                      Talent category
                    </h5>
                  </label>
                  <input
                    type='text'
                    id='talentCategory'
                    name='talentCategory'
                    className={
                      `${formData.talentCategory ?
                        'border-green-200 shadow-input'
                        : change.talentCategory ?
                          'border-green-400'
                          : 'border-slate-300'
                      } w-full h-fit pl-2 sm:pl-3 py-1 text-sm lg:text-base bg-transparent border rounded-md outline-none transition-all z-10`
                    }
                    required
                    value={formData.talentCategory}
                    onFocus={() => setChange({ ...change, talentCategory: true })}
                    onBlur={() => setChange({ ...change, talentCategory: false })}
                    onChange={(e: any) => handleFormData(e)}
                  />
                </div>
                {/**skill offered input */}
                <div className='w-full h-fit pt-6 relative flex flex-col justify-start items-start'>
                  <label htmlFor='skillsOffered'>
                    <h5
                      className={
                        `${formData.skillsOffered ?
                          'top-3 text-gray-600 text-xs lg:text-sm bg-white z-20'
                          : change.skillsOffered ?
                            'top-3 text-gray-600 text-xs lg:text-sm bg-white z-20'
                            : 'top-[1.80rem] lg:top-[1.80rem] text-gray-400 text-sm lg:text-base bg-none z-0'
                        } w-fit h-fit absolute left-1 lg:left-2 pl-1 pr-2 font-normal transition-all`
                      }
                    >
                      Skills offered
                    </h5>
                  </label>
                  <input
                    type='text'
                    id='skillsOffered'
                    name='skillsOffered'
                    className={
                      `${formData.skillsOffered ?
                        'border-green-200 shadow-input'
                        : change.skillsOffered ?
                          'border-green-400'
                          : 'border-slate-300'
                      } w-full h-fit pl-2 sm:pl-3 py-1 text-sm lg:text-base bg-transparent border rounded-md outline-none transition-all z-10`
                    }
                    required
                    value={formData.skillsOffered}
                    onFocus={() => setChange({ ...change, skillsOffered: true })}
                    onBlur={() => setChange({ ...change, skillsOffered: false })}
                    onChange={(e: any) => handleFormData(e)}
                  />
                </div>
                {/**talent description input */}
                <div className='w-full h-fit pt-6 relative flex flex-col justify-start items-start'>
                  <label htmlFor='talentDescription'>
                    <h5
                      className={
                        `${formData.talentDescription ?
                          'top-3 text-gray-600 text-xs lg:text-sm bg-white z-20'
                          : change.talentDescription ?
                            'top-3 text-gray-600 text-xs lg:text-sm bg-white z-20'
                            : 'top-[1.80rem] lg:top-[1.80rem] text-gray-400 text-sm lg:text-base bg-none z-0'
                        } w-fit h-fit absolute left-1 lg:left-2 pl-1 pr-2 font-normal transition-all`
                      }
                    >
                      Talent description:
                    </h5>
                  </label>
                  <input
                    type='text'
                    id='talentDescription'
                    name='talentDescription'
                    className={
                      `${formData.talentDescription ?
                        'border-green-200 shadow-input'
                        : change.talentDescription ?
                          'border-green-400'
                          : 'border-slate-300'
                      } w-full h-fit pl-2 sm:pl-3 py-1 text-sm lg:text-base bg-transparent border rounded-md outline-none transition-all z-10`
                    }
                    required
                    value={formData.talentDescription}
                    onFocus={() => setChange({ ...change, talentDescription: true })}
                    onBlur={() => setChange({ ...change, talentDescription: false })}
                    onChange={(e: any) => handleFormData(e)}
                  />
                </div>
                {/**experience level input */}
                <div className='w-full h-fit pt-6 relative flex flex-col justify-start items-start'>
                  <label htmlFor='experienceLevel'>
                    <h5 className='w-fit h-fit absolute left-1 lg:left-2 top-3 pl-1 pr-2 text-gray-600 text-xs lg:text-sm font-normal bg-white transition-all z-20'>
                      Experience level:
                    </h5>
                  </label>
                  <select
                    id='experienceLevel'
                    name='experienceLevel'
                    className={
                      `${formData.experienceLevel ?
                        'border-green-200 shadow-input'
                        : change.experienceLevel ?
                          'border-green-400'
                          : 'border-slate-300'
                      } w-full h-fit pl-2 sm:pl-3 py-1 text-xs lg:text-sm bg-transparent border rounded-md outline-none transition-all z-10`
                    }
                    required
                    value={formData.experienceLevel}
                    onFocus={() => setChange({ ...change, experienceLevel: true })}
                    onBlur={() => setChange({ ...change, experienceLevel: false })}
                    onChange={(e: any) => handleFormData(e)}
                  >
                    <option value="entry">Entry Level</option>
                    <option value="mid">Mid Level</option>
                    <option value="senior">Senior Level</option>
                  </select>
                </div>
                {/**location preference input */}
                <div className='w-full h-fit pt-6 relative flex flex-col justify-start items-start'>
                  <label htmlFor='locationPreference'>
                    <h5 className='w-fit h-fit absolute left-1 lg:left-2 top-3 pl-1 pr-2 text-gray-600 text-xs lg:text-sm font-normal bg-white transition-all z-20'>
                      Location preference
                    </h5>
                  </label>
                  <select
                    id='locationPreference'
                    name='locationPreference'
                    className={
                      `${formData.locationPreference ?
                        'border-green-200 shadow-input'
                        : change.locationPreference ?
                          'border-green-400'
                          : 'border-slate-300'
                      } w-full h-fit pl-2 sm:pl-3 py-1 text-xs lg:text-sm bg-transparent border rounded-md outline-none transition-all z-10`
                    }
                    required
                    value={formData.locationPreference}
                    onFocus={() => setChange({ ...change, locationPreference: true })}
                    onBlur={() => setChange({ ...change, locationPreference: false })}
                    onChange={(e: any) => handleFormData(e)}
                  >
                    <option value="remote">Remote</option>
                    <option value="on-site">On-site</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>
                {/**availability input */}
                <div className='w-full h-fit pt-6 relative flex flex-col justify-start items-start'>
                  <label htmlFor='availability'>
                    <h5 className='w-fit h-fit absolute left-1 lg:left-2 top-3 pl-1 pr-2 text-gray-600 text-xs lg:text-sm font-normal bg-white transition-all z-20'>
                      Availability
                    </h5>
                  </label>
                  <select
                    id='availability'
                    name='availability'
                    className={
                      `${formData.availability ?
                        'border-green-200 shadow-input'
                        : change.availability ?
                          'border-green-400'
                          : 'border-slate-300'
                      } w-full h-fit pl-2 sm:pl-3 py-1 text-xs lg:text-sm bg-transparent border rounded-md outline-none transition-all z-10`
                    }
                    required
                    value={formData.availability}
                    onFocus={() => setChange({ ...change, availability: true })}
                    onBlur={() => setChange({ ...change, availability: false })}
                    onChange={(e: any) => handleFormData(e)}
                  >
                    <option value="full-time">Full Time</option>
                    <option value="full-time">Part Time</option>
                    <option value="full-time">Freelance</option>
                  </select>
                </div>
                {/**rates input */}
                <div className='w-full h-fit pt-6 relative flex flex-col justify-start items-start'>
                  <label htmlFor='rates'>
                    <h5
                      className={
                        `${formData.rates ?
                          'top-3 text-gray-600 text-xs lg:text-sm bg-white z-20'
                          : change.rates ?
                            'top-3 text-gray-600 text-xs lg:text-sm bg-white z-20'
                            : 'top-[1.80rem] lg:top-[1.80rem] text-gray-400 text-sm lg:text-base bg-none z-0'
                        } w-fit h-fit absolute left-1 lg:left-2 pl-1 pr-2 font-normal transition-all`
                      }
                    >
                      Rates
                    </h5>
                  </label>
                  <input
                    type='text'
                    id='rates'
                    name='rates'
                    className={
                      `${formData.rates ?
                        'border-green-200 shadow-input'
                        : change.rates ?
                          'border-green-400'
                          : 'border-slate-300'
                      } w-full h-fit pl-2 sm:pl-3 py-1 text-sm lg:text-base bg-transparent border rounded-md outline-none transition-all z-10`
                    }
                    required
                    value={formData.rates}
                    onFocus={() => setChange({ ...change, rates: true })}
                    onBlur={() => setChange({ ...change, rates: false })}
                    onChange={(e: any) => handleFormData(e)}
                  />
                </div>
                {/**duration input */}
                <div className='w-full h-fit pt-6 relative flex flex-col justify-start items-start'>
                  <label htmlFor='duration'>
                    <h5
                      className={
                        `${formData.duration ?
                          'top-3 text-gray-600 text-xs lg:text-sm bg-white z-20'
                          : change.duration ?
                            'top-3 text-gray-600 text-xs lg:text-sm bg-white z-20'
                            : 'top-[1.80rem] lg:top-[1.80rem] text-gray-400 text-sm lg:text-base bg-none z-0'
                        } w-fit h-fit absolute left-1 lg:left-2 pl-1 pr-2 font-normal transition-all`
                      }
                    >
                      Duration
                    </h5>
                  </label>
                  <input
                    type='text'
                    id='duration'
                    name='duration'
                    className={
                      `${formData.duration ?
                        'border-green-200 shadow-input'
                        : change.duration ?
                          'border-green-400'
                          : 'border-slate-300'
                      } w-full h-fit pl-2 sm:pl-3 py-1 text-sm lg:text-base bg-transparent border rounded-md outline-none transition-all z-10`
                    }
                    required
                    value={formData.duration}
                    onFocus={() => setChange({ ...change, duration: true })}
                    onBlur={() => setChange({ ...change, duration: false })}
                    onChange={(e: any) => handleFormData(e)}
                  />
                </div>
                {/**additional requierements input */}
                <div className='w-full h-fit pt-6 relative flex flex-col justify-start items-start'>
                  <label htmlFor='additionalRequirements'>
                    <h5
                      className={
                        `${formData.additionalRequirements ?
                          'top-3 text-gray-600 text-xs lg:text-sm bg-white z-20'
                          : change.additionalRequirements ?
                            'top-3 text-gray-600 text-xs lg:text-sm bg-white z-20'
                            : 'top-[1.80rem] lg:top-[1.80rem] text-gray-400 text-sm lg:text-base bg-none z-0'
                        } w-fit h-fit absolute left-1 lg:left-2 pl-1 pr-2 font-normal transition-all`
                      }
                    >
                      Additional requirements
                    </h5>
                  </label>
                  <input
                    type='text'
                    id='talentDescription'
                    name='talentDescription'
                    className={
                      `${formData.additionalRequirements ?
                        'border-green-200 shadow-input'
                        : change.additionalRequirements ?
                          'border-green-400'
                          : 'border-slate-300'
                      } w-full h-fit pl-2 sm:pl-3 py-1 text-sm lg:text-base bg-transparent border rounded-md outline-none transition-all z-10`
                    }
                    required
                    value={formData.additionalRequirements}
                    onFocus={() => setChange({ ...change, additionalRequirements: true })}
                    onBlur={() => setChange({ ...change, additionalRequirements: false })}
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

