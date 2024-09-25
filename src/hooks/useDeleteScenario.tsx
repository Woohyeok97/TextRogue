import { deleteScenario } from '@/remotes/mongodb/server/scenario';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export default function useDeleteScenario() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (scenarioId: string) => {
      await deleteScenario(scenarioId);
    },
    onSuccess: () => {
      router.push('/');
    },
    onError: err => {
      alert(err);
    },
  });
}
