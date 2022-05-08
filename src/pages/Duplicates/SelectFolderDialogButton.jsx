import React from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import * as routes from '../../routes';

import Button from '../../components/ui/Button';
import Dialog from '../../components/ui/Dialog';

import FolderPicker from '../../components/FolderPicker';

function SelectFolderDialogButton({ type, children, dirPath, icon, onSelectFolder }) {
  const { t } = useTranslation();

  const history = useHistory();

  const [visible, setVisible] = React.useState(false);
  const [path, setPath] = React.useState(dirPath);

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
    if (onSelectFolder != null) {
      onSelectFolder(path);
    }
  };

  return (
    <>
      <Button
        className="relative"
        type={type}
        title={t('Select folder')}
        size="base"
        icon={icon}
        onClick={showDialog}
        full
      >
        {children}
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
  type: PropTypes.string,
  dirPath: PropTypes.string.isRequired,
  icon: PropTypes.element,
  onSelectFolder: PropTypes.func,
};

SelectFolderDialogButton.defaultProps = {
  type: 'default',
  icon: null,
  onSelectFolder: null,
};
