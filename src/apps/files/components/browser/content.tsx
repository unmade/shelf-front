import { Spinner } from '@/ui/spinner';

import { useFileBrowserData } from './contexts/data';
import { useScrollPosition } from './contexts/scroll';
import { useFileBrowserContext } from './contexts/ui';
import { FileBrowserEmpty } from './empty';
import { GridView } from './grid-view';
import { TableView } from './table-view';

export function FileBrowserContent() {
  const { scrollKey: path, viewMode } = useFileBrowserContext();
  const { data, isLoading, isError } = useFileBrowserData();
  const { initialScrollOffset, onScrollOffsetChange } = useScrollPosition({ key: path });

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <FileBrowserEmpty
        title="Unable to load folder"
        description="There was an error loading this folder. Please try again."
      />
    );
  }

  if (!data || data.ids.length === 0) {
    return <FileBrowserEmpty />;
  }

  if (viewMode === 'grid') {
    return <GridView data={data} />;
  }

  return (
    <TableView
      data={data}
      scrollKey={path}
      initialScrollOffset={initialScrollOffset}
      onScrollOffsetChange={onScrollOffsetChange}
    />
  );
}
