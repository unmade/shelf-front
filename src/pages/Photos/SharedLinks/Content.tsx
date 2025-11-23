import { useTranslation } from 'react-i18next';

import { useListMediaItemSharedLinksQuery } from 'store/mediaItems';

import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from '@/ui/empty';
import { Spinner } from '@/ui/spinner';

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
    return (
      <Empty className="h-full">
        <EmptyHeader>
          <EmptyTitle>{title}</EmptyTitle>
          <EmptyDescription>{description}</EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  if (!ids) {
    return <Spinner className="h-full" />;
  }

  return <SharedLinkList ids={ids} />;
}
