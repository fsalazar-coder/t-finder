import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Cors from 'cors';
import initMiddleware from '../../lib/init-middleware';
import { NextResponse } from 'next/server';

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

      if (!process.env.DB_URI) {
        throw new Error("MONGODB_URI environment variable is not defined");
      }

      const client = new MongoClient(process.env.DB_URI);
      await client.connect();
      const db = await client.db("admin").command({ ping: 1 });      
      console.log("Pinged your deployment. You successfully connected to MongoDB!");

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

      if (!process.env.SECRET_KEY) {
        throw new Error("SECRET_KEY environment variable is not defined");
      }

      const token = jwt.sign({ email }, process.env.SECRET_KEY);

      return NextResponse.json({ db });
    }
  }
  catch (error) {
    console.error('An error occurred:', error);
  }
}