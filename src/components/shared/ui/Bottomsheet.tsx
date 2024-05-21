interface BottomSheetProps {
  children: React.ReactNode;
}
export default function BottomSheet({ children }: BottomSheetProps) {
  return (
    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-white rounded-lg p-8 max-h-[500px] min-w-[320px] dark:bg-gray-800 h-full">
      <div className="flex flex-col h-full items-center justify-between">{children}</div>
    </div>
  );
}
