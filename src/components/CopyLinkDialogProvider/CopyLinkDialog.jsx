import React from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';

import * as icons from '../../icons';
import { FileShape } from '../../types';

import Dialog from '../ui/Dialog';

import SharedLinkSetting from '../SharedLinkSetting';

function CopyLinkDialog({ file, visible, onClose }) {
  const { t } = useTranslation();

  const closeDialog = () => {
    onClose();
  };

  const onConfirm = () => {
    onClose();
  };

  return (
    <Dialog
      title={t('Share read-only link')}
      icon={<icons.LinkOutlined className="h-6 w-6" />}
      visible={visible}
      confirmTitle={t('Done')}
      confirmLoading={false}
      onConfirm={onConfirm}
      onCancel={closeDialog}
    >
      <SharedLinkSetting file={file} />
    </Dialog>
  );
}

CopyLinkDialog.propTypes = {
  file: FileShape,
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

CopyLinkDialog.defaultProps = {
  file: null,
};

export default CopyLinkDialog;
