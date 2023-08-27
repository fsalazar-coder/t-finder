import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Cors from 'cors';
import initMiddleware from '../../lib/init-middleware';
import dotenv from 'dotenv';
import { NextResponse } from 'next/server';

dotenv.config();

const cors = initMiddleware(
  Cors({
    methods: ['POST'],
  })
);



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
  console.log('entrando a registro, TRY')

  try {
    await cors(req, res);
    if (req.method === 'POST') {

      console.log('Request metod is POST')

      const client = await MongoClient.connect(process.env.DB_URI!);
      const db = client.db();

      console.log('MongoClient Connected')

      const { email, password } = req.body;

      console.log(`Request body done, email: ${email} and password: ${password}`)

      const existingUser = await db.collection('users').findOne({ email });

      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = {
        email,
        password: hashedPassword
      };
      await db.collection('users').insertOne(user);

      const token = jwt.sign({ email }, process.env.SECRET_KEY!);

      return NextResponse.json({ db });
    }
  }
  catch (error) {
    console.error('An error occurred:', error);
  }
}