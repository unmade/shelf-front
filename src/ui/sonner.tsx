import {
  AlertOctagonIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  InfoCircleIcon,
  LoaderIcon,
} from '@/icons';
import { Toaster as Sonner, type ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      icons={{
        success: <CheckCircleIcon className="size-5 sm:size-4" />,
        info: <InfoCircleIcon className="size-5 sm:size-4" />,
        warning: <AlertTriangleIcon className="size-5 sm:size-4" />,
        error: <AlertOctagonIcon className="text-destructive size-5 sm:size-4" />,
        loading: <LoaderIcon className="size-5 animate-spin sm:size-4" />,
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
