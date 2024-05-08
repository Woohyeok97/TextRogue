import { createPrologue } from '@/remotes/claude';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';

interface PrologueProps {
  onNext?: () => void;
}
export default function Prologue({ onNext }: PrologueProps) {
  const { getValues, register, setValue } = useFormContext();
  const queryClient = useQueryClient();

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

  console.log(prologue);

  return (
    <div className="flex flex-col gap-10">
      <h1>프롤로그</h1>
      <button onClick={() => console.log(status)}>cl</button>
      {!prologue ? (
        <div>생성중...</div>
      ) : (
        <textarea readOnly className="text-black" value={prologue} {...register('prologue')} />
      )}
      <button onClick={onNext}>next</button>
    </div>
  );
}
