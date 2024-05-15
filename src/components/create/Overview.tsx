import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFormContext } from 'react-hook-form';
// type
import { ScenarioType } from '@/models';
// reomotes
import { createScenario } from '@/remotes/mongodb/client/scenario';

export default function Overview() {
  const {
    register,
    handleSubmit,
    getValues,
    trigger,
    formState: { errors },
  } = useFormContext<ScenarioType>();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  // 미리보기 핸들러
  const handlePreview = async () => {
    const result = await trigger(['title', 'description']);
    if (result) {
      setIsOpen(true);
    }
  };

  // 시나리오 생성 핸들러
  const handleClick = handleSubmit(async formData => {
    const response = await createScenario(formData);
    alert('시나리오가 생성되었습니다.');
    router.push('/');
  });

  return (
    <div className="flex flex-col gap-10">
      <h1>오버뷰</h1>
      {!isOpen ? (
        <div>
          <h3>타이틀</h3>
          <input type="text" {...register('title', { required: true })} />
          {errors.title && <p>{errors.title.message}</p>}
          <h3>시나리오 설명</h3>
          <textarea className="text-black" {...register('description', { required: true })} />
          {errors.description && <p>{errors.description.message}</p>}
          <button onClick={handlePreview}>미리보기</button>
        </div>
      ) : (
        <Preview formData={getValues()} onClick={handleClick} />
      )}
    </div>
  );
}

interface PreviewProps {
  formData: ScenarioType;
  onClick: () => void;
}
function Preview({ formData, onClick }: PreviewProps) {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <h3>{formData.title}</h3>
        <h3>{formData.genre}</h3>
        <h3>{formData.world}</h3>
        <div>
          <h3>{formData.prologue.text}</h3>
          {formData.prologue.choices.map(item => (
            <p key={item}>{item}</p>
          ))}
        </div>
        <h3>{formData.description}</h3>
      </div>
      <button onClick={onClick}>생성</button>
    </div>
  );
}
