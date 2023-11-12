import { put } from '@vercel/blob';
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/mongodb";



const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method === 'POST') {
    if (!req.url) {
      res.status(400).json({ error: 'Request URL is missing' });
      return;
    }

    const baseUrl = `http://${req.headers.host}`;
    const fullUrl = new URL(req.url, baseUrl);
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('id');
    const { db } = await dbConnect();
    const collection = db.collection("profile_image");

    if (userId) {
      try {
        // Convert ReadableStream to Buffer
        const buffer = await req.body?.getReader().read().then(({ value }: any) => value);

        if (!buffer) {
          throw new Error('Buffer is null or undefined');
        }

        const blob = await put(userId, buffer, {
          access: 'public',
        });

        return res.status(200).json({
          status: 'success',
          actionResponse: blob
        });
      }
      catch (error) {
        console.error('An error occurred:', error);
        return res.status(500).json({ error: 'Failed to process the image upload.' });
      }
    }
    else {
      return res.status(400).json({ error: 'User ID is missing.' });
    }
  }
  else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
};


export default handler;