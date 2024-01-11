import React from 'react';

import { Helmet } from 'react-helmet-async';

import { selectFileByIdInPath, useListFolderQuery } from '../../../store/files';

import { Breakpoint, useBreakpoint } from '../../../hooks/media-query';

import FileDrop from '../../../containers/FileDrop';

import VGrid from '../../../components/ui/VGrid';

import CopyLinkDialogProvider from '../../../components/CopyLinkDialogProvider';
import DeleteDialogProvider from '../../../components/DeleteDialogProvider';
import PageHeader from '../../../components/PageHeader';
import SearchButton from '../../../components/SearchButton';
import Uploader from '../../../components/Uploader';

import Gallery from './Gallery';
import GridItem from './GridItem';
import SelectionProvider from './SelectionProvider';
import Welcome from './Welcome';

const headerHeight = '108px';

function useGridLayout() {
  const breakpoint = useBreakpoint();
  if (breakpoint === Breakpoint.base) {
    return { columnCount: 3 };
  }
  return { columnCount: 5 };
}

function Stream() {
  const [initialIndex, setInitialIndex] = React.useState(null);
  const { columnCount } = useGridLayout();

  const path = 'photobook';
  const { ids, isFetching: loading } = useListFolderQuery(path, {
    selectFromResult: ({ data, isFetching }) => ({ ids: data?.ids, isFetching }),
  });
  const selectById = (state, id) => selectFileByIdInPath(state, { path, id });

  const uploadTo = 'Photos/Uploads';
  if (initialIndex != null) {
    return (
      <DeleteDialogProvider>
        <Helmet>
          <title>Shelf Photos</title>
        </Helmet>
        <Gallery
          ids={ids}
          selectById={selectById}
          initialIndex={initialIndex}
          onClose={() => setInitialIndex(null)}
          path={uploadTo}
        />
      </DeleteDialogProvider>
    );
  }

  const data = {
    ids,
    selectById,
    path: uploadTo,
    columnCount,
    onDoubleClick: setInitialIndex,
  };

  const content =
    !ids?.length && !loading ? (
      <div className={`h-[calc(100%-${headerHeight})] flex`}>
        <Welcome uploadTo={uploadTo} />
      </div>
    ) : (
      <SelectionProvider>
        <div className="h-full">
          <VGrid
            itemRenderer={GridItem}
            itemData={data}
            columnCount={columnCount}
            rowCount={Math.ceil((ids?.length ?? 0) / columnCount)}
            rowHeightOffset={24}
            loading={loading}
          />
        </div>
      </SelectionProvider>
    );

  return (
    <CopyLinkDialogProvider>
      <DeleteDialogProvider>
        <Helmet>
          <title>Shelf Photos</title>
        </Helmet>
        <div className="h-full">
          <PageHeader>
            <PageHeader.Title>Photos</PageHeader.Title>
            <PageHeader.Actions>
              <SearchButton />
              <Uploader uploadTo="Photos/Uploads" />
            </PageHeader.Actions>
          </PageHeader>

          {/* photo grid */}
          <FileDrop
            className={`h-[calc(100%-${headerHeight})] overflow-y-auto`}
            uploadTo={uploadTo}
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
                {content}
              </div>
            )}
          />
        </div>
      </DeleteDialogProvider>
    </CopyLinkDialogProvider>
  );
}

export default Stream;
