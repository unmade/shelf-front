import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { shallowEqual } from 'react-redux';

import {
  useListMediaItemCategoriesQuery,
  useSetMediaItemCategoriesMutation,
} from '../../../../../store/photos';

import useMediaItemCategories from '../../../hooks/media-item-categories';

import Dialog from '../../../../../components/ui/Dialog';

const selectedClassNames =
  'ring-2 ring-inset dark:bg-teal-700 dark:text-teal-200 dark:ring-teal-500';

function CategoryItem({ displayName, name, selected, onClick }) {
  return (
    <button
      className={`mt-1 rounded-lg p-2 text-center capitalize dark:bg-zinc-700 md:px-3 ${selected ? selectedClassNames : ''}`}
      type="button"
      key={name}
      onClick={() => onClick(name)}
    >
      {displayName}
    </button>
  );
}

CategoryItem.propTypes = {
  displayName: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

function AdjustCategoriesDialog({ fileId, visible, onClose }) {
  const allCategories = useMediaItemCategories();

  const [setCategories, { isLoading: creating }] = useSetMediaItemCategoriesMutation();

  const { categories: selectedCategories } = useListMediaItemCategoriesQuery(fileId, {
    selectFromResult: ({ data, isFetching }) => ({
      categories: data?.categories,
      isFetching,
    }),
    skip: fileId == null,
  });

  const [state, setState] = useState({});
  useEffect(() => {
    const nextState = {};
    selectedCategories?.forEach((item) => {
      nextState[item.name] = true;
    });
    setState(nextState);
  }, [selectedCategories]);

  const toggleSelection = (name) => {
    if (state[name]) {
      const { [name]: _, ...nextState } = state;
      setState(nextState);
    } else {
      setState({ ...state, [name]: true });
    }
  };

  const onConfirm = async () => {
    const initialSelection = selectedCategories.map(({ name }) => name);
    const currentSelection = [...Object.keys(state)];
    if (!shallowEqual(currentSelection, initialSelection)) {
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
