import {
  Dialog as UIDialog,
  DialogBackdrop as UIDialogBackdrop,
  DialogPanel as UIDialogPanel,
  DialogTitle as UIDialogTitle,
  Description as UIDescription,
} from '@headlessui/react';

type DialogProps = React.ComponentProps<typeof UIDialog>;
export function Dialog({ children, open, onClose, ...props }: DialogProps) {
  return (
    <UIDialog open={open} onClose={onClose} {...props}>
      <UIDialogBackdrop
        transition
        className={[
          'fixed inset-0 flex w-screen justify-center overflow-y-auto',
          'bg-gray-100/10 backdrop-blur-xs focus:outline-0 dark:bg-zinc-950/10',
          'duration-150 data-closed:opacity-0 data-enter:ease-out data-leave:ease-in',
        ].join(' ')}
      />
      <div className="fixed inset-x-0 bottom-0 flex items-center justify-center sm:inset-0 sm:p-4">
        <UIDialogPanel
          transition
          className={[
            'p-8',
            'rounded-t-3xl sm:rounded-2xl',
            'ring-1 ring-zinc-950/10 dark:ring-white/10',
            'bg-white/75 shadow-lg backdrop-blur-xl dark:bg-zinc-800/75',
            'duration-150 data-enter:ease-out data-leave:ease-in',
            'data-closed:translate-y-12 data-closed:opacity-0',
            'sm:data-closed:translate-y-0 sm:data-closed:data-enter:scale-95',
          ].join(' ')}
        >
          {children}
        </UIDialogPanel>
      </div>
    </UIDialog>
  );
}

type DialogTitleProps = React.ComponentProps<typeof UIDialogTitle>;
export function DialogTitle({ className = '', ...props }: DialogTitleProps) {
  return (
    <UIDialogTitle
      className={[
        'text-lg/6 font-semibold text-balance text-gray-950 sm:text-base/6 dark:text-white',
        className,
      ].join(' ')}
      {...props}
    />
  );
}

type DialogDescriptionProps = React.ComponentProps<typeof UIDescription>;
export function DialogDescription({ className = '', ...props }: DialogDescriptionProps) {
  return (
    <UIDescription
      className={[
        'mt-2 text-base/6 text-pretty text-gray-500 sm:text-sm/6 dark:text-zinc-400',
        className,
      ].join(' ')}
      {...props}
    />
  );
}

type DialogBodyProps = React.HTMLAttributes<HTMLDivElement>;
export function DialogBody({ className = '', ...props }: DialogBodyProps) {
  return <div className={'mt-6' + className} {...props} />;
}

type DialogActionsProps = React.HTMLAttributes<HTMLDivElement>;
export function DialogActions({ className = '', ...props }: DialogActionsProps) {
  return (
    <div
      className={[
        'mt-8 flex flex-col-reverse items-center justify-end gap-3 *:w-full sm:flex-row sm:*:w-auto',
        className,
      ].join(' ')}
      {...props}
    />
  );
}
