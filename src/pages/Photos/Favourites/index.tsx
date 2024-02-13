import React from 'react';

import { Helmet } from 'react-helmet-async';

import CopyLinkDialogProvider from 'components/CopyLinkDialogProvider';
import PageHeader from 'components/PageHeader';

import DeleteMediaItemsDialogProvider from 'components/photos/DeleteMediaItemsDialogProvider';

import Content from './Content';

const headerHeight = '108px';
const contentStyle = {
  height: `calc(100% - ${headerHeight})`,
};

export default function Favourites() {
  return (
    <CopyLinkDialogProvider>
      <DeleteMediaItemsDialogProvider>
        <Helmet>
          <title>Shelf Photos</title>
        </Helmet>
        <div className="h-full">
          <PageHeader>
            <PageHeader.Title>Favourites</PageHeader.Title>
            <PageHeader.Actions />
          </PageHeader>

          <div className="h-full w-full" style={contentStyle}>
            <Content />
          </div>
        </div>
      </DeleteMediaItemsDialogProvider>
    </CopyLinkDialogProvider>
  );
}
