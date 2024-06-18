interface PageLayoutProps {
  children: React.ReactNode;
  width?: keyof typeof widthOptions;
}
export default function PageLayout({ children, width = 'base' }: PageLayoutProps) {
  return <main className={`${widthOptions[width]} px-5 w-full max-h-full`}>{children}</main>;
}

const widthOptions = {
  base: 'max-w-2xl',
  md: 'max-w-3xl',
  lg: 'max-w-4xl',
  xl: 'max-w-5xl',
  full: 'max-w-full',
};
