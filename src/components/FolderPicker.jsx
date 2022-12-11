import React from 'react';
import PropTypes from 'prop-types';

import { useListFolderQuery } from '../store/files';

import * as icons from '../icons';

import Breadcrumb from './ui/Breadcrumb';
import VList from './ui/VList';

import FolderPickerItem from './FolderPickerItem';

const HEIGHT = 24;

const height = {
  height: `calc(100% - ${HEIGHT}px)`,
};

const FolderPicker = ({ emptyTitle, emptyDescription, excludeIds, initialPath, onPathChange }) => {
  const [path, setPath] = React.useState(initialPath);

  const { data: listFolderResult, isFetching: loading } = useListFolderQuery(path);

  const items = React.useMemo(() => {
    const entities = Object.values(listFolderResult?.entities ?? {});
    if (excludeIds.length) {
      const idsToExclude = new Set(excludeIds);
      return entities.filter((entity) => !idsToExclude.has(entity.id));
    }
    return entities;
  }, [listFolderResult?.entities, excludeIds]);

  const changePath =
    (nextPath, onPathChangeCallback = null) =>
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      setPath(nextPath);
      if (onPathChangeCallback != null) {
        onPathChangeCallback(nextPath);
      }
    };

  const data = {
    items,
    onClick: (nextPath) => changePath(nextPath, onPathChange),
  };

  return (
    <>
      <div className="pb-1">
        <Breadcrumb
          path={path}
          itemRender={({ name, url, path: nextPath }) => (
            <Breadcrumb.Item
              to={url}
              onClick={changePath(nextPath, onPathChange)}
              active={path === nextPath}
            >
              <span className="block truncate">{name}</span>
            </Breadcrumb.Item>
          )}
          itemRenderCollapsed={({ name, url, path: nextPath }) => (
            <Breadcrumb.ItemCollapsed
              to={url}
              onClick={changePath(nextPath, onPathChange)}
              active={false}
            >
              <span className="block truncate">{name}</span>
            </Breadcrumb.ItemCollapsed>
          )}
        />
      </div>
      {items.length || loading ? (
        <VList
          className="rounded border dark:border-zinc-700"
          heightOffset={HEIGHT}
          itemCount={items.length}
          itemData={data}
          loading={loading}
          itemRender={FolderPickerItem}
        />
      ) : (
        <div className="flex flex-col items-center justify-center rounded border" style={height}>
          <div className="text-center">
            <icons.Collection className="mx-auto mb-4 h-12 w-12 text-gray-400 dark:text-zinc-500" />
            <p className="text-lg font-semibold text-gray-800 dark:text-zinc-200">{emptyTitle}</p>
            <p className="text-sm text-gray-600 dark:text-zinc-400">{emptyDescription}</p>
          </div>
        </div>
      )}
    </>
  );
};

FolderPicker.propTypes = {
  emptyTitle: PropTypes.string,
  emptyDescription: PropTypes.string,
  excludeIds: PropTypes.arrayOf(PropTypes.string.isRequired),
  initialPath: PropTypes.string,
  onPathChange: PropTypes.func.isRequired,
};

FolderPicker.defaultProps = {
  emptyTitle: '',
  emptyDescription: '',
  initialPath: '.',
  excludeIds: [],
};

export default FolderPicker;
