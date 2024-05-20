interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  color?: keyof typeof colorOptions;
  size?: keyof typeof sizeOptions;
}
export function Button({ children, onClick, color = 'blue', size = 'base' }: ButtonProps) {
  return (
    <button className={`px-6 py-2 rounded-lg ${colorOptions[color]} ${sizeOptions[size]}`} onClick={onClick}>
      {children}
    </button>
  );
}

const colorOptions = {
  blue: 'bg-blue-800',
  white: 'bg-white hover:bg-white-hover text-black',
  gray: 'bg-gray hover:bg-gray-hover',
  orangered: 'bg-orange-700',
};

const sizeOptions = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  md: 'text-md',
  lg: 'text-lg',
  xl: 'text-xl',
};
