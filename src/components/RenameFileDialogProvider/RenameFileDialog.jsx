import React from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';

import Button from 'components/ui/Button';
import { Dialog, DialogTitle, DialogBody, DialogActions } from 'components/ui/Dialog';

import Field, { ErrorMessage } from 'components/ui/Field';
import Input from 'components/ui/Input';

import { FileShape } from '../../types';

import { MediaType } from '../../constants';
import * as routes from '../../routes';

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
    <Dialog open={visible} onClose={onCancel}>
      <DialogTitle>{title}</DialogTitle>
      <DialogBody>
        <form
          className="w-full sm:min-w-xs"
          onSubmit={(e) => {
            e.preventDefault();
            onConfirm();
          }}
        >
          <Field>
            <Input
              id="name"
              placeholder={t('New name')}
              invalid={error != null}
              onChange={onNameChange}
              defaultValue={name}
            />
            {error && <ErrorMessage>{error}</ErrorMessage>}
          </Field>
        </form>
      </DialogBody>
      <DialogActions>
        <Button variant="plain" color="gray" onClick={onCancel}>
          {t('Cancel')}
        </Button>
        <Button
          variant="primary"
          onClick={onConfirm}
          disabled={loading || name == null || name === ''}
        >
          {t('Rename')}
        </Button>
      </DialogActions>
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
