import * as TabsPrimitive from '@radix-ui/react-tabs';

import { cn } from '@/lib/utils';

function Tabs({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn('flex flex-col gap-2', className)}
      {...props}
    />
  );
}

function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        // Background and text color
        'bg-tabs text-muted-foreground',
        // Layout and sizing
        'inline-flex h-10 w-fit items-center justify-center sm:h-9',
        // Rounding and padding
        'gap-1 rounded-lg p-[3px]',
        className,
      )}
      {...props}
    />
  );
}

function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        // Hover
        'hover:bg-tabs/75 hover:text-foreground',
        'dark:hover:bg-input/15',
        // Active state
        'data-[state=active]:bg-background',
        'data-[state=active]:shadow-sm',
        'data-[state=active]:text-foreground',
        'dark:data-[state=active]:bg-input/30',
        'dark:data-[state=active]:text-foreground',
        // Layout and sizing
        'inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5',
        // Border, rounding, and padding
        'rounded-md border border-transparent px-2 py-1',
        // Typography
        'text-base/6 sm:text-sm/6',
        'font-medium whitespace-nowrap',
        // Transition
        'transition-[color,box-shadow]',
        // Focus styles
        'focus-visible:border-ring',
        'focus-visible:ring-ring/50',
        'focus-visible:ring-[3px]',
        'focus-visible:outline-1',
        'focus-visible:outline-ring',
        // Disabled state
        'disabled:pointer-events-none disabled:opacity-50',
        // Icon styles
        '[&_svg]:pointer-events-none',
        '[&_svg]:shrink-0',
        "[&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  );
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn('flex-1 outline-none', className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
