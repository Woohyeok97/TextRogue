import { useFormContext } from 'react-hook-form';
// type
import { ScenarioType } from '@/models';

interface ThemeProps {
  onNext: () => void;
}
export default function Theme({ onNext }: ThemeProps) {
  const {
    register,
    trigger,
    formState: { errors },
  } = useFormContext<ScenarioType>();

  const handleClick = async () => {
    const isValid = await trigger(['genre', 'world']);
    if (isValid) {
      onNext();
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <h1>테마 설정</h1>
      <h3>장르</h3>
      <select {...register('genre', { required: true })} defaultValue="">
        <option value="" disabled>
          장르를 선택해주세요
        </option>
        <option value="추리">추리</option>
        <option value="공포">공포</option>
        <option value="모험">모험</option>
        <option value="SF">SF</option>
      </select>
      {errors.genre && <p>{errors.genre.message}</p>}
      <h3>세계관</h3>
      <select {...register('world', { required: true })} defaultValue="">
        <option value="" disabled>
          세계관을 선택해주세요.
        </option>
        <option value="중세">중세</option>
        <option value="판타지">판타지</option>
        <option value="현대">현대</option>
        <option value="사이버펑크">사이버펑크</option>
      </select>
      {errors.world && <p>{errors.world.message}</p>}
      <button onClick={handleClick}>next</button>
    </div>
  );
}
