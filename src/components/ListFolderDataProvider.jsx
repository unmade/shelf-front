import React, { createContext, useCallback } from 'react';

import { useSelector } from 'react-redux';

import { selectCurrentPath } from '../store/browser';
import { selectFileByIdInPath, useListFolderQuery } from '../store/files';

export const ListFolderDataContext = createContext(null);

function ListFolderDataProvider({ children }) {
  const path = useSelector(selectCurrentPath);

  const { ids, isFetching: loading } = useListFolderQuery(path, {
    selectFromResult: ({ data, isFetching }) => ({ ids: data?.ids, isFetching }),
  });

  const selectById = useCallback((state, id) => selectFileByIdInPath(state, { path, id }), [path]);

  return (
    <ListFolderDataContext.Provider value={{ ids, loading, selectById }}>
      {children}
    </ListFolderDataContext.Provider>
  );
}

export default ListFolderDataProvider;
