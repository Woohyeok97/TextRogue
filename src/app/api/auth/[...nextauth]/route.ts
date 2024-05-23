import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvide from 'next-auth/providers/google';

// NextAuth 옵션 정의 (NextAuth를 통해 next.js의 클라이언트 & 서버 측 모두 인증 및 세션 처리가 가능함)

export const authOptions: NextAuthOptions = {
  // 구글, 네이버 같은 인증 공급자
  providers: [
    GoogleProvide({
      clientId: `${process.env.GOOGLE_CLIENT_ID}`,
      clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
    }),
  ],
  // 로그인 라우팅 경로 설정 (기본은 /auth/signin)
  pages: {
    signIn: '/login',
  },
  // 세션 관리 방식
  session: {
    strategy: 'jwt', // jwt를 사용함(쿠키에 저장됨)
    maxAge: 60 * 60 * 24, // 세션 만료시간
    updateAge: 60 * 60 * 2,
  },
  // jwt 및 세션관리 중 호출되는 콜백
  callbacks: {
    // 로그인 등으로 jwt가 생성되거나 업데이트 될때 호출되고 토큰을 반환함 (반환하는 값은 암호화되어 쿠키에 저장)
    jwt: async ({ token, user }) => {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
    // jwt 콜백이 반환하는 토큰을 받아, 세션이 확인될 때마다 호출됨
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
      },
    }),
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
