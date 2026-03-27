import { ChevronDownIcon } from '@/icons';
import { Accordion as AccordionPrimitive } from 'radix-ui';

import { cn } from '@/lib/utils';

function Accordion({ ...props }: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn('border-b last:border-b-0', className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          // Focus and ring
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          // Layout and flex
          'flex flex-1 items-start justify-between gap-4',
          // Rounding and padding
          'rounded-md py-4',
          // Typography
          'text-left text-sm font-medium',
          // Transition and outline
          'transition-all outline-none',
          // Hover underline
          'hover:underline',
          // Disabled state
          'disabled:pointer-events-none disabled:opacity-50',
          // SVG rotation when open
          '[&[data-state=open]>svg]:rotate-180',
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon
          className={cn(
            // Text color and muted
            'text-muted-foreground',
            // Pointer events and sizing
            'pointer-events-none size-4 shrink-0',
            // Positioning
            'translate-y-0.5',
            // Transition
            'transition-transform duration-200',
          )}
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className={cn(
        // Animation states
        'data-[state=closed]:animate-accordion-up',
        'data-[state=open]:animate-accordion-down',
        // Overflow and sizing
        'overflow-hidden',
        // Typography
        'text-sm',
      )}
      {...props}
    >
      <div className={cn('pt-0 pb-4', className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
