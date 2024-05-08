import { ScenarioType } from '@/models';
import { useFormContext } from 'react-hook-form';

interface ThemeProps {
  onNext?: () => void;
}
export default function Theme({ onNext }: ThemeProps) {
  const { register } = useFormContext<ScenarioType>();

  return (
    <div className="flex flex-col gap-10">
      <h1>테마 설정</h1>
      <h3>장르를 선택해주세요.</h3>
      <select {...register('genre')}>
        <option value="추리">추리</option>
        <option value="공포">공포</option>
        <option value="모험">모험</option>
        <option value="SF">SF</option>
      </select>
      <h3>세계관을 선택해주세요.</h3>
      <select {...register('background')}>
        <option value="중세">중세</option>
        <option value="판타지">판타지</option>
        <option value="현대">현대</option>
        <option value="사이버펑크">사이버펑크</option>
      </select>
      <button onClick={onNext}>next</button>
    </div>
  );
}
