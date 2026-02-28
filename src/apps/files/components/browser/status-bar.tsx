import { useTranslation } from 'react-i18next';

import { cn } from '@/lib/utils';

import { Breadcrumbs, useRouteBreadcrumbs } from '@/apps/files/components/breadcrumbs';

import { useSelectCountFiles } from './contexts/data';

interface Props {
  className?: string;
}

export function FileBrowserStatusBar({ className }: Props) {
  const { t } = useTranslation();
  const itemCount = useSelectCountFiles();

  const breadcrumbItems = useRouteBreadcrumbs();

  return (
    <div
      className={cn(
        'border-border mt-2 flex items-center justify-center border-t px-8 py-2 sm:justify-between',
        className,
      )}
    >
      <Breadcrumbs className="text-xs max-sm:hidden" items={breadcrumbItems} collapseAfter={3} />
      <span className="text-muted-foreground shrink-0 text-xs">
        {t('{{count}} items', { count: itemCount })}
      </span>
    </div>
  );
}
