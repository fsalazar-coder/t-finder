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


export default async function handler(req: any, res: any) {

  try {
    await cors(req, res);
    const client = await clientPromise;
    const db = client?.db("talent-finder");
    const { method } = req;

    if (req.method !== 'POST') {
      return res.status(405).end(`Method ${method} not allowed`);
    }

    // Register or Login
    const { email, password, action } = req.body;
    const collection = db?.collection("users");

    if (action === "register") {
      //register
      const existingUser = await collection?.findOne({ email });

      if (existingUser) {
        client?.close();
        return res.status(200).json({ status: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      await collection?.insertOne({
        email: email,
        password: hashedPassword,
      });

      client?.close();
      return res.status(200).json({ status: 'Success register' });
    }
    else {
      //login
      const user = await collection?.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
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