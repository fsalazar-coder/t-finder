import { put } from '@vercel/blob';
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/mongodb";
import formidable from "formidable";
import fs from "fs/promises";

export const config = {
  api: {
    bodyParser: false,
  },
};

const readFile = (req: NextApiRequest): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  const form = new formidable.IncomingForm();
  const options: formidable.Options = {};
  options.maxFileSize = 4000 * 1024 * 1024;     /// esto hay que CAMBIARLO!!

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
};

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {

  const { method } = req;
  const { db } = await dbConnect();
  const collection = db.collection("profile_images");
  const { fields, files } = await readFile(req);

  if (files.image) {
    const imageFile = files.image[0];
    const filename = imageFile.newFilename;
    const buffer = await fs.readFile(imageFile.filepath);
    const contentType = imageFile.mimetype || 'application/octet-stream';

    if (req.method === 'POST') {
      try {
        const blob = await put(filename, buffer, {
          contentType: contentType,
          access: 'public',
        });

        const imageUrl = blob.url;
        const userId = fields.userId;

        const updateResult = await collection.updateOne(
          { _id: userId as any },
          { $set: { image_url: imageUrl } },
          { upsert: true }
        );

        return res.status(200).json({
          status: 'success',
          imageUrl: imageUrl,
          dbResult: updateResult,
        });
      }
      catch (error) {
        console.error('An error occurred:', error);
        res.status(500).json({ error: 'An internal error occurred' });
      }
    }
    else {
      return res.status(400).json({
        status: 'failure',
        message: 'No file uploaded',
      });
    }
  }

  else {
    return res.status(405).json({
      status: 'failure',
      message: 'Method not allowed',
    });
  }
};

export default handler;