interface ThemeProps {
  onNext?: () => void;
}
export default function Theme({ onNext }: ThemeProps) {
  return (
    <div className="flex flex-col gap-10">
      테마
      <button onClick={onNext}>next</button>
    </div>
  );
}
