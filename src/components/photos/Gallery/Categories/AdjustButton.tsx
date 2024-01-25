import React from 'react';

import Button from 'components/ui/Button';

import { useAdjustCategoriesDialogContext } from '../AdjustCategoriesDialogProvider';

interface Props {
  fileId: string;
}

export default function AdjustButton({ fileId }: Props) {
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
        <span className="font-medium text-blue-500 dark:text-indigo-500">Adjust</span>
      </Button>
      <Button
        className="hidden md:block"
        variant="text"
        onClick={() => {
          openDialog(fileId);
        }}
      >
        <span className="font-medium text-blue-500 dark:text-indigo-500">Adjust</span>
      </Button>
    </>
  );
}
