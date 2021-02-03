import React from 'react';
import PropTypes from 'prop-types';

import * as icons from '../icons';
import { FileType, TRASH_FOLDER_NAME } from '../constants';

import FileActions from '../containers/FileActions';

import DeletedFileActions from './DeletedFileActions';
import Dropdown from './Dropdown';

function getActionsByType(type, path) {
  if (path !== TRASH_FOLDER_NAME && path.startsWith(TRASH_FOLDER_NAME)) {
    return DeletedFileActions;
  }
  const map = {
    [FileType.FILE]: FileActions,
    [FileType.FOLDER]: FileActions,
  };

  return map[type];
}

function FileTableCellActions({ id, type, path }) {
  const Actions = getActionsByType(type, path);
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
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

export default FileTableCellActions;
