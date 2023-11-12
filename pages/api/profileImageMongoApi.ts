import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/mongodb";



const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {

  const { db } = await dbConnect();
  const collection = db?.collection("profile_image");
  const { id, data } = req.body;

  if (req.method === 'POST') {
    try {
      const filePath = data;
      const existingUser = await collection?.findOne({ _id: id as any });

      if (existingUser) {
        await collection?.updateOne(
          { _id: id as any },
          { $set: { image_url: filePath } }
        );
      }
      else {
        await collection?.insertOne({
          _id: id as any,
          image_url: filePath
        });
      }

      const getPath = await collection?.findOne({ _id: id as any });
      return res.status(200).json({
        status: 'success',
        actionResponse: getPath
      });
    }
    catch (error) {
      console.error('An error occurred:', error);
      res.status(500).json({ error: 'An internal error occurred' });
    }
  }
  else {
    res.json({
      status: "failure",
      message: "No file uploaded",
    });
  }
}

export default handler;