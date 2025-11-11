import React from 'react';

import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import Heading from 'components/ui/Heading';

import { Page, PageContent, PageHeader, PageHeaderTitle } from 'apps/files/components/page';

import * as icons from '../../../icons';

import FileMembersDialogProvider from '../../../components/FileMembersDialogProvider';

import SharedFileList from './SharedFileList';

function InAppSharing() {
  const { t } = useTranslation('sharedInApp');

  return (
    <FileMembersDialogProvider>
      <Helmet>
        <title>{t('tabTitle', { defaultValue: 'Shared' })} - Shelf</title>
      </Helmet>
      <Page>
        <PageHeader>
          <PageHeaderTitle>
            <icons.ShareOutlined data-slot="icon" />
            <Heading>{t('pageTitle', { defaultValue: 'Shared with others' })}</Heading>
          </PageHeaderTitle>
        </PageHeader>

        <PageContent className="px-4">
          <SharedFileList />
        </PageContent>
      </Page>
    </FileMembersDialogProvider>
  );
}

InAppSharing.propTypes = {};

export default InAppSharing;
