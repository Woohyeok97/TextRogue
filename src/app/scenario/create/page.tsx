import { Metadata } from 'next';
import { Suspense } from 'react';
// components
import CreateScenario from '@/components/create/CreateScenario';
import { Skeleton } from '@/components/shared/ui/Skeleton';

export const metadata: Metadata = {
  title: '',
  description: '',
};

export default function CreatePage() {
  return (
    <main>
      <Suspense fallback={<Skeleton />}>
        <CreateScenario />
      </Suspense>
    </main>
  );
}
