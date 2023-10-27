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
    const { db } = await dbConnect();
    const { method } = req;

    if (req.method !== 'POST') {
      return res.status(405).end(`Method ${method} not allowed`);
    }

    // Register or Login
    const { email, password, action } = req.body;
    const collection = db?.collection("users");

    //register
    if (action === 'register') {
      const existingUser = await collection?.findOne({ email });

      if (existingUser) {
        return res.status(409).json({ status: 'User already exists' }); // Changed status code
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const idUnique = uuidv4();

      await collection?.insertOne({
        _id: idUnique as any,
        email: email,
        password_hash: hashedPassword,
        created_at: new Date().toISOString(),
      });

      return res.status(201).json({ status: 'Success register' });
    }
    //login
    else if (action === 'login') {
      const user = await collection?.findOne({ email });
      if (!user) {
        return res.status(401).json({ status: 'Invalid credential' });
      }

      const isValidPassword = await bcrypt.compare(password, user.password_hash);
      if (!isValidPassword) {
        return res.status(401).json({ status: 'Invalid credential' });
      }

      if (!process.env.SECRET_KEY) {
        throw new Error("SECRET_KEY environment variable is not defined");
      }

      const token = jwt.sign({ email }, process.env.SECRET_KEY);

      return res.status(200).json({ token: token, user: user });
    }
    return;
  }
  catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ error: 'An internal error occurred' });
  }
}