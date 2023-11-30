import React from 'react';

import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import * as icons from '../../../icons';

import PageHeader from '../../../components/PageHeader';

import SharedFileList from './SharedFileList';

function InAppSharing() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('Sharing')} - Shelf</title>
      </Helmet>
      <div className="flex h-full flex-col">
        <PageHeader title={t('In-app Sharing')}>
          <PageHeader.Title
            icon={<icons.ShareOutlined className="ml-2 h-7 w-7 text-gray-400 dark:text-zinc-500" />}
          >
            {t('Shared Inside App')}
          </PageHeader.Title>
          <PageHeader.Actions />
        </PageHeader>

        <div className="px-4">
          <SharedFileList />
        </div>
      </div>
    </>
  );
}

InAppSharing.propTypes = {};

export default InAppSharing;
