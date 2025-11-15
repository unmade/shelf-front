import {
  Description as UIDescription,
  Field as UIField,
  Label as UILabel,
  type DescriptionProps as UIDescriptionProps,
  type FieldProps as UIFieldProps,
  type LabelProps as UILabelProps,
} from '@headlessui/react';

export function Description({
  className,
  ...props
}: { className?: string } & Omit<UIDescriptionProps, 'className'>) {
  return (
    <UIDescription
      data-slot="description"
      {...props}
      className={[
        className,
        'text-base/6 sm:text-sm/6',
        'text-zinc-500 dark:text-zinc-400',
        'data-[disabled]:opacity-50',
      ].join(' ')}
    />
  );
}

export function Field({ className, ...props }: UIFieldProps) {
  return (
    <UIField
      className={[
        className,
        '[&>[data-slot=label]+[data-slot=control]]:mt-3',
        '[&>[data-slot=label]+[data-slot=description]]:mt-1',
        '[&>[data-slot=description]+[data-slot=control]]:mt-3',
        '[&>[data-slot=control]+[data-slot=description]]:mt-3',
        '[&>[data-slot=control]+[data-slot=error]]:mt-3',
        '[&>[data-slot=label]]:font-medium',
      ].join(' ')}
      {...props}
    />
  );
}

export default Field;

export function Label({ className, ...props }: UILabelProps) {
  return (
    <UILabel
      {...props}
      data-slot="label"
      className={[
        className,
        'text-base/6 text-zinc-950 select-none data-[disabled]:opacity-50 sm:text-sm/6 dark:text-white',
      ].join(' ')}
    />
  );
}

export function ErrorMessage({ className, ...props }: UIDescriptionProps) {
  return (
    <UIDescription
      {...props}
      data-slot="error"
      className={[
        className,
        'text-base/6 text-red-600 data-[disabled]:opacity-50 sm:text-sm/6 dark:text-rose-500',
      ].join(' ')}
    />
  );
}
