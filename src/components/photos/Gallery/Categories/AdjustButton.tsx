import React from 'react';

import { useTranslation } from 'react-i18next';

import Button from 'components/ui/Button';

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
        size="xs"
        variant="text"
        onClick={() => {
          openDialog(fileId);
        }}
      >
        <span className="font-medium text-blue-500 dark:text-indigo-500">{adjustButtonText}</span>
      </Button>
      <Button
        className="hidden md:block"
        variant="text"
        onClick={() => {
          openDialog(fileId);
        }}
      >
        <span className="font-medium text-blue-500 dark:text-indigo-500">{adjustButtonText}</span>
      </Button>
    </>
  );
}
