import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Cors from 'cors';
import initMiddleware from '../../lib/init-middleware';

const cors = initMiddleware(
  Cors({
    methods: ['POST'],
  })
);



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await cors(req, res);

  if (req.method === 'POST') {
    if (!process.env.DB_URI) {
      throw new Error("MONGODB_URI environment variable is not defined");
    }
    const client = await MongoClient.connect(process.env.DB_URI);
    const db = client.db();

    const { email, password } = req.body;

    const user = await db.collection('users').findOne({ email });

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    if (!process.env.SECRET_KEY) {
      throw new Error("SECRET_KEY environment variable is not defined");
    }

    const token = jwt.sign({ email }, process.env.SECRET_KEY);

    return res.status(200).json({ token });
  }
}
