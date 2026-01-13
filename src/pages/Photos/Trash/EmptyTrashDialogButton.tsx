import { useTranslation } from 'react-i18next';

import * as icons from '@/icons';

import { Button } from '@/ui/button';

import { useEmptyMediaItemsTrashDialog } from '@/components/photos/EmptyMediaItemsTrashDialogProvider';

export default function EmptyTrashDialogButton() {
  const { t } = useTranslation('photos');

  const { openDialog } = useEmptyMediaItemsTrashDialog();

  return (
    <Button
      variant="destructive"
      size="icon"
      title={t('photos:actions.emptyTrash', { defaultValue: 'Empty Trash' })}
      onClick={openDialog}
    >
      <icons.TrashOutlined className="h-5 w-5 shrink-0" />
    </Button>
  );
}
