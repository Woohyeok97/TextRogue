// components
import PageLayout from '@/components/shared/ui/PageLayout';
import LoginButton from '@/components/shared/LoginButton';
import { Text } from '@/components/shared/ui/Text';

export default function LoginPage() {
  return (
    <PageLayout>
      <div className="w-full px-6 py-8">
        <Text align="center" size="xl">
          Welcome back!
        </Text>
        <LoginButton />
      </div>
    </PageLayout>
  );
}
