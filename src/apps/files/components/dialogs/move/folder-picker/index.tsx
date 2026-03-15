import { useCallback, useState } from 'react';

import { cn } from '@/lib/utils';

import * as icons from '@/icons';
import * as routes from '@/routes';

import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/ui/empty';

import { Breadcrumbs } from '@/apps/files/components/breadcrumbs';

import { FolderPickerList } from './list';

interface Props {
  className?: string;
  emptyTitle: string;
  emptyDescription: string;
  excludeIds?: string[];
  initialPath?: string;
  onPathChange: (path: string) => void;
}

export function FolderPicker({
  className,
  emptyTitle,
  emptyDescription,
  excludeIds = [],
  initialPath = '.',
  onPathChange,
}: Props) {
  const [path, setPath] = useState(initialPath);

  const changePath = useCallback(
    (nextPath: string) => {
      setPath(nextPath);
      onPathChange(nextPath);
    },
    [onPathChange],
  );

  const onItemClick = useCallback(
    (nextPath: string) => (event: React.MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      changePath(nextPath);
    },
    [changePath],
  );

  const breadcrumbs = routes
    .parents(path)
    .reverse()
    .map((item) => ({
      key: item,
      name: routes.folderName(item),
      onClick: item != null ? () => changePath(item) : undefined,
    }));

  return (
    <div className={cn('flex flex-col', className)}>
      <Breadcrumbs items={breadcrumbs} collapseAfter={1} />
      <div className="mt-1 flex flex-1 flex-col rounded-lg border border-gray-200 dark:border-zinc-700">
        <FolderPickerList
          path={path}
          excludeIds={excludeIds}
          onItemClick={onItemClick}
          emptyView={
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <icons.Collection />
                </EmptyMedia>
                <EmptyTitle>{emptyTitle}</EmptyTitle>
                <EmptyDescription>{emptyDescription}</EmptyDescription>
              </EmptyHeader>
            </Empty>
          }
        />
      </div>
    </div>
  );
}
