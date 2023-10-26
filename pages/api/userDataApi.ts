import type { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';
import initMiddleware from '../../lib/init-middleware';
import dbConnect from "../../lib/mongodb";

const cors = initMiddleware(
  Cors({
    methods: ['GET', 'PUT', 'PATCH'],
  })
);



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await cors(req, res);
    const { method } = req;
    const { db } = await dbConnect();
    const collection = db?.collection("users");
    const { id } = req.body;

    switch (req.method) {
      /**get user data */
      case 'GET':
        const user = await collection?.findOne({ id });
        if (user) {
          return res.status(200).json({ user });
        }
        else {
          return res.status(404).json({ error: 'User not found' });
        }
        break;

      /**update user data */
      case 'PUT':
        const { updates } = req.body;
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
        break;

      /**delete user data */
      case 'PATCH':
        const { dataToDelete } = req.body;
        const updateQuery: any = {};
        for (const field of Object.keys(dataToDelete)) {
          updateQuery[field] = "";
        }

        const deletedUser = await collection?.findOneAndUpdate(
          { _id: id },
          { $set: updateQuery },
          { returnDocument: 'after' }
        );

        if (deletedUser?.value) {
          return res.status(200).json({
            status: 'Data deleted successfully',
            user: deletedUser.value
          });
        }
        else {
          return res.status(404).json({ error: 'User not found' });
        }
        break;

      default:
        res.setHeader('Allow', ['PUT', 'GET', 'PATCH']);
        res.status(405).end(`Method ${method} Not Allowed`);
        break;
    }
  }
  catch (error) {
    console.error('An error occurred:', error);
    return res.status(500).json({ error: 'An internal error occurred' });
  }
}
