import { forwardRef } from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea({ ...props }, ref) {
  return (
    <textarea
      ref={ref}
      className="min-h-[250px] px-5 py-3 rounded-lg text-gray-700 focus:border-blue-400 dark:bg-gray-900 dark:text-gray-300"
      spellCheck={false}
      {...props}
    />
  );
});
