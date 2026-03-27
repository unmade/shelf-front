import * as DialogPrimitive from '@radix-ui/react-dialog';
import { CloseIcon } from '@/icons';

import { cn } from '@/lib/utils';

function Dialog({ ...props }: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger({ ...props }: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({ ...props }: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose({ ...props }: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        // Positioning and layering
        'fixed inset-0 flex w-screen justify-center overflow-y-auto',
        // Overlay color
        'bg-gray-100/10 backdrop-blur-xs focus:outline-0 dark:bg-zinc-950/10',
        // Animation states
        'data-[state=open]:animate-in',
        'data-[state=closed]:animate-out',
        'data-[state=closed]:fade-out-0',
        'data-[state=open]:fade-in-0',
        className,
      )}
      {...props}
    />
  );
}

function DialogContent({
  className,
  children,
  showCloseButton = false,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean;
}) {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <div className="fixed inset-x-0 bottom-0 flex items-center justify-center sm:inset-0 sm:p-4">
        <DialogPrimitive.Content
          data-slot="dialog-content"
          className={cn(
            // Background color
            'bg-popover',
            // Padding and shadow
            'p-8 shadow-lg backdrop-blur-xl',
            // Border and rounding
            'ring-ring/50 rounded-t-3xl ring-1 sm:rounded-2xl',
            // Animation duration
            'duration-200',
            // Responsive max width
            'w-full sm:max-w-lg',
            // Animation states
            'data-[state=open]:animate-in',
            'data-[state=closed]:animate-out',
            'data-[state=closed]:fade-out-0',
            'data-[state=open]:fade-in-0',
            'data-[state=closed]:zoom-out-95',
            'data-[state=open]:zoom-in-95',
            className,
          )}
          {...props}
        >
          {children}
          {showCloseButton && (
            <DialogPrimitive.Close
              data-slot="dialog-close"
              className={cn(
                // Ring and focus
                'ring-offset-background',
                'focus:ring-ring focus:ring-2 focus:ring-offset-2 focus:outline-hidden',
                // State and color
                'data-[state=open]:bg-accent data-[state=open]:text-muted-foreground',
                // Positioning
                'absolute top-4 right-4',
                // Sizing and rounding
                'rounded-xs',
                // Opacity and transition
                'opacity-70 transition-opacity hover:opacity-100',
                // Disabled state
                'disabled:pointer-events-none',
                // SVG icon styles
                '[&_svg]:pointer-events-none',
                '[&_svg]:shrink-0',
                "[&_svg]:not([class*='size-']):size-4",
              )}
            >
              <CloseIcon />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          )}
        </DialogPrimitive.Content>
      </div>
    </DialogPortal>
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot="dialog-header" className={cn('flex flex-col gap-2', className)} {...props} />
  );
}

function DialogBody({ className = '', ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="dialog-body" className={'mt-6' + className} {...props} />;
}

function DialogFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        'mt-8 flex flex-col-reverse items-center justify-end gap-3 *:w-full sm:flex-row sm:*:w-auto',
        className,
      )}
      {...props}
    />
  );
}

function DialogTitle({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn('text-primary text-lg/6 font-semibold text-balance sm:text-base/6', className)}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn('text-muted-foreground text-base/6 text-pretty sm:text-sm/6', className)}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
