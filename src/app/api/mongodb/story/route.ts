import { connectDB } from '@/remotes/mongodb/mongodb';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const formData = await req.json();
  const db = (await connectDB).db('prototype');
  const result = await db.collection('story').insertOne(formData);
  return Response.json(result.insertedId);
}
