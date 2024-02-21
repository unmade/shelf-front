import React from 'react';

import { useAppSelector } from 'hooks';

import { selectPhotosLibraryPath } from 'store/features';

import Spinner from 'components/ui/Spinner';

import usePaginatedMediaItemsQuery from 'components/photos/hooks/list-media-items';

import MediaItemGridView from 'components/photos/MediaItemGridView';

import Welcome from './Welcome';

export default function Content() {
  const libraryPath = useAppSelector(selectPhotosLibraryPath);
  const [{ ids, selectById, loadMore }, loading] = usePaginatedMediaItemsQuery({
    favourites: false,
  });

  const empty = ids?.length != null && ids?.length === 0 && !loading;
  if (empty) {
    return (
      <div className="flex h-full">
        <Welcome uploadTo={libraryPath} />
      </div>
    );
  }

  if (!ids?.length) {
    return (
      <div className="flex h-full justify-center">
        <Spinner />
      </div>
    );
  }

  return <MediaItemGridView ids={ids} selectById={selectById} loadMore={loadMore} />;
}
