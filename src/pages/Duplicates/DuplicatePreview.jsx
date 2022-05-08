import React from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';

import { openDialog } from '../../store/actions/ui';
import { getFileById } from '../../store/reducers/files';

import { Dialogs } from '../../constants';
import * as icons from '../../icons';
import * as routes from '../../routes';

import Button from '../../components/ui/Button';
import FileSize from '../../components/ui/FileSize';
import TimeAgo from '../../components/ui/TimeAgo';
import Thumbnail from '../../components/Thumbnail';

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
  const dispatch = useDispatch();

  const file = useSelector((state) => getFileById(state, fileId));
  if (file == null) {
    return null;
  }

  const onDelete = () => {
    dispatch(openDialog(Dialogs.delete, { fileIds: [fileId] }));
  };

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
          <FileProperty header="Path" value={routes.parent(file.path)} />
        </div>
        <div className="w-1/2 space-y-8">
          <FileProperty header="Size" value={<FileSize size={file.size} />} />
          <FileProperty
            header="Modified date"
            value={<TimeAgo mtime={file.mtime * 1000} format="LLL" />}
          />
        </div>
        <div className="space-x-8">
          <Button
            type="primary"
            icon={<icons.TrashOutlined className="h-4 w-4" />}
            danger
            onClick={onDelete}
          >
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
