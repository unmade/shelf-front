import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { LinkIcon } from '@/icons';

import { useListFilesSharedViaLinkQuery } from '@/store/sharedLinks';

import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from '@/ui/empty';
import { Spinner } from '@/ui/spinner';
import { type ItemRendererProps, VList } from '@/ui/vlist';

import { SharedLinksListHeader } from './header';
import { SharedLinkRow } from './row';

const ROW_HEIGHT = 72;

interface RowData {
  ids: string[];
}

const RowRenderer = memo(function RowRenderer({ index, data, style }: ItemRendererProps<RowData>) {
  return (
    <div style={style}>
      <SharedLinkRow fileId={data.ids[index]} index={index} />
    </div>
  );
});

export function SharedLinkList() {
  const { t } = useTranslation('files');

  const { ids, isFetching } = useListFilesSharedViaLinkQuery(undefined, {
    selectFromResult: ({ data, isFetching }) => ({
      ids: data?.ids as string[] | undefined,
      isFetching,
    }),
  });

  const itemData = useMemo<RowData>(() => ({ ids: ids ?? [] }), [ids]);

  if (isFetching && !ids) {
    return <Spinner className="h-full w-full flex-1 pt-48" />;
  }

  if (ids?.length === 0) {
    return (
      <Empty className="h-full">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <LinkIcon />
          </EmptyMedia>
          <EmptyTitle>
            {t('sharedViaLink.emptyTitle', {
              defaultValue: 'Files shared via link will appear here',
            })}
          </EmptyTitle>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <div className="@container h-full min-w-0 flex-1">
      <div className="flex h-full flex-col" role="table">
        <SharedLinksListHeader />
        <div className="flex-1">
          <VList
            itemCount={itemData.ids.length}
            itemData={itemData}
            itemHeight={ROW_HEIGHT}
            itemRenderer={RowRenderer}
          />
        </div>
      </div>
    </div>
  );
}
