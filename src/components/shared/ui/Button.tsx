interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: () => void;
  color?: keyof typeof colorOptions;
  size?: keyof typeof sizeOptions;
  width?: keyof typeof widthOptions;
}
export function Button({ children, onClick, color = 'blue', size = 'base', width = 'auto', ...props }: ButtonProps) {
  return (
    <button
      className={`px-6 py-2 rounded-lg ${colorOptions[color]} ${sizeOptions[size]} ${widthOptions[width]}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

const colorOptions = {
  blue: 'bg-blue-800 duration-200 hover:bg-blue-700',
  white: 'bg-white hover:bg-white-hover text-black',
  gray: 'bg-gray-500 duration-200 text-gray-300 hover:bg-gray-400',
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

const widthOptions = {
  auto: 'w-auto',
  full: 'w-full',
};
