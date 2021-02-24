import React from 'react';
import PropTypes from 'prop-types';

import * as icons from '../icons';
import { TRASH_FOLDER_NAME } from '../constants';

import DeletedFileActions from '../containers/DeletedFileActions';
import FileActions from '../containers/FileActions';

import Dropdown from './ui/Dropdown';

function getActionsByType(path) {
  // this is just a skeleton method
  if (path !== TRASH_FOLDER_NAME && path.startsWith(TRASH_FOLDER_NAME)) {
    return DeletedFileActions;
  }

  return FileActions;
}

function FileTableCellActions({ id, path, isDir }) {
  const Actions = getActionsByType(path, isDir);
  if (!Actions) {
    return null;
  }
  return (
    <Dropdown
      overlay={Actions}
      overlayProps={{ fileId: id, filePath: path }}
    >
      <button type="button" className="font-bold p-2 rounded-full">
        <icons.More />
      </button>
    </Dropdown>
  );
}

FileTableCellActions.propTypes = {
  id: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  isDir: PropTypes.bool.isRequired,
};

export default FileTableCellActions;
