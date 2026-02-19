import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';

import { cn } from '@/lib/utils';
import { Separator } from '@/ui/separator';

const buttonGroupVariants = cva(
  [
    // Layout and sizing
    'flex w-fit items-stretch',
    // Focus and z-index
    '[&>*]:focus-visible:z-10',
    '[&>*]:focus-visible:relative',
    // Select trigger sizing
    '[&>[data-slot=select-trigger]:not([class*="w-"])]:w-fit',
    // Input flex
    '[&>input]:flex-1',
    // Select trigger rounding for last child
    'has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-md',
    // Gap for nested button groups
    'has-[>[data-slot=button-group]]:gap-2',
  ].join(' '),
  {
    variants: {
      orientation: {
        horizontal: [
          '[&>*:not(:first-child)]:rounded-l-none',
          '[&>*:not(:first-child)]:border-l-0',
          '[&>*:not(:last-child)]:rounded-r-none',
        ].join(' '),
        vertical: [
          'flex-col',
          '[&>*:not(:first-child)]:rounded-t-none',
          '[&>*:not(:first-child)]:border-t-0',
          '[&>*:not(:last-child)]:rounded-b-none',
        ].join(' '),
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
    },
  },
);

function ButtonGroup({
  className,
  orientation,
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof buttonGroupVariants>) {
  return (
    <div
      role="group"
      data-slot="button-group"
      data-orientation={orientation}
      className={cn(buttonGroupVariants({ orientation }), className)}
      {...props}
    />
  );
}

function ButtonGroupText({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<'div'> & {
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot.Root : 'div';

  return (
    <Comp
      className={cn(
        [
          // Background and border
          'bg-muted rounded-md border',
          // Layout
          'flex items-center gap-2 px-4',
          // Typography
          'text-sm font-medium',
          // Shadow
          'shadow-xs',
          // SVG icon handling
          '[&_svg]:pointer-events-none',
          "[&_svg:not([class*='size-'])]:size-4",
        ].join(' '),
        className,
      )}
      {...props}
    />
  );
}

function ButtonGroupSeparator({
  className,
  orientation = 'vertical',
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="button-group-separator"
      orientation={orientation}
      className={cn(
        'bg-input relative m-0! self-stretch data-[orientation=vertical]:h-auto',
        className,
      )}
      {...props}
    />
  );
}

export { ButtonGroup, ButtonGroupSeparator, ButtonGroupText, buttonGroupVariants };
