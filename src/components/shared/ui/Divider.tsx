interface DividerProps {
  weigth?: keyof typeof weigthOptions;
  color?: keyof typeof colorOptions;
}
export function Divider({ weigth = 'base', color = 'gray' }: DividerProps) {
  return <div className={`${weigthOptions[weigth]} ${colorOptions[color]}`} />;
}

const weigthOptions = {
  sm: 'border-t-1',
  base: 'border-t-2',
  lg: 'border-t-3',
};

const colorOptions = {
  gray: 'border-gray-600',
};
