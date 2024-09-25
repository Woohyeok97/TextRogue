interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: () => void;
  color?: keyof typeof colorOptions;
  size?: keyof typeof sizeOptions;
  width?: keyof typeof widthOptions;
}
export function Button({
  children,
  onClick,
  color = 'blue',
  size = 'base',
  width = 'auto',
  ...props
}: ButtonProps) {
  return (
    <button
      // className={`px-6 py-2 rounded-lg ${colorOptions[color]} ${sizeOptions[size]} ${widthOptions[width]}`}
      className={`rounded ${colorOptions[color]} ${sizeOptions[size]} ${widthOptions[width]}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

const colorOptions = {
  blue: 'bg-blue-800 duration-300 hover:bg-blue-700',
  white: 'bg-white hover:bg-white-hover text-black',
  gray: 'bg-gray-600 duration-300 text-gray-100 hover:bg-gray-500',
  orangered: 'bg-orange-700',
};

const sizeOptions = {
  xs: 'text-xs',
  sm: 'text-sm px-3 py-1',
  base: 'text-base px-5 py-2',
  md: 'text-md',
  lg: 'text-lg',
  xl: 'text-xl',
};

const widthOptions = {
  auto: 'w-auto',
  full: 'w-full',
};
