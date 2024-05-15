import { forwardRef } from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea({ ...props }, ref) {
  return <textarea ref={ref} className="min-h-[250px]" spellCheck={false} {...props} />;
});
