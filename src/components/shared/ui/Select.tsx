import { forwardRef } from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select({ label, ...props }, ref) {
  return (
    <div className="flex flex-col">
      {label && (
        <label htmlFor={label} className="text-gray-500 mb-2">
          {label}
        </label>
      )}
      <select
        ref={ref}
        id={label}
        className="px-5 py-3 rounded-lg text-gray-700 focus:border-blue-400 dark:bg-gray-900 dark:text-gray-300"
        {...props}
      />
    </div>
  );
});

export default Select;
