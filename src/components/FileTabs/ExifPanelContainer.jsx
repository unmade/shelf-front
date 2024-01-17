import React from 'react';
import PropTypes from 'prop-types';

import { useGetContentMetadataQuery } from '../../store/files';

import FileTabPanels from '../FileTabPanels';

function ExifPanelContainer({ fileId, thumbnailUrl }) {
  const { data, isFetching: loading } = useGetContentMetadataQuery(fileId, {
    skip: thumbnailUrl == null,
  });

  return <FileTabPanels.Exif meta={data?.data} loading={loading} />;
}

ExifPanelContainer.propTypes = {
  fileId: PropTypes.string.isRequired,
  thumbnailUrl: PropTypes.string,
};

ExifPanelContainer.defaultProps = {
  thumbnailUrl: null,
};

export default ExifPanelContainer;
