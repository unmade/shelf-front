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
      <div className="show-on-hover-trigger mb-1 flex flex-row items-center border-l border-r border-transparent px-9 py-2 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-zinc-400">
        <div className="flex w-full md:w-3/5 lg:w-2/3">
          <div className="ml-3">{t('colName.title', { defaultValue: 'Name' })}</div>
        </div>
        <div className="hidden items-center space-x-4 md:flex md:w-2/5 lg:w-1/3">
          <div className="w-36 md:block text-right">
            {t('colMembers.title', { defaultValue: 'Members' })}
          </div>
          <div className="w-28 md:block text-right">
            {t('colOwner.title', { defaultValue: 'Owner' })}
          </div>
        </div>
      </div>

      {/* table */}
      <div className="pt-4 text-sm">
        {loading ? (
          <Spinner className="pt-48 h-full w-full flex-1" />
        ) : (
          ids?.map((id) => <SharedItem key={id} fileId={id} />)
        )}
      </div>
    </div>
  );
}

SharedFileList.propTypes = {};

export default SharedFileList;
