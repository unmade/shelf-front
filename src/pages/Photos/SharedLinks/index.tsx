import React from 'react';

import { Helmet } from 'react-helmet-async';

import CopyLinkDialogProvider from 'components/CopyLinkDialogProvider';
import PageHeader from 'components/PageHeader';

import DeleteMediaItemsDialogProvider from 'components/photos/DeleteMediaItemsDialogProvider';
import DeleteMediaItemsImmediatelyDialogProvider from 'components/photos/DeleteMediaItemsImmediatelyDialogProvider';

import Content from './Content';

export default function SharedLinks() {
  return (
    <CopyLinkDialogProvider>
      <DeleteMediaItemsDialogProvider>
        <DeleteMediaItemsImmediatelyDialogProvider>
          <Helmet>
            <title>Shared - Shelf</title>
          </Helmet>
          <div className="flex h-full flex-col">
            <PageHeader>
              <PageHeader.Title>Shared via link</PageHeader.Title>
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
