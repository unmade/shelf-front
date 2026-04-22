import { useTranslation } from 'react-i18next';

import { Button } from '@/ui/button';

import { useAdjustCategoriesDialogContext } from '../AdjustCategoriesDialogProvider';

interface Props {
  mediaItemId: string;
}

export default function AdjustButton({ mediaItemId }: Props) {
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
          openDialog(mediaItemId);
        }}
      >
        {adjustButtonText}
      </Button>
      <Button
        className="hidden md:flex"
        variant="ghost"
        onClick={() => {
          openDialog(mediaItemId);
        }}
      >
        {adjustButtonText}
      </Button>
    </>
  );
}
