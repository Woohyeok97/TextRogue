import { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, ...props },
  ref,
) {
  return (
    <div className="flex flex-col">
      {label && (
        <label htmlFor={label} className="text-gray-500 mb-2">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={label}
        type="text"
        className="border px-5 py-3 rounded-lg text-gray-700  focus:border-blue-400 dark:bg-gray-900 dark:text-gray-300 border-gray-200 dark:border-gray-600 dark:focus:border-blue-300"
        {...props}
      />
    </div>
  );
});
