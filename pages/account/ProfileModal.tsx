import React, { useState, useEffect } from 'react';
import { useAuthData, useAuthUI, useUI } from "../../context/authContext";
import FormTemplate from './FormTemplate';
import { IconCancel } from '../../icons/icons';
import ProfileModalImage from './ProfileModalImage';
import axios from 'axios';

const initialProfileInfo = {
  /**personal information: */
  fullName: '',
  professionOccupation: '',
  preferredLanguage: '',
  personalLocation: '',
  /**experience: */
  roleTitle: '',
  companyOrganization: '',
  responsibilities: '',
  experienceLevel: '',
  experienceYears: '',
  technologiesUsed: '',
  teamSize: '',
  /**education: */
  degree: '',
  universitySchool: '',
  majorFieldStudy: '',
  graduationYear: '',
  /**courses: */
  courseTitle: '',
  institution: '',
  yearCompleted: '',
  skillsAcquired: '',
  /**publications */
  publicationTitle: '',
  coAuthors: '',
  journalName: '',
  yearPublished: '',
  /**conferences: */
  presentationTitle: '',
  conferenceName: '',
  conferenceLocation: '',
  year: '',
  /**certifications: */
  certificationName: '',
  issuingOrganization: '',
  licenseNumber: '',
  yearIssued: '',
  /**recommendations: */
  recommenderName: '',
  recommenderTitle: '',
  recommenderOrganization: '',
  recommendation: '',
  recommenderEmail: '',
  recommenderPhone: '',
};



export default function ProfileModal() {

  const {
    token, userId,
    userProfilePersonalInfo, setUserProfilePersonalInfo,
    userProfileExperience, setUserProfileExperience,
    userProfileEducation, setUserProfileEducation,
    userProfileCourses, setUserProfileCourses,
    userProfileProjects, setUserProfileProjects,
    userProfilePublications, setUserProfilePublications,
    userProfileConferences, setUserProfileConferences,
    userProfileCertifications, setUserProfileCertifications,
    userProfileRecommendations, setUserProfileRecommendations,
    collectionToChange, setCollectionToChange, itemIdToChange, setUpdate } = useAuthData();
  const { profileModal, setProfileModal, setProfileModalType, profileModalAction, setProfileModalAction } = useAuthUI();
  const { setMessageModal, setTypeMessageModal, setTextMessageModal, setLoading } = useUI();
  const [filledForm, setFilledForm] = useState(true);
  const { screenNarrow } = useUI();

  const isPersonalInfo = collectionToChange === 'personal_info';
  const isProfileImageModal = collectionToChange === 'profile_image';
  const isEditAction = profileModalAction === 'edit';
  const isPostAction = profileModalAction === 'post';

  const [profileInfo, setProfileInfo] = useState(initialProfileInfo);

  const [changeProfileInfo, setChangeProfileInfo] = useState({
    /**personal information: */
    fullName: false,
    professionOccupation: false,
    preferredLanguage: false,
    personalLocation: false,
    /**experience: */
    companyOrganization: false,
    roleTitle: false,
    responsibilities: false,
    experienceLevel: false,
    experienceYears: false,
    technologiesUsed: false,
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
    /**publications: */
    publicationTitle: false,
    coAuthors: false,
    journalName: false,
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
        location: profileInfo.personalLocation
      },
      experience: {
        role_title: profileInfo.roleTitle,
        company_organization: profileInfo.companyOrganization,
        responsibilities: profileInfo.responsibilities,
        experience_level: profileInfo.experienceLevel,
        experience_years: profileInfo.experienceYears,
        technologies_used: profileInfo.technologiesUsed,
        team_size: profileInfo.teamSize,
      },
      education: {
        degree: profileInfo.degree,
        university_school: profileInfo.universitySchool,
        major_field_study: profileInfo.majorFieldStudy,
        graduation_year: profileInfo.graduationYear,
      },
      courses: {
        course_title: profileInfo.courseTitle,
        institution: profileInfo.institution,
        year_completed: profileInfo.yearCompleted,
        skills_acquired: profileInfo.skillsAcquired,
      },
      publications: {
        publication_title: profileInfo.publicationTitle,
        co_authors: profileInfo.coAuthors,
        journal_name: profileInfo.journalName,
        year_published: profileInfo.yearPublished,
      },
      conferences: {
        presentation_title: profileInfo.presentationTitle,
        conference_name: profileInfo.conferenceName,
        location: profileInfo.conferenceLocation,
        year: profileInfo.year,
      },
      certifications: {
        certification_name: profileInfo.certificationName,
        issuing_organization: profileInfo.issuingOrganization,
        license_number: profileInfo.licenseNumber,
        year_issued: profileInfo.yearIssued,
      },
      recommendations: {
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

  const setUserProfile = (userProfile: string, data: any) => {
    switch (userProfile) {
      case 'personal_info':
        return setUserProfilePersonalInfo(data);
      case 'experience':
        return setUserProfileExperience(data);
      case 'education':
        return setUserProfileEducation(data);
      case 'courses':
        return setUserProfileCourses(data);
      case 'projects':
        return setUserProfileProjects(data);
      case 'publications':
        return setUserProfilePublications(data);
      case 'conferences':
        return setUserProfileConferences(data);
      case 'certifications':
        return setUserProfileCertifications(data);
      case 'recommendations':
        return setUserProfileRecommendations(data);
      default:
        break;
    }
  }

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

    try {
      const response = await axios.post('/api/userApi',
        {
          id: isPersonalInfo || isPostAction ? userId : itemIdToChange,
          collectionName: collectionToChange,
          action: profileModalAction,
          data: dataUpdate(),
        },
        config
      );
      const { status, actionResponse } = response.data;
      if (status === 'success') {
        setUserProfile(collectionToChange, actionResponse);
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
      setProfileInfo(initialProfileInfo);
    }
  };

  const modal = [
    {
      collectionName: 'personal_info',
      title: 'Personal information',
      name: 'personalInfo',
      inputs: [
        { type: 'text', title: 'Full name', value: 'fullName' },
        { type: 'text', title: 'Profession or occupation', value: 'professionOccupation' },
        { type: 'text', title: 'Preferred language', value: 'preferredLanguage' },
        { type: 'text', title: 'Location', value: 'personalLocation' },
      ],
    },
    {
      collectionName: 'experience',
      title: 'Experience',
      name: 'experience',
      inputs: [
        { type: 'text', title: 'Role title', value: 'roleTitle' },
        { type: 'text', title: 'Company organization', value: 'companyOrganization' },
        { type: 'text', title: 'Responsibilities', value: 'responsibilities' },
        {
          type: 'select',
          title: 'Experience level',
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
        { type: 'text', title: 'Technologies used', value: 'technologiesUsed' },
        { type: 'text', title: 'Team size', value: 'teamSize' },
      ],
    },
    {
      collectionName: 'education',
      title: 'Education',
      name: 'education',
      inputs: [
        {
          type: 'select',
          title: 'Degree',
          value: 'degree',
          options: [
            { value: 'HighSchool', title: 'High school' },
            { value: 'Bachelor', title: 'Bachelor' },
            { value: 'Master', title: 'Master' },
            { value: 'Doctorate', title: 'Doctorate' },
          ]
        },
        { type: 'text', title: 'University school', value: 'universitySchool' },
        { type: 'text', title: 'Major field study', value: 'majorFieldStudy' },
        { type: 'text', title: 'Graduation year', value: 'graduationYear' },
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
        { type: 'text', title: 'Year completed', value: 'yearCompleted' },
      ],
    },
    {
      collectionName: 'publications',
      title: 'Publication',
      name: 'publications',
      inputs: [
        { type: 'text', title: 'Publication Title', value: 'publicationTitle' },
        { type: 'text', title: 'Co-authors', value: 'coAuthors' },
        { type: 'text', title: 'Journal or conference', value: 'journalName' },
        { type: 'text', title: 'Year Published', value: 'yearPublished' },
      ],
    },
    {
      collectionName: 'conferences',
      title: 'Conference',
      name: 'conferences',
      inputs: [
        { type: 'text', title: 'Presentation Title', value: 'presentationTitle' },
        { type: 'text', title: 'Conference Name', value: 'conferenceName' },
        { type: 'text', title: 'Location', value: 'conferenceLocation' },
        { type: 'text', title: 'Year', value: 'year' },
      ],
    },
    {
      collectionName: 'certifications',
      title: 'Certification',
      name: 'certifications',
      inputs: [
        { type: 'text', title: 'Certification Name', value: 'certificationName' },
        { type: 'text', title: 'Issuing Organization', value: 'issuingOrganization' },
        { type: 'text', title: 'License Number', value: 'licenseNumber' },
        { type: 'text', title: 'Year Issued', value: 'yearIssued' },
      ],
    },
    {
      collectionName: 'recommendations',
      title: 'Recomendation',
      name: 'recommendations',
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