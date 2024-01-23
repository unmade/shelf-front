import React from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

import useFileFromMediaItem from '../../hooks/file-from-media-item';

import { selectMediaItemById } from '../../../../store/photos';

import FileSize from '../../../../components/ui/FileSize';

import Exif from '../../../../components/Exif';

import Categories from './Categories';

function Sidebar({ className, mediaItemId }) {
  const mediaItem = useSelector((state) => selectMediaItemById(state, mediaItemId));
  const file = useFileFromMediaItem(mediaItem);

  return (
    <div className={className}>
      <div className="flex">
        <div className="mr-4 w-full min-w-0 text-gray-800 dark:text-zinc-200">
          <p className="truncate text-lg font-semibold">{mediaItem.name}</p>
          <p className="text-xs font-medium text-gray-500 dark:text-zinc-400">
            <FileSize size={mediaItem.size} />
          </p>
        </div>
      </div>

      <div className="pt-8">
        <Exif fileId={file.id} />
      </div>
      <div className="pt-8">
        <Categories fileId={file.id} />
      </div>
    </div>
  );
}

Sidebar.propTypes = {
  className: PropTypes.string,
  mediaItemId: PropTypes.string.isRequired,
};

Sidebar.defaultProps = {
  className: '',
};

export default Sidebar;
