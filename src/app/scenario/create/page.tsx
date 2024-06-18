import { Metadata } from 'next';
import { Suspense } from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
// components
import CreateScenario from '@/components/scenario/CreateScenario';
import { Skeleton } from '@/components/shared/ui/Skeleton';
import PageLayout from '@/components/shared/ui/PageLayout';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: '',
  description: '',
};

export default async function CreatePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user.id) {
    redirect('/');
  }

  return (
    <PageLayout>
      <Suspense fallback={<Skeleton />}>
        <CreateScenario userId={session.user.id} />
      </Suspense>
    </PageLayout>
  );
}
