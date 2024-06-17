import { useFormContext } from 'react-hook-form';
import { GENRE_LIST } from '@/constants/genres';
import { WORLD_LIST } from '@/constants/worlds';
// components
import Select from '../shared/ui/Select';
import { Button } from '../shared/ui/Button';
import { Text } from '../shared/ui/Text';
// types
import { ScenarioType } from '@/models';

interface ScenarioThemeProps {
  onNext: () => void;
}
export default function ScenarioTheme({ onNext }: ScenarioThemeProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<ScenarioType>();

  return (
    <div className="flex flex-col gap-10">
      <Text align="center" size="xl">
        시나리오 테마
      </Text>
      <Select {...register('genre', { required: true })} defaultValue="" label="장르">
        <option value="" disabled>
          장르를 선택해주세요
        </option>
        {GENRE_LIST.map(item => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </Select>
      {errors.genre && <Text color="orangered">{errors.genre.message}</Text>}
      <Select {...register('world', { required: true })} defaultValue="" label="세계관">
        <option value="" disabled>
          세계관을 선택해주세요.
        </option>
        {WORLD_LIST.map(item => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </Select>
      {errors.world && <Text color="orangered">{errors.world.message}</Text>}
      <Button onClick={onNext}>다음</Button>
    </div>
  );
}
