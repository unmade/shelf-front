import { useCountMediaItemsQuery } from 'store/mediaItems';

import { Spinner } from '@/ui/spinner';

import usePaginatedMediaItemsQuery from 'components/photos/hooks/list-media-items';

import MediaItemGridView from 'components/photos/MediaItemGridView';
import MediaItemMenu from 'components/photos/MediaItemMenu';

import Welcome from './Welcome';

export default function Content() {
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
        <Welcome />
      </div>
    );
  }

  if (!ids?.length) {
    return <Spinner className="h-full" />;
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
