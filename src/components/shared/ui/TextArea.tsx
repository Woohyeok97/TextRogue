import { forwardRef } from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}
export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea({ label, ...props }, ref) {
  return (
    <div className="flex flex-col">
      {label && (
        <label htmlFor={label} className="text-gray-500 mb-4">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={label}
        spellCheck={false}
        className="min-h-[250px] px-5 py-3 rounded-lg text-gray-700 focus:border-blue-400 dark:bg-gray-900 dark:text-gray-300"
        {...props}
      />
    </div>
  );
});
