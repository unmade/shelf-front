import React from 'react';

import { Helmet } from 'react-helmet-async';

import CopyLinkDialogProvider from '../../../components/CopyLinkDialogProvider';
import DeleteDialogProvider from '../../../components/DeleteDialogProvider';
import PageHeader from '../../../components/PageHeader';

import Content from './Content';

const headerHeight = '108px';
const contentStyle = {
  height: `calc(100% - ${headerHeight})`,
};

export default function Favourites() {
  return (
    <CopyLinkDialogProvider>
      <DeleteDialogProvider>
        <Helmet>
          <title>Shelf Photos</title>
        </Helmet>
        <div className="h-full">
          <PageHeader>
            <PageHeader.Title>Favourites</PageHeader.Title>
          </PageHeader>

          <div className="h-full w-full" style={contentStyle}>
            <Content />
          </div>
        </div>
      </DeleteDialogProvider>
    </CopyLinkDialogProvider>
  );
}
