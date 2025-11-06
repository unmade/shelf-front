import Spinner from 'components/ui/Spinner';

import usePaginatedMediaItemsQuery from 'components/photos/hooks/list-media-items';

import MediaItemGridView from 'components/photos/MediaItemGridView';
import MediaItemMenu from 'components/photos/MediaItemMenu';

import Empty from './Empty';

export default function Content() {
  const [{ ids, selectById }, loading] = usePaginatedMediaItemsQuery({ favourites: true });

  const empty = ids?.length != null && ids?.length === 0 && !loading;
  if (empty) {
    return (
      <div className="flex h-full">
        <Empty />
      </div>
    );
  }

  if (!ids) {
    return <Spinner className="h-full" />;
  }

  return <MediaItemGridView ids={ids} selectById={selectById} menuItemRenderer={MediaItemMenu} />;
}
