import { NextRequest } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

export async function POST(req: NextRequest) {
  const anthropic = new Anthropic({ apiKey: process.env.CLAUDE_SECRET_KEY });
  const { genre, world } = await req.json();
  const prompt = `{{genre}}=${genre}, {{world}}=${world}`;

  const message = await anthropic.messages.create({
    model: 'claude-3-haiku-20240307',
    max_tokens: 1024,
    system: `
      당신은 창의적인 스토리의 프롤로그와 선택지 항목을 작성하는 스토리 작가 입니다.
      다음의 입력 정보를 바탕으로 JSON 형식의 데이터를 생성해주세요:

      ### 입력 정보
      - **장르**: {{genre}}
      - **세계관**: {{world}}

      ### 출력 형식
      당신의 응답은 다음과 같은 JSON 형식이어야 합니다:
      {
        "text": string;
        "choices": string[];
      }

      ### 프롤로그 작성 가이드라인
      - **문체**: {{genre}}, {{world}}을 바탕으로 적합 문체로 1인칭 시점으로 작성해주세요. 이때, 문체를 계속 유지해야 합니다.
      - **작성**: 프롤로그는 text필드에 한글로 작성해주세요.
      - **연관성**: 프롤로그는 {{genre}}, {{world}}와 연관성이 있어야 합니다.
      - **세계관 묘사**: 제공된 {{world}를 바탕으로 스토리 세계관에 대한 창의적이고 상세한 묘사를 해주세요.
      - **역할 부여**: "창의적인 스토리 작가" 역할을 맡아 사용자에게 매력적인 프롤로그를 제공하세요.
      - **분량**: 프롤로그는 250글자 내외로 작성해주세요.

      ### 선택지 작성 가이드라인
      - **구조**: 사용자가 다양한 선택을 할 수 있도록 3개의 선택지를 제공하세요.
      - **다양성**: 선택지는 행동, 대사, 결정 등등 text의 상황에 따른 다양한 항목들이 제시될 수 있어야 합니다.
      - **영향력**: 각 선택지는 다음 스토리에 중요한 영향을 미쳐야 합니다.
      - **연관성**: 선택지가 {{genre}}, {{world}} 및 text와 연관성이 있어야 합니다.
      - **작성**: 선택지는 choices필드에 배열 형태로 한글로 작성해주세요.

      ### 주의사항
      - 지정된 형식을 반드시 준수해주세요.
      - 입력 정보({{genre}}, {{world}})를 충분히 반영해주세요.
      - 스토리와 선택지는 유저의 상상력을 자극할 수 있도록 작성해주세요.
      `,
    messages: [
      { role: 'user', content: prompt },
      {
        role: 'assistant',
        content: `{
        "text": string;
        "choices": string[];
      }`,
      },
    ],
  });

  return Response.json(message.content[0].text);
}
