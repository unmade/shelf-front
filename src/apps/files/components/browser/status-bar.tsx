import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import * as routes from '@/routes';

import Breadcrumbs from '@/components/Breadcrumbs';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
  itemCount: number;
  path: string;
}

export function FileBrowserStatusBar({ className, path, itemCount }: Props) {
  const { t } = useTranslation();

  const breadcrumbItems = useMemo(() => {
    return routes.breadcrumbs(path);
  }, [path]);

  return (
    <div
      className={cn(
        'border-border mt-2 flex items-center justify-between border-t px-8 py-2',
        className,
      )}
    >
      <Breadcrumbs className="text-xs" items={breadcrumbItems} collapseAfter={3} maxLastItems={1} />
      <span className="text-muted-foreground shrink-0 text-xs">
        {t('{{count}} items', { count: itemCount })}
      </span>
    </div>
  );
}
