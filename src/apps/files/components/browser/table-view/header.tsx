import { useTranslation } from 'react-i18next';

import { cn } from '@/lib/utils';

import { Checkbox } from '@/ui/checkbox';

interface TableViewHeaderProps {
  className?: string;
}

export function TableViewHeader({ className }: TableViewHeaderProps) {
  const { t } = useTranslation();

  return (
    <div
      role="row"
      className={cn(
        'text-muted-foreground flex items-center gap-4 px-8 py-2 text-xs font-medium tracking-wide uppercase',
        className,
      )}
    >
      {/* Select all checkbox */}
      <Checkbox aria-label={t('Select all files')} />
      {/* Name column */}
      <div className="flex-1">{t('Name')}</div>
      {/* Spacer for bookmark button */}
      <div className="size-8 shrink-0" />
      {/* Modified column */}
      <div className="w-40 flex-none">{t('Modified')}</div>
      {/* Size column */}
      <div className="w-28 flex-none pr-4 text-right">{t('Size')}</div>
      {/* Spacer for row actions */}
      <div className="size-8 shrink-0" />
    </div>
  );
}
