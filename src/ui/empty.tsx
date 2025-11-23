import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

function Empty({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="empty"
      className={cn(
        // Layout and flex
        'flex flex-1 flex-col items-center justify-center',
        // Sizing and spacing
        'min-w-0 gap-6 p-6 md:p-12',
        // Border and rounding
        'rounded-lg border-dashed',
        // Text alignment and balance
        'text-center text-balance',
        className,
      )}
      {...props}
    />
  );
}

function EmptyHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="empty-header"
      className={cn('flex max-w-sm flex-col items-center gap-2 text-center', className)}
      {...props}
    />
  );
}

const emptyMediaVariants = cva(
  [
    // Layout and flex
    'flex shrink-0 items-center justify-center',
    // Margin bottom
    'mb-2',
    // SVG pointer and shrink
    '[&_svg]:pointer-events-none',
    '[&_svg]:shrink-0',
  ].join(' '),
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        icon: [
          // Background and text color
          'bg-muted text-foreground',
          // Layout and sizing
          'flex size-10 shrink-0 items-center justify-center',
          // Rounding
          'rounded-lg',
          // SVG sizing
          "[&_svg:not([class*='size-'])]:size-6",
        ].join(' '),
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

function EmptyMedia({
  className,
  variant = 'default',
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof emptyMediaVariants>) {
  return (
    <div
      data-slot="empty-icon"
      data-variant={variant}
      className={cn(emptyMediaVariants({ variant, className }))}
      {...props}
    />
  );
}

function EmptyTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="empty-title"
      className={cn('text-xl font-medium tracking-tight sm:text-lg', className)}
      {...props}
    />
  );
}

function EmptyDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <div
      data-slot="empty-description"
      className={cn(
        // Text color and muted
        'text-muted-foreground',
        // Link hover color
        '[&>a:hover]:text-primary',
        // Text size and relaxed line height
        'text-base/relaxed sm:text-sm/relaxed',
        // Link underline and offset
        '[&>a]:underline',
        '[&>a]:underline-offset-4',
        className,
      )}
      {...props}
    />
  );
}

function EmptyContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="empty-content"
      className={cn(
        'flex w-full max-w-sm min-w-0 flex-col items-center gap-4 text-base/6 text-balance sm:text-sm/6',
        className,
      )}
      {...props}
    />
  );
}

export { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent, EmptyMedia };
