import { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ ...props }, ref) {
  return (
    <input
      ref={ref}
      type="text"
      className="mt-2 border px-5 py-3 rounded-lg text-gray-700  focus:border-blue-400 dark:bg-gray-900 dark:text-gray-300 border-gray-200 dark:border-gray-600 dark:focus:border-blue-300"
      {...props}
    />
  );
});
