import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import * as routes from '@/routes';

import Breadcrumbs from '@/components/Breadcrumbs';

interface FileBrowserStatusBarProps {
  /** Current folder path */
  path: string;
  /** Total number of items in the folder */
  itemCount: number;
}

/**
 * Status bar for the file browser, similar to Finder.
 * Shows breadcrumbs on the left and item count on the right.
 */
export const FileBrowserStatusBar = memo(function FileBrowserStatusBar({
  path,
  itemCount,
}: FileBrowserStatusBarProps) {
  const { t } = useTranslation();

  const breadcrumbItems = useMemo(() => {
    return routes.breadcrumbs(path);
  }, [path]);

  return (
    <div className="border-border flex items-center justify-between border-t px-4 py-2">
      <Breadcrumbs items={breadcrumbItems} collapseAfter={3} maxLastItems={2} />
      <span className="text-muted-foreground shrink-0 text-xs">
        {t('{{count}} items', { count: itemCount })}
      </span>
    </div>
  );
});

FileBrowserStatusBar.displayName = 'FileBrowserStatusBar';
