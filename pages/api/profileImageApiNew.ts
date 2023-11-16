import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { put } from '@vercel/blob';
import formidable from 'formidable';
import { v4 as uuidv4 } from 'uuid';
import dbConnect from "../../lib/mongodb";
import fs from "fs/promises";

export const runtime = 'edge'

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({
      status: "failure",
      message: "Method not allowed"
    });
  }

  try {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        throw err;
      }

      const file = files.file;
      if (!file || Array.isArray(file) || !('filepath' in file)) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const contentType = 'file' || 'text/plain';
      const filename = `${uuidv4().replace(/-/g, '')}.${contentType.split('/')[1]}`;

      if (!process.env.T_FINDER_READ_WRITE_TOKEN) {
        throw new Error("T_FINDER_READ_WRITE_TOKEN environment variable is not defined");
      }

      const blob = await put(filename, file, {
        contentType,
        access: 'public',
        token: process.env.T_FINDER_READ_WRITE_TOKEN
      });

      const { db } = await dbConnect();
      const collection = db.collection("profile_image");
      const userId = fields.id;

      const updateResult = await collection.updateOne(
        { _id: userId },
        { $set: { image_url: blob.url } },
        { upsert: true }
      );

      res.status(200).json({
        status: 'success',
        imageUrl: blob.url,
        dbResult: updateResult
      });
    });
  }
  catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ error: 'An internal error occurred' });
  }
};

export default handler;
