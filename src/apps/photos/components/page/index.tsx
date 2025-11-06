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
      <div className={`flex w-full flex-wrap items-end justify-between pb-6 ${className}`}>
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
