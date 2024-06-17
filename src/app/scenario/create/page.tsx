import { Metadata } from 'next';
import { Suspense } from 'react';
// components
import CreateScenario from '@/components/scenario/CreateScenario';
import { Skeleton } from '@/components/shared/ui/Skeleton';
import PageLayout from '@/components/shared/ui/PageLayout';

export const metadata: Metadata = {
  title: '',
  description: '',
};

export default function CreatePage() {
  return (
    <PageLayout width="lg">
      <Suspense fallback={<Skeleton />}>
        <CreateScenario />
      </Suspense>
    </PageLayout>
  );
}
