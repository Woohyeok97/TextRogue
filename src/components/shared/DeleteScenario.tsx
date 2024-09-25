'use client';
import Dialog from './ui/Dialog';
import { Text } from './ui/Text';
import { Button } from './ui/Button';
// hooks
import useOverlay from '@/hooks/useOverlay';
import useDeleteScenario from '@/hooks/useDeleteScenario';

interface DeleteScenarioProps {
  children: React.ReactNode;
  scenarioId: string;
}
export default function DeleteScenario({ children, scenarioId }: DeleteScenarioProps) {
  const { open } = useOverlay();
  const { mutate } = useDeleteScenario();

  return (
    <div
      onClick={() =>
        open(
          <Dialog>
            <div className="flex flex-col gap-5">
              <Text>시나리오를 삭제하시겠습니까?</Text>
              <div className="flex justify-end gap-2">
                <div className="border rounded border-gray-500">
                  <Button color="gray">취소</Button>
                </div>
                <Button onClick={() => mutate('123')}>삭제</Button>
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
