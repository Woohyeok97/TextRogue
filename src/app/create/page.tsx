import { Metadata } from 'next';
// components
import CreateScenario from '@/components/create/CreateScenario';

export const metadata: Metadata = {
  title: '',
  description: '',
};

export default function Create() {
  return (
    <main>
      <CreateScenario />
    </main>
  );
}
