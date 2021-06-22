import React from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';

import { getCountSelectedFiles, getHasSelectedFiles } from '../store/reducers/files';

import * as icons from '../icons';

import FileDrop from '../containers/FileDrop';
import VList from '../containers/VList';
import { bulkSelectFiles, deselectFiles } from '../store/actions/files';

function TableHeader({ items }) {
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

  const checkboxClass = (hasSelected) ? '' : 'show-on-hover-target';

  return (
    <div
      className="w-full px-9 py-2 mb-1 flex flex-row items-center bg-white text-xs font-medium text-gray-500 uppercase tracking-wider border-l border-r border-transparent show-on-hover-trigger"
    >
      <input
        // hack: set partial status for checkbox
        // eslint-disable-next-line no-return-assign,no-param-reassign
        ref={(el) => el && (el.indeterminate = hasSelected && selectedCount !== items.length)}
        className={`form-checkbox border-gray-300 text-blue-500 rounded-md ${checkboxClass}`}
        onClick={onSelect}
        type="checkbox"
        checked={hasSelected}
        readOnly
      />
      <div className="ml-3 flex-1">
        Name
      </div>
      <div className="hidden md:block w-20 lg:w-24 text-right">
        Size
      </div>
      <div className="hidden md:block w-24 lg:w-36 xl:w-40 ml-6 xl:px-4 text-left">
        Modified
      </div>
    </div>
  );
}

function Table({
  className, items, loading, scrollKey, itemRender,
}) {
  const fileDropBorder = 'transition ease-in-out duration-75 border-4 rounded-lg';
  return (
    <div className="h-full flex flex-col">
      <TableHeader items={items} />
      <div className="flex-1">
        {(items.length || loading) ? (
          <VList
            items={items}
            itemRender={itemRender}
            itemHeight={72}
            className={`${fileDropBorder} ${className}`}
            trackScrolling
            scrollKey={scrollKey}
            loading={items.length === 0 && loading}
          />
        ) : (
          <div className={`h-full flex flex-col items-center justify-center ${fileDropBorder} ${className}`}>
            <icons.Collection className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-800 text-lg font-semibold">
              Nothing here yet
            </p>
            <p className="text-sm text-gray-600">
              Drag and drop files to upload
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function FileTableView({
  droppable, items, loading, path, itemRender,
}) {
  if (droppable) {
    return (
      <FileDrop
        uploadTo={path}
        className="h-full"
        render={({ dragging }) => (
          <Table
            className={(dragging) ? 'border-blue-300' : 'border-transparent'}
            loading={loading}
            items={items}
            itemRender={itemRender}
            scrollKey={path}
          />
        )}
      />
    );
  }
  return (
    <Table
      className="border-transparent"
      items={items}
      itemRender={itemRender}
      scrollKey={path}
    />
  );
}

FileTableView.propTypes = {
  droppable: PropTypes.bool,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  loading: PropTypes.bool,
  path: PropTypes.string.isRequired,
  itemRender: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
};

FileTableView.defaultProps = {
  droppable: false,
  loading: true,
};

export default FileTableView;
