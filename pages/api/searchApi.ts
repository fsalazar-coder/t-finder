import type { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';
import initMiddleware from '../../lib/init-middleware';
import dbConnect from "../../lib/mongodb";

const cors = initMiddleware(
  Cors({
    methods: ['POST', 'GET', 'PUT', 'PATCH'],
  })
);

const today = new Date();
const day = String(today.getDate()).padStart(2, '0');
const month = String(today.getMonth() + 1).padStart(2, '0'); // +1 porque los meses comienzan en 0
const year = today.getFullYear();
const dateString = `${day} ${month} ${year}`;



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await cors(req, res);
    const { collectionToSearch, keyword } = req.body;
    const { db } = await dbConnect();
    const requestCollection = db?.collection(collectionToSearch);
    const profileImageCollection = db?.collection('profile_image');
    const personalInfoCollection = db?.collection('personal_info');
    const keyCollection: string = collectionToSearch === 'request_talent' ? 'job_category' : 'talent_category';

    const query: any = {};
    query[keyCollection] = keyword;

    const requestMatch = await requestCollection?.find(query, { projection: { user_id: 1 } }).toArray();
    const userIds = requestMatch?.map(request => request.user_id);

    const userInfoPromises = userIds.map(async userId => {
      const [profileImage, personalInfo, requestInfo] = await Promise.all([
        profileImageCollection?.findOne({ _id: userId }),
        personalInfoCollection?.findOne({ _id: userId }),
        requestCollection?.findOne({ user_id: userId })
      ]);

      return {
        user_id: userId,
        profile_image: profileImage?.image_url,
        full_name: personalInfo?.full_name,
        profession_occupation: personalInfo?.profession_occupation,
        skills_offered: requestInfo?.skills_offered,
        experience_level: requestInfo?.experience_level,
        location: personalInfo?.location,
        modality_work: requestInfo?.modality_work,
        availability: requestInfo?.availability,
        preferred_language: personalInfo?.preferred_language,
        rates: requestInfo?.rates
      };
    });

    let searchResponse = await Promise.all(userInfoPromises);

    //userInfo = userInfo.sort((a, b) => a.user_id.localeCompare(b.user_id));

    return res.status(200).json({
      status: 'success',
      searchResponse
    });
  }
  catch (error) {
    console.error('An error occurred:', error);
    return res.status(500).json({ error: 'An internal error occurred' });
  }
}