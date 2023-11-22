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

const today = new Date();
const day = String(today.getDate()).padStart(2, '0');
const month = String(today.getMonth() + 1).padStart(2, '0'); // +1 porque los meses comienzan en 0
const year = today.getFullYear();
const dateString = `${day} ${month} ${year}`;



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await cors(req, res);
    const { id, collectionName, action, data } = req.body;
    const { db } = await dbConnect();
    const collection = db?.collection(collectionName);

    switch (action) {
      /**add user information */
      case 'post':
        let addition;
        let allDataAdd;
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

      /**get user data */
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

      /**update user information */
      case 'edit':
        const edition = await collection?.findOneAndUpdate(
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

      /**delete user profile information */
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