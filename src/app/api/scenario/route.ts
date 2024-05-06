import { connectDB } from '@/remotes/mongodb';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const formData = await req.json();
  const db = await (await connectDB).db('prototype');
  try {
    console.log(formData);
    const result = await db.collection('scenario').insertOne(formData);
    return Response.json('create scenario!');
  } catch (err) {
    return new Response(JSON.stringify({ message: err }), { status: 500 });
  }
}
