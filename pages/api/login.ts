import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Cors from 'cors';
import initMiddleware from '../../lib/init-middleware';
import clientPromise from "../../lib/mongodb";

const cors = initMiddleware(
  Cors({
    methods: ['POST'],
  })
);



export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  try {
    await cors(req, res);
    const client = await clientPromise;
    const db = client?.db("talent-finder");

    if (req.method === 'POST') {
      const { email, password } = req.body;
      const user = await db?.collection('users').findOne({ email });

      if (!user) {
        console.log('Invalid user')
        return res.status(400).json({ error: 'Invalid credential' });
      }
      
      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        console.log('Invalid password')
        return res.status(400).json({ error: 'Invalid credential' });
      }

      if (!process.env.SECRET_KEY) {
        throw new Error("SECRET_KEY environment variable is not defined");
      }

      const token = jwt.sign({ email }, process.env.SECRET_KEY);

      return res.status(200).json({ token: token });
    }
  }
  catch (error) {
    console.error('An error occurred:', error);
  }
}
