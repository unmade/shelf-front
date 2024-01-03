import React from 'react';

import { useTranslation } from 'react-i18next';

import { useListFilesSharedViaLinkQuery } from '../../../store/sharing';

import * as icons from '../../../icons';

import Empty from '../../../components/ui/Empty';
import Spinner from '../../../components/ui/Spinner';

import SharedLinkListItem from './SharedLinkListItem';

function SharedLinkList() {
  const { t } = useTranslation('sharedViaLink');

  const { ids, isFetching: loading } = useListFilesSharedViaLinkQuery(undefined, {
    selectFromResult: ({ data, isFetching }) => ({ ids: data?.ids, isFetching }),
  });

  const empty = ids?.length === 0 && !loading;
  if (empty) {
    return (
      <Empty
        icon={<icons.LinkOutlined className="h-12 w-12 text-gray-400 dark:text-zinc-500" />}
        title={t('emptyTitle', { defaultValue: 'Files shared via link will appear here' })}
      />
    );
  }

  return (
    <div>
      {/* header */}
      <div className="mb-1 flex flex-row items-center border-l border-r border-transparent px-9 py-2 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-zinc-400">
        <div className="flex w-full md:w-3/4">
          <div className="ml-3">{t('colName.title', { defaultValue: 'Name' })}</div>
        </div>
        <div className="hidden items-center space-x-4 md:flex md:w-1/4">
          <div className="w-48 md:block text-left">
            {t('colDateCreated.title', { defaultValue: 'Date Created' })}
          </div>
        </div>
      </div>

      {/* table */}
      <div className="pt-4 text-sm overflow-scroll max-h-[calc(100vh-160px)]">
        {loading ? (
          <Spinner className="pt-48 h-full w-full flex-1" />
        ) : (
          ids?.map((id) => <SharedLinkListItem key={id} fileId={id} />)
        )}
      </div>
    </div>
  );
}

SharedLinkList.propTypes = {};

export default SharedLinkList;
