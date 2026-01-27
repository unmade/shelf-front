'use client';

import { createContext, useContext } from 'react';

import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { toggleVariants } from '@/ui/toggle';

const ToggleGroupContext = createContext<
  VariantProps<typeof toggleVariants> & {
    spacing?: number;
  }
>({
  size: 'default',
  variant: 'default',
  spacing: 0,
});

function ToggleGroup({
  className,
  variant,
  size,
  spacing = 0,
  children,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Root> &
  VariantProps<typeof toggleVariants> & {
    spacing?: number;
  }) {
  return (
    <ToggleGroupPrimitive.Root
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      data-spacing={spacing}
      style={{ '--gap': spacing } as React.CSSProperties}
      className={cn(
        // Group and layout
        'group/toggle-group flex items-center',
        // Sizing
        'w-fit',
        // Gap and spacing
        'gap-[--spacing(var(--gap))]',
        // Rounding
        'rounded-md',
        // Outline shadow for outline variant with default spacing
        'data-[spacing=default]:data-[variant=outline]:shadow-xs',
        className,
      )}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size, spacing }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  );
}

function ToggleGroupItem({
  className,
  children,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item> & VariantProps<typeof toggleVariants>) {
  const context = useContext(ToggleGroupContext);

  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      data-variant={context.variant ?? variant}
      data-size={context.size ?? size}
      data-spacing={context.spacing}
      className={cn(
        toggleVariants({
          variant: context.variant ?? variant,
          size: context.size ?? size,
        }),
        // Sizing and layout
        'w-auto min-w-0 shrink-0 px-3',
        // Focus z-index
        'focus:z-10 focus-visible:z-10',
        // Spacing=0 variants
        'data-[spacing=0]:rounded-none',
        'data-[spacing=0]:shadow-none',
        'data-[spacing=0]:first:rounded-l-md',
        'data-[spacing=0]:last:rounded-r-md',
        // Outline border for outline variant with spacing=0
        'data-[spacing=0]:data-[variant=outline]:border-l-0',
        'data-[spacing=0]:data-[variant=outline]:first:border-l',
        className,
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
}

export { ToggleGroup, ToggleGroupItem };
