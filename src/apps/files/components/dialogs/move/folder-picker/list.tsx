import { useMemo } from 'react';

import { useListFolderQuery } from '@/store/files';

import { Spinner } from '@/ui/spinner';
import { VList } from '@/ui/vlist';

import { FolderPickerItem, type ItemData } from './item';

interface Props {
  path: string;
  excludeIds: string[];
  emptyView: React.ReactNode;
  onItemClick: (path: string) => (event: React.MouseEvent) => void;
}

export function FolderPickerList({ path, excludeIds, emptyView, onItemClick }: Props) {
  const { ids, isFetching } = useListFolderQuery(path, {
    selectFromResult: ({ data, isFetching }) => ({ ids: data?.ids, isFetching }),
  });

  const items = useMemo(() => {
    if (excludeIds.length > 0) {
      const idsToExclude = new Set(excludeIds);
      return ids?.filter((id) => !idsToExclude.has(id as string)) as string[] | undefined;
    }
    return ids as string[] | undefined;
  }, [ids, excludeIds]);

  if (isFetching) {
    return <Spinner className="flex-1" />;
  }

  if (ids?.length === 0) {
    return emptyView;
  }

  const data: ItemData = { items: items ?? [], path, onItemClick };

  return <VList itemCount={items?.length ?? 0} itemData={data} itemRenderer={FolderPickerItem} />;
}
