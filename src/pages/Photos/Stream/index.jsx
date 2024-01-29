import React from 'react';

import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';

import { selectPhotosLibraryPath } from 'store/features';

import FileDrop from 'containers/FileDrop';

import CopyLinkDialogProvider from 'components/CopyLinkDialogProvider';
import PageHeader from 'components/PageHeader';
import SearchButton from 'components/SearchButton';
import Uploader from 'components/Uploader';

import DeleteMediaItemsDialogProvider from 'components/photos/DeleteMediaItemsDialogProvider';

import Content from './Content';

const headerHeight = '108px';
const contentStyle = {
  height: `calc(100% - ${headerHeight})`,
};

export default function Stream() {
  const libraryPath = useSelector(selectPhotosLibraryPath);

  return (
    <CopyLinkDialogProvider>
      <DeleteMediaItemsDialogProvider>
        <Helmet>
          <title>Shelf Photos</title>
        </Helmet>
        <div className="h-full">
          <PageHeader>
            <PageHeader.Title>Photos</PageHeader.Title>
            <PageHeader.Actions>
              <SearchButton />
              <Uploader uploadTo={libraryPath} />
            </PageHeader.Actions>
          </PageHeader>

          {/* photo grid */}
          <FileDrop
            className="overflow-y-auto"
            style={contentStyle}
            uploadTo={libraryPath}
            render={({ innerRef, dragging }) => (
              <div className="relative h-full w-full">
                <div
                  ref={innerRef}
                  className={`${
                    dragging ? 'block' : 'hidden'
                  } absolute z-10 h-full w-full px-2 pb-2`}
                >
                  <div className="h-full w-full rounded-2xl border-4 border-dashed border-teal-200 dark:border-teal-600" />
                </div>
                <Content />
              </div>
            )}
          />
        </div>
      </DeleteMediaItemsDialogProvider>
    </CopyLinkDialogProvider>
  );
}
