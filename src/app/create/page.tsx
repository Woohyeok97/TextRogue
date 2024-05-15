import { Metadata } from 'next';
// components
import CreateScenario from '@/components/create/CreateScenario';

export const metadata: Metadata = {
  title: '',
  description: '',
};

export default function CreatePage() {
  return (
    <main>
      <CreateScenario />
    </main>
  );
}
