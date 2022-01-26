import React from 'react';
import PropTypes from 'prop-types';

import { Trans, useTranslation } from 'react-i18next';

import * as icons from '../icons';

import Dialog from './ui/Dialog';

function EmptyTrashDialog({ loading, uid, visible, onEmpty, onCancel }) {
  const { t } = useTranslation();

  return (
    <Dialog
      title={t('Empty Trash')}
      icon={<icons.TrashOutlined className="h-6 w-6" />}
      visible={visible}
      confirmTitle={t('Empty')}
      confirmLoading={loading}
      confirmDanger
      onConfirm={onEmpty}
      onCancel={() => {
        onCancel(uid);
      }}
    >
      <p>
        <Trans i18nKey="empty_trash_dialog_text_styled" t={t}>
          Are you sure you want to delete
          <b className="text-gray-700">all</b>
          files in the Trash?
        </Trans>
      </p>
    </Dialog>
  );
}

EmptyTrashDialog.propTypes = {
  loading: PropTypes.bool,
  uid: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  onEmpty: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

EmptyTrashDialog.defaultProps = {
  loading: false,
};

export default EmptyTrashDialog;
