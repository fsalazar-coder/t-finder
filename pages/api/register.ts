import bcrypt from 'bcrypt';
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
    const db = client?.db("t-finder");

    if (req.method !== 'POST') {
      return res.status(405).end();
    }

    const { email, password } = req.body;
    const existingUser = await db?.collection('users').findOne({ email });
    if (existingUser) {
      client?.close();
      return res.status(200).json({ status: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await db?.collection("users").insertOne({
      email: email,
      password: hashedPassword,
    });

    client?.close();
    return res.status(200).json({ status: 'success' });
  }
  catch (error) {
    console.error('An error occurred:', error);
  }
}