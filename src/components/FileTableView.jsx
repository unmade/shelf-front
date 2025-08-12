import React from 'react';
import PropTypes from 'prop-types';

import { Transition } from '@headlessui/react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Checkbox } from 'components/ui/Checkbox';

import { filesSelectionChanged, selectAllSelectedFileIds } from '../store/browser';

import FileTableList from '../containers/FileTableList';

function TableHeader({ items }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const selectionSize = useSelector((state) => selectAllSelectedFileIds(state).size);
  const hasSelection = useSelector((state) => selectAllSelectedFileIds(state).size !== 0);

  const onSelect = () => {
    dispatch(filesSelectionChanged({ ids: hasSelection ? [] : items }));
  };

  const checkboxClass = hasSelection ? '' : 'show-on-hover-target';

  return (
    <div className="show-on-hover-trigger mb-1 flex flex-row items-center border-r border-l border-transparent px-9 py-2 text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-zinc-400">
      <div className={`flex w-full ${!hasSelection ? 'md:w-3/5 lg:w-2/3' : ''}`}>
        <Checkbox
          className={checkboxClass}
          onChange={onSelect}
          checked={hasSelection}
          indeterminate={hasSelection && selectionSize !== items.length}
        />
        <div className="ml-3">{t('Name')}</div>
      </div>
      <Transition
        show={!hasSelection}
        as={React.Fragment}
        enter="transition ease-in-out duration-500"
        enterFrom="opacity-0 w-0"
        enterTo="opacity-100 w-full"
      >
        <div className="hidden items-center justify-evenly space-x-4 md:flex md:w-2/5 lg:w-1/3">
          <div className="w-32 text-left md:block">{t('Modified')}</div>
          <div className="w-24 text-right md:block">{t('Size')}</div>
        </div>
      </Transition>
    </div>
  );
}

function FileTableView({ className, items, loading, scrollKey, itemRender }) {
  const fileDropBorder = 'transition ease-in-out duration-75 rounded-lg';
  return (
    <div className="flex h-full flex-col">
      <TableHeader items={items} />
      <div className="h-full">
        <FileTableList
          itemCount={items.length}
          itemData={items}
          itemRender={itemRender}
          itemHeight={72}
          className={`${fileDropBorder} ${className}`}
          scrollKey={scrollKey}
          loading={loading}
        />
      </div>
    </div>
  );
}

FileTableView.propTypes = {
  className: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  loading: PropTypes.bool,
  scrollKey: PropTypes.string.isRequired,
  itemRender: PropTypes.elementType.isRequired,
};

FileTableView.defaultProps = {
  className: '',
  loading: true,
};

export default FileTableView;
