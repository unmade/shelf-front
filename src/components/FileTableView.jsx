import React from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { bulkSelectFiles, deselectFiles } from '../store/actions/ui';
import { getCountSelectedFiles, getHasSelectedFiles } from '../store/reducers/ui';

import * as icons from '../icons';

import VList from '../containers/VList';

function TableHeader({ items }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const hasSelected = useSelector(getHasSelectedFiles);
  const selectedCount = useSelector(getCountSelectedFiles);

  const onSelect = () => {
    if (hasSelected) {
      dispatch(deselectFiles());
    } else {
      dispatch(bulkSelectFiles(items));
    }
  };

  const checkboxClass = hasSelected ? '' : 'show-on-hover-target';

  return (
    <div className="show-on-hover-trigger mb-1 flex flex-row items-center border-l border-r border-transparent bg-white px-9 py-2 text-xs font-medium uppercase tracking-wider text-gray-500">
      <div className={`${!hasSelected ? 'w-4/5 md:w-2/3' : 'w-full'} flex`}>
        <input
          // hack: set partial status for checkbox
          // eslint-disable-next-line no-return-assign,no-param-reassign
          ref={(el) => el && (el.indeterminate = hasSelected && selectedCount !== items.length)}
          className={`form-checkbox rounded-md border-gray-300 text-blue-500 ${checkboxClass}`}
          onClick={onSelect}
          type="checkbox"
          checked={hasSelected}
          readOnly
        />
        <div className="ml-3">{t('Name')}</div>
      </div>
      {!hasSelected && (
        <div className="flex w-1/5 items-center justify-evenly space-x-4 md:w-1/3">
          <div className="hidden w-32 text-left md:block">{t('Modified')}</div>
          <div className="hidden w-24 text-right md:block">{t('Size')}</div>
        </div>
      )}
    </div>
  );
}

function FileTableView({ className, items, loading, scrollKey, itemRender }) {
  const { t } = useTranslation();
  const fileDropBorder = 'transition ease-in-out duration-75 border-4 rounded-lg';
  return (
    <div className="flex h-full flex-col">
      <TableHeader items={items} />
      <div className="flex-1">
        {items.length || loading ? (
          <VList
            itemCount={items.length}
            itemData={items}
            itemRender={itemRender}
            itemHeight={72}
            className={`${fileDropBorder} ${className}`}
            trackScrolling
            scrollKey={scrollKey}
            loading={items.length === 0 && loading}
          />
        ) : (
          <div
            className={`flex h-full flex-col items-center justify-center ${fileDropBorder} ${className}`}
          >
            <icons.Collection className="mx-auto mb-4 h-12 w-12 text-gray-400" />
            <p className="text-lg font-semibold text-gray-800">{t('Nothing here yet')}</p>
            <p className="text-sm text-gray-600">{t('Drag and drop files to upload')}</p>
          </div>
        )}
      </div>
    </div>
  );
}

FileTableView.propTypes = {
  className: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  loading: PropTypes.bool,
  scrollKey: PropTypes.string.isRequired,
  itemRender: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
};

FileTableView.defaultProps = {
  className: '',
  loading: true,
};

export default FileTableView;
