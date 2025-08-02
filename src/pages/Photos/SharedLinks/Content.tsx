import { useTranslation } from 'react-i18next';

import { useListMediaItemSharedLinksQuery } from 'store/mediaItems';

import Spinner from 'components/ui-legacy/Spinner';

import Empty from 'components/photos/Empty';

import SharedLinkList from './SharedLinkList';

export default function Content() {
  const { t } = useTranslation('photos');

  const title = t('photos:pages.sharedViaLink.emptyTitle', {
    defaultValue: 'No shared photos yet!',
  });
  const description = t('photos:pages.sharedViaLink.emptyDescription', {
    defaultValue: "All the photos you've shared will appear on that page",
  });

  const { ids, isFetching: loading } = useListMediaItemSharedLinksQuery(undefined, {
    selectFromResult: ({ data, isFetching }) => ({
      ids: data?.ids,
      isFetching,
    }),
  });

  const empty = ids?.length === 0 && !loading;
  if (empty) {
    return <Empty title={title} description={description} />;
  }

  if (!ids) {
    return (
      <div className="flex h-full justify-center">
        <Spinner />
      </div>
    );
  }

  return <SharedLinkList ids={ids} />;
}
