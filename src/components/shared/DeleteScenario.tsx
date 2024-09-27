'use client';
import { useMutation } from '@tanstack/react-query';
import { deleteScenario } from '@/remotes/mongodb/server/scenario';
import { useRouter } from 'next/navigation';
import Dialog from './ui/Dialog';
import { Text } from './ui/Text';
import { Button } from './ui/Button';
// hooks
import useOverlay from '@/hooks/useOverlay';

interface DeleteScenarioProps {
  children: React.ReactNode;
  scenarioId: string;
}
export default function DeleteScenario({ children, scenarioId }: DeleteScenarioProps) {
  const { open, close } = useOverlay();
  const router = useRouter();

  // 시나리오 삭제 핸들러
  const { mutate } = useMutation({
    mutationFn: async () => {
      // await deleteScenario(scenarioId);
      await deleteScenario('123');
    },
    onSuccess: () => {
      router.push('/');
    },
    onError: error => {
      alert(error);
    },
  });

  return (
    <div
      onClick={() =>
        open(
          <Dialog>
            <div className="flex flex-col gap-5">
              <Text>시나리오를 삭제하시겠습니까?</Text>
              <div className="flex justify-end gap-2">
                <div className="border rounded border-gray-500">
                  <Button color="gray" onClick={close}>
                    취소
                  </Button>
                </div>
                <Button onClick={mutate}>삭제</Button>
              </div>
            </div>
          </Dialog>,
        )
      }
    >
      {children}
    </div>
  );
}
