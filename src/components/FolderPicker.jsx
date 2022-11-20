import React from 'react';
import PropTypes from 'prop-types';

import * as icons from '../icons';
import * as routes from '../routes';

import Breadcrumb from './ui/Breadcrumb';
import VList from './ui/VList';

import FolderPickerItem from './FolderPickerItem';
import { useListFolderQuery } from '../store/files';
import { MediaType } from '../constants';

const HEIGHT = 24;

const height = {
  height: `calc(100% - ${HEIGHT}px)`,
};

const FolderPicker = ({
  emptyTitle,
  emptyDescription,
  excludeIds,
  initialPath,
  onlyFolders,
  onPathChange,
}) => {
  const [path, setPath] = React.useState(initialPath);

  const { data: listFolderResult, isLoading: loading } = useListFolderQuery(path);

  const items = React.useMemo(() => {
    let entities = Object.values(listFolderResult?.entities ?? {});
    if (onlyFolders) {
      entities = entities.filter((entity) => entity.mediatype === MediaType.FOLDER);
    }
    if (excludeIds.length) {
      const idsToExclude = new Set(excludeIds);
      entities = entities.filter((entity) => !idsToExclude.has(entity.id));
    }
    return entities;
  }, [listFolderResult?.entities, onlyFolders, excludeIds]);

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
          itemRender={({ name, url }) => (
            <Breadcrumb.Item
              to={url}
              onClick={changePath(routes.makePathFromUrl(url), onPathChange)}
              active={url === routes.makeUrlFromPath({ path })}
            >
              <span className="block truncate">{name}</span>
            </Breadcrumb.Item>
          )}
          itemRenderCollapsed={({ name, url }) => (
            <Breadcrumb.ItemCollapsed
              to={url}
              onClick={changePath(routes.makePathFromUrl(url), onPathChange)}
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
          loading={items.length === 0 && loading}
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
  onlyFolders: PropTypes.bool,
};

FolderPicker.defaultProps = {
  emptyTitle: '',
  emptyDescription: '',
  initialPath: '.',
  onlyFolders: false,
  excludeIds: [],
};

export default FolderPicker;
