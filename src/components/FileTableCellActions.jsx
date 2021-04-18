import React from 'react';
import PropTypes from 'prop-types';

import * as icons from '../icons';
import { TRASH_FOLDER_NAME } from '../constants';

import DeletedFileActions from '../containers/DeletedFileActions';
import FileActions from '../containers/FileActions';

import Button from './ui/Button';
import Dropdown from './ui/Dropdown';

function getActionsByType(path) {
  // this is just a skeleton method
  if (path !== TRASH_FOLDER_NAME && path.startsWith(TRASH_FOLDER_NAME)) {
    return DeletedFileActions;
  }

  return FileActions;
}

function FileTableCellActions({ id, path, mediaType }) {
  const Actions = getActionsByType(path, mediaType);
  return (
    <Dropdown
      overlay={() => (
        <Actions fileId={id} filePath={path} />
      )}
    >
      <Button as="div" type="text" icon={<icons.More />} />
    </Dropdown>
  );
}

FileTableCellActions.propTypes = {
  id: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  mediaType: PropTypes.string.isRequired,
};

export default FileTableCellActions;
