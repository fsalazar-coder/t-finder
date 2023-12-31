import type { NextApiRequest, NextApiResponse } from 'next';
import initMiddleware from '../../lib/init-middleware';
import dbConnect from "../../lib/mongodb";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Cors from 'cors';
import { v4 as uuidv4 } from 'uuid';


const cors = initMiddleware(
  Cors({
    methods: ['POST'],
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
        return res.status(409).json({
          status: 409,
          message: 'Email already exists'
        });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      await collection?.insertOne({
        _id: uuidv4() as any,
        email: email,
        password_hash: hashedPassword,
        created_at: dateString,                                 // or use: new Date().toISOString(),
      });

      return res.status(201).json({
        status: 201,
        message: 'Email successfully registered'
      });
    }
    //login
    else if (action === 'login') {
      const user = await collection?.findOne({ email });
      if (!user) {
        return res.status(401).json({
          status: 401,
          message: 'Invalid credential'
        });
      }

      const isValidPassword = await bcrypt.compare(password, user.password_hash);
      if (!isValidPassword) {
        return res.status(401).json({
          status: 401,
          message: 'Invalid credential'
        });
      }

      if (!process.env.SECRET_KEY) {
        throw new Error("SECRET_KEY environment variable is not defined");
      }

      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);

      return res.status(200).json({
        token: token,
        user: user
      });
    }
    return;
  }
  catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ error: 'An internal error occurred' });
  }
}