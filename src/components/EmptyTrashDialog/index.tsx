import React from 'react';

import { Trans, useTranslation } from 'react-i18next';

import * as icons from 'icons';

import Dialog from 'components/ui/Dialog';

interface Props {
  loading: boolean;
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function EmptyTrashDialog({ loading, visible, onConfirm, onCancel }: Props) {
  const { t } = useTranslation();

  return (
    <Dialog
      title={t('Empty Trash')}
      icon={<icons.TrashOutlined className="h-6 w-6" />}
      visible={visible}
      confirmTitle={t('Empty')}
      confirmLoading={loading}
      confirmDanger
      onConfirm={onConfirm}
      onCancel={onCancel}
    >
      <p>
        <Trans i18nKey="empty_trash_dialog_text_styled" t={t}>
          Are you sure you want to delete
          <b className="text-gray-700 dark:text-zinc-200">all</b>
          files in the Trash?
        </Trans>
      </p>
    </Dialog>
  );
}
