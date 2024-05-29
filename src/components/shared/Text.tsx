interface TextProps {
  children: React.ReactNode;
  align?: keyof typeof alignOptions;
  color?: keyof typeof colorOptions;
  size?: keyof typeof sizeOptions;
  weigth?: keyof typeof weigthOptions;
}
export function Text({ children, align = 'left', color = 'white', size = 'base', weigth = 'normal' }: TextProps) {
  return (
    <span
      className={`${alignOptions[align]} ${colorOptions[color]} ${sizeOptions[size]} ${weigthOptions[weigth]} block`}
    >
      {children}
    </span>
  );
}

const alignOptions = {
  left: 'text-left',
  center: 'text-center',
};

const colorOptions = {
  blue: 'text-blue-800',
  white: 'text-white',
  gray: 'text-gray-500',
  orangered: 'text-orange-700',
};

const sizeOptions = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  md: 'text-md',
  lg: 'text-lg',
  xl: 'text-xl',
};

const weigthOptions = {
  light: 'font-light',
  normal: 'font-normal',
  bold: 'font-bold',
  black: 'font-black',
};
