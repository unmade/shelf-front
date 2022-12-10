import React from 'react';

import { useListFolderQuery } from '../store/files';

import FilePreview from '../components/FilePreview';

function FilePreviewContainer({ dirPath, pathToPreview }) {
  const { data, isFetching: loading } = useListFolderQuery(dirPath);

  const files = React.useMemo(
    () => data?.ids.map((id) => data?.entities[id]) ?? [],
    [data?.ids, data?.entities]
  );
  return <FilePreview pathToPreview={pathToPreview} files={files} loading={loading} />;
}

export default FilePreviewContainer;
