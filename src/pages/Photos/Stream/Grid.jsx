import React, { useCallback, useState } from 'react';

import { useSelector } from 'react-redux';

import VGrid from 'components/ui/VGrid';

import { Breakpoint, useBreakpoint } from 'hooks/media-query';

import { selectPhotosLibraryPath } from 'store/features';
import { useListMediaItemsQuery } from 'store/photos';

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

function Grid() {
  const [initialFileId, setInitialFileId] = useState(null);
  const [scrollIndex, setScrollIndex] = useState(null);

  const { columnCount } = useGridLayout();
  const { ids, isFetching: loading } = useListMediaItemsQuery(undefined, {
    selectFromResult: ({ data, isFetching }) => ({ ids: data?.ids, isFetching }),
  });

  const onClose = useCallback(
    ({ currentIndex }) => {
      setScrollIndex(Math.floor(currentIndex / columnCount));
      setInitialFileId(null);
    },
    [setScrollIndex, setInitialFileId],
  );

  const scrollToItem = useCallback(
    (el) => {
      if (scrollIndex != null) {
        el?.scrollToItem({
          align: 'center',
          rowIndex: scrollIndex,
        });
      }
    },
    [scrollIndex],
  );

  const data = {
    ids,
    columnCount,
    onClick: setInitialFileId,
  };

  return (
    <div className="h-full">
      {initialFileId != null && (
        <Gallery ids={ids} initialFileId={initialFileId} onClose={onClose} />
      )}
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
  );
}

Grid.propTypes = {};

function GridContainer() {
  const { empty } = useListMediaItemsQuery(undefined, {
    selectFromResult: ({ data, isFetching }) => ({
      empty: data?.ids?.length != null && data?.ids?.length === 0 && !isFetching,
    }),
  });

  const libraryPath = useSelector(selectPhotosLibraryPath);

  if (empty) {
    return (
      <div className="flex" style={contentStyle}>
        <Welcome uploadTo={libraryPath} />
      </div>
    );
  }

  return (
    <SelectionProvider>
      <Grid />
    </SelectionProvider>
  );
}

GridContainer.propTypes = {};

export default GridContainer;
