import React from 'react';
import PropTypes from 'prop-types';

import { useListFolderQuery } from '../store/files';

import * as icons from '../icons';
import * as routes from '../routes';

import Breadcrumb from './ui/Breadcrumb';
import VList from './ui/VList';

import FolderPickerItem from './FolderPickerItem';

const HEIGHT = 24;

const height = {
  height: `calc(100% - ${HEIGHT}px)`,
};

const iconsByPath = {
  '.': icons.Home,
  trash: icons.Trash,
};

function BreadcrumbItem({ name, path, activePath, onClick }) {
  const Icon = iconsByPath[path];
  return (
    <Breadcrumb.Item active={path === activePath}>
      <div className="flex max-w-2xs items-center truncate">
        {Icon && (
          <span className="py-2 sm:py-1">
            <Icon className="mr-2 h-4 w-4 shrink-0 text-gray-300 dark:text-zinc-600" />
          </span>
        )}
        <button className="min-w-0" type="button" onClick={onClick}>
          <span className="block truncate">{name}</span>
        </button>
      </div>
    </Breadcrumb.Item>
  );
}

function BreadcrumbItemCollapsed({ name, onClick }) {
  return (
    <Breadcrumb.Item active={false}>
      <div className="flex max-w-xs items-center">
        <span className="py-2 sm:py-1">
          <icons.Folder className="mr-2 h-5 w-5 shrink-0 text-blue-400" />
        </span>
        <button type="button" className="min-w-0" onClick={onClick}>
          <span className="block truncate">{name}</span>
        </button>
      </div>
    </Breadcrumb.Item>
  );
}

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

  const changePath = (nextPath, onPathChangeCallback) => (event) => {
    event.preventDefault();
    event.stopPropagation();
    setPath(nextPath);
    onPathChangeCallback(nextPath);
  };

  const data = {
    items,
    onClick: (nextPath) => changePath(nextPath, onPathChange),
  };

  const breadcrumbs = routes.breadcrumbs(path);

  return (
    <>
      <div className="pb-1">
        <Breadcrumb
          items={breadcrumbs}
          collapseAfter={1}
          maxLastItems={1}
          itemRenderer={({ name, path: itemPath }) => (
            <BreadcrumbItem
              name={name}
              path={itemPath}
              activePath={path}
              onClick={changePath(itemPath, onPathChange)}
            />
          )}
          itemRendererCollapsed={({ name, path: itemPath }) => (
            <BreadcrumbItemCollapsed name={name} onClick={changePath(itemPath, onPathChange)} />
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
