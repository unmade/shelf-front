import React from 'react';
import PropTypes from 'prop-types';

import * as icons from '../icons';

import RecentUploads from '../containers/RecentUploads';
import UploadButton from '../containers/UploadButton';

import Dialog from './ui/Dialog';

function UploadDialog({ visible, onCancel }) {
  return (
    <Dialog
      title="Uploads"
      icon={<icons.CloudUploadOutlined className="w-6 h-6" />}
      confirmTitle="Browse"
      confirmRender={() => <UploadButton>Browse</UploadButton>}
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
