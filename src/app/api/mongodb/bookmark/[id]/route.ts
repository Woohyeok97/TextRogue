import { NextRequest } from 'next/server';
import { connectDB } from '@/remotes/mongodb/mongodb';
import { ObjectId } from 'mongodb';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const db = (await connectDB).db('prototype');
  const result = await db.collection('bookmark').deleteOne({ _id: new ObjectId(params.id) });
  return Response.json(result);
}
