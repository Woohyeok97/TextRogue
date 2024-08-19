export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/scenario/create', '/story', '/dashboard'],
};
