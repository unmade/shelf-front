import React from 'react';

import { Trans, useTranslation } from 'react-i18next';

import * as icons from 'icons';

import Dialog from '../ui/Dialog';

interface Props {
  names: string[];
  loading: boolean;
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteDialog({ names, loading, visible, onConfirm, onCancel }: Props) {
  const { t } = useTranslation();

  const count = names.length;
  const fileName = names[0];

  const dialogText =
    names.length === 1 ? (
      <Trans i18nKey="delete_dialog_text" t={t} values={{ fileName }}>
        Are you sure you want to move
        <b className="text-gray-700 dark:text-zinc-200">{fileName}</b>
        to trash?
      </Trans>
    ) : (
      <Trans i18nKey="delete_dialog_batch_text" t={t} count={count}>
        Are you sure you want to move
        {/* @ts-expect-error: need to update react-i18n */}
        <b className="text-gray-700 dark:text-zinc-200">{{ count }}</b>
        to trash?
      </Trans>
    );

  return (
    <Dialog
      title={t('delete_dialog_title', { count })}
      icon={<icons.TrashOutlined className="h-6 w-6" />}
      visible={visible}
      confirmTitle={t('Delete')}
      confirmLoading={loading}
      confirmDanger
      onConfirm={onConfirm}
      onCancel={onCancel}
    >
      <p>{dialogText}</p>
    </Dialog>
  );
}
