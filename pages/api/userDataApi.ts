import type { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';
import initMiddleware from '../../lib/init-middleware';
import dbConnect from "../../lib/mongodb";
import { v4 as uuidv4 } from 'uuid';
import dateTimeFunction from './dateTimeFunction';

interface UserChatParams {
  _id: string;
  participants: string[];
  chat: {
    from_user_id: string,
    message: string;
    message_date: string;
  }[];
};

const cors = initMiddleware(
  Cors({ methods: ['POST', 'GET', 'PUT', 'PATCH'] })
);

const date = dateTimeFunction('date');
const time = dateTimeFunction('time');



export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  await cors(req, res);
  const { db } = await dbConnect();

  try {
    const { id, action, nameCollection, data } = req.body;

    let profileImageCollection: any = db?.collection('profile_image');
    let personalInfoCollection: any = db?.collection('personal_info');
    let experienceCollection: any = db?.collection('experience');
    let educationCollection: any = db?.collection('education');
    let coursesCollection: any = db?.collection('courses');
    let recommendationsCollection: any = db?.collection('recommendations');
    let profileScoreCollection: any = db?.collection('profile_score');
    let requestTalentCollection: any = db?.collection('request_talent');
    let requestJobCollection: any = db?.collection('request_job');
    let notificationsCollection: any = db?.collection('notifications');
    let connectionsCollection: any = db?.collection('connections');
    let chatsCollection: any = db?.collection('chats');
    let collection: any = db?.collection(nameCollection);

    let connectionsData: any;
    let notificationsCollectionData: any;

    let notificationsData: any;
    let userInfoPromises: any;
    let notificationsToUserId;
    let notificationsFromUserId;
    let notificationsRequestContact: any;
    let notificationsOfferAcceptance: any;

    let postData: any;
    let getData: any;


    switch (action) {
      case 'post':
        switch (nameCollection) {
          case 'personal_info':
            postData = await personalInfoCollection?.insertOne({ ...data });
            break;
          case 'notifications':
            postData = await notificationsCollection?.insertOne({ _id: uuidv4(), ...data });
            break;
          case 'connections':
            postData = await connectionsCollection?.insertOne({ _id: uuidv4(), seeker_job_id: id, ...data, created_at: date });
            break;
          case 'chats':
            let fromUserId: string = id;
            let toUserId: string = data.to_user_id;
            let chatUsers = [fromUserId, toUserId].sort();
            let chat = await chatsCollection?.findOne({ participants: { $all: chatUsers } });

            if (chat) {
              postData = await chatsCollection?.updateOne(
                { _id: chat._id },
                { $push: { chat: { ...data } } }
              );
            }
            else {
              postData = await chatsCollection?.insertOne({
                _id: uuidv4() as any,
                participants: chatUsers,
                chat: [{ ...data }],
              });
            }
            break;
          default:
            ///postData = await collection?.insertOne({ _id: uuidv4(), user_id: id, ...data, created_at: date });
            postData = await collection?.insertOne({ ...data });
            break;
        };
        if (postData) {
          return res.status(200).json({ status: 'success' });
        }
        else {
          return res.status(404).json({ error: `${action} failed` });
        }
        break;

      case 'get-default':
        switch (nameCollection) {
          case 'personal_info':
            getData = await collection?.find({ _id: id }).toArray();
            break;
          case 'profile_image':
          case 'profile_score':
            getData = await collection?.findOne({ _id: id as any });
            break;
          case 'notifications':
            notificationsCollectionData = await collection?.find({ to_user_id: id }).toArray();
            getData = await Promise.all(
              notificationsCollectionData.map(async (notification: any) => {
                let fromRequestId: string = notification.from_request_id;
                let fromUserId: string = notification.from_user_id;
                let requestCollection: any = notification?.notification_type === 'request-contact' ?
                  requestTalentCollection : requestJobCollection;

                const [profileImage, personalInfo, requestInfo] = await Promise.all([
                  profileImageCollection?.findOne({ _id: fromUserId }),
                  personalInfoCollection?.findOne({ _id: fromUserId }),
                  requestCollection?.findOne({ _id: fromRequestId }),
                ]);

                return {
                  _id: notification._id,
                  created_date: notification.created_at,
                  notification_type: notification.notification_type,
                  to_request_id: notification.to_request_id,
                  from_request_id: notification.from_request_id,
                  user_id: personalInfo._id,
                  full_name: personalInfo.full_name,
                  user_image_url: profileImage.image_url,
                  company_name: requestInfo.company_name,
                  job_location: requestInfo.location,
                  job_description: requestInfo.job_description,
                  candidate_location: requestInfo.location,
                  candidate_talent_category: requestInfo.talent_category,
                  notification_status: notification.notification_status
                };
              })
            );
            break;
          case 'chats':
            let fromUserId = data.from_user_id;
            let toUserId = id;
            let chatUsers = [fromUserId, toUserId].sort();
            let chatInfo: any = await collection?.findOne({ participants: { $all: chatUsers } });

            if (chatInfo) {
              const updatedMessages = chatInfo?.chat?.map((message: any) => {
                if (message.from_user_id === fromUserId && message.message_status === 'unread') {
                  return { ...message, message_status: 'read' };
                }
                else { return message };
              });

              await collection.updateOne({ _id: chatInfo._id }, { $set: { chat: updatedMessages } });
              getData = updatedMessages;
            }
            else {
              return res.status(404).json({ error: 'Chat not found' });
            }
            break;
          default:
            getData = await collection?.find({ user_id: id }).toArray();
            break;
        };
        if (getData) {
          return res.status(200).json({ status: 'success', responseData: getData });
        }
        else {
          return res.status(404).json({ error: `${action} failed` });
        }
        break;

      case 'get-user-profile-data':
        try {
          const personalInfo = await personalInfoCollection?.find({ _id: id }).toArray();
          const [experience, education, courses, recommendations] = await Promise.all([
            experienceCollection?.find({ user_id: id }).toArray(),
            educationCollection?.find({ user_id: id }).toArray(),
            coursesCollection?.find({ user_id: id }).toArray(),
            recommendationsCollection?.find({ user_id: id }).toArray(),
          ]);

          let responseData: any = {
            personalInfo,
            experience,
            education,
            courses,
            recommendations
          };

          return res.status(200).json({
            status: 'success',
            responseData
          });
        }
        catch (error) {
          console.error('Error fetching profile data:', error);
          return res.status(500).json({ error: 'Internal server error' });
        }
        break;

      case 'get-user-request-data':
        try {
          const [requestTalent, requestJob] = await Promise.all([
            requestTalentCollection?.find({ user_id: id }).toArray(),
            requestJobCollection?.find({ user_id: id }).toArray(),
          ]);

          return res.status(200).json({
            status: 'success',
            responseData: { requestTalent, requestJob }
          });
        }
        catch (error) {
          console.error('Error fetching profile data:', error);
          return res.status(500).json({ error: 'Internal server error' });
        }
        break;

      case 'get-unread-messages':
        connectionsData = await collection.find({ $or: [{ seeker_job_id: id }, { seeker_talent_id: id }] }).toArray();
        const connectedUserIds = connectionsData.map((connection: any) =>
          connection.seeker_talent_id === id ? connection.seeker_job_id : connection.seeker_talent_id
        );

        const unreadMessagesAll = await Promise.all(
          connectedUserIds?.map(async (userId: any) => {
            const chatUsers = [id, userId].sort();
            const chats = await db?.collection('chats')?.find({
              participants: { $all: chatUsers }, "chat.from_user_id": userId, "chat.message_status": "unread"
            }).toArray();

            let unreadCount = 0;
            chats.forEach((chat: any) => {
              chat.chat.forEach((message: any) => {
                if (message.from_user_id === userId && message.message_status === "unread") {
                  unreadCount++;
                }
              });
            });
            return { userId, unreadCount };
          })
        );

        let totalUnreadMessages = unreadMessagesAll.reduce((acc, curr) => acc + curr.unreadCount, 0);
        let unreadMessagesByUser = unreadMessagesAll.reduce((acc, curr) => {
          acc[curr.userId] = curr.unreadCount;
          return acc;
        }, {});

        return res.status(200).json({
          status: 'success',
          responseData: { unreadMessagesByUser, totalUnreadMessages }
        });

      case 'get-one-user-notification-data':
        try {
          const oneNotificationData = await collection?.findOne({
            from_user_id: data.from_user_id,
            to_user_id: data.to_user_id,
            from_request_id: data.from_request_id,
            to_request_id: data.to_request_id,
            notification_type: data.notification_type,
            notification_status: data.notification_status
          });

          if (!oneNotificationData) {
            return res.status(404).json({ error: 'Notification not found' });
          }

          let fromRequestId = oneNotificationData.from_request_id;
          let fromUserId = oneNotificationData.from_user_id;
          let requestCollection = oneNotificationData.notification_type === 'request-contact' ?
            requestTalentCollection : requestJobCollection;

          const [profileImage, personalInfo, requestInfo] = await Promise.all([
            profileImageCollection?.findOne({ _id: fromUserId }),
            personalInfoCollection?.findOne({ _id: fromUserId }),
            requestCollection?.findOne({ _id: fromRequestId }),
          ]);

          const responseData = {
            _id: oneNotificationData._id,
            created_date: oneNotificationData.created_at,
            notification_type: oneNotificationData.notification_type,
            to_request_id: oneNotificationData.to_request_id,
            from_request_id: oneNotificationData.from_request_id,
            user_id: personalInfo._id,
            full_name: personalInfo.full_name,
            user_image_url: profileImage.image_url,
            company_name: requestInfo.company_name,
            job_location: requestInfo.location,
            job_description: requestInfo.job_description,
            candidate_location: requestInfo.location,
            candidate_talent_category: requestInfo.talent_category,
            notification_status: oneNotificationData.notification_status
          };

          return res.status(200).json({
            status: 'success',
            responseData
          });
        }
        catch (error) {
          console.error('Error fetching notification data:', error);
          return res.status(500).json({ error: 'Internal server error' });
        }
        break;

      case 'get-unread-notifications':
        notificationsData = await collection.find({ to_user_id: id }).toArray();

        let unreadNotificationsCount = 0;
        notificationsData?.forEach((notification: any) => {
          if (notification.notification_status === "unread") {
            unreadNotificationsCount++;
          }
        });

        return res.status(200).json({
          status: 'success',
          responseData: unreadNotificationsCount
        });

      case 'get-one-request':
        let getOneRequest = await collection?.findOne({ _id: data as any });
        if (getOneRequest) {
          return res.status(200).json({
            status: 'success',
            responseData: getOneRequest
          });
        }
        break;

      case 'get-candidates':
        let keyword = data;
        let requestMatch = await collection?.find({ talent_category: keyword }).toArray();
        let candidatesUserIds = requestMatch?.map((request: any) => request.user_id);

        const candidatesInfo = await Promise.all(
          candidatesUserIds.map(async (userId: any) => {
            const [profileImage, personalInfo, profileScore, requestInfo] = await Promise.all([
              profileImageCollection?.findOne({ _id: userId }),
              personalInfoCollection?.findOne({ _id: userId }),
              profileScoreCollection?.findOne({ _id: userId }),
              collection?.findOne({ user_id: userId })
            ]);

            return {
              user_id: userId,
              profile_image_url: profileImage?.image_url,
              full_name: personalInfo?.full_name,
              profession_occupation: personalInfo?.profession_occupation,
              request_job_id: requestInfo?._id,
              skills_offered: requestInfo?.skills_offered,
              experience_level: requestInfo?.experience_level,
              location: personalInfo?.location,
              modality_work: requestInfo?.modality_work,
              availability: requestInfo?.availability,
              preferred_language: personalInfo?.preferred_language,
              rates: requestInfo?.rates,
              profile_score: profileScore?.profile_score
            };
          })
        );
        //userInfo = userInfo.sort((a, b) => a.user_id.localeCompare(b.user_id));

        return res.status(200).json({
          status: 'success',
          responseData: candidatesInfo
        });

      case 'get-contacting-candidates-ids':
        let requestTalentId = data;
        notificationsFromUserId = await collection?.find({ from_user_id: id }).toArray();
        notificationsRequestContact = notificationsFromUserId?.filter((notification: any) => notification.notification_type === 'request-contact');
        let notificationRequestTalentIds = notificationsRequestContact?.filter((notification: any) => notification.from_request_id === requestTalentId);
        let contactingCandidatesIds = notificationRequestTalentIds?.map((notification: any) => ({ to_user_id: notification.to_user_id }));

        if (contactingCandidatesIds) {
          return res.status(200).json({
            status: 'success',
            responseData: contactingCandidatesIds
          });
        }
        break;

      case 'get-requests':
        notificationsToUserId = await collection?.find({ to_user_id: id }).toArray();
        notificationsRequestContact = notificationsToUserId?.filter((notification: any) => notification.notification_type === 'request-contact');
        let notificationsToRequestJobId = notificationsRequestContact?.filter((notification: any) => notification.to_request_id === data);
        let requestContactUserIds = notificationsToRequestJobId?.map((notification: any) => notification.from_user_id);

        const requestInfo = await Promise.all(
          requestContactUserIds.map(async (userId: any) => {
            const [profileImage, personalInfo, requestInfo] = await Promise.all([
              profileImageCollection?.findOne({ _id: userId }),
              personalInfoCollection?.findOne({ _id: userId }),
              requestTalentCollection?.findOne({ user_id: userId })
            ]);

            return {
              user_id: userId,
              request_talent_id: requestInfo?._id,
              profile_image_url: profileImage?.image_url,
              full_name: personalInfo?.full_name,
              job_description: requestInfo?.job_description,
              title: requestInfo?.title,
              required_skills: requestInfo?.required_skills,
              required_experience_years: requestInfo?.required_experience_years,
              location: requestInfo?.location,
              modality_work: requestInfo?.modality_work,
              company_name: requestInfo?.company_name,
              compensation: requestInfo?.compensation,
            };
          })
        );
        //userInfo = userInfo.sort((a, b) => a.user_id.localeCompare(b.user_id));

        return res.status(200).json({
          status: 'success',
          responseData: requestInfo
        });
        break;

      case 'get-requests-accepted':
        notificationsFromUserId = await collection?.find({ from_user_id: id }).toArray();
        let notificationsAcceptedOffers = notificationsFromUserId?.filter((notification: any) => notification.notification_type === 'request-accepted');
        let offersAcceptedInfo = notificationsAcceptedOffers?.filter((notification: any) => notification.from_request_id === data);

        if (offersAcceptedInfo) {
          return res.status(200).json({
            status: 'success',
            responseData: offersAcceptedInfo
          });
        }
        break;

      case 'get-request-contact-accepted':
        let requestJobId = data;
        notificationsToUserId = await collection?.find({ to_user_id: id }).toArray();
        notificationsOfferAcceptance = notificationsToUserId?.filter((notification: any) => notification.notification_type === 'request-accepted');
        let offerAcceptanceFromRequestJobId = notificationsOfferAcceptance?.filter((notification: any) => notification.from_request_id === requestJobId);

        if (offerAcceptanceFromRequestJobId) {
          return res.status(200).json({
            status: 'success',
            responseData: offerAcceptanceFromRequestJobId
          });
        }
        break;

      case 'get-status-request':                                          ////??????????
        let requestFromId = await collection?.findOne({ _id: id });
        let requestStatus = requestFromId?.status;

        if (requestStatus) {
          return res.status(200).json({
            status: 'success',
            responseData: requestStatus
          });
        }
        break;

      case 'get-request-status':
        try {
          let requestsTalent = await requestTalentCollection?.find({ user_id: id }).toArray();
          let requestsJob = await requestJobCollection?.find({ user_id: id }).toArray();

          let requestTalentStatus = requestsTalent?.map((request: any) => ({
            requestId: request._id,
            creation_date: request.created_at,
            category: request.job_category,
            status: request.status
          })) || [];

          let requestJobStatus = requestsJob?.map((request: any) => ({
            requestId: request._id,
            creation_date: request.created_at,
            category: request.talent_category,
            status: request.status
          })) || [];

          return res.status(200).json({
            status: 'success',
            responseData: { requestTalent: requestTalentStatus, requestJob: requestJobStatus }
          });
        }
        catch (error) {
          console.error('Error fetching request status:', error);
          return res.status(500).json({ error: 'Internal server error' });
        }
        break;

      case 'get-connected-user-info':
        connectionsData = await collection?.find({ $or: [{ seeker_job_id: id }, { seeker_talent_id: id }] }).toArray();

        const connectedUsersInfo = await Promise.all(
          connectionsData.map(async (connection: any) => {
            let seekerTalentId: string = connection.seeker_talent_id;
            let seekerJobId: string = connection.seeker_job_id;
            let userIdToRenderInfo: string = seekerTalentId === id ? seekerJobId : seekerTalentId;
            let seekerType: string = seekerTalentId === id ? 'seekers-job' : 'seekers-talent';

            const [profileImage, personalInfo] = await Promise.all([
              profileImageCollection?.findOne({ _id: userIdToRenderInfo }),
              personalInfoCollection?.findOne({ _id: userIdToRenderInfo }),
            ]);

            return {
              _id: connection._id,
              type: seekerType,
              user_id: personalInfo?._id,
              user_image_url: profileImage?.image_url,
              full_name: personalInfo?.full_name,
              profession_occupation: personalInfo?.profession_or_occupation,
              preferred_language: personalInfo?.preferred_language,
              location: personalInfo?.location,
              created_date: connection.created_at,
            };
          }));

        return res.status(200).json({
          status: 'success',
          responseData: connectedUsersInfo
        });

      case 'update-default':
        let update = await collection?.findOneAndUpdate(
          { _id: id as any },
          { $set: data },
          { returnDocument: 'after', upsert: true }
        );

        if (update?.value) {
          return res.status(200).json({
            status: 'success',
            responseData: update.value
          });
        }
        else {
          return res.status(404).json({ error: 'User information not found' });
        }
        break;

      case 'update-status-request':
        let requestStatusEdition = await collection?.findOneAndUpdate(
          { _id: id as any },
          { $set: { status: data } },
          { returnDocument: 'after', upsert: true }
        );
        if (requestStatusEdition?.value) {
          return res.status(200).json({
            status: 'success',
            responseData: requestStatusEdition.value
          });
        }
        else { return res.status(404).json({ error: 'User information not found' }) }
        break;

      case 'update-notifications-unread-to-read':
        try {
          const unreadNotificationsData = await collection?.find({
            to_user_id: id,
            notification_status: 'unread'
          }).toArray();

          if (unreadNotificationsData && unreadNotificationsData.length > 0) {
            await Promise.all(unreadNotificationsData.map((notification: any) =>
              collection?.findOneAndUpdate(
                { _id: notification._id },
                { $set: { notification_status: 'read' } }
              )
            ));
            return res.status(200).json({
              status: 'success'
            });
          }
          return
        }
        catch (error) {
          console.error('Error updating notification status:', error);
          return res.status(500).json({ error: 'Internal server error' });
        }
        break;

      case 'update-notification-request-contact-read-to-accepted':
        try {
          const readNotificationsData = await collection?.find({
            to_user_id: id,
            from_request_id: data,
            notification_status: 'read'
          }).toArray();

          if (readNotificationsData && readNotificationsData.length > 0) {
            await Promise.all(readNotificationsData.map((notification: any) =>
              collection?.findOneAndUpdate(
                { _id: notification._id },
                { $set: { notification_status: 'accepted' } }
              )
            ));
            return res.status(200).json({
              status: 'success'
            });
          }
          return
        }
        catch (error) {
          console.error('Error updating notification status:', error);
          return res.status(500).json({ error: 'Internal server error' });
        }
        break;

      case 'delete':
        const deleted = await collection?.findOneAndDelete(
          { _id: id as any }
        );

        if (deleted?.value) {
          return res.status(200).json({
            status: 'success',
            responseData: 'Your information was successfully deleted',
          });
        }
        else {
          return res.status(404).json({ error: 'User information not found' });
        }
        break;

      default:
        res.status(405).end(`Method Not Allowed`);
        break;
    }
  }
  catch (error) {
    console.error('An error occurred:', error);
    return res.status(500).json({ error: 'An internal error occurred' });
  }
}