import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { shallowEqual } from 'react-redux';

import { useListMediaItemCategoriesQuery, useSetMediaItemCategoriesMutation } from 'store/photos';

import Dialog from 'components/ui/Dialog';

import useMediaItemCategories from '../../hooks/media-item-categories';

import CategoryItem from './CategoryItem';

interface Props {
  fileId: string | null;
  visible: boolean;
  onClose: () => void;
}

function AdjustCategoriesDialog({ fileId, visible, onClose }: Props) {
  const allCategories = useMediaItemCategories();

  const [setCategories, { isLoading: creating }] = useSetMediaItemCategoriesMutation();

  const { categories: selectedCategories } = useListMediaItemCategoriesQuery(fileId as string, {
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
      title="Adjust categories"
      visible={visible}
      onConfirm={onConfirm}
      confirmTitle="Save"
      confirmLoading={creating}
      onCancel={onClose}
    >
      {fileId && (
        <div className="grid grid-flow-col grid-rows-10 gap-x-2 gap-y-1 text-sm md:gap-3">
          {allCategories.map(({ name, displayName }) => (
            <CategoryItem
              key={name}
              name={name}
              displayName={displayName}
              selected={state[name] === true}
              onClick={toggleSelection}
            />
          ))}
        </div>
      )}
    </Dialog>
  );
}

AdjustCategoriesDialog.propTypes = {
  fileId: PropTypes.string,
  visible: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};

AdjustCategoriesDialog.defaultProps = {
  fileId: null,
  visible: false,
};

export default AdjustCategoriesDialog;
