import { Button } from './ui/Button';
import { Text } from './ui/Text';

interface MessageAlertProps {
  children: React.ReactNode;
  onClick?: () => void;
}
export default function MessageAlert({ children, onClick }: MessageAlertProps) {
  return (
    <div className="flex-grow flex flex-col justify-between w-full h-full items-center">
      <Text>{children}</Text>
      {onClick && <Button onClick={onClick}>확인</Button>}
    </div>
  );
}
