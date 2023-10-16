import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import Cors from 'cors';
import initMiddleware from '../../lib/init-middleware';
import dbConnect from "../../lib/mongodb";
import path from "path";
import fs from "fs/promises";
import formidable from "formidable";
import { v4 as uuidv4 } from 'uuid';

interface UploadedFiles {
  image: {
    path: string;
    name: string;
    // Add other properties as needed
  };
  // Add other uploaded files here
}

interface FormidableOptions {
  uploadDir?: string;
  maxFileSize?: number;
  // add other properties here
}


export const config = {
  api: {
    bodyParser: false,
  },
};


const readFile = (req: NextApiRequest, saveLocally?: boolean):
  Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  const options: formidable.Options = {};

  if (saveLocally) {
    options.uploadDir = path.join(process.cwd(), "/public/users/images");
    options.filename = (name, ext, path, form) => {
      const uniqueFileName = uuidv4().replace(/-/g, '');
      return `${uniqueFileName}_${path.originalFilename}`;
    };
  }

  options.maxFileSize = 4000 * 1024 * 1024;

  const form = formidable(options);

  return new Promise((resolve, reject) => {
    form.parse(req, (err: any, fields: any, files: any) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
};

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await fs.readdir(path.join(process.cwd() + "/public/users/images"));
  }
  catch (error) {
    await fs.mkdir(path.join(process.cwd() + "/public/users/images"));
  }
  const { fields, files } = await readFile(req, true);
  const id = Array.isArray(fields.id) && fields.id.length > 0 ? fields.id[0] : null;

  if (files.image) {
    const fileSize = files.image[0].size;
    const fileName = files.image[0].newFilename;
    const filePath = `/users/images/${fileName}`;

    try {
      const { db } = await dbConnect();
      const collection = db?.collection("users");

      await collection?.updateOne(
        { _id: id as any},
        { $set: { profile_image_url: filePath } }
      );
    }
    catch (error) {
      console.error('An error occurred:', error);
      res.status(500).json({ error: 'An internal error occurred' });
    }

    return res.status(200).json({
      status: 'success',
      fileName,
      filePath,
      fileSize
    });
  }
  else {
    res.json({
      status: "failure",
      message: "No file uploaded",
    });
  }
};

export default handler;
