import type * as React from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';

import { cn } from '@/lib/utils';

function Switch({ className, ...props }: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        // Peer and state backgrounds
        'peer',
        'data-[state=checked]:bg-input',
        'data-[state=unchecked]:bg-input/50',
        // Focus ring and border
        'ring-ring/50 ring-1 ring-inset data-[state=checked]:ring-transparent',
        // Layout and sizing
        'h-6 w-10 sm:h-5 sm:w-8',
        'inline-flex shrink-0 items-center p-[3px]',
        // Shape and border
        'rounded-full',
        // Shadow and transition
        'shadow-xs transition ease-in-out',
        // Outline
        'outline-none',
        // Disabled state
        'disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          // Background color and dark mode
          'bg-primary',
          // Pointer and block
          'pointer-events-none inline-block',
          // Sizing and shape
          'size-4.5 rounded-full sm:size-3.5',
          // Ring and transition
          'transition-transform',
          // Translate for checked/unchecked
          'data-[state=checked]:translate-x-4 sm:data-[state=checked]:translate-x-3',
          'data-[state=unchecked]:translate-x-0',
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
