import type * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';

import { cn } from '@/lib/utils';

function Label({ className, ...props }: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        // Layout
        'flex items-center gap-2',
        // Typography
        'text-sm leading-none font-medium',
        // Accessibility
        'select-none',
        // Disabled state (group)
        'group-data-[disabled=true]:pointer-events-none',
        'group-data-[disabled=true]:opacity-50',
        // Disabled state (peer)
        'peer-disabled:cursor-not-allowed',
        'peer-disabled:opacity-50',
        className,
      )}
      {...props}
    />
  );
}

export { Label };
