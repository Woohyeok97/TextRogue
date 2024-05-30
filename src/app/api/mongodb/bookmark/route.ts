import { connectDB } from '@/remotes/mongodb/mongodb';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const userId = searchParams.get('userId');
  const scenarioId = searchParams.get('scenarioId');

  const db = (await connectDB).db('prototype');
  const result = await db.collection('bookmark').findOne({ scenarioId: scenarioId, userId: userId });
  return Response.json(result);
}

export async function POST(req: NextRequest) {
  const { userId, scenarioId } = await req.json();
  const db = (await connectDB).db('prototype');
  const result = await db.collection('bookmark').insertOne({ userId, scenarioId });
  return Response.json(result);
}
