import React from 'react';
import PropTypes from 'prop-types';

import { useHistory } from 'react-router-dom';

import * as icons from '../../icons';
import * as routes from '../../routes';

import Button from '../../components/ui/Button';
import Dialog from '../../components/ui/Dialog';

import FolderPicker from '../../components/FolderPicker';

function SelectFolderDialogButton({ dirPath }) {
  const history = useHistory();

  const [visible, setVisible] = React.useState(false);
  const [path, setPath] = React.useState(dirPath);
  const name = routes.folderName(dirPath);

  const onPathChange = React.useCallback((nextPath) => setPath(nextPath), [setPath]);

  const showDialog = () => {
    setVisible(true);
  };

  const hideDialog = () => {
    setVisible(false);
  };

  const onConfirm = () => {
    history.push(routes.join(routes.DUPLICATES.prefix, path));
    setVisible(false);
  };

  return (
    <>
      <Button
        className="relative"
        type="default"
        title="Select folder"
        size="base"
        icon={<icons.Folder className="h-5 w-5 text-blue-400" />}
        onClick={showDialog}
        full
      >
        <span className="text-sm">{name}</span>
        <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
          <icons.Selector className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
      </Button>

      <Dialog
        title="Select Folder"
        visible={visible}
        confirmTitle="Select"
        onConfirm={onConfirm}
        onCancel={hideDialog}
      >
        <div className="mt-4 h-96 w-full sm:w-96">
          <FolderPicker
            emptyTitle="Nothing here yet"
            initialPath={dirPath}
            onPathChange={onPathChange}
          />
        </div>
      </Dialog>
    </>
  );
}

export default SelectFolderDialogButton;

SelectFolderDialogButton.propTypes = {
  dirPath: PropTypes.string.isRequired,
};
