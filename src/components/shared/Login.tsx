'use client';
import { signIn } from 'next-auth/react';
import { Text } from './ui/Text';

export default function Login() {
  const handleClick = () => {
    signIn('google', { callbackUrl: '/' });
  };

  return (
    <div className="flex flex-col w-full h-full items-center">
      <Text>Welcome back!</Text>
    </div>
  );
}
