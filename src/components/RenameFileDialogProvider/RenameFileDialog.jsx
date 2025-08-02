import React from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';

import { FileShape } from '../../types';

import { MediaType } from '../../constants';
import * as icons from '../../icons';
import * as routes from '../../routes';

import Dialog from '../ui-legacy/Dialog';
import Input from '../ui-legacy/Input';

function RenameFileDialog({ file, loading, visible, onRename, onCancel }) {
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
        onCancel();
      }}
    >
      <form
        className="w-full sm:min-w-3xs"
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
  visible: PropTypes.bool,
  onRename: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

RenameFileDialog.defaultProps = {
  file: null,
  loading: false,
  visible: false,
};

export default RenameFileDialog;
