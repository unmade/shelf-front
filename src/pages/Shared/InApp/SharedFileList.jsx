import React from 'react';

import { useTranslation } from 'react-i18next';

import { useListSharedFilesQuery } from '../../../store/sharing';

import * as icons from '../../../icons';

import Empty from '../../../components/ui/Empty';
import Spinner from '../../../components/ui/Spinner';

import SharedItem from './SharedFileListItem';

function SharedFileList() {
  const { t } = useTranslation('sharedInApp');

  const { ids, isFetching: loading } = useListSharedFilesQuery(undefined, {
    selectFromResult: ({ data, isFetching }) => ({ ids: data?.ids, isFetching }),
  });

  const empty = ids?.length === 0 && !loading;
  if (empty) {
    return (
      <Empty
        icon={<icons.ShareOutlined className="h-12 w-12 text-gray-400 dark:text-zinc-500" />}
        title={t('emptyTitle', {
          defaultValue: 'Files shared with you and other member will appear here',
        })}
      />
    );
  }

  return (
    <div>
      {/* header */}
      <div className="mb-1 flex flex-row items-center border-l border-r border-transparent px-9 py-2 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-zinc-400">
        <div className="flex w-full">
          <div className="ml-3">{t('colName.title', { defaultValue: 'Name' })}</div>
        </div>
        <div className="mr-3 hidden items-center space-x-4 md:flex">
          <div className="w-32 md:block">{t('colMembers.title', { defaultValue: 'Members' })}</div>
          <div className="w-36 md:block">{t('colOwner.title', { defaultValue: 'Owner' })}</div>
        </div>
      </div>

      {/* table */}
      <div className="max-h-[calc(100svh-160px)] overflow-scroll pt-4 text-sm">
        {loading ? (
          <Spinner className="h-full w-full flex-1 pt-48" />
        ) : (
          ids?.map((id) => <SharedItem key={id} fileId={id} />)
        )}
      </div>
    </div>
  );
}

SharedFileList.propTypes = {};

export default SharedFileList;
