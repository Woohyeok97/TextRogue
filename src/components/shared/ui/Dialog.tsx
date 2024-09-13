import Image from 'next/image';

interface DialogProps {
  children: React.ReactNode;
  onClose?: () => void;
}
export default function Dialog({ children, onClose }: DialogProps) {
  return (
    <div
      className="flex flex-col items-center mx-8 px-6 pb-6 min-w-[300px] min-h-[200px] bg-gray-600 rounded-lg"
      onClick={onClose}
    >
      <div className="py-4">
        <Image src="/images/로고_화이트.png" alt="Logo" width={150} height={150} />
      </div>
      {children}
    </div>
  );
}

// import { Button } from './Button';
// import { Text } from './Text';

// interface DialogProps {
//   children: React.ReactNode;
//   onClose: () => void;
// }
// export default function Dialog({ children, onClose }: DialogProps) {
//   return (
//     <div className="flex flex-col items-center gap-8 mx-8 p-6 bg-gray-600 rounded-lg">
//       <Text>{children}</Text>
//       <div>
//         <Button onClick={onClose}>확인</Button>
//       </div>
//     </div>
//   );
// }
