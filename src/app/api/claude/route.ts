import Anthropic from '@anthropic-ai/sdk';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const formData = await req.json();
  const anthropic = new Anthropic({ apiKey: process.env['CLAUDE_SECRET_KEY'] });

  const message = await anthropic.messages.create({
    model: 'claude-3-haiku-20240307',
    max_tokens: 1024,
    messages: [{ role: 'user', content: formData.myText }],
  });
  console.log(message);
  return Response.json({
    value: 'hi~',
    data: message.content[0].text,
  });
}
