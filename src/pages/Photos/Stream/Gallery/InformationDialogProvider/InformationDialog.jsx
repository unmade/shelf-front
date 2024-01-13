import React from 'react';
import PropTypes from 'prop-types';

import { FileShape } from '../../../../../types';

import Dialog from '../../../../../components/ui/Dialog';
import FileSize from '../../../../../components/ui/FileSize';
import TimeAgo from '../../../../../components/ui/TimeAgo';

import Exif from '../../../../../components/Exif';

function InformationDialog({ file, visible, onClose }) {
  return (
    <Dialog title={file?.name ?? ''} visible={visible} onCancel={onClose}>
      <div className="flex">
        <div className="mr-4 w-full min-w-0 text-gray-800 dark:text-zinc-200">
          <p className="text-xs font-medium text-gray-500 dark:text-zinc-400">
            <FileSize size={file?.size ?? 0} />
          </p>
        </div>
      </div>

      <div className="pt-4">
        <p className=" px-2 text-gray-800 dark:text-zinc-100 text-left">
          <TimeAgo mtime={file?.mtime * 1000} format="LLLL" />
        </p>
        {file && <Exif path={file.path} />}
      </div>
    </Dialog>
  );
}

InformationDialog.propTypes = {
  file: FileShape,
  visible: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};

InformationDialog.defaultProps = {
  file: null,
  visible: false,
};

export default InformationDialog;
