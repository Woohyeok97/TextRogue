import { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useFormContext } from 'react-hook-form';
// type
import { ScenarioType } from '@/models';
// remotes
import { generatePrologue } from '@/remotes/claude/claude';
import { Input } from '../shared/Input';
import { TextArea } from '../shared/TextArea';

interface PrologueProps {
  onNext: () => void;
}
export default function Prologue({ onNext }: PrologueProps) {
  const { getValues, register, setValue, trigger } = useFormContext<ScenarioType>();

  const { mutate } = useMutation({
    mutationFn: async () => {
      const prologue = await generatePrologue({ genre: getValues('genre'), world: getValues('world') });
      return prologue;
    },
    onSuccess: prologue => {
      setValue('prologue', prologue);
    },
    onError: err => {
      console.log(err);
    },
  });

  useEffect(() => {
    if (getValues('genre') && getValues('world') && !getValues('prologue.text')) {
      mutate();
    }
  }, [getValues, mutate]);

  const handleClick = async () => {
    const isValid = await trigger(['prologue.text']);
    if (isValid) {
      onNext();
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <h1>프롤로그</h1>
      {!getValues('prologue.text') ? (
        <div>생성중...</div>
      ) : (
        <>
          <TextArea readOnly {...register('prologue.text')} />
          <div className="flex flex-col gap-3">
            {getValues('prologue').choices.map((item, i) => (
              <Input key={item} disabled {...register(`prologue.choices.${i}`)} />
            ))}
          </div>
        </>
      )}
      <button onClick={handleClick}>next</button>
    </div>
  );
}
