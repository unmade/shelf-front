import React from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { filesSelectionChanged } from '../store/actions/ui';
import { getCountSelectedFiles, getHasSelectedFiles } from '../store/reducers/ui';

import { FileShape } from '../types';

import FileTableList from '../containers/FileTableList';

function TableHeader({ items }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const hasSelected = useSelector(getHasSelectedFiles);
  const selectedCount = useSelector(getCountSelectedFiles);

  const onSelect = () => {
    const selection = hasSelected ? [] : items;
    dispatch(filesSelectionChanged(selection));
  };

  const checkboxClass = hasSelected ? '' : 'show-on-hover-target';

  return (
    <div className="show-on-hover-trigger mb-1 flex flex-row items-center border-l border-r border-transparent px-9 py-2 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-zinc-400">
      <div className={`flex w-full ${!hasSelected ? 'md:w-3/5 lg:w-2/3' : ''}`}>
        <input
          // hack: set partial status for checkbox
          // eslint-disable-next-line no-return-assign,no-param-reassign
          ref={(el) => el && (el.indeterminate = hasSelected && selectedCount !== items.length)}
          className={`form-checkbox rounded-md border-gray-300 bg-transparent text-blue-500 dark:border-zinc-600 dark:focus:ring-offset-zinc-800 ${checkboxClass}`}
          onClick={onSelect}
          type="checkbox"
          checked={hasSelected}
          readOnly
        />
        <div className="ml-3">{t('Name')}</div>
      </div>
      {!hasSelected && (
        <div className="hidden items-center justify-evenly space-x-4 md:flex md:w-2/5 lg:w-1/3">
          <div className="w-32 text-left md:block">{t('Modified')}</div>
          <div className="w-24 text-right md:block">{t('Size')}</div>
        </div>
      )}
    </div>
  );
}

function FileTableView({
  className,
  emptyIcon,
  emptyTitle,
  emptyDescription,
  items,
  loading,
  scrollKey,
  itemRender,
}) {
  const fileDropBorder = 'transition ease-in-out duration-75 rounded-lg';
  return (
    <div className="flex h-full flex-col">
      <TableHeader items={items} />
      <div className="flex-1">
        {items.length || loading ? (
          <FileTableList
            itemCount={items.length}
            itemData={items}
            itemRender={itemRender}
            itemHeight={72}
            className={`${fileDropBorder} ${className}`}
            scrollKey={scrollKey}
            loading={items.length === 0 && loading}
          />
        ) : (
          <div
            className={`flex h-full flex-col items-center justify-center ${fileDropBorder} ${className}`}
          >
            {emptyIcon}
            <p className="mt-4 text-lg font-semibold text-gray-800 dark:text-zinc-200">
              {emptyTitle}
            </p>
            <p className="text-sm text-gray-600 dark:text-zinc-400">{emptyDescription}</p>
          </div>
        )}
      </div>
    </div>
  );
}

FileTableView.propTypes = {
  className: PropTypes.string,
  emptyIcon: PropTypes.element.isRequired,
  emptyTitle: PropTypes.string.isRequired,
  emptyDescription: PropTypes.string,
  items: PropTypes.arrayOf(FileShape).isRequired,
  loading: PropTypes.bool,
  scrollKey: PropTypes.string.isRequired,
  itemRender: PropTypes.elementType.isRequired,
};

FileTableView.defaultProps = {
  className: '',
  loading: true,
  emptyDescription: '',
};

export default FileTableView;
