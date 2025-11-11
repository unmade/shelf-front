import React from 'react';

import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import Heading from 'components/ui/Heading';

import { Page, PageContent, PageHeader, PageHeaderTitle } from 'apps/files/components/page';

import * as icons from '../../../icons';

import CopyLinkDialogProvider from '../../../components/CopyLinkDialogProvider';

import SharedLinkList from './SharedLinkList';

function LinkSharing() {
  const { t } = useTranslation('sharedViaLink');

  return (
    <CopyLinkDialogProvider>
      <Helmet>
        <title>{t('tabTitle', { defaultValue: 'Shared' })} - Shelf</title>
      </Helmet>
      <Page>
        <PageHeader>
          <PageHeaderTitle>
            <icons.LinkOutlined data-slot="icon" />
            <Heading>{t('pageTitle', { defaultValue: 'Shared via link' })}</Heading>
          </PageHeaderTitle>
        </PageHeader>

        <PageContent className="px-4">
          <SharedLinkList />
        </PageContent>
      </Page>
    </CopyLinkDialogProvider>
  );
}

LinkSharing.propTypes = {};

export default LinkSharing;
