import { MenuItem as UIMenuItem } from '@headlessui/react';
import { useCallback } from 'react';

const base = [
  'flex items-center rounded-lg w-full',
  'px-3.5 py-2.5 sm:px-3 sm:py-1.5',
  'text-left text-base/6 sm:text-sm/6',
  '*:data-[slot=icon]:size-5 sm:*:data-[slot=icon]:size-4',
  '*:data-[slot=icon]:mr-2.5 *:data-[slot=icon]:-ml-0.5 sm:*:data-[slot=icon]:mr-2',
  '*:data-[slot=icon]:shrink-0 *:data-[slot=icon]:self-center',
].join(' ');

const colors = {
  default: [
    'text-gray-900',
    'data-focus:bg-gray-950/10 data-focus:text-gray-950',
    'dark:text-zinc-100',
    'dark:data-focus:bg-zinc-50/10 dark:data-focus:text-white',
    '*:data-[slot=icon]:text-gray-500 data-focus:*:data-[slot=icon]:text-gray-600',
    'dark:*:data-[slot=icon]:text-zinc-400 dark:data-focus:*:data-[slot=icon]:text-zinc-300',
  ].join(' '),
  red: [
    'text-red-600 data-focus:text-red-700',
    'data-focus:bg-red-500/20',
    'dark:text-rose-500 dark:data-focus:text-rose-400',
    'dark:data-focus:bg-rose-500/20',
    '*:data-[slot=icon]:text-red-500 data-focus:*:data-[slot=icon]:text-red-600',
    'dark:*:data-[slot=icon]:text-rose-700 dark:data-focus:*:data-[slot=icon]:text-rose-600',
  ].join(' '),
};

export interface Props {
  key: string;
  danger: boolean;
  Icon: React.ElementType;
  name: string;
  onClick: () => void;
}

export default function MenuItem({ danger, Icon, name, onClick }: Props) {
  const onClickHandler = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      onClick();
    },
    [onClick],
  );

  const color = danger ? colors.red : colors.default;
  const classNames = `${base} ${color}`;

  return (
    <UIMenuItem className={classNames} as="button" onClick={onClickHandler}>
      <Icon data-slot="icon" />
      {name}
    </UIMenuItem>
  );
}
