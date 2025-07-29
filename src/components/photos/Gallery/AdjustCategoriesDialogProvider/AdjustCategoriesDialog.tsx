import { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { shallowEqual } from 'react-redux';
import { skipToken } from '@reduxjs/toolkit/query';

import {
  useListMediaItemCategoriesQuery,
  useSetMediaItemCategoriesMutation,
} from 'store/mediaItems';

import Dialog from 'components/ui/Dialog';

import useMediaItemCategories from '../../hooks/media-item-categories';

import CategoryItem from './CategoryItem';

interface Props {
  fileId: string | null;
  visible: boolean;
  onClose: () => void;
}

export default function AdjustCategoriesDialog({ fileId, visible, onClose }: Props) {
  const { t } = useTranslation(['photos']);

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

  const onConfirm = async () => {
    const initialSelection = selectedCategories?.map(({ name }) => name);
    const currentSelection = [...Object.keys(state)];
    if (!shallowEqual(currentSelection, initialSelection) && fileId) {
      await setCategories({ fileId, categories: currentSelection });
    }
    onClose();
  };

  return (
    <Dialog
      title={t('photos:dialogs.adjustCategories.title', { defaultValue: 'Adjust categories' })}
      visible={visible}
      onConfirm={onConfirm}
      confirmTitle={t('photos:dialogs.adjustCategories.confirmTitle', { defaultValue: 'Save' })}
      confirmLoading={creating}
      onCancel={onClose}
    >
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
    </Dialog>
  );
}
