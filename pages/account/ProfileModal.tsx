import React, { useState, useEffect, useMemo } from 'react';
import { useUI } from "@/context/ContextUI";
import { useAuth } from "@/context/ContextAuth";
import { useAuthData } from "@/context/ContextAuthData";
import { userDataHandlerFunction } from '../api/userDataHandlerFunction';
import { IconCancel } from '../../icons/icons';
import FormTemplate from './FormTemplate';
import ProfileModalImage from './ProfileModalImage';
import dateTimeFunction from '../api/dateTimeFunction';
import { v4 as uuidv4 } from 'uuid';

const initialUserProfileData = {
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
  const { token, userId } = useAuth();
  const { setMessageModal, setLoading } = useUI();
  const { profileModal, setProfileModal, profileModalAction, setProfileModalAction, 
    setUserProfileData, collectionToChange, setCollectionToChange, itemIdToChange } = useAuthData();
  const [filledForm, setFilledForm] = useState(true);
  const [userProfileDataUpdate, setUserProfileDataUpdate] = useState(initialUserProfileData);
  const [changeUserProfileDataUpdate, setChangeUserProfileDataUpdate] = useState({
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
  const isPersonalInfoModal = profileModal === 'personal-info';
  const isProfileImageModal = profileModal === 'profile-image';
  const isPostAction = profileModalAction === 'post';
  const date: any = dateTimeFunction('date');

  const handleCloseProfileModal = () => {
    setProfileModal('');
    setProfileModalAction('');
    setCollectionToChange('')
    setFilledForm(false);
  };

  const handleChangeData = (e: any) => {
    const { name, value } = e.target;
    setUserProfileDataUpdate({ ...userProfileDataUpdate, [name]: value });
  };

  const itemProfileId: string = profileModalAction === 'post' ? uuidv4() : itemIdToChange;

  const profileUpdate: any = {
    personalInfo: {
      _id: userId,
      full_name: userProfileDataUpdate.fullName,
      profession_or_occupation: userProfileDataUpdate.professionOccupation,
      preferred_language: userProfileDataUpdate.preferredLanguage,
      location: userProfileDataUpdate.personalLocation
    },
    experience: {
      _id: itemProfileId,
      user_id: userId,
      title: userProfileDataUpdate.companyOrganization,
      role_title: userProfileDataUpdate.roleTitle,
      responsibilities: userProfileDataUpdate.responsibilities,
      experience_years: userProfileDataUpdate.experienceYears,
      technologies_used: userProfileDataUpdate.technologiesUsed,
      team_size: userProfileDataUpdate.teamSize,
      update_at: date,
    },
    education: {
      _id: itemProfileId,
      user_id: userId,
      title: userProfileDataUpdate.degree,
      degree: userProfileDataUpdate.degree,
      university_school: userProfileDataUpdate.universitySchool,
      major_field_study: userProfileDataUpdate.majorFieldStudy,
      graduation_year: userProfileDataUpdate.graduationYear,
      update_at: date,
    },
    courses: {
      _id: itemProfileId,
      user_id: userId,
      title: userProfileDataUpdate.courseTitle,
      institution: userProfileDataUpdate.institution,
      skills_acquired: userProfileDataUpdate.skillsAcquired,
      year_completed: userProfileDataUpdate.yearCompleted,
      update_at: date,
    },
    publications: {
      _id: itemProfileId,
      user_id: userId,
      title: userProfileDataUpdate.publicationTitle,
      co_authors: userProfileDataUpdate.coAuthors,
      journal_name: userProfileDataUpdate.journalName,
      year_published: userProfileDataUpdate.yearPublished,
      update_at: date,
    },
    conferences: {
      _id: itemProfileId,
      user_id: userId,
      title: userProfileDataUpdate.presentationTitle,
      conference_name: userProfileDataUpdate.conferenceName,
      location: userProfileDataUpdate.conferenceLocation,
      year: userProfileDataUpdate.year,
      update_at: date,
    },
    certifications: {
      _id: itemProfileId,
      user_id: userId,
      title: userProfileDataUpdate.certificationName,
      issuing_organization: userProfileDataUpdate.issuingOrganization,
      license_number: userProfileDataUpdate.licenseNumber,
      year_issued: userProfileDataUpdate.yearIssued,
      update_at: date,
    },
    recommendations: {
      _id: itemProfileId,
      user_id: userId,
      title: userProfileDataUpdate.recommenderName,
      recommender_title: userProfileDataUpdate.recommenderTitle,
      recommender_organization: userProfileDataUpdate.recommenderOrganization,
      recommendation: userProfileDataUpdate.recommendation,
      recommender_email: userProfileDataUpdate.recommenderEmail,
      recommender_phone: userProfileDataUpdate.recommenderPhone,
      update_at: date,
    }
  };

  const profileElementName: string = collectionToChange === 'personal_info' ? 'personalInfo' : collectionToChange;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    let actionUserId: any = isPersonalInfoModal || isPostAction ? userId : itemIdToChange;
    let textMessage = `Your information has been ${profileModalAction === 'post' ? 'posted' : 'updated'}`;
    let data: any = profileUpdate[profileElementName];

    try {
      await userDataHandlerFunction({
        token: token as string,
        userId: actionUserId,
        action: profileModalAction,
        collection: collectionToChange,
        data: data,
        onSuccess: () => {
          setLoading(false);
          switch (profileModalAction) {
            case 'post':
              setUserProfileData((prevData: any) => ({
                ...prevData,
                [profileElementName]: [...prevData[profileElementName], data]
              }));
              break;
            case 'update-default':
              setUserProfileData((prevData: any) => ({
                ...prevData, [profileElementName]: prevData[profileElementName].map((profile: any) =>
                  profile._id === data._id ? data : profile
                )
              }));
              break;
            default:
              break;
          };
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
      setProfileModal('');
      setProfileModalAction('');
      setFilledForm(false);
    }
  };

  const modal = useMemo(() => ([
    {
      collectionName: 'personal_info',
      title: 'Personal info...',
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
        { type: 'text', title: 'Presentation title', value: 'presentationTitle' },
        { type: 'text', title: 'Conference name', value: 'conferenceName' },
        { type: 'text', title: 'Location', value: 'conferenceLocation' },
        { type: 'text', title: 'Year', value: 'year' },
      ],
    },
    {
      collectionName: 'certifications',
      title: 'Certification',
      name: 'certifications',
      inputs: [
        { type: 'text', title: 'Certification name', value: 'certificationName' },
        { type: 'text', title: 'Issuing organization', value: 'issuingOrganization' },
        { type: 'text', title: 'License number', value: 'licenseNumber' },
        { type: 'text', title: 'Year issued', value: 'yearIssued' },
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
  ]),[]);

  useEffect(() => {
    const modalSelection = modal?.find((section) => section.collectionName === collectionToChange);
    modalSelection && setProfileSelected(modalSelection);
    modalSelection && setNameProfileSelected(modalSelection.name);
  }, [modal, collectionToChange]);

  /**fill-form control */
  useEffect(() => {
    let userProfileDataUpdateSelected = profileUpdate[profileElementName];
    if (userProfileDataUpdateSelected) {
      let userProfileDataUpdateSelectedUnfilled = Object.values(userProfileDataUpdateSelected)?.some(value => value === '');
      setFilledForm(userProfileDataUpdateSelectedUnfilled ? false : true);
    }
  },[profileUpdate, profileElementName]);

  const renderProfileModal = profileModal !== '';


  return (
    renderProfileModal &&
    <div
      className={
        `${renderProfileModal ? 'scale-100 animate-[fade-in_0.50s]' : 'hidden'
        } w-full h-full fixed top-0 flex flex-col justify-center items-center bg-black bg-opacity-75 z-50`
      }
      onClick={() => handleCloseProfileModal()}
    >
      <div
        className={
          `${renderProfileModal ? 'scale-100 animate-[zoom-in_0.50s]' : 'scale-0 animate-[zoom-out_0.30s]'
          } container w-64 lg:w-[22rem] relative flex flex-col list-none rounded-md shadow-lg transform`
        }
        onClick={(e) => e.stopPropagation()}
      >
        {/**icon-cancel to close modal */}
        <div className='w-6 h-6 absolute -top-5 -right-5 flex flex-col justify-center items-center rounded-full bg-white'>
          <i
            className='w-full h-full text-gray-900 lg:text-gray-400 text-2xl lg:xl flex justify-center cursor-default lg:cursor-pointer lg:hover:text-gray-900'
            onClick={() => handleCloseProfileModal()}
          >
            <IconCancel />
          </i>
        </div>
        {/**header form */}
        <div className='w-full px-2 lg:px-6 py-1 lg:py-2 flex flex-col bg-color-highlighted rounded-t-md z-50'>
          <h2 className='w-full h-fit py-1 text-white text-xl lg:text-3xl font-bold transition-all z-10'>
            {isProfileImageModal ? 'Profile image' : profileSelected.title}
          </h2>
        </div>
        {/**content */}
        <div className='w-full px-4 lg:px-8 flex bg-white rounded-b-md overflow-x-hidden transition-all'>
          {
            isProfileImageModal ?
              <ProfileModalImage />
              :
              <form className='w-full pt-5 flex flex-col transition-all z-0' onSubmit={(e: any) => handleSubmit(e)}>
                <div className='w-full h-full flex flex-col items-center'>
                  <FormTemplate
                    inputData={profileSelected.inputs}
                    formData={userProfileDataUpdate}
                    changeData={changeUserProfileDataUpdate}
                    onChange={(e: any) => handleChangeData(e)}
                    onFocus={(e: any) => setChangeUserProfileDataUpdate({ ...changeUserProfileDataUpdate, [e.target.name]: true })}
                    onBlur={(e: any) => setChangeUserProfileDataUpdate({ ...changeUserProfileDataUpdate, [e.target.name]: false })}
                  />
                </div>
                {/**submit button */}
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
          }
        </div>
      </div>
    </div>
  )
}