import { useListFolderQuery } from '@/store/files';

import { Spinner } from '@/ui/spinner';

import { useFileBrowserContext } from './context';
import { FileBrowserEmpty } from './empty';
import { TableView } from './table-view';

interface FileBrowserContentProps {
  path: string;
}

export function FileBrowserContent({ path }: FileBrowserContentProps) {
  const { viewMode } = useFileBrowserContext();
  const { data, isLoading, isError } = useListFolderQuery(path);

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
  return viewMode === 'grid' ? <div>Grid</div> : <TableView data={data} />;
}
