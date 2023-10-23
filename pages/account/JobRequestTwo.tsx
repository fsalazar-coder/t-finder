
export default function JobRequestTwo(props: any) {
  
  const formDataJob = props.formDataJob;
  const changeDataJob = props.changeDataJob;

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
        { optionValue: 'entry', optionTitle: 'Entry Level' },
        { optionValue: 'mid', optionTitle: 'Mid Level' },
        { optionValue: 'senior', optionTitle: 'Senior Level' },
      ]
    },
    {
      type: 'select',
      title: 'Location Preference',
      value: 'locationPreference',
      options: [
        { optionValue: 'remote', optionTitle: 'Remote' },
        { optionValue: 'on-site', optionTitle: 'On-site' },
        { optionValue: 'flexible', optionTitle: 'Flexible' },
      ]
    },
    {
      type: 'select',
      title: 'Availability',
      value: 'availability',
      options: [
        { optionValue: 'full-time', optionTitle: 'Full time' },
        { optionValue: 'part-time', optionTitle: 'Part time' },
        { optionValue: 'frelance', optionTitle: 'Frelance' },
      ]
    },
    { type: 'input', title: 'Rates', value: 'rates' },
    { type: 'input', title: 'Duration', value: 'duration' },
    { type: 'input', title: 'Additional Requirements', value: 'additionalRequirements' }
  ];

};