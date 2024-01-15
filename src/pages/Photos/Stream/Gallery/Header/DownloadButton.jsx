import React from 'react';
import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';

import * as icons from '../../../../../icons';
import { MediaItemShape } from '../../../../../types';

import { download } from '../../../../../store/files';

import Button from '../../../../../components/ui/Button';
import useFileFromMediaItem from '../../../hooks/file-from-media-item';

function DownloadButton({ className, mediaItem }) {
  const dispatch = useDispatch();

  const { path } = useFileFromMediaItem(mediaItem);

  return (
    <Button
      className={className}
      title="Download"
      variant="text"
      size="base"
      icon={<icons.Download className="h-5 w-5" />}
      onClick={() => dispatch(download(path))}
    />
  );
}

DownloadButton.propTypes = {
  className: PropTypes.string,
  mediaItem: MediaItemShape.isRequired,
};

DownloadButton.defaultProps = {
  className: '',
};

export default DownloadButton;
