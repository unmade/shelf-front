import { useAppSelector } from 'hooks';

import { selectPhotosLibraryPath } from 'store/features';
import { useCountMediaItemsQuery } from 'store/mediaItems';

import Spinner from 'components/ui-legacy/Spinner';

import usePaginatedMediaItemsQuery from 'components/photos/hooks/list-media-items';

import MediaItemGridView from 'components/photos/MediaItemGridView';
import MediaItemMenu from 'components/photos/MediaItemMenu';

import Welcome from './Welcome';

export default function Content() {
  const libraryPath = useAppSelector(selectPhotosLibraryPath);

  const { itemsCount } = useCountMediaItemsQuery(undefined, {
    selectFromResult: ({ data }) => ({ itemsCount: data?.total }),
  });

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

  return (
    <MediaItemGridView
      ids={ids}
      itemsCount={itemsCount}
      selectById={selectById}
      loadMore={loadMore}
      menuItemRenderer={MediaItemMenu}
    />
  );
}
