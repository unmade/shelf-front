import { cn } from '@/lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // File input
        'file:text-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent',
        'file:text-sm file:font-medium',
        // Placeholder and selection
        'placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground',
        // Background and border
        'dark:bg-input/30 border-input border bg-transparent',
        // Sizing and layout
        'h-9 w-full min-w-0 rounded-md px-3 py-1 text-base md:text-sm',
        // Shadow and transition
        'shadow-xs transition-[color,box-shadow]',
        // Outline
        'outline-none',
        // Disabled state
        'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
        // Focus state
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        // Invalid state
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
        'aria-invalid:border-destructive',
        className,
      )}
      {...props}
    />
  );
}

export { Input };
