import { put } from '@vercel/blob';
import { NextResponse } from 'next/server'
import { customAlphabet } from 'nanoid'



export const runtime = 'edge'

const nanoid = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  7
);


export default async function POST(req: Request) {
  const file = req.body || ''
  const contentType = req.headers.get('content-type') || 'text/plain'
  const filename = `${nanoid()}.${contentType.split('/')[1]}`

  if (!process.env.T_FINDER_READ_WRITE_TOKEN) {
    throw new Error("T_FINDER_READ_WRITE_TOKEN environment variable is not defined");
  }

  const blob = await put(filename, file, {
    contentType,
    access: 'public',
    token:process.env.T_FINDER_READ_WRITE_TOKEN
  })

  console.log('Blob backend: ', blob)

  return NextResponse.json(blob)
}