import React from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { selectCurrentPath } from '../store/browser';
import { selectFileByIdInPath, useMoveFileBatchMutation } from '../store/files';
import { scopes, waitForBackgroundTaskToComplete } from '../store/tasks';

import { fileDialogClosed } from '../store/actions/ui';

import { getFileDialogProps, getFileDialogVisible } from '../store/reducers/ui';

import { FileShape } from '../types';

import { MediaType } from '../constants';
import * as icons from '../icons';
import * as routes from '../routes';

import Dialog from './ui/Dialog';
import Input from './ui/Input';

function RenameFileDialog({ file, loading, uid, visible, onRename, onCancel }) {
  const { t } = useTranslation();

  const [name, setName] = React.useState((file && file.name) ?? null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    if (file != null) {
      setName(file.name);
    }
  }, [file]);

  React.useEffect(() => {
    if (!visible && error != null) {
      setError(null);
    }
  }, [visible, error, setError]);

  const onNameChange = (event) => {
    setName(event.target.value);
    if (error != null) {
      setError(null);
    }
  };

  const onConfirm = () => {
    if (name == null || name === '') {
      setError(t('Name cannot be empty.'));
    } else if (name === file.name) {
      setError(t('Name is the same.'));
    } else {
      const toPath = routes.join(routes.parent(file.path), name);
      onRename(file.path, toPath);
    }
  };

  const { mediatype } = file || {};
  const title = mediatype === MediaType.FOLDER ? t('Rename Folder') : t('Rename File');

  return (
    <Dialog
      title={title}
      icon={<icons.Edit className="h-6 w-6" />}
      visible={visible}
      confirmTitle={t('Rename')}
      confirmLoading={loading}
      onConfirm={onConfirm}
      onCancel={() => {
        onCancel(uid);
      }}
    >
      <form
        className="w-full sm:min-w-1.5xs"
        onSubmit={(e) => {
          e.preventDefault();
          onConfirm();
        }}
      >
        <Input
          id="name"
          label={t('Name')}
          placeholder={t('New name')}
          size="sm"
          error={error}
          onChange={onNameChange}
          defaultValue={name}
        />
      </form>
    </Dialog>
  );
}

RenameFileDialog.propTypes = {
  file: FileShape,
  loading: PropTypes.bool,
  uid: PropTypes.string.isRequired,
  visible: PropTypes.bool,
  onRename: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

RenameFileDialog.defaultProps = {
  file: null,
  loading: false,
  visible: false,
};

function RenameFileDialogContainer({ uid }) {
  const dispatch = useDispatch();

  const [moveFileBatch, { isLoading: loading }] = useMoveFileBatchMutation();

  const visible = useSelector((state) => getFileDialogVisible(state, { uid }));
  const { fileId } = useSelector((state) => getFileDialogProps(state, { uid }));

  const path = useSelector(selectCurrentPath);
  const file = useSelector((state) => selectFileByIdInPath(state, { path, id: fileId }));

  const onRename = async (fromPath, toPath) => {
    const relocations = [{ fromPath, toPath }];

    const {
      data: { taskId },
    } = await moveFileBatch(relocations);
    dispatch(
      waitForBackgroundTaskToComplete({
        taskId,
        scope: scopes.movingBatch,
        itemsCount: relocations.length,
      })
    );
    dispatch(fileDialogClosed(uid));
  };

  const onCancel = () => {
    dispatch(fileDialogClosed(uid));
  };

  return (
    <RenameFileDialog
      uid={uid}
      file={file}
      visible={visible}
      loading={loading}
      onRename={onRename}
      onCancel={onCancel}
    />
  );
}

RenameFileDialogContainer.propTypes = {
  uid: PropTypes.string.isRequired,
};

export default RenameFileDialogContainer;
