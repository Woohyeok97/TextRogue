import { connectDB } from '@/remotes/mongodb/mongodb';
import { ObjectId } from 'mongodb';
import { NextRequest } from 'next/server';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const formData = await req.json();
  const db = (await connectDB).db('prototype');
  const result = await db
    .collection('story')
    .updateOne({ _id: new ObjectId(params.id) }, { $set: { log: formData } });
  return Response.json(result);
}
