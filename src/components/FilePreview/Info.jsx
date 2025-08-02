import React from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

import TimeAgo from '../ui-legacy/TimeAgo';

import SidePreviewActions from '../Browser/SidePreviewActions';

import BookmarkButton from '../BookmarkButton';
import FileTabs from '../FileTabs';

function Info({ className, fileId, selectById }) {
  const file = useSelector((state) => selectById(state, fileId));

  return (
    <div className={className}>
      <div className="flex">
        <div className="mr-4 w-full min-w-0 text-gray-800 dark:text-zinc-200">
          <p className="truncate text-lg font-semibold">{file.name}</p>
          <p className="text-xs font-medium text-gray-500 dark:text-zinc-400">
            <TimeAgo value={file.modified_at} />
          </p>
        </div>
        <div>
          <BookmarkButton
            fileId={file.id}
            className="hover:bg-orange-50 dark:hover:bg-orange-700/30"
            size="lg"
          />
        </div>
      </div>

      <div className="mt-4 flex justify-between py-3">
        <SidePreviewActions files={[file]} />
      </div>

      <div className="mt-4">
        <FileTabs file={file} />
      </div>
    </div>
  );
}

Info.propTypes = {
  className: PropTypes.string,
  fileId: PropTypes.string.isRequired,
  selectById: PropTypes.func.isRequired,
};

Info.defaultProps = {
  className: '',
};

export default Info;
