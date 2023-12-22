import type { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';
import initMiddleware from '../../lib/init-middleware';
import dbConnect from "../../lib/mongodb";
import { v4 as uuidv4 } from 'uuid';

const cors = initMiddleware(
  Cors({
    methods: ['POST', 'GET', 'PUT', 'PATCH'],
  })
);


const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const today = new Date();
const month = months[today.getMonth()];
const dayOfMonth = today.getDate();
const year = today.getFullYear();
const dateString = `${month} ${dayOfMonth}, ${year}`;



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await cors(req, res);
    const { id, collectionName, action, data } = req.body;
    const { db } = await dbConnect();
    const collection = db?.collection(collectionName);

    let personalInfoCollection: any;
    let profileImageCollection: any;
    let requestCollection: any;
    let notificationCollection: any;
    let profileScoreCollection: any;
    let notificationRequestContact;
    let addition;
    let allDataAdd;
    let notificationToUser: any;
    let requestTalentId: string;
    let notificationRequestTalentIds;
    let notificationToUserId;
    let requestContact;
    let requestContactToUserId;
    let acceptanceOffer;
    let acceptedOfferFromUserId;
    let notificationsToUser;
    let notificationsRequestContact;
    let notificationsToRequestJobId;
    let notificationsFromUserId: any;
    let notificationFromUserId: any;
    let notificationId: any;
    let notificationsToUserId;
    let notificationsResponse;
    let requestTalentUserIds;
    let userInfoPromises: any;
    let actionResponse: any;
    let requestContactUserIds;
    let notificationsAcceptedOffers;

    switch (action) {
      case 'post':
        if (collectionName === 'personal_info') {
          addition = await collection?.insertOne({
            _id: id,
            ...data
          });

          if (addition) {
            allDataAdd = await collection?.find({ _id: id });
            return res.status(200).json({
              status: 'success',
              actionResponse: allDataAdd
            });
          }
          else {
            return res.status(404).json({ error: 'User not found' });
          }
        }
        else if (collectionName === 'notifications') {
          addition = await collection?.insertOne({
            created_at: dateString,
            _id: uuidv4(),
            to_user_id: id,
            ...data
          });
          if (addition.insertedId) {
            return res.status(200).json({
              status: 'success',
              insertedId: addition.insertedId
            });
          }
          else {
            return res.status(404).json({ error: 'User not found' });
          }
        }
        else {
          addition = await collection?.insertOne({
            created_at: dateString,
            _id: uuidv4(),
            user_id: id,
            ...data
          });

          if (addition) {
            allDataAdd = await collection?.find({ user_id: id }).toArray();
            return res.status(200).json({
              status: 'success',
              actionResponse: allDataAdd
            });
          }
          else {
            return res.status(404).json({ error: 'User not found' });
          }
        }
        break;

      case 'get':
        let getData;
        if (collectionName === 'personal_info' || collectionName === 'profile_image') {
          getData = await collection?.findOne({ _id: id as any });
        }
        else {
          getData = await collection?.find({ user_id: id }).toArray();
        }

        if (getData) {
          return res.status(200).json({
            status: 'success',
            actionResponse: getData
          });
        }
        break;

      case 'get-notifications':
        notificationToUser = await collection?.find({ to_user_id: id }).toArray();

        return res.status(200).json({
          status: 'success',
          notificationsResponse: notificationToUser
        });

        break;

      case 'get-candidates':
        let keyword = data;
        profileImageCollection = db?.collection('profile_image');
        personalInfoCollection = db?.collection('personal_info');
        profileScoreCollection = db?.collection('profile_score');
        const requestMatch = await collection?.find({ talent_category: keyword }).toArray();
        const candidatesUserIds = requestMatch?.map((request: any) => request.user_id);
        
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

        actionResponse = await Promise.all(userInfoPromises);

        //userInfo = userInfo.sort((a, b) => a.user_id.localeCompare(b.user_id));

        return res.status(200).json({
          status: 'success',
          actionResponse
        });
        break;

      case 'get-contacting-candidates-ids':
        requestTalentId = data;
        notificationsFromUserId = await collection?.find({ from_user_id: id }).toArray();
        notificationRequestContact = notificationsFromUserId?.filter((notification: any) => notification.notification_type === 'request contact');
        notificationRequestTalentIds = notificationRequestContact?.filter((notification: any) => notification.from_request_id === requestTalentId);
        notificationToUserId = notificationRequestTalentIds?.map((notification: any) => ({ to_user_id: notification.to_user_id }));

        if (notificationToUserId) {
          return res.status(200).json({
            status: 'success',
            actionResponse: notificationToUserId
          });
        }
        break;

      case 'get-offers':
        requestCollection = db?.collection('request_talent');
        profileImageCollection = db?.collection('profile_image');
        personalInfoCollection = db?.collection('personal_info');
        notificationsToUser = await collection?.find({ to_user_id: id }).toArray();
        notificationsRequestContact = notificationsToUser?.filter((notification) => notification.notification_type === 'request contact');
        notificationsToRequestJobId = notificationsRequestContact?.filter((notification) => notification.to_request_id === data);
        requestContactUserIds = notificationsToRequestJobId?.map((notification) => notification.from_user_id);

        userInfoPromises = requestContactUserIds.map(async userId => {
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

        actionResponse = await Promise.all(userInfoPromises);

        //userInfo = userInfo.sort((a, b) => a.user_id.localeCompare(b.user_id));

        return res.status(200).json({
          status: 'success',
          actionResponse
        });
        break;

      case 'get-offers-accepted':
        notificationsFromUserId = await collection?.find({ from_user_id: id }).toArray();
        notificationsAcceptedOffers = notificationsFromUserId?.filter((notification: any) => notification.notification_type === 'offer acceptance');
        let acceptedOfferToUserId = notificationsAcceptedOffers?.map((notification: any) => notification.to_user_id);

        if (acceptedOfferFromUserId) {
          return res.status(200).json({
            status: 'success',
            actionResponse: acceptedOfferFromUserId
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
            actionResponse: edition.value
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
            actionResponse: requestEdition.value
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
            actionResponse: notificationEdition.value
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
            message: 'Your information was successfully deleted',
            deletedDocument: deleted.value // optional, include if useful
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