import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useFormContext } from 'react-hook-form';
// type
import { ScenarioType } from '@/models';
// remotes
import { createPrologue } from '@/remotes/claude/claude';

interface PrologueProps {
  onNext: () => void;
}
export default function Prologue({ onNext }: PrologueProps) {
  const queryClient = useQueryClient();
  const { getValues, register, setValue, trigger } = useFormContext<ScenarioType>();

  const { data: prologue } = useQuery<string>({ queryKey: ['prologue'] });

  const { mutate } = useMutation({
    mutationFn: async () => {
      return await createPrologue(getValues('genre'), getValues('background'));
    },
    onSuccess: data => {
      queryClient.setQueryData<string>(['prologue'], data);
      setValue('prologue', data);
    },
  });

  useEffect(() => {
    if (getValues('genre') && getValues('background') && !prologue) {
      mutate();
    }
  }, [getValues, mutate, prologue]);

  const handleClick = async () => {
    const isValid = await trigger(['prologue']);
    if (isValid) {
      onNext();
    }
  };

  console.log(prologue);

  return (
    <div className="flex flex-col gap-10">
      <h1>프롤로그</h1>
      {!prologue ? (
        <div>생성중...</div>
      ) : (
        <textarea readOnly className="text-black" value={prologue} {...register('prologue')} />
      )}
      <button onClick={handleClick}>next</button>
    </div>
  );
}
