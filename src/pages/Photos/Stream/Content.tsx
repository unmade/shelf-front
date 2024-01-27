import React from 'react';

import { useAppSelector } from 'hooks';

import { selectPhotosLibraryPath } from 'store/features';
import { selectMediaItemById, useListMediaItemsQuery } from 'store/photos';
import { RootState } from 'store/store';

import Spinner from 'components/ui/Spinner';

import MediaItemGridView from 'components/photos/MediaItemGridView';

import Welcome from './Welcome';

function selectById(state: RootState, id: string) {
  return selectMediaItemById(state, { id });
}

export default function Content() {
  const libraryPath = useAppSelector(selectPhotosLibraryPath);
  const { ids, isFetching: loading } = useListMediaItemsQuery(undefined, {
    selectFromResult: ({ data, isFetching }) => ({
      ids: data?.ids as string[] | undefined,
      isFetching,
    }),
  });

  const empty = ids?.length != null && ids?.length === 0 && !loading;
  if (empty) {
    return (
      <div className="flex h-full">
        <Welcome uploadTo={libraryPath} />
      </div>
    );
  }

  if (!ids) {
    return (
      <div className="flex h-full justify-center">
        <Spinner />
      </div>
    );
  }

  return <MediaItemGridView ids={ids} selectById={selectById} />;
}
