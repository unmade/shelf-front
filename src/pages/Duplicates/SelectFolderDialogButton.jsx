import React from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import * as routes from '../../routes';

import Button from '../../components/ui/Button';
import Dialog from '../../components/ui/Dialog';

import FolderPicker from '../../components/FolderPicker';

function SelectFolderDialogButton({ type, children, dirPath, icon, onSelectFolder }) {
  const { t } = useTranslation('duplicates');

  const navigate = useNavigate();

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
    navigate(routes.join(routes.DUPLICATES.prefix, path));
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
        title={t('duplicates:action.selectFolder')}
        size="base"
        icon={icon}
        onClick={showDialog}
        full
      >
        {children}
      </Button>

      <Dialog
        title={t('duplicates:selectFolderDialogTitle')}
        visible={visible}
        confirmTitle={t('duplicates:selectFolderDialogConfirmButton')}
        onConfirm={onConfirm}
        onCancel={hideDialog}
      >
        <div className="mt-4 h-96 w-full sm:w-96">
          <FolderPicker
            emptyTitle={t('duplicates:folderPickerEmptyTitle')}
            initialPath={dirPath}
            onPathChange={onPathChange}
            onlyFolders
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
