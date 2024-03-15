import React from 'react';

import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import PageHeader from 'components/PageHeader';

import DeleteMediaItemsImmediatelyDialogProvider from 'components/photos/DeleteMediaItemsImmediatelyDialogProvider';
import EmptyMediaItemsTrashDialogProvider from 'components/photos/EmptyMediaItemsTrashDialogProvider';

import Content from './Content';
import EmptyTrashDialogButton from './EmptyTrashDialogButton';

const headerHeight = '108px';
const contentStyle = {
  height: `calc(100% - ${headerHeight})`,
};

export default function Trash() {
  const { t } = useTranslation('photos');

  const title = t('photos:pages.trash.title', { defaultValue: 'Trash' });

  return (
    <DeleteMediaItemsImmediatelyDialogProvider>
      <EmptyMediaItemsTrashDialogProvider>
        <Helmet>
          <title>Shelf Photos</title>
        </Helmet>
        <div className="h-full">
          <PageHeader>
            <PageHeader.Title>{title}</PageHeader.Title>
            <PageHeader.Actions>
              <EmptyTrashDialogButton />
            </PageHeader.Actions>
          </PageHeader>

          <div className="h-full w-full" style={contentStyle}>
            <Content />
          </div>
        </div>
      </EmptyMediaItemsTrashDialogProvider>
    </DeleteMediaItemsImmediatelyDialogProvider>
  );
}
