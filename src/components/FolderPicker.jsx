import React from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';

import { listFolder } from '../store/actions/files';
import { scopes } from '../store/actions/loading';
import { getFileIdsByPath, getFolderIdsByPath } from '../store/reducers/files';
import { getLoadingDeprecated } from '../store/reducers/loading';

import * as icons from '../icons';
import * as routes from '../routes';

import Breadcrumb from './ui/Breadcrumb';
import VList from './ui/VList';

import FolderPickerItem from './FolderPickerItem';

const HEIGHT = 24;

const height = {
  height: `calc(100% - ${HEIGHT}px`,
};

const FolderPicker = ({
  emptyTitle,
  emptyDescription,
  excludeIds,
  initialPath,
  onlyFolders,
  onPathChange,
}) => {
  const dispatch = useDispatch();

  const [path, setPath] = React.useState(initialPath);

  const selector = onlyFolders ? getFolderIdsByPath : getFileIdsByPath;

  let items = useSelector((state) => selector(state, { path }));
  const loading = useSelector((state) => getLoadingDeprecated(state, scopes.listingFolder));

  React.useEffect(() => {
    if (items.length === 0) {
      dispatch(listFolder(path));
    }
  }, [items.length, path, dispatch]);

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

  const idsToExclude = new Set(excludeIds);
  items = items.filter((id) => !idsToExclude.has(id));

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
          className="rounded border"
          heightOffset={HEIGHT}
          itemCount={items.length}
          itemData={data}
          loading={items.length === 0 && loading}
          itemRender={FolderPickerItem}
        />
      ) : (
        <div className="flex flex-col items-center justify-center rounded border" style={height}>
          <div className="text-center">
            <icons.Collection className="mx-auto mb-4 h-12 w-12 text-gray-400" />
            <p className="text-lg font-semibold text-gray-800">{emptyTitle}</p>
            <p className="text-sm text-gray-600">{emptyDescription}</p>
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
