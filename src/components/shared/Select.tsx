import { forwardRef } from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select({ ...props }, ref) {
  return <select ref={ref} className="px-5 py-3 rounded-lg" {...props} />;
});
