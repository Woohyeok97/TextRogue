interface TextProps {
  children: React.ReactNode;
  align?: keyof typeof alignOptions;
  color?: keyof typeof colorOptions;
  size?: keyof typeof sizeOptions;
}
export function Text({ children, align = 'left', color = 'gray', size = 'base' }: TextProps) {
  return <span className={`${alignOptions[align]} ${colorOptions[color]} ${sizeOptions[size]}`}>{children}</span>;
}

const alignOptions = {
  left: 'text-left',
  center: 'text-center',
};

const colorOptions = {
  blue: 'text-blue-800',
  white: 'text-white',
  gray: 'text-gray',
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
