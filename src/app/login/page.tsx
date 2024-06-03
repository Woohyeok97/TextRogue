import LoginButton from '@/components/shared/LoginButton';
import { Text } from '@/components/shared/ui/Text';

export default function LoginPage() {
  return (
    <main className="flex flex-col items-center overflow-hidden bg-white rounded-lg dark:bg-gray-800">
      <div className="w-full px-6 py-8">
        <Text align="center" size="xl">
          Welcome back!
        </Text>
        <LoginButton />
      </div>
    </main>
  );
}
