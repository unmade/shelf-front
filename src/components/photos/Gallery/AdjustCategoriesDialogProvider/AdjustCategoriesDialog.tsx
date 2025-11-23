import { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { shallowEqual } from 'react-redux';
import { skipToken } from '@reduxjs/toolkit/query';

import {
  useListMediaItemCategoriesQuery,
  useSetMediaItemCategoriesMutation,
} from '@/store/mediaItems';

import { Button } from '@/ui/button';
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/ui/dialog';

import useMediaItemCategories from '@/components/photos/hooks/media-item-categories';

import CategoryItem from './CategoryItem';

interface Props {
  fileId: string | null;
  open: boolean;
  onClose: () => void;
}

export default function AdjustCategoriesDialog({ fileId, open, onClose }: Props) {
  const { t } = useTranslation('photos');

  const allCategories = useMediaItemCategories();

  const [setCategories, { isLoading: creating }] = useSetMediaItemCategoriesMutation();

  const { categories: selectedCategories } = useListMediaItemCategoriesQuery(fileId ?? skipToken, {
    selectFromResult: ({ data, isFetching }) => ({
      categories: data?.categories,
      isFetching,
    }),
    skip: fileId == null,
  });

  const [state, setState] = useState<Record<string, boolean>>({});
  useEffect(() => {
    const nextState = Object.fromEntries(
      (selectedCategories ?? []).map(({ name }) => [name, true]),
    );
    setState(nextState);
  }, [selectedCategories]);

  const toggleSelection = (name: string) => {
    if (state[name]) {
      const nextState = { ...state };
      delete nextState[name];
      setState(nextState);
    } else {
      setState({ ...state, [name]: true });
    }
  };

  const handleOpenChanged = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const handleSave = async () => {
    const initialSelection = selectedCategories?.map(({ name }) => name);
    const currentSelection = [...Object.keys(state)];
    if (!shallowEqual(currentSelection, initialSelection) && fileId) {
      await setCategories({ fileId, categories: currentSelection });
    }
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChanged}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {t('photos:dialogs.adjustCategories.title', { defaultValue: 'Adjust categories' })}
          </DialogTitle>
        </DialogHeader>
        <DialogBody>
          {fileId && (
            <div className="grid grid-flow-col grid-rows-10 gap-x-2 gap-y-1 text-sm md:gap-3">
              {Object.values(allCategories).map(({ name, displayName }) => (
                <CategoryItem
                  key={name}
                  name={name}
                  displayName={displayName}
                  selected={state[name]}
                  onClick={toggleSelection}
                />
              ))}
            </div>
          )}
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">
              {t('photos:dialogs.adjustCategories.actions.cancel', { defaultValue: 'Cancel' })}
            </Button>
          </DialogClose>
          <Button disabled={creating} onClick={handleSave}>
            {t('photos:dialogs.adjustCategories.confirmTitle', { defaultValue: 'Save' })}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
