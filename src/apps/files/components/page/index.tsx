export function Page({ className = '', ...props }: React.ComponentPropsWithoutRef<'div'>) {
  return <div className={`flex h-full flex-col pt-5.5 ${className}`} {...props} />;
}

export function PageContent({ className = '', ...props }: React.ComponentPropsWithoutRef<'div'>) {
  return <div className={`mt-6 flex-1 ${className}`} {...props} />;
}

export function PageHeader({
  children,
  className = '',
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div className="mx-auto w-full px-5" {...props}>
      <div className={`flex w-full flex-wrap items-center justify-between pb-6 ${className}`}>
        {children}
      </div>
    </div>
  );
}

export function PageHeaderActions({
  className = '',
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return <div className={`flex gap-4 ${className}`} {...props} />;
}

const pageHeaderTitleStyles = [
  'flex items-center gap-2',
  '*:data-[slot=icon]:size-5 sm:*:data-[slot=icon]:size-4',
  '*:data-[slot=icon]:m-2.5',
  '*:data-[slot=icon]:shrink-0 *:data-[slot=icon]:self-center',
  '*:data-[slot=icon]:text-gray-500 dark:*:data-[slot=icon]:text-zinc-400',
].join(' ');

export function PageHeaderTitle({
  className = '',
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return <div className={`${pageHeaderTitleStyles} ${className}`} {...props} />;
}
