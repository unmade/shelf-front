import React from 'react';

import { Helmet } from 'react-helmet-async';

import * as icons from 'icons';

import CopyLinkDialogProvider from 'components/CopyLinkDialogProvider';
import DeleteDialogProvider from 'components/DeleteDialogProvider';
import PageHeader from 'components/PageHeader';

import Content from './Content';

export default function SharedLinks() {
  return (
    <CopyLinkDialogProvider>
      <DeleteDialogProvider>
        <Helmet>
          <title>Shared - Shelf</title>
        </Helmet>
        <div className="flex h-full flex-col">
          <PageHeader>
            <PageHeader.Title
              icon={
                <icons.LinkOutlined className="ml-2 h-7 w-7 text-gray-400 dark:text-zinc-500" />
              }
            >
              Shared via link
            </PageHeader.Title>
            <PageHeader.Actions />
          </PageHeader>

          <div className="flex flex-1 flex-col px-4">
            <Content />
          </div>
        </div>
      </DeleteDialogProvider>
    </CopyLinkDialogProvider>
  );
}
