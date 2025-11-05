import { Link, type LinkProps } from 'react-router';

export function Strong({ className = '', ...props }: React.ComponentPropsWithoutRef<'strong'>) {
  return <strong {...props} className={`${className} font-medium`} />;
}

const textStyles = 'text-base/6 text-gray-500 sm:text-sm/6 dark:text-zinc-400';

export function Text({ className = '', ...props }: React.ComponentPropsWithoutRef<'p'>) {
  return <p {...props} data-slot="text" className={`${className} ${textStyles}`} />;
}

const textLinkStyles = 'text-blue-600 dark:text-indigo-500';

export function TextLink({ className = '', ...props }: React.ComponentPropsWithoutRef<'a'>) {
  // eslint-disable-next-line jsx-a11y/anchor-has-content
  return <a {...props} className={`${className} ${textLinkStyles}`} />;
}

export function TextAppLink({ className = '', ...props }: LinkProps) {
  return <Link {...props} className={`${className} ${textLinkStyles}`} />;
}
