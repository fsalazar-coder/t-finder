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
}

const cors = initMiddleware(
  Cors({ methods: ['POST', 'GET', 'PUT', 'PATCH'] })
);

const date = dateTimeFunction('date');
const time = dateTimeFunction('time');



export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  await cors(req, res);
  const { db } = await dbConnect();

  try {
    const { id, collectionName, action, data } = req.body;
    const collection = db?.collection(collectionName);

    let profileImageCollection: any;
    let personalInfoCollection: any;
    let profileScoreCollection: any;
    let requestCollection: any;
    let userInfoPromises: any;
    let notificationsToUserId;
    let notificationsFromUserId;
    let notificationsRequestContact: any;
    let notificationsOfferAcceptance: any;

    switch (action) {
      case 'post':
        let postData;
        switch (collectionName) {
          case 'personal_info':
            postData = await collection?.insertOne({ _id: id, ...data });
            break;
          case 'notifications':
            postData = await collection?.insertOne({ _id: uuidv4(), to_user_id: id, ...data, created_at: date });
            break;
          case 'chats':
            let fromUserId: string = id;
            let toUserId: string = data.to_user_id;
            let message: string = data.message;
            let chatUsers = [fromUserId, toUserId].sort();
            let chat = await collection.findOne({ participants: { $all: chatUsers } });

            if (chat) {
              postData = await collection?.updateOne(
                { _id: chat._id },
                {
                  $push: {
                    chat: {
                      from_user_id: fromUserId,
                      message: message,
                      message_date: date,
                      message_time: time
                    }
                  }
                }
              );
            }
            else {
              postData = await collection?.insertOne({
                _id: uuidv4() as any,
                participants: chatUsers,
                chat: [{
                  from_user_id: fromUserId,
                  message: message,
                  message_date: date,
                  message_time: time
                }],
              });
            }
            break;
          default:
            postData = await collection?.insertOne({ created_at: date, _id: uuidv4(), user_id: id, ...data });
            break;
        }
        if (postData) {
          return res.status(200).json({ status: 'success' });
        }
        else {
          return res.status(404).json({ error: 'Post failed' });
        }
        break;

      case 'get':
        let getData;
        switch (collectionName) {
          case 'personal_info':
          case 'profile_image':
            getData = await collection?.findOne({ _id: id as any });
            break;
          case 'notifications':
            getData = await collection?.find({ to_user_id: id }).toArray();
            break;
          case 'chats':
            let fromUserId = id;
            let toUserId = data.to_user_id;
            let chatUsers = [fromUserId, toUserId].sort();
            let chatsInfo = await collection.findOne({ participants: { $all: chatUsers } });
            getData = chatsInfo?.chat;
            break;
          default:
            getData = await collection?.find({ user_id: id }).toArray();
            break;
        };
        if (getData) {
          return res.status(200).json({
            status: 'success',
            responseData: getData
          });
        }
        break;

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
        profileImageCollection = db?.collection('profile_image');
        personalInfoCollection = db?.collection('personal_info');
        profileScoreCollection = db?.collection('profile_score');

        userInfoPromises = candidatesUserIds.map(async (userId: any) => {
          const [profileImage, personalInfo, profileScore, requestInfo] = await Promise.all([
            profileImageCollection?.findOne({ _id: userId }),
            personalInfoCollection?.findOne({ _id: userId }),
            profileScoreCollection?.findOne({ _id: userId }),
            collection?.findOne({ user_id: userId })
          ]);

          return {
            user_id: userId,
            profile_image: profileImage?.image_url,
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
        });

        let getCandidates = await Promise.all(userInfoPromises);

        //userInfo = userInfo.sort((a, b) => a.user_id.localeCompare(b.user_id));

        return res.status(200).json({
          status: 'success',
          responseData: getCandidates
        });
        break;

      case 'get-contacting-candidates-ids':
        let requestTalentId = data;
        notificationsFromUserId = await collection?.find({ from_user_id: id }).toArray();
        notificationsRequestContact = notificationsFromUserId?.filter((notification: any) => notification.notification_type === 'request contact');
        let notificationRequestTalentIds = notificationsRequestContact?.filter((notification: any) => notification.from_request_id === requestTalentId);
        let contactingCandidatesIds = notificationRequestTalentIds?.map((notification: any) => ({ to_user_id: notification.to_user_id }));

        if (contactingCandidatesIds) {
          return res.status(200).json({
            status: 'success',
            responseData: contactingCandidatesIds
          });
        }
        break;

      case 'get-offers':
        notificationsToUserId = await collection?.find({ to_user_id: id }).toArray();
        notificationsRequestContact = notificationsToUserId?.filter((notification) => notification.notification_type === 'request contact');
        let notificationsToRequestJobId = notificationsRequestContact?.filter((notification: any) => notification.to_request_id === data);
        let requestContactUserIds = notificationsToRequestJobId?.map((notification: any) => notification.from_user_id);
        profileImageCollection = db?.collection('profile_image');
        personalInfoCollection = db?.collection('personal_info');
        requestCollection = db?.collection('request_talent');

        userInfoPromises = requestContactUserIds.map(async (userId: any) => {
          const [profileImage, personalInfo, requestInfo] = await Promise.all([
            profileImageCollection?.findOne({ _id: userId }),
            personalInfoCollection?.findOne({ _id: userId }),
            requestCollection?.findOne({ user_id: userId })
          ]);

          return {
            user_id: userId,
            request_talent_id: requestInfo?._id,
            profile_image: profileImage?.image_url,
            full_name: personalInfo?.full_name,
            job_category: requestInfo?.job_category,
            job_title: requestInfo?.job_title,
            skills_required: requestInfo?.skills_required,
            experience_level: requestInfo?.experience_level,
            experience_years: requestInfo?.experience_years,
            location: requestInfo?.location,
            modality_work: requestInfo?.modality_work,
            company_info: requestInfo?.company_info,
            compensation: requestInfo?.compensation,
          };
        });

        let getOffers = await Promise.all(userInfoPromises);

        //userInfo = userInfo.sort((a, b) => a.user_id.localeCompare(b.user_id));

        return res.status(200).json({
          status: 'success',
          responseData: getOffers
        });
        break;

      case 'get-offers-accepted':
        notificationsFromUserId = await collection?.find({ from_user_id: id }).toArray();
        let notificationsAcceptedOffers = notificationsFromUserId?.filter((notification: any) => notification.notification_type === 'offer acceptance');
        let getOffersAccepted = notificationsAcceptedOffers?.filter((notification: any) => notification.from_request_id === data);
        //let getOffersAcceptedId = getOffersAccepted?.map((notification: any) => notification.to_user_id);

        if (getOffersAccepted) {
          return res.status(200).json({
            status: 'success',
            responseData: getOffersAccepted
          });
        }
        break;

      case 'get-request-contact-accepted':
        let requestJobId = data;
        notificationsToUserId = await collection?.find({ to_user_id: id }).toArray();
        notificationsOfferAcceptance = notificationsToUserId?.filter((notification: any) => notification.notification_type === 'offer acceptance');
        let offerAcceptanceFromRequestJobId = notificationsOfferAcceptance?.filter((notification: any) => notification.from_request_id === requestJobId);

        if (offerAcceptanceFromRequestJobId) {
          return res.status(200).json({
            status: 'success',
            responseData: offerAcceptanceFromRequestJobId
          });
        }
        break;

      case 'edit':
        let edition = await collection?.findOneAndUpdate(
          { _id: id as any },
          { $set: data },
          { returnDocument: 'after', upsert: true }
        );

        if (edition?.value) {
          return res.status(200).json({
            status: 'success',
            responseData: edition.value
          });
        }
        else {
          return res.status(404).json({ error: 'User information not found' });
        }
        break;

      case 'edit-request':
        let requestEdition = await collection?.findOneAndUpdate(
          { _id: id as any },
          { $push: { contact: data } },
          { returnDocument: 'after', upsert: true }
        );

        if (requestEdition?.value) {
          return res.status(200).json({
            status: 'success',
            responseData: requestEdition.value
          });
        }
        else {
          return res.status(404).json({ error: 'User information not found' });
        }
        break;

      case 'edit-notification':
        const notificationEdition = await collection?.findOneAndUpdate(
          { _id: id as any },
          { $set: data },
          { returnDocument: 'after', upsert: true }
        );

        if (notificationEdition?.value) {
          return res.status(200).json({
            status: 'success',
            responseData: notificationEdition.value
          });
        }
        else {
          return res.status(404).json({ error: 'User information not found' });
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