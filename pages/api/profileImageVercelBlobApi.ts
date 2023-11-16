import { NextResponse } from 'next/server'
import { put } from '@vercel/blob';
import { v4 as uuidv4 } from 'uuid';

export const runtime = 'edge'



export default async function POST(request: Request): Promise<NextResponse> {
  const {searchParams} = new URL(request.url);
  const filename = searchParams.get('id') || `${uuidv4().replace(/-/g, '')}`;
  const file = request.body || '';

  if (!process.env.T_FINDER_READ_WRITE_TOKEN) {
    throw new Error("T_FINDER_READ_WRITE_TOKEN environment variable is not defined");
  }

  const blob = await put(filename, file, {
    access: 'public',
    token: process.env.T_FINDER_READ_WRITE_TOKEN
  });

  return NextResponse.json(blob)
}