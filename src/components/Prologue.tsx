interface PrologueProps {
  onNext?: () => void;
}
export default function Prologue({ onNext }: PrologueProps) {
  return (
    <div className="flex flex-col gap-10">
      프롤로그
      <button onClick={onNext}>next</button>
    </div>
  );
}
