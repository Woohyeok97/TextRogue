interface TextProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  align?: keyof typeof alignOptions;
  color?: keyof typeof colorOptions;
  size?: keyof typeof sizeOptions;
  weigth?: keyof typeof weigthOptions;
}
export function Text({
  children,
  align = 'left',
  color = 'white',
  size = 'base',
  weigth = 'normal',
  ...props
}: TextProps) {
  return (
    <span
      className={`${alignOptions[align]} ${colorOptions[color]} ${sizeOptions[size]} ${weigthOptions[weigth]} block`}
      {...props}
    >
      {children}
    </span>
  );
}

const alignOptions = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
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
  max: 'text-2xl',
};

const weigthOptions = {
  light: 'font-light',
  normal: 'font-normal',
  bold: 'font-bold',
  black: 'font-black',
};
