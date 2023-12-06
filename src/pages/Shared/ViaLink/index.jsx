import React from 'react';

import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import * as icons from '../../../icons';

import CopyLinkDialogProvider from '../../../components/CopyLinkDialogProvider';
import PageHeader from '../../../components/PageHeader';

import SharedLinkList from './SharedLinkList';

function LinkSharing() {
  const { t } = useTranslation('sharedViaLink');

  return (
    <CopyLinkDialogProvider>
      <Helmet>
        <title>{t('tabTitle', { defaultValue: 'Shared' })} - Shelf</title>
      </Helmet>
      <div className="flex h-full flex-col">
        <PageHeader title={t('pageTitle', { defaultValue: 'Shared via link' })}>
          <PageHeader.Title
            icon={<icons.LinkOutlined className="ml-2 h-7 w-7 text-gray-400 dark:text-zinc-500" />}
          >
            {t('pageTitle', { defaultValue: 'Shared via link' })}
          </PageHeader.Title>
          <PageHeader.Actions />
        </PageHeader>

        <div className="px-4 flex flex-col flex-1">
          <SharedLinkList />
        </div>
      </div>
    </CopyLinkDialogProvider>
  );
}

LinkSharing.propTypes = {};

export default LinkSharing;
