import type { NextApiRequest, NextApiResponse } from 'next';
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
  try {
    await cors(req, res);
    const { method } = req;
    const { db } = await dbConnect();
    const collection = db?.collection("users");

    /**update user data */
    if (req.method === 'PUT') {
      const { id, updates } = req.body;
      const updatedUser = await collection?.findOneAndUpdate(
        { _id: id as any },
        { $set: updates },
        { returnDocument: 'after' }
      );

      if (updatedUser?.value) {
        return res.status(200).json({
          status: 'User successfully updated',
          user: updatedUser.value
        });
      }
      else {
        return res.status(404).json({ error: 'User not found' });
      }
    }
    /**get user data */
    else if (req.method === 'GET') {
      const { email } = req.query;
      const user = await collection?.findOne({ email });
      if (user) {
        return res.status(200).json({ user });
      }
      else {
        return res.status(404).json({ error: 'User not found' });
      }
    }
    else {
      return res.status(405).end(`Method ${method} not allowed`);
    }
  }
  catch (error) {
    console.error('An error occurred:', error);
    return res.status(500).json({ error: 'An internal error occurred' });
  }
}
