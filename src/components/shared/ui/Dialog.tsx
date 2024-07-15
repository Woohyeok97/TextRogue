import { Button } from './Button';
import { Text } from './Text';

interface DialogProps {
  children: React.ReactNode;
  onClose: () => void;
}
export default function Dialog({ children, onClose }: DialogProps) {
  return (
    <div className="flex flex-col items-center gap-8 mx-8 p-6 bg-gray-600 rounded-lg">
      <Text>{children}</Text>
      <div>
        <Button onClick={onClose}>확인</Button>
      </div>
    </div>
  );
}
