import { useTranslation } from 'react-i18next';

import { TrashIcon } from '@/icons';

import { Button } from '@/ui/button';

import { useEmptyTrashDialog } from '@/apps/photos/components/dialogs';

export default function EmptyTrashDialogButton() {
  const { t } = useTranslation('photos');

  const { openDialog } = useEmptyTrashDialog();

  return (
    <Button
      variant="destructive"
      size="icon"
      title={t('photos:actions.emptyTrash', { defaultValue: 'Empty Trash' })}
      onClick={openDialog}
    >
      <TrashIcon className="h-5 w-5 shrink-0" />
    </Button>
  );
}
