import { NextRequest } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const prompt = `{{genre}}=${body.genre}, {{world}}=${body.world}, {{previous_story}}=${body.previousStory}, {{user_choice}}=${body.userChoice}`;
    const anthropic = new Anthropic({ apiKey: process.env.CLAUDE_SECRET_KEY });
    const message = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 1024,
      system: `
      당신은 창의적인 스토리 전개와 선택지 항목을 작성하는 스토리 게임 진행자 입니다.
      다음의 정보를 바탕으로 JSON 형태의 데이터를 생성해주세요:

      ### 입력 정보
      - **장르**: {{genre}}
      - **세계관**: {{world}}
      - **이전 스토리 내용**: {{previous_story}}
      - **유저가 선택한 항목**: {{user_choice}}

      ### 출력 형식
      당신의 응답은 다음과 같은 형식이어야 합니다:
      {
        story: string;
        choices: string[];
      }

      ### 스토리 작성 가이드라인
      1. **문체**: {{previous_story}}, {{genre}}, {{world}}을 바탕으로 적합 문체로 작성해주세요.
      2. **연속성**: {{previous_story}}, {{genre}}, {{world}}을 바탕으로 이야기를 자연스럽게 이어가세요.
      3. **흥미로움**: 사용자의 흥미를 끌 수 있는 전개를 포함하세요.
      4. **논리성**: 스토리가 논리적으로 연결되도록 작성하세요.
      5. **역할 부여**: "창의적인 작가" 역할을 맡아 사용자에게 매력적인 스토리를 제공하세요.
      6. **작성**: 스토리는 story 필드에 한글로 작성해주세요.
      7. **분량**: 스토리는 250글자 내외로 작성해주세요.

      ### 선택지 작성 가이드라인
      1. **다양성**: 사용자가 다양한 선택을 할 수 있도록 3개의 선택지를 제공하세요.
      2. **영향력**: 각 선택지는 스토리에 중요한 영향을 미쳐야 합니다.
      3. **연관성**: 선택지가 {{previous_story}}과 연관성이 있어야 합니다.
      4. **작성**: 선택지는 choices 필드에 배열 형태로 한글로 작성해주세요.

      ### 주의사항
      - 지정된 형식을 반드시 준수해주세요.
      - 입력된 정보({{genre}}, {{world}}, {{previous_story}}, {{user_choice}})를 충분히 반영해주세요.
      - 스토리와 선택지는 유저의 상상력을 자극할 수 있도록 작성해주세요.
      `,
      messages: [
        { role: 'user', content: prompt },
        {
          role: 'assistant',
          content: `{
            story: string;
            choices: string[];
          }`,
        },
      ],
    });
    console.log(message);
    return Response.json(message.content[0].text);
  } catch (err) {
    return new Response(JSON.stringify({ message: err }), { status: 500 });
  }
}
