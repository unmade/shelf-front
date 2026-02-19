import { Link, type LinkProps } from 'react-router';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

export function Strong({ className, ...props }: React.ComponentPropsWithoutRef<'strong'>) {
  return <strong {...props} className={cn('font-medium', className)} />;
}

const textVariants = cva('text-muted-foreground', {
  variants: {
    size: {
      xs: 'text-xs/5',
      sm: 'text-sm/6 sm:text-xs/5',
      base: 'text-base/6 sm:text-sm/6',
      lg: 'text-lg/7 sm:text-base/6',
    },
  },
  defaultVariants: {
    size: 'base',
  },
});

interface TextProps
  extends React.ComponentPropsWithoutRef<'p'>,
    VariantProps<typeof textVariants> {}

export function Text({ className, size, ...props }: TextProps) {
  return <p {...props} data-slot="text" className={cn(textVariants({ size }), className)} />;
}

const textLinkStyles = 'text-blue-600 dark:text-indigo-500';

export function TextLink({ className, ...props }: React.ComponentPropsWithoutRef<'a'>) {
  // eslint-disable-next-line jsx-a11y/anchor-has-content
  return <a {...props} className={cn(textLinkStyles, className)} />;
}

export function TextAppLink({ className, ...props }: LinkProps) {
  return <Link {...props} className={cn(textLinkStyles, className)} />;
}
