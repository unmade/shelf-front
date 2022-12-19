import React, { useCallback } from 'react';

import { selectFileByIdInPath, useListFolderQuery } from '../store/files';

import FilePreview from '../components/FilePreview';

function FilePreviewContainer({ dirPath }) {
  const { ids = [], isFetching: loading } = useListFolderQuery(dirPath, {
    selectFromResult: ({ data, isFetching }) => ({ ids: data?.ids, isFetching }),
  });

  const selectById = useCallback(
    (state, id) => selectFileByIdInPath(state, { path: dirPath, id }),
    [dirPath]
  );

  return <FilePreview ids={ids} loading={loading} selectById={selectById} />;
}

export default FilePreviewContainer;
