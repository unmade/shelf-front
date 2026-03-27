import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { CheckIcon, MinusIcon } from '@/icons';

import { cn } from '@/lib/utils';

function Checkbox({ className, ...props }: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        'group',
        // Peer and border
        'peer border-input border',
        // Background
        'dark:bg-input/30',
        // Checked state
        'data-[state=checked]:bg-primary',
        'data-[state=checked]:text-primary-foreground',
        'dark:data-[state=checked]:bg-primary',
        'data-[state=checked]:border-primary',
        // Checked state
        'data-[state=indeterminate]:bg-primary',
        'data-[state=indeterminate]:text-primary-foreground',
        'dark:data-[state=indeterminate]:bg-primary',
        'data-[state=indeterminate]:border-primary',
        // Focus state
        'focus-visible:border-ring',
        'focus-visible:ring-ring/50',
        'focus-visible:ring-[3px]',
        // Invalid state
        'aria-invalid:ring-destructive/20',
        'dark:aria-invalid:ring-destructive/40',
        'aria-invalid:border-destructive',
        // Sizing and layout
        'size-4.5 sm:size-4',
        'shrink-0 rounded',
        // Shadow and transition
        'shadow-xs transition-shadow',
        // Outline
        'outline-none',
        // Disabled state
        'disabled:cursor-not-allowed',
        'disabled:opacity-50',
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none"
      >
        <CheckIcon className="hidden size-3.5 group-data-[state=checked]:block" />
        <MinusIcon className="hidden size-3.5 group-data-[state=indeterminate]:block" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
