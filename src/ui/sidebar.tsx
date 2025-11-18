'use client';

import { forwardRef, useMemo } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { Input } from '@/ui/input';
import { Separator } from '@/ui/separator';
import { Skeleton } from '@/ui/skeleton';

function Sidebar({ className, children, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar"
      className={cn(
        // Background and text color
        'bg-sidebar text-sidebar-foreground',
        // Layout
        'flex h-full w-full flex-col',
        // Responsive width
        'sm:w-64',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function SidebarInset({ className, ...props }: React.ComponentProps<'main'>) {
  return (
    <main
      data-slot="sidebar-inset"
      className={cn(
        // Background and layout
        'bg-background relative flex w-full flex-1 flex-col',
        // Inset variant (responsive)
        'md:peer-data-[variant=inset]:m-2',
        'md:peer-data-[variant=inset]:ml-0',
        'md:peer-data-[variant=inset]:rounded-xl',
        'md:peer-data-[variant=inset]:shadow-sm',
        'md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2',
        className,
      )}
      {...props}
    />
  );
}

function SidebarInput({ className, ...props }: React.ComponentProps<typeof Input>) {
  return (
    <Input
      data-slot="sidebar-input"
      data-sidebar="input"
      className={cn(
        // Background and layout
        'bg-background h-8 w-full',
        // No shadow
        'shadow-none',
        className,
      )}
      {...props}
    />
  );
}

function SidebarHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-header"
      data-sidebar="header"
      className={cn(
        // Layout and spacing
        'flex flex-col gap-2 p-4',
        // Border
        'border-b border-gray-950/5 dark:border-white/5',
        className,
      )}
      {...props}
    />
  );
}

function SidebarFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-footer"
      data-sidebar="footer"
      className={cn(
        // Layout and spacing
        'flex flex-col gap-2 p-4',
        // Border
        'border-t border-gray-950/5 dark:border-white/5',
        className,
      )}
      {...props}
    />
  );
}

function SidebarSeparator({ className, ...props }: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="sidebar-separator"
      data-sidebar="separator"
      className={cn(
        // Border color and spacing
        'bg-sidebar-border mx-2 w-auto',
        className,
      )}
      {...props}
    />
  );
}

function SidebarContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-content"
      data-sidebar="content"
      className={cn(
        // Layout and spacing
        'flex min-h-0 flex-1 flex-col',
        // Overflow handling
        'overflow-auto group-data-[collapsible=icon]:overflow-hidden',
        className,
      )}
      {...props}
    />
  );
}

function SidebarGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-group"
      data-sidebar="group"
      className={cn(
        // Layout and spacing
        'relative flex w-full min-w-0 flex-col p-4',
        className,
      )}
      {...props}
    />
  );
}

function SidebarGroupLabel({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<'div'> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'div';

  return (
    <Comp
      data-slot="sidebar-group-label"
      data-sidebar="group-label"
      className={cn(
        // Text and ring
        'text-sidebar-foreground/70 ring-sidebar-ring',
        // Layout and sizing
        'flex h-8 shrink-0 items-center rounded-md px-2',
        // Typography
        'text-sm/5 font-medium sm:text-xs/5',
        // Outline and transition
        'outline-hidden transition-[margin,opacity] duration-200 ease-linear',
        // Focus and icon
        'focus-visible:ring-2',
        '[&>svg]:size-4 [&>svg]:shrink-0',
        // Collapsible icon state
        'group-data-[collapsible=icon]:-mt-8',
        'group-data-[collapsible=icon]:opacity-0',
        className,
      )}
      {...props}
    />
  );
}

function SidebarGroupAction({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="sidebar-group-action"
      data-sidebar="group-action"
      className={cn(
        // Text and ring
        'text-sidebar-foreground ring-sidebar-ring',
        // Hover and active states
        'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
        // Positioning
        'absolute top-3.5 right-3',
        // Layout and sizing
        'flex aspect-square w-5 items-center justify-center rounded-md p-0',
        // Outline and transition
        'outline-hidden transition-transform',
        // Focus and icon
        'focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0',
        // Increases the hit area of the button on mobile.
        'after:absolute after:-inset-2 md:after:hidden',
        // Collapsible icon state
        'group-data-[collapsible=icon]:hidden',
        className,
      )}
      {...props}
    />
  );
}

function SidebarGroupContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-group-content"
      data-sidebar="group-content"
      className={cn('w-full text-base/6 sm:text-sm/6', className)}
      {...props}
    />
  );
}

function SidebarMenu({ className, ...props }: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="sidebar-menu"
      data-sidebar="menu"
      className={cn('flex w-full min-w-0 flex-col gap-1.5', className)}
      {...props}
    />
  );
}

function SidebarMenuItem({ className, ...props }: React.ComponentProps<'li'>) {
  return (
    <li
      data-slot="sidebar-menu-item"
      data-sidebar="menu-item"
      className={cn('group/menu-item relative', className)}
      {...props}
    />
  );
}

const sidebarMenuButtonVariants = cva(
  [
    // Peer and layout
    'peer/menu-button flex w-full items-center gap-3',
    // Overflow and rounding
    'overflow-hidden rounded-md',
    // Padding
    'px-3 py-2.5 sm:py-2',
    // Text
    'text-left text-base/6 font-medium sm:text-sm/5',
    // Outline and ring
    'outline-hidden ring-sidebar-ring',
    // Transition
    'transition-[width,height,padding]',
    // Hover and active states
    'hover:text-sidebar-accent-foreground',
    'active:bg-sidebar-accent active:text-sidebar-accent-foreground',
    // Disabled states
    'disabled:pointer-events-none disabled:opacity-50',
    'aria-disabled:pointer-events-none aria-disabled:opacity-50',
    // Menu action padding
    'group-has-data-[sidebar=menu-action]/menu-item:pr-8',
    // Active state
    'data-[active=true]:bg-sidebar-accent',
    'data-[active=true]:font-medium',
    'data-[active=true]:text-sidebar-accent-foreground',
    // Open state
    'data-[state=open]:hover:bg-sidebar-accent',
    'data-[state=open]:hover:text-sidebar-accent-foreground',
    // Collapsible icon state
    'group-data-[collapsible=icon]:size-8!',
    'group-data-[collapsible=icon]:p-2!',
    // Truncate and icon sizing
    '[&>span:last-child]:truncate',
    "[&>svg:not([class*='size-'])]:size-6 sm:[&>svg:not([class*='size-'])]:size-5",
    "[&>svg:not([class*='size-'])]:last:size-5 sm:[&>svg:not([class*='size-'])]:last:size-4",
    '[&>svg]:shrink-0',
  ],
  {
    variants: {
      variant: {
        default: 'hover:text-sidebar-accent-foreground',
        outline: [
          // Background
          'bg-background',
          // Border shadow
          'shadow-[0_0_0_1px_hsl(var(--sidebar-border))]',
          // Hover states
          'hover:bg-sidebar-accent',
          'hover:text-sidebar-accent-foreground',
          'hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]',
        ].join(' '),
      },
      size: {
        default: 'h-9 text-base/6 font-medium sm:text-sm/5',
        sm: 'h-7 text-sm/5 sm:text-xs/5',
        lg: 'h-12 text-base/6 sm:text-sm/6 group-data-[collapsible=icon]:p-0!',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

const SidebarMenuButton = forwardRef(function SidebarMenuButton(
  {
    asChild = false,
    isActive = false,
    variant = 'default',
    size = 'default',
    className,
    ...props
  }: React.ComponentProps<'button'> & {
    asChild?: boolean;
    isActive?: boolean;
  } & VariantProps<typeof sidebarMenuButtonVariants>,
  ref: React.Ref<HTMLButtonElement>,
) {
  const Comp = asChild ? Slot : 'button';

  const button = (
    <Comp
      ref={ref}
      data-slot="sidebar-menu-button"
      data-sidebar="menu-button"
      data-size={size}
      data-active={isActive}
      className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
      {...props}
    />
  );

  return button;
});

function SidebarMenuAction({
  className,
  asChild = false,
  showOnHover = false,
  ...props
}: React.ComponentProps<'button'> & {
  asChild?: boolean;
  showOnHover?: boolean;
}) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="sidebar-menu-action"
      data-sidebar="menu-action"
      className={cn(
        // Text and ring
        'text-sidebar-foreground ring-sidebar-ring',
        // Hover and active states
        'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
        'peer-hover/menu-button:text-sidebar-accent-foreground',
        // Positioning
        'absolute top-1.5 right-1',
        // Layout and sizing
        'flex aspect-square w-5 items-center justify-center rounded-md p-0',
        // Outline and transition
        'outline-hidden transition-transform',
        // Focus and icon
        'focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0',
        // Increases the hit area of the button on mobile.
        'after:absolute after:-inset-2 md:after:hidden',
        // Size variants
        'peer-data-[size=sm]/menu-button:top-1',
        'peer-data-[size=default]/menu-button:top-1.5',
        'peer-data-[size=lg]/menu-button:top-2.5',
        // Collapsible icon state
        'group-data-[collapsible=icon]:hidden',
        // Show on hover and active states
        showOnHover &&
          [
            // Accent foreground when active
            'peer-data-[active=true]/menu-button:text-sidebar-accent-foreground',
            // Opacity transitions for focus, hover, open states
            'group-focus-within/menu-item:opacity-100',
            'group-hover/menu-item:opacity-100',
            'data-[state=open]:opacity-100',
            // Hide on md screens
            'md:opacity-0',
          ].join(' '),
        className,
      )}
      {...props}
    />
  );
}

function SidebarMenuBadge({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-menu-badge"
      data-sidebar="menu-badge"
      className={cn(
        // Color, pointer, and positioning
        'text-sidebar-foreground pointer-events-none absolute right-1',
        // Layout and sizing
        'flex h-5 min-w-5 items-center justify-center rounded-md px-1',
        // Typography
        'text-sm/5 font-medium tabular-nums select-none sm:text-xs/5',
        // Accent foreground on hover and active
        'peer-hover/menu-button:text-sidebar-accent-foreground',
        'peer-data-[active=true]/menu-button:text-sidebar-accent-foreground',
        // Top position for different sizes
        'peer-data-[size=sm]/menu-button:top-1',
        'peer-data-[size=default]/menu-button:top-1.5',
        'peer-data-[size=lg]/menu-button:top-2.5',
        // Hide in collapsible icon state
        'group-data-[collapsible=icon]:hidden',
        className,
      )}
      {...props}
    />
  );
}

function SidebarMenuSkeleton({
  className,
  showIcon = false,
  ...props
}: React.ComponentProps<'div'> & {
  showIcon?: boolean;
}) {
  // Random width between 50 to 90%.
  const width = useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
  }, []);

  return (
    <div
      data-slot="sidebar-menu-skeleton"
      data-sidebar="menu-skeleton"
      className={cn('flex h-8 items-center gap-2 rounded-md px-4', className)}
      {...props}
    >
      {showIcon && <Skeleton className="size-4 rounded-md" data-sidebar="menu-skeleton-icon" />}
      <Skeleton
        className="h-4 max-w-(--skeleton-width) flex-1"
        data-sidebar="menu-skeleton-text"
        style={
          {
            '--skeleton-width': width,
          } as React.CSSProperties
        }
      />
    </div>
  );
}

function SidebarMenuSub({ className, ...props }: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="sidebar-menu-sub"
      data-sidebar="menu-sub"
      className={cn(
        // Border color and left border
        'border-sidebar-border border-l',
        // Margin and padding
        'mx-3.5 px-2.5 py-0.5',
        // Layout and spacing
        'flex min-w-0 translate-x-px flex-col gap-1',
        // Hide in collapsible icon state
        'group-data-[collapsible=icon]:hidden',
        className,
      )}
      {...props}
    />
  );
}

function SidebarMenuSubItem({ className, ...props }: React.ComponentProps<'li'>) {
  return (
    <li
      data-slot="sidebar-menu-sub-item"
      data-sidebar="menu-sub-item"
      className={cn('group/menu-sub-item relative', className)}
      {...props}
    />
  );
}

function SidebarMenuSubButton({
  asChild = false,
  size = 'md',
  isActive = false,
  className,
  ...props
}: React.ComponentProps<'a'> & {
  asChild?: boolean;
  size?: 'sm' | 'md';
  isActive?: boolean;
}) {
  const Comp = asChild ? Slot : 'a';

  return (
    <Comp
      data-slot="sidebar-menu-sub-button"
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={cn(
        // Color and ring
        'text-sidebar-foreground ring-sidebar-ring',
        // Hover and active states
        'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
        'active:bg-sidebar-accent active:text-sidebar-accent-foreground',
        // SVG accent color
        '[&>svg]:text-sidebar-accent-foreground',
        // Layout and sizing
        'flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2',
        // Outline and focus
        'outline-hidden focus-visible:ring-2',
        // Disabled and aria-disabled states
        'disabled:pointer-events-none disabled:opacity-50',
        'aria-disabled:pointer-events-none aria-disabled:opacity-50',
        // Truncate and icon sizing
        '[&>span:last-child]:truncate',
        '[&>svg]:size-4',
        '[&>svg]:shrink-0',
        // Active state
        'data-[active=true]:bg-sidebar-accent',
        'data-[active=true]:text-sidebar-accent-foreground',
        // Size variants
        size === 'sm' && 'text-sm/5 sm:text-xs/5',
        size === 'md' && 'text-base/6 sm:text-sm/6',
        // Collapsible icon state
        'group-data-[collapsible=icon]:hidden',
        className,
      )}
      {...props}
    />
  );
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarSeparator,
};
