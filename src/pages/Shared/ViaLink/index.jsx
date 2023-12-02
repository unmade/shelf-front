import React from 'react';

import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import * as icons from '../../../icons';

import FileIcon from '../../../components/FileIcon';
import PageHeader from '../../../components/PageHeader';

function SharedItem({ name, mediatype }) {
  return (
    <div className="px-12 h-[72px] flex items-center w-full dark:bg-zinc-700/30 rounded-xl">
      {/* file icon and name */}
      <div className="md:w-3/5 lg:w-2/3 flex items-center space-x-3 text-gray-900 dark:text-zinc-100 w-full">
        <FileIcon className="h-12 w-12" mediatype={mediatype} />
        <div>
          <p>{name}</p>
        </div>
      </div>

      <div className="flex items-center text-center space-x-4 md:w-2/5 lg:w-1/3">
        {/* link */}
        <div className="w-20">
          <button
            type="button"
            className={`p-2 rounded-xl w-8 h-8 transition-colors focus:outline-none  ring-orange-300 ring-offset-2 dark:ring-orange-700 dark:ring-offset-zinc-800 `}
            onClick={() => {}}
          >
            <icons.Plus />
          </button>
        </div>

        {/* owner */}
        <div className="w-28 text-right">
          <div className="text-gray-500 dark:text-zinc-400">@unmade</div>
        </div>
      </div>
    </div>
  );
}

function SharingTableView() {
  const { t } = useTranslation();

  return (
    <div>
      {/* header */}
      <div className="show-on-hover-trigger mb-1 flex flex-row items-center border-l border-r border-transparent px-9 py-2 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-zinc-400">
        <div className="flex w-full md:w-3/5 lg:w-2/3">
          <div className="ml-3">{t('Name')}</div>
        </div>
        <div className="hidden items-center space-x-4 md:flex md:w-2/5 lg:w-1/3">
          <div className="w-20 md:block text-center">{t('Link')}</div>
          <div className="w-28 md:block text-right">{t('Owner')}</div>
        </div>
      </div>

      {/* table */}
      <div className="pt-4 text-sm">
        <SharedItem name="TeamFolder" path="Documents/Apple" mediatype="application/directory" />
      </div>
    </div>
  );
}

function LinkSharing() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('Shared')} - Shelf</title>
      </Helmet>
      <div className="flex h-full flex-col">
        <PageHeader title={t('Shared via link')}>
          <PageHeader.Title
            icon={<icons.ShareOutlined className="ml-2 h-7 w-7 text-gray-400 dark:text-zinc-500" />}
          >
            {t('Shared via link')}
          </PageHeader.Title>
          <PageHeader.Actions />
        </PageHeader>

        <div className="px-4">
          <SharingTableView />
        </div>
      </div>
    </>
  );
}

LinkSharing.propTypes = {};

export default LinkSharing;
