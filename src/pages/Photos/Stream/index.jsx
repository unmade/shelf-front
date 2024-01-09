import React from 'react';

import { selectFileByIdInPath, useListFolderQuery } from '../../../store/files';

import VGrid from '../../../components/ui/VGrid';

import Gallery from './Gallery';
import GridItem from './GridItem';
import SelectionProvider from './SelectionProvider';

const columnCount = 5;

function Stream() {
  const path = 'photobook';

  const { ids, isFetching: loading } = useListFolderQuery(path, {
    selectFromResult: ({ data, isFetching }) => ({ ids: data?.ids, isFetching }),
  });

  const [initialIndex, setInitialIndex] = React.useState(null);
  const selectById = (state, id) => selectFileByIdInPath(state, { path, id });

  if (initialIndex != null) {
    return (
      <Gallery
        ids={ids}
        selectById={selectById}
        initialIndex={initialIndex}
        onClose={() => setInitialIndex(null)}
        path={path}
      />
    );
  }

  const data = {
    ids,
    selectById,
    path,
    columnCount,
    onDoubleClick: setInitialIndex,
  };

  return (
    <div className="px-4 h-full">
      {/* header */}
      <div className="px-2 py-8">
        <h1 className="text-xl font-medium">9 Sep 2021</h1>
      </div>

      {/* photo grid */}
      <SelectionProvider>
        <div className="h-[calc(100%-92px)]">
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
    </div>
  );
}

export default Stream;
