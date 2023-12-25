import React from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';

import * as icons from '../../icons';

import Dialog from '../ui/Dialog';

import FileMembersSetting from '../FileMembersSetting';

function FileMembersDialog({ fileId, visible, onClose }) {
  const { t } = useTranslation();

  const closeDialog = () => {
    onClose();
  };

  const onConfirm = () => {
    onClose();
  };

  return (
    <Dialog
      title={t('Share with other members')}
      icon={<icons.ShareOutlined className="h-6 w-6" />}
      visible={visible}
      confirmTitle={t('Done')}
      confirmLoading={false}
      onConfirm={onConfirm}
      onCancel={closeDialog}
    >
      <div className="my-4 lg:min-w-[20rem]">
        {fileId && <FileMembersSetting fileId={fileId} />}
      </div>
    </Dialog>
  );
}

FileMembersDialog.propTypes = {
  fileId: PropTypes.string,
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

FileMembersDialog.defaultProps = {
  fileId: null,
};

export default FileMembersDialog;
