import { useTranslation } from 'react-i18next';

import * as icons from 'icons';

import Button from 'components/ui/Button';

import { useEmptyMediaItemsTrashDialog } from 'components/photos/EmptyMediaItemsTrashDialogProvider';

export default function EmptyTrashDialogButton() {
  const { t } = useTranslation('photos');

  const { openDialog } = useEmptyMediaItemsTrashDialog();

  return (
    <Button
      variant="primary"
      color="danger"
      title={t('photos:actions.emptyTrash', { defaultValue: 'Empty Trash' })}
      size="base"
      onClick={openDialog}
      icon={<icons.TrashOutlined className="h-5 w-5 shrink-0" />}
    />
  );
}
