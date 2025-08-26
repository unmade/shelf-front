import {
  Menu as UIMenu,
  type MenuProps as UIMenuProps,
  MenuButton as UIMenuButton,
  MenuItems as UIMenuItems,
  type MenuItemsProps as UIMenuItemsProps,
  MenuItem as UIMenuItem,
  type MenuItemProps as UIMenuItemProps,
  MenuSection as UIMenuSection,
  type MenuSectionProps as UIMenuSectionProps,
  MenuSeparator as UIMenuSeparator,
  type MenuSeparatorProps as UIMenuSeparatorProps,
} from '@headlessui/react';

import Button from 'components/ui/Button';

export function Dropdown(props: UIMenuProps) {
  return <UIMenu {...props} />;
}

export function DropdownButton<T extends React.ElementType = typeof Button>(
  props: React.ComponentProps<typeof UIMenuButton<T>>,
) {
  return <UIMenuButton as={Button} {...props} />;
}

export type DropdownMenuProps = UIMenuItemsProps;

export function DropdownMenu({ anchor = 'bottom', className = '', ...props }: DropdownMenuProps) {
  return (
    <UIMenuItems
      {...props}
      anchor={anchor}
      transition
      className={[
        className,
        'isolate',
        'w-max',
        'overflow-y-auto rounded-xl p-1',
        '[--anchor-gap:4px] sm:[--anchor-gap:8px]',
        'outline outline-transparent focus:outline-hidden',
        'bg-white/75 dark:bg-zinc-800/75',
        'shadow-lg backdrop-blur-xl',
        'ring-1 ring-zinc-950/10 dark:ring-white/10 dark:ring-inset',
        'transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0',
      ].join(' ')}
    />
  );
}

const itemColors = {
  default: [
    'text-gray-900',
    'data-focus:bg-gray-950/10 data-focus:text-gray-950',
    'dark:text-zinc-100',
    'dark:data-focus:bg-zinc-50/10 dark:data-focus:text-white',
    '*:data-[slot=icon]:text-gray-500 data-focus:*:data-[slot=icon]:text-gray-600',
    'dark:*:data-[slot=icon]:text-zinc-400 dark:data-focus:*:data-[slot=icon]:text-zinc-300',
  ].join(' '),
  danger: [
    'text-red-600 data-focus:text-red-700',
    'data-focus:bg-red-500/20',
    'dark:text-rose-500 dark:data-focus:text-rose-400',
    'dark:data-focus:bg-rose-500/20',
    '*:data-[slot=icon]:text-red-500 data-focus:*:data-[slot=icon]:text-red-600',
    'dark:*:data-[slot=icon]:text-rose-700 dark:data-focus:*:data-[slot=icon]:text-rose-600',
  ].join(' '),
};

export function DropdownItem({
  className = '',
  danger = false,
  ...props
}: { danger?: boolean } & UIMenuItemProps<'button'>) {
  return (
    <UIMenuItem
      {...props}
      className={[
        className,

        'flex w-full items-center rounded-lg',
        'px-3.5 py-2.5 sm:px-3 sm:py-1.5',
        'text-left text-base/6 sm:text-sm/6',
        '*:data-[slot=icon]:size-5 sm:*:data-[slot=icon]:size-4',
        '*:data-[slot=icon]:mr-2.5 *:data-[slot=icon]:-ml-0.5 sm:*:data-[slot=icon]:mr-2',
        '*:data-[slot=icon]:shrink-0 *:data-[slot=icon]:self-center',

        itemColors[danger ? 'danger' : 'default'],
      ].join(' ')}
    />
  );
}

export function DropdownSection(props: UIMenuSectionProps) {
  return <UIMenuSection {...props} />;
}

export function DropdownSeparator({ className = '', ...props }: UIMenuSeparatorProps) {
  return (
    <UIMenuSeparator
      {...props}
      className={[
        className,
        'col-span-full mx-3.5 my-1 h-px border-0 bg-gray-950/5 sm:mx-3 dark:bg-white/10',
      ].join(' ')}
    />
  );
}
