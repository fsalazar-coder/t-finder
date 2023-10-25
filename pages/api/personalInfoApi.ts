import type { NextApiRequest, NextApiResponse } from 'next';
import { useAuthData } from '@/context/authContext';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Cors from 'cors';
import initMiddleware from '../../lib/init-middleware';
import dbConnect from "../../lib/mongodb";
import { v4 as uuidv4 } from 'uuid';

const cors = initMiddleware(
  Cors({
    methods: ['POST'],
  })
);



export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const { userId } = useAuthData();

  try {
    await cors(req, res);
    const { db } = await dbConnect();
    const { method } = req;

    if (req.method !== 'POST') {
      return res.status(405).end(`Method ${method} not allowed`);
    }

    const { dataProfile } = req.body;
    const collection = db?.collection("users");

    await collection?.updateOne(
      { _id: userId as any },
      { $set: { profile_information: dataProfile } }
    );
    return res.status(200).json({ status: 'Success register' });
  }
  catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ error: 'An internal error occurred' });
  }
}