import React, { useState, useEffect } from 'react';
import { useAuthData, useAuthUI, useUI } from "../../context/authContext";
import FormTemplate from './FormTemplate';
import { IconCancel } from '../../icons/icons';
import ProfileModalImage from './ProfileModalImage';
import axios from 'axios';



export default function ProfileModal(props: any) {

  const { token, userId, collectionToChange, itemIdToChange, setCollectionToChange, update, setUpdate } = useAuthData();
  const { profileModal, setProfileModal, setProfileModalType, profileModalAction, setProfileModalAction } = useAuthUI();
  const { setMessageModal, setTypeMessageModal, setTextMessageModal, setLoading } = useUI();
  const [filledForm, setFilledForm] = useState(true);
  const { screenNarrow } = useUI();


  const [profileInfo, setProfileInfo] = useState({
    /**personal information: */
    fullName: '',
    professionOccupation: '',
    preferredLanguage: '',
    personalLocation: '',
    personalDescription: '',
    /**experience: */
    companyOrganization: '',
    roleTitle: '',
    responsibilities: '',
    technologiesUsedExperience: '',
    monthsDuration: null,
    teamSize: null,
    /**education: */
    universitySchool: '',
    degree: '',
    majorFieldStudy: '',
    graduationYear: null,
    /**courses: */
    courseTitle: '',
    institution: '',
    yearCompleted: null,
    skillsAcquired: '',
    /**projects: */
    projectName: '',
    role: '',
    technologiesUsedProject: '',
    description: '',
    projectUrl: '',
    /**publications */
    publicationTitle: '',
    coAuthors: '',
    journalConference: '',
    yearPublished: null,
    /**conferences: */
    presentationTitle: '',
    conferenceName: '',
    conferenceLocation: '',
    year: null,
    /**certifications: */
    certificationName: '',
    issuingOrganization: '',
    licenseNumber: '',
    yearIssued: null,
    /**recommendations: */
    recommenderName: '',
    recommenderTitle: '',
    recommenderOrganization: '',
    recommendation: '',
    recommenderEmail: '',
    recommenderPhone: '',
  });

  const [changeProfileInfo, setChangeProfileInfo] = useState({
    /**personal information: */
    fullName: false,
    professionOccupation: false,
    preferredLanguage: false,
    personalLocation: false,
    personalDescription: false,
    /**experience: */
    companyOrganization: false,
    roleTitle: false,
    responsibilities: false,
    technologiesUsedExperience: false,
    monthsDuration: false,
    teamSize: false,
    /**education: */
    universitySchool: false,
    degree: false,
    majorFieldStudy: false,
    graduationYear: false,
    /**courses: */
    courseTitle: false,
    institution: false,
    yearCompleted: false,
    skillsAcquired: false,
    /**projects: */
    projectName: false,
    role: false,
    technologiesUsedProject: false,
    description: false,
    projectUrl: false,
    /**publications: */
    publicationTitle: false,
    coAuthors: false,
    journalConference: false,
    yearPublished: false,
    /**conferences: */
    presentationTitle: false,
    conferenceName: false,
    conferenceLocation: false,
    year: false,
    /**certifications: */
    certificationName: false,
    issuingOrganization: false,
    licenseNumber: false,
    yearIssued: false,
    /**recommendations: */
    recommenderName: false,
    recommenderTitle: false,
    recommenderOrganization: false,
    recommendation: false,
    recommenderEmail: false,
    recommenderPhone: false,
  });

  const [profileSelected, setProfileSelected] = useState(Object);
  const [nameProfileSelected, setNameProfileSelected] = useState('');

  const handleCloseModal = () => {
    setProfileModal(false);
    setProfileModalType('');
    setProfileModalAction('');
    setCollectionToChange('')
    setFilledForm(false);
  };

  const modalCloseEscapeHandle = (e: any) => {
    (profileModal && ((e.charCode || e.keyCode) === 27)) && handleCloseModal();
  };

  useEffect(() => {
    document.addEventListener('keydown', modalCloseEscapeHandle);
    return () => {
      document.removeEventListener('keydown', modalCloseEscapeHandle);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflowY = profileModal ? 'hidden' : 'auto';
  }, [profileModal]);


  const handleChangeData = (e: any) => {
    const { name, value } = e.target;
    setProfileInfo({ ...profileInfo, [name]: value });
  };

  const dataUpdate = () => {
    const data = {
      personalInfo: {
        full_name: profileInfo.fullName,
        profession_occupation: profileInfo.professionOccupation,
        preferred_language: profileInfo.preferredLanguage,
        location: profileInfo.personalLocation,
        personal_description: profileInfo.personalDescription
      },
      experience: {
        company_organization: profileInfo.companyOrganization,
        role_title: profileInfo.roleTitle,
        responsibilities: profileInfo.responsibilities,
        technologies_used: profileInfo.technologiesUsedExperience,
        duration: profileInfo.monthsDuration,
        team_size: profileInfo.teamSize,
      },
      educationInfo: {
        university_school: profileInfo.universitySchool,
        degree: profileInfo.degree,
        major_field_study: profileInfo.majorFieldStudy,
        graduation_year: profileInfo.graduationYear,
      },
      courses: {
        course_title: profileInfo.courseTitle,
        institution: profileInfo.institution,
        year_completed: profileInfo.yearCompleted,
        skills_acquired: profileInfo.skillsAcquired,
      },
      project: {
        project_name: profileInfo.projectName,
        role: profileInfo.role,
        technologies_used: profileInfo.technologiesUsedProject,
        description: profileInfo.description,
        project_url: profileInfo.projectUrl,
      },
      publication: {
        publication_title: profileInfo.publicationTitle,
        co_authors: profileInfo.coAuthors,
        journal_conference: profileInfo.journalConference,
        year_published: profileInfo.yearPublished,
      },
      conference: {
        presentation_title: profileInfo.presentationTitle,
        conference_name: profileInfo.conferenceName,
        location: profileInfo.conferenceLocation,
        year: profileInfo.year,
      },
      certification: {
        certification_name: profileInfo.certificationName,
        issuing_organization: profileInfo.issuingOrganization,
        license_number: profileInfo.licenseNumber,
        year_issued: profileInfo.yearIssued,
      },
      recommendation: {
        recommender_title: profileInfo.recommenderTitle,
        recommender_name: profileInfo.recommenderName,
        recommender_organization: profileInfo.recommenderOrganization,
        recommendation: profileInfo.recommendation,
        recommender_email: profileInfo.recommenderEmail,
        recommender_phone: profileInfo.recommenderPhone,
      }
    };
    const dataToApi = data[nameProfileSelected as keyof typeof data];
    return dataToApi;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setProfileModal(false);
    setFilledForm(false);

    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    const isPersonalInfo = collectionToChange === 'personal_info';
    const isPostAction = profileModalAction === 'post';

    try {
      const response = await axios.post('/api/profileApi',
        {
          id: isPersonalInfo || isPostAction ? userId : itemIdToChange,
          collectionName: collectionToChange,
          action: profileModalAction,
          data: dataUpdate(),
        },
        config
      );
      const { status } = response.data;
      if (status === 'success') {
        setUpdate(collectionToChange);
        setMessageModal(true);
        setTypeMessageModal('successful');
        setTextMessageModal(`Your information have been ${profileModalAction === 'post' ? 'posted' : 'uploaded'}`);
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
      setProfileModalAction('');
      setProfileModalType('');
    }
  };

  const modal = [
    {
      collectionName: 'personal_info',
      title: 'Personal Information',
      name: 'personalInfo',
      inputs: [
        { type: 'text', title: 'Full name', value: 'fullName' },
        { type: 'text', title: 'Profession or occupation', value: 'professionOccupation' },
        { type: 'text', title: 'Preferred language', value: 'preferredLanguage' },
        { type: 'text', title: 'Location', value: 'personalLocation' },
        { type: 'text', title: 'Personal Description', value: 'personalDescription' }
      ],
    },
    {
      collectionName: 'experience',
      title: 'Experience',
      name: 'experience',
      inputs: [
        { type: 'text', title: 'Company organization', value: 'companyOrganization' },
        { type: 'text', title: 'Role title', value: 'roleTitle' },
        { type: 'text', title: 'Responsibilities', value: 'responsibilities' },
        { type: 'text', title: 'Technologies used', value: 'technologiesUsedExperience' },
        { type: 'number', title: 'Duration (months)', value: 'monthsDuration' },
        { type: 'number', title: 'Team size', value: 'teamSize' },
      ],
    },
    {
      collectionName: 'education_info',
      title: 'Education',
      name: 'educationInfo',
      inputs: [
        { type: 'text', title: 'University school', value: 'universitySchool' },
        { type: 'text', title: 'Degree', value: 'degree' },
        { type: 'text', title: 'Major field study', value: 'majorFieldStudy' },
        { type: 'number', title: 'Graduation year', value: 'graduationYear' },
      ],
    },
    {
      collectionName: 'courses',
      title: 'Course',
      name: 'courses',
      inputs: [
        { type: 'text', title: 'Course title', value: 'courseTitle' },
        { type: 'text', title: 'Institution', value: 'institution' },
        { type: 'text', title: 'Skills acquired', value: 'skillsAcquired' },
        { type: 'number', title: 'Year completed', value: 'yearCompleted' },
      ],
    },
    {
      collectionName: 'projects',
      title: 'Project',
      name: 'project',
      inputs: [
        { type: 'text', title: 'Project Name', value: 'projectName' },
        { type: 'text', title: 'Role', value: 'role' },
        { type: 'text', title: 'Technologies Used', value: 'technologiesUsedProject' },
        { type: 'text', title: 'Project URL', value: 'projectUrl' },
        { type: 'text', title: 'Description', value: 'description' },
      ],
    },
    {
      collectionName: 'publications',
      title: 'Publication',
      name: 'publication',
      inputs: [
        { type: 'text', title: 'Publication Title', value: 'publicationTitle' },
        { type: 'text', title: 'Co-authors', value: 'coAuthors' },
        { type: 'text', title: 'Journal or conference', value: 'journalConference' },
        { type: 'number', title: 'Year Published', value: 'yearPublished' },
      ],
    },
    {
      collectionName: 'conferences',
      title: 'Conference',
      name: 'conference',
      inputs: [
        { type: 'text', title: 'Presentation Title', value: 'presentationTitle' },
        { type: 'text', title: 'Conference Name', value: 'conferenceName' },
        { type: 'text', title: 'Location', value: 'conferenceLocation' },
        { type: 'number', title: 'Year', value: 'year' },
      ],
    },
    {
      collectionName: 'certifications',
      title: 'Certification',
      name: 'certification',
      inputs: [
        { type: 'text', title: 'Certification Name', value: 'certificationName' },
        { type: 'text', title: 'Issuing Organization', value: 'issuingOrganization' },
        { type: 'text', title: 'License Number', value: 'licenseNumber' },
        { type: 'number', title: 'Year Issued', value: 'yearIssued' },
      ],
    },
    {
      collectionName: 'recommendations',
      title: 'Recomendation',
      name: 'recommendation',
      inputs: [
        { type: 'text', title: 'Recommender title', value: 'recommenderTitle' },
        { type: 'text', title: 'Recommender name', value: 'recommenderName' },
        { type: 'text', title: 'Recommender organization', value: 'recommenderOrganization' },
        { type: 'text', title: 'Recommendation', value: 'recommendation' },
        { type: 'email', title: 'Recommender email', value: 'recommenderEmail' },
        { type: 'text', title: 'Recommender phone', value: 'recommenderPhone' },
      ],
    },
  ];

  useEffect(() => {
    const modalSelection = modal.find((section) => section.collectionName === collectionToChange);
    modalSelection && setProfileSelected(modalSelection);
    modalSelection && setNameProfileSelected(modalSelection.name);
  }, [collectionToChange]);

  /**fill-form control */
  useEffect(() => {
    let profileInfoSelected = dataUpdate();
    if (profileInfoSelected) {
      let profileInfoSelectedUnfilled = Object.values(profileInfoSelected).some(value => value === '');
      setFilledForm(profileInfoSelectedUnfilled ? false : true);
    }
  });

  const isProfileImageModal = collectionToChange === 'profile_image';


  return (
    profileModal &&
    <div
      className={
        `${profileModal ? 'scale-100 animate-[fade-in_0.50s]' : 'hidden'
        } w-full h-full fixed top-0 flex flex-col justify-center items-center bg-black bg-opacity-75 z-50`
      }
      onClick={() => handleCloseModal()}
    >
      <div
        className={
          `${screenNarrow ? 'h-[85%]' : 'h-[90%]'}
          ${profileModal ? 'scale-100 animate-[zoom-in_0.50s]' : 'scale-0 animate-[zoom-out_0.30s]'
          } container w-64 lg:w-[22rem] relative flex flex-col list-none rounded-md shadow-lg transform`
        }
        onClick={(e) => e.stopPropagation()}
      >
        {/**icon-cancel to close modal */}
        <div className='w-6 h-6 absolute -top-5 -right-5 flex flex-col justify-center items-center rounded-full bg-white'>
          <i
            className='w-full h-full text-gray-900 lg:text-gray-400 text-2xl lg:xl flex justify-center cursor-default lg:cursor-pointer lg:hover:text-gray-900'
            onClick={() => handleCloseModal()}
          >
            <IconCancel />
          </i>
        </div>
        {/**header form */}
        <div className='w-full px-4 lg:px-8 py-1 lg:py-2 flex flex-col bg-slate-950 rounded-t-md z-50'>
          <h2 className='w-full h-fit ml-2 py-1 text-white text-xl lg:text-3xl font-bold transition-all z-10'>
            {isProfileImageModal ? 'Profile image' : profileSelected.title}
          </h2>
        </div>
        {/**content */}
        <div className='w-full h-full flex flex-row bg-white rounded-b-md overflow-x-hidden'>
          <div className='w-64 lg:w-[22rem] h-full px-2 lg:px-8 flex flex-col items-center transition-all'>
            {
              isProfileImageModal ?
                <ProfileModalImage />
                :
                <form
                  className='w-full h-full flex flex-col justify-between items-center transition-all z-0'
                  onSubmit={(e: any) => handleSubmit(e)
                  }
                >
                  <div className='w-full h-full flex flex-col items-center'>
                    <FormTemplate
                      inputData={profileSelected.inputs}
                      formData={profileInfo}
                      changeData={changeProfileInfo}
                      onChange={(e: any) => handleChangeData(e)}
                      onFocus={(e: any) => setChangeProfileInfo({ ...changeProfileInfo, [e.target.name]: true })}
                      onBlur={(e: any) => setChangeProfileInfo({ ...changeProfileInfo, [e.target.name]: false })}
                    />
                  </div>
                  {/**submit button */}
                  <div className='w-full py-7 flex flex-row justify-between items-center'>
                    <button
                      type='submit'
                      className={
                        `${filledForm ?
                          'font-bold bg-green-400 lg:bg-green-30 lg:hover:bg-green-400 cursor-default lg:cursor-pointer' :
                          'bg-slate-400 cursor-default'
                        } w-full text-slate-50 lg:hover:text-white lg:hover:font-bold px-6 py-2 flex flex-row justify-center items-center rounded-md transition-all z-30`
                      }
                      disabled={filledForm ? false : true}
                    >
                      <h5 className='w-full h-fit text-sm lg:text-base leading-none tracking-wider'>
                        Send
                      </h5>
                    </button>
                  </div>
                </form>
            }
          </div>
        </div>
      </div>
    </div>
  )
}