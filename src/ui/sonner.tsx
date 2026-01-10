import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from 'lucide-react';
import { Toaster as Sonner, type ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-5 sm:size-4" />,
        info: <InfoIcon className="size-5 sm:size-4" />,
        warning: <TriangleAlertIcon className="size-5 sm:size-4" />,
        error: <OctagonXIcon className="text-destructive size-5 sm:size-4" />,
        loading: <Loader2Icon className="size-5 animate-spin sm:size-4" />,
      }}
      toastOptions={{
        className: 'backdrop-blur-xl text-lg/6 sm:text-base/6',
      }}
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
          '--border-radius': 'var(--radius)',
          '--error-bg': 'var(--toast-error)',
          '--error-border': 'var(--toast-error-border)',
          '--error-text': 'var(--toast-error-foreground)',
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
export { toast } from 'sonner';
