import React from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';

import { Button } from '@/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogBody,
  DialogClose,
} from '@/ui/dialog';
import { Field, FieldError } from '@/ui/field';
import { Input } from '@/ui/input';

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

  const handleConfirm = (event) => {
    event.preventDefault();
    if (name == null || name === '') {
      setError(t('Name cannot be empty.'));
    } else if (name === file.name) {
      setError(t('Name is the same.'));
    } else {
      const toPath = routes.join(routes.parent(file.path), name);
      onRename(file.path, toPath);
    }
  };

  const handleCancel = (open) => {
    if (!open) {
      onCancel();
    }
  };

  const { mediatype } = file || {};
  const title = mediatype === MediaType.FOLDER ? t('Rename Folder') : t('Rename File');

  return (
    <Dialog open={visible} onOpenChange={handleCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <form className="w-full sm:min-w-xs" onSubmit={handleConfirm}>
          <DialogBody>
            <Field data-invalid={error != null}>
              <Input
                id="name"
                name="name"
                placeholder={t('New name')}
                aria-invalid={error != null}
                onChange={onNameChange}
                defaultValue={name}
              />
              {error && <FieldError>{error}</FieldError>}
            </Field>
          </DialogBody>
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">{t('Cancel')}</Button>
          </DialogClose>
          <Button type="submit" disabled={loading || name == null || name === ''}>
            {t('Rename')}
          </Button>
        </DialogFooter>
      </DialogContent>
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
