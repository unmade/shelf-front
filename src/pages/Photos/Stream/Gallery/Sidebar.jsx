import React from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

import FileSize from '../../../../components/ui/FileSize';

import Exif from '../../../../components/Exif';

function Sidebar({ className, fileId, selectById }) {
  const file = useSelector((state) => selectById(state, fileId));

  return (
    <div className={className}>
      <div className="flex">
        <div className="mr-4 w-full min-w-0 text-gray-800 dark:text-zinc-200">
          <p className="truncate text-lg font-semibold">{file.name}</p>
          <p className="text-xs font-medium text-gray-500 dark:text-zinc-400">
            <FileSize size={file.size} />
          </p>
        </div>
      </div>

      <div className="pt-8">
        <Exif path={file.path} />
      </div>
    </div>
  );
}

Sidebar.propTypes = {
  className: PropTypes.string,
  fileId: PropTypes.string.isRequired,
  selectById: PropTypes.func.isRequired,
};

Sidebar.defaultProps = {
  className: '',
};

export default Sidebar;
