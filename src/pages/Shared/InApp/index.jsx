import React from 'react';

import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import * as icons from '../../../icons';

import PageHeader from '../../../components/PageHeader';

import SharedFileList from './SharedFileList';

function InAppSharing() {
  const { t } = useTranslation('sharedInApp');

  return (
    <>
      <Helmet>
        <title>{t('tabTitle', { defaultValue: 'Shared' })} - Shelf</title>
      </Helmet>
      <div className="flex h-full flex-col">
        <PageHeader title={t('pageTitle', { defaultValue: 'Shared with others' })}>
          <PageHeader.Title
            icon={<icons.ShareOutlined className="ml-2 h-7 w-7 text-gray-400 dark:text-zinc-500" />}
          >
            {t('pageTitle', { defaultValue: 'Shared with others' })}
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
