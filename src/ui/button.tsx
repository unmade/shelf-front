import { clsx } from 'clsx';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  clsx(
    'inline-flex items-center justify-center gap-2',
    'whitespace-nowrap rounded-md text-sm font-medium',
    'transition ease-in-out',
    // icons
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0",
    // disabled
    'disabled:pointer-events-none disabled:opacity-50',
    // focus
    'outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
    // invalid
    'aria-invalid:ring-destructive/20 aria-invalid:border-destructive',
    'dark:aria-invalid:ring-destructive/40',
  ),
  {
    variants: {
      variant: {
        default: clsx(
          'text-white',
          'bg-linear-to-br',
          'from-blue-500 to-indigo-500',
          'hover:from-blue-400 hover:to-indigo-400',
          'dark:from-blue-600 dark:to-indigo-600',
          'dark:hover:from-blue-500 dark:hover:to-indigo-500',
        ),
        destructive: clsx(
          'bg-destructive dark:bg-destructive/60',
          'text-white',
          // hover
          'hover:bg-destructive/90',
          // focus
          'focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 ',
        ),
        outline: clsx(
          'border bg-background shadow-xs',
          'dark:bg-input/30 dark:border-input',
          // hover
          'hover:bg-accent hover:text-accent-foreground',
          'dark:hover:bg-input/50',
        ),
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  type = 'button',
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      type={type}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
