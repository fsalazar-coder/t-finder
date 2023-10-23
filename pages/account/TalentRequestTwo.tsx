


export default function TalentRequestTwo(props: any) {
  
  const formDataTalent = props.formDataTalent;
  const changeDataTalent = props.changeDataTalent;

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
        { optionValue: 'entry', optionTitle: 'Entry Level' },
        { optionValue: 'mid', optionTitle: 'Mid Level' },
        { optionValue: 'senior', optionTitle: 'Senior Level' },
      ]
    },
    { type: 'input', title: 'Location', value: 'location' },
    { type: 'input', title: 'Compensation', value: 'compensation' },
    { type: 'input', title: 'Application Deadline', value: 'applicationDeadline' },
    { type: 'input', title: 'Company Info', value: 'companyInfo' },
    { type: 'input', title: 'Additional Perks', value: 'additionalPerks' }
  ];

  return (
    <>
      {/**location input */}
      <div className='w-full h-fit pt-6 relative flex flex-col justify-start items-start'>
        <label htmlFor='location'>
          <h5
            className={
              `${formDataTalent.location ?
                'top-3 text-gray-600 text-xs lg:text-sm bg-white z-20'
                : changeTalent.location ?
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
            `${formDataTalent.location ?
              'border-green-200 shadow-input'
              : changeTalent.location ?
                'border-green-400'
                : 'border-slate-300'
            } w-full h-fit pl-2 sm:pl-3 py-1 text-sm lg:text-base bg-transparent border rounded-md outline-none transition-all z-10`
          }
          required
          value={formDataTalent.location}
          onFocus={() => setChangeTalent({ ...changeTalent, location: true })}
          onBlur={() => setChangeTalent({ ...changeTalent, location: false })}
          onChange={(e: any) => handleformDataTalent(e)}
        />
      </div>
      {/**compensation input */}
      <div className='w-full h-fit pt-6 relative flex flex-col justify-start items-start'>
        <label htmlFor='compensation'>
          <h5
            className={
              `${formDataTalent.compensation ?
                'top-3 text-gray-600 text-xs lg:text-sm bg-white z-20'
                : changeTalent.compensation ?
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
            `${formDataTalent.compensation ?
              'border-green-200 shadow-input'
              : changeTalent.compensation ?
                'border-green-400'
                : 'border-slate-300'
            } w-full h-fit pl-2 sm:pl-3 py-1 text-sm lg:text-base bg-transparent border rounded-md outline-none transition-all z-10`
          }
          required
          value={formDataTalent.compensation}
          onFocus={() => setChangeTalent({ ...changeTalent, compensation: true })}
          onBlur={() => setChangeTalent({ ...changeTalent, compensation: false })}
          onChange={(e: any) => handleformDataTalent(e)}
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
            `${formDataTalent.applicationDeadline ?
              'border-green-200 shadow-input'
              : changeTalent.applicationDeadline ?
                'border-green-400'
                : 'border-slate-300'
            } w-full h-fit pl-2 sm:pl-3 py-1 text-sm lg:text-base bg-transparent border rounded-md outline-none transition-all z-10`
          }
          required
          value={formDataTalent.applicationDeadline}
          onFocus={() => setChangeTalent({ ...changeTalent, applicationDeadline: true })}
          onBlur={() => setChangeTalent({ ...changeTalent, applicationDeadline: false })}
          onChange={(e: any) => handleformDataTalent(e)}
        />
      </div>
      {/**company info input */}
      <div className='w-full h-fit pt-6 relative flex flex-col justify-start items-start'>
        <label htmlFor='companyInfo'>
          <h5
            className={
              `${formDataTalent.companyInfo ?
                'top-3 text-gray-600 text-xs lg:text-sm bg-white z-20'
                : changeTalent.companyInfo ?
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
            `${formDataTalent.companyInfo ?
              'border-green-200 shadow-input'
              : changeTalent.companyInfo ?
                'border-green-400'
                : 'border-slate-300'
            } w-full h-fit pl-2 sm:pl-3 py-1 text-sm lg:text-base bg-transparent border rounded-md outline-none transition-all z-10`
          }
          required
          value={formDataTalent.companyInfo}
          onFocus={() => setChangeTalent({ ...changeTalent, companyInfo: true })}
          onBlur={() => setChangeTalent({ ...changeTalent, companyInfo: false })}
          onChange={(e: any) => handleformDataTalent(e)}
        />
      </div>
      {/**additional perks input */}
      <div className='w-full h-fit pt-6 relative flex flex-col justify-start items-start'>
        <label htmlFor='additionalPerks'>
          <h5
            className={
              `${formDataTalent.additionalPerks ?
                'top-3 text-gray-600 text-xs lg:text-sm bg-white z-20'
                : changeTalent.additionalPerks ?
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
            `${formDataTalent.additionalPerks ?
              'border-green-200 shadow-input'
              : changeTalent.additionalPerks ?
                'border-green-400'
                : 'border-slate-300'
            } w-full h-fit pl-2 sm:pl-3 py-1 text-sm lg:text-base bg-transparent border rounded-md outline-none transition-all z-10`
          }
          required
          value={formDataTalent.additionalPerks}
          onFocus={() => setChangeTalent({ ...changeTalent, additionalPerks: true })}
          onBlur={() => setChangeTalent({ ...changeTalent, additionalPerks: false })}
          onChange={(e: any) => handleformDataTalent(e)}
        />
      </div>
    </>
  )
};
