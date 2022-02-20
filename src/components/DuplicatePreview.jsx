import React from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

import { getFileById } from '../store/reducers/files';

import Button from './ui/Button';
import FileSize from './ui/FileSize';
import TimeAgo from './ui/TimeAgo';

import Thumbnail from './Thumbnail';

function FileProperty({ header, value }) {
  return (
    <div className="text-sm">
      <div className="font-medium text-gray-500">{header}</div>
      <div>{value}</div>
    </div>
  );
}

FileProperty.propTypes = {
  header: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
};

function DuplicatePreview({ fileId }) {
  const file = useSelector((state) => getFileById(state, fileId));
  if (fileId == null) {
    return null;
  }

  return (
    <div className="h-full">
      <div className="relative h-2/3 bg-gray-100">
        <Thumbnail
          className="absolute right-1/2 h-full translate-x-1/2 p-10"
          size="xl"
          fileId={file.id}
        />
      </div>
      <div className="mt-8 flex bg-white px-10">
        <div className="w-1/2 space-y-8">
          <FileProperty header="Name" value={file.name} />
          <FileProperty header="Path" value={file.path} />
        </div>
        <div className="w-1/2 space-y-8">
          <FileProperty header="Size" value={<FileSize size={file.size} />} />
          <FileProperty
            header="Modified date"
            value={<TimeAgo mtime={file.mtime * 1000} format="LLL" />}
          />
        </div>
        <div>
          <Button danger type="primary">
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DuplicatePreview;

DuplicatePreview.propTypes = {
  fileId: PropTypes.string,
};

DuplicatePreview.defaultProps = {
  fileId: null,
};