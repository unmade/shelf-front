import React from 'react';

import { useGetContentMetadataQuery } from '../../store/files';

import FileTabPanels from '../FileTabPanels';

function ExifPanelContainer({ path, thumbnailUrl }) {
  const { data, isFetching: loading } = useGetContentMetadataQuery(path, {
    skip: thumbnailUrl == null,
  });

  return <FileTabPanels.Exif meta={data?.data} loading={loading} />;
}

export default ExifPanelContainer;
