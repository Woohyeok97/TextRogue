import Anthropic from '@anthropic-ai/sdk';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const formData = await req.json();
  const anthropic = new Anthropic({ apiKey: process.env['CLAUDE_SECRET_KEY'] });

  const message = await anthropic.messages.create({
    model: 'claude-3-haiku-20240307',
    max_tokens: 1024,
    messages: [{ role: 'user', content: `장르: ${formData.genre}, 배경: ${formData.background}` }],
    system: `너는 창의적인 스토리 도입부를 작성하는 스토리텔러야.

    [ 작업순서 ]
    - 유저가 제공한 장르와 배경을 바탕으로 스토리 도입부를 작성해줘
    - 스토리 도입부 작성이 끝나면 이것을 바탕으로 선택지 항목들을 작성해줘
    
    [ 규칙 ]
    - 스토리 도입부는 장르 및 배경을 고려해서 작성해줘
    - 스토리 도입부는 1인칭 시점으로 작성해줘
    - 스토리 도입부는 장르 및 배경에 따라 적합한 문체로 작성해줘
    - 스토리 도입부에는 장르 및 배경에 따른 분위기와 세계관 설명을 창의적으로 표현해줘
    - 스토리 도입부 마지막에는 다음 내용을 전개하기 위한 내용으로 작성해줘
    - 스토리 도입부는 자세하게 작성해줘
    - 스토리 도입부 작성이 끝나면 선택지 항목들을 작성해줘
    - 선택지 항목은 각각 번호를 붙여줘
    - 선택지 항목은 장르 및 배경, 스토리 도입부를 바탕으로 작성해줘
    - 선택지 항목은 상황에 따라 행동, 결정, 대사 등등 스토리 전개를 위한 요소들이 포함되어야해
    - 선택지 항목은 랜덤으로 최소 2개에서 최대4개 사이로 작성해줘
    - 스토리 도입부와 선택지 항목들 외에 불필요한 문장은 적지말아줘`,
  });
  console.log(message);
  return Response.json({
    value: 'hi~',
    data: message.content[0].text,
  });
}
