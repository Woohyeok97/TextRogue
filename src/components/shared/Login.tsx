'use client';
import { signIn } from 'next-auth/react';
import { Text } from './ui/Text';
import { Button } from './ui/Button';

export default function Login() {
  const handleClick = () => {
    signIn('google', { callbackUrl: '/' });
  };

  return (
    <div className="flex-grow flex flex-col justify-between w-full h-full items-center">
      <Text>login with Social Media</Text>
      <Button onClick={handleClick}>Google</Button>
    </div>
  );
}
