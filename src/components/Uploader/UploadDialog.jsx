import React from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';

import * as icons from '../../icons';

import UploadButton from '../../containers/Uploader/UploadButton';

import Dialog from '../ui/Dialog';

import RecentUploads from './RecentUploads';

function UploadDialog({ visible, onCancel }) {
  const { t } = useTranslation();

  return (
    <Dialog
      title={t('Uploads')}
      icon={<icons.CloudUploadOutlined className="h-6 w-6" />}
      confirmTitle={t('Browse')}
      confirmRender={() => <UploadButton full>{t('Browse')}</UploadButton>}
      visible={visible}
      onCancel={onCancel}
    >
      <RecentUploads />
    </Dialog>
  );
}

UploadDialog.propTypes = {
  visible: PropTypes.bool,
  onCancel: PropTypes.func,
};

UploadDialog.defaultProps = {
  visible: false,
  onCancel: null,
};

export default UploadDialog;
