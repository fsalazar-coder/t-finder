import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/mongodb";



const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {

  const { db } = await dbConnect();
  const collection = db?.collection("profile_image");
  const { id, data } = req.body;

  if (req.method === 'POST') {
    await collection.updateOne(
      { _id: id },
      { $set: { image_url: data } },
      { upsert: true }
    );

    return res.status(200).json({
      status: 'success',
      imageUrl: data
    });
  }
  else {
    res.json({
      status: "failure",
      message: "No file uploaded",
    });
  }
}

export default handler;