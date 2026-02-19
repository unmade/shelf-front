import type * as React from 'react';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const toggleVariants = cva(
  [
    // Layout and flex
    'inline-flex items-center justify-center gap-2',
    // Rounding
    'rounded-md',
    // Typography
    'text-base/6 sm:text-sm/6 font-medium whitespace-nowrap',
    // Hover states
    'hover:bg-muted hover:text-muted-foreground',
    // Disabled state
    'disabled:pointer-events-none disabled:opacity-50',
    // Active/on state
    'data-[state=on]:bg-accent data-[state=on]:text-accent-foreground',
    // SVG styles
    '[&_svg]:pointer-events-none',
    "[&_svg:not([class*='size-'])]:size-4",
    '[&_svg]:shrink-0',
    // Focus and ring
    'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
    // Outline
    'outline-none',
    // Transition
    'transition-colors',
    // Invalid/Destructive states
    'aria-invalid:ring-destructive/20',
    'dark:aria-invalid:ring-destructive/40',
    'aria-invalid:border-destructive',
  ].join(' '),
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        outline:
          'border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        default: 'h-9 px-2 min-w-9',
        sm: 'h-8 px-1.5 min-w-8',
        lg: 'h-10 px-2.5 min-w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export type ToggleVariants = VariantProps<typeof toggleVariants>;

function Toggle({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> & ToggleVariants) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Toggle, toggleVariants };
