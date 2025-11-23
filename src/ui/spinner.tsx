import { Loader2Icon } from 'lucide-react';

import { cn } from '@/lib/utils';

function SpinnerIcon({ className, ...props }: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={cn('size-4.5 animate-spin sm:size-4', className)}
      {...props}
    />
  );
}

function Spinner({ className = '', ...props }: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div className={cn('flex items-center justify-center', className)} {...props}>
      <SpinnerIcon className="text-foreground size-6 animate-spin sm:size-5" />
    </div>
  );
}

export { SpinnerIcon, Spinner };
