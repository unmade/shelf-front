import { Switch as UISwitch } from '@headlessui/react';

type SwitchProps = React.ComponentProps<typeof UISwitch>;

const baseStyles = [
  'group relative isolate inline-flex cursor-default rounded-full',
  'h-6 w-10 sm:h-5 sm:w-8',
  'p-[3px]',
  'bg-gray-200 dark:bg-white/5',
  'transition duration-0 ease-in-out',
  'ring-1 ring-inset ring-black/5 dark:ring-white/15',
  'focus:not-data-focus:outline-hidden',
  'data-changing:duration-200 data-checked:bg-(--switch-bg)',
  'data-checked:ring-(--switch-bg-ring) data-disabled:bg-gray-200',
  'data-disabled:opacity-50 data-disabled:data-checked:bg-gray-200',
  'data-disabled:data-checked:ring-black/5',
  'data-focus:outline-none',
  'data-hover:ring-black/15',
  'data-hover:data-checked:ring-(--switch-bg-ring)',
  'dark:data-checked:bg-(--switch-bg)',
  'dark:data-checked:ring-(--switch-bg-ring) dark:data-disabled:bg-white/15',
  'dark:data-disabled:data-checked:bg-white/15 dark:data-disabled:data-checked:ring-white/15',
  'dark:data-hover:ring-white/25 dark:data-hover:data-checked:ring-(--switch-bg-ring)',
].join(' ');

const thumbStyles = [
  'pointer-events-none relative inline-block',
  'size-4.5 sm:size-3.5',
  'rounded-full bg-white shadow-sm',
  'border border-transparent',
  'ring-1 ring-black/5',
  'translate-x-0',
  'transition duration-200 ease-in-out',
  'group-data-checked:translate-x-4',
  'group-data-checked:bg-(--switch)',
  'group-data-checked:shadow-(--switch-shadow)',
  'group-data-checked:ring-(--switch-ring)',
  'group-data-checked:group-data-disabled:bg-white',
  'group-data-checked:group-data-disabled:shadow-sm',
  'group-data-checked:group-data-disabled:ring-black/5',
  'sm:group-data-checked:translate-x-3',
].join(' ');

const colors = {
  default: [
    '[--switch-ring:var(--color-teal-700)]/90 [--switch-bg-ring:transparent]',
    '[--switch-bg:var(--color-teal-600)]',
    '[--switch:white]  [--switch-shadow:var(--color-teal-900)]/20',
  ].join(' '),
};

export default function Switch({ className = '', ...props }: SwitchProps) {
  return (
    <UISwitch className={`${baseStyles} ${colors.default} ${className}`} {...props}>
      <span className={thumbStyles} />
    </UISwitch>
  );
}
