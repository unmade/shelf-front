import { Spinner as SpinnerIcon } from 'icons';

export default function Spinner({
  className = '',
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div className={`flex ${className} items-center justify-center`} {...props}>
      <SpinnerIcon className="size-5 animate-spin text-gray-500 dark:text-zinc-400" />
    </div>
  );
}
