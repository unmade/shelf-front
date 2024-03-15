import React from 'react';

import { useTranslation } from 'react-i18next';

import SharedLinkListItem from './SharedLinkListItem';

interface Props {
  ids: string[];
}

export default function SharedLinkList({ ids }: Props) {
  const { t } = useTranslation('photos');

  return (
    <div>
      {/* header */}
      <div className="mb-1 flex flex-row items-center border-l border-r border-transparent px-9 py-2 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-zinc-400">
        <div className="flex w-full md:w-3/4">
          <div className="ml-3">
            {t('photos:sharedLinkList.columns.name.title', { defaultValue: 'Name' })}
          </div>
        </div>
        <div className="hidden items-center space-x-4 md:flex md:w-1/4">
          <div className="w-48 text-left md:block">
            {t('photos:sharedLinkList.columns.dateCreated.title', { defaultValue: 'Date Created' })}
          </div>
        </div>
      </div>

      {/* table */}
      <div className="max-h-[calc(100svh-160px)] overflow-scroll pt-4 text-sm">
        {ids?.map((id) => <SharedLinkListItem key={id} fileId={id} />)}
      </div>
    </div>
  );
}
