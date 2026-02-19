import { Spinner } from '@/ui/spinner';

import { useFileBrowserData } from './contexts/data';
import { useScrollPosition } from './contexts/scroll';
import { useFileBrowserContext } from './contexts/ui';
import { FileBrowserEmpty } from './empty';
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

  // Render based on view mode
  return viewMode === 'grid' ? (
    <div>Grid</div>
  ) : (
    <TableView
      data={data}
      scrollKey={path}
      initialScrollOffset={initialScrollOffset}
      onScrollOffsetChange={onScrollOffsetChange}
    />
  );
}
