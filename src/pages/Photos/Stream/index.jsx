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
const contentStyle = {
  height: `calc(100% - ${headerHeight})`,
};

function useGridLayout() {
  const breakpoint = useBreakpoint();
  if (breakpoint === Breakpoint.base) {
    return { columnCount: 3 };
  }
  return { columnCount: 5 };
}

function Stream() {
  const [initialIndex, setInitialIndex] = React.useState(null);
  const [scrollIndex, setScrollIndex] = React.useState(null);
  const { columnCount } = useGridLayout();

  const path = 'exif';
  const { ids, isFetching: loading } = useListFolderQuery(path, {
    selectFromResult: ({ data, isFetching }) => ({ ids: data?.ids, isFetching }),
  });
  const selectById = (state, id) => selectFileByIdInPath(state, { path, id });

  const onClose = ({ currentIndex }) => {
    setScrollIndex(Math.floor(currentIndex / columnCount));
    setInitialIndex(null);
  };

  const scrollToItem = React.useCallback(
    (el) => {
      if (scrollIndex != null) {
        el?.scrollToItem({
          align: 'center',
          rowIndex: scrollIndex,
        });
      }
    },
    [scrollIndex]
  );

  const uploadTo = 'Photos/Uploads';
  const data = {
    ids,
    selectById,
    path: uploadTo,
    columnCount,
    onClick: setInitialIndex,
  };

  const content =
    !ids?.length && !loading ? (
      <div className="flex" style={contentStyle}>
        <Welcome uploadTo={uploadTo} />
      </div>
    ) : (
      <SelectionProvider>
        {initialIndex != null && (
          <Gallery
            ids={ids}
            selectById={selectById}
            initialIndex={initialIndex}
            onClose={onClose}
            path={uploadTo}
          />
        )}
        <div className="h-full">
          <VGrid
            innerRef={scrollToItem}
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
            className="overflow-y-auto"
            style={contentStyle}
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
