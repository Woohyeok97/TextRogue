import LoginButton from '@/components/shared/LoginButton';
import { Text } from '@/components/shared/Text';

export default function LoginPage() {
  return (
    <main>
      <div className="flex flex-col items-center overflow-hidden bg-white rounded-lg dark:bg-gray-800 lg:max-w-4xl">
        <div className="w-full px-6 py-8">
          <Text align="center" size="xl">
            Welcome back!
          </Text>
          <LoginButton />
        </div>
      </div>
    </main>
  );
}
