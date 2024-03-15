import React from 'react';

import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import CopyLinkDialogProvider from 'components/CopyLinkDialogProvider';
import PageHeader from 'components/PageHeader';

import DeleteMediaItemsDialogProvider from 'components/photos/DeleteMediaItemsDialogProvider';
import DeleteMediaItemsImmediatelyDialogProvider from 'components/photos/DeleteMediaItemsImmediatelyDialogProvider';

import Content from './Content';

export default function SharedLinks() {
  const { t } = useTranslation('photos');

  const title = t('photos:pages.sharedViaLink.title', { defaultValue: 'Shared via link' });

  return (
    <CopyLinkDialogProvider>
      <DeleteMediaItemsDialogProvider>
        <DeleteMediaItemsImmediatelyDialogProvider>
          <Helmet>
            <title>Shelf Photos - Shared via link</title>
          </Helmet>
          <div className="flex h-full flex-col">
            <PageHeader>
              <PageHeader.Title>{title}</PageHeader.Title>
              <PageHeader.Actions />
            </PageHeader>

            <div className="flex flex-1 flex-col px-4">
              <Content />
            </div>
          </div>
        </DeleteMediaItemsImmediatelyDialogProvider>
      </DeleteMediaItemsDialogProvider>
    </CopyLinkDialogProvider>
  );
}
