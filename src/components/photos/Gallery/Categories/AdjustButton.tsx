import { useTranslation } from 'react-i18next';

import { Button } from '@/ui/button';

import { useAdjustCategoriesDialogContext } from '../AdjustCategoriesDialogProvider';

interface Props {
  fileId: string;
}

export default function AdjustButton({ fileId }: Props) {
  const { t } = useTranslation(['photos']);

  const adjustButtonText = t('photos:mediaItem.categories.adjustButton', {
    defaultValue: 'Adjust',
  });

  const { openDialog } = useAdjustCategoriesDialogContext();

  return (
    <>
      <Button
        className="md:hidden"
        variant="ghost"
        onClick={() => {
          openDialog(fileId);
        }}
      >
        {adjustButtonText}
      </Button>
      <Button
        className="hidden md:flex"
        variant="ghost"
        onClick={() => {
          openDialog(fileId);
        }}
      >
        {adjustButtonText}
      </Button>
    </>
  );
}
