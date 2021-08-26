import React from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

import { listFolder } from '../store/actions/files';
import { scopes } from '../store/actions/loading';
import { getFolderIdsByPath } from '../store/reducers/files';
import { getLoading } from '../store/reducers/loading';

import * as icons from '../icons';
import * as routes from '../routes';

import FolderPickerItem from '../containers/FolderPickerItem';

import Breadcrumb from './ui/Breadcrumb';
import VList from './ui/VList';

const HEIGHT = 24;

const height = {
  height: `calc(100% - ${HEIGHT}px`,
};

const changePath = (route, onPathChange) => (event) => {
  event.preventDefault();
  event.stopPropagation();
  onPathChange(routes.makePathFromUrl(route));
};

const FolderPicker = ({ excludeIds, path, onPathChange }) => {
  let items = useSelector((state) => getFolderIdsByPath(state, { path }));
  const loading = useSelector((state) => getLoading(state, scopes.listingFolder));

  React.useEffect(() => {
    listFolder(path);
  }, [path]);

  const idsToExclude = new Set(excludeIds);
  items = items.filter((id) => !idsToExclude.has(id));

  return (
    <>
      <div className="pb-1">
        <Breadcrumb
          path={path}
          itemRender={({ name, url }) => (
            <Breadcrumb.Item
              to={url}
              onClick={changePath(url, onPathChange)}
              isActive={() => url === routes.makeUrlFromPath({ path })}
            >
              <span className="block truncate">
                {name}
              </span>
            </Breadcrumb.Item>
          )}
          itemRenderCollapsed={({ name, url }) => (
            <Breadcrumb.ItemCollapsed
              to={url}
              onClick={changePath(url, onPathChange)}
              isActive={() => false}
            >
              <span className="block truncate">
                {name}
              </span>
            </Breadcrumb.ItemCollapsed>
          )}
        />
      </div>
      {(items.length || loading) ? (
        <VList
          className="border rounded"
          heightOffset={HEIGHT}
          items={items}
          loading={items.length === 0 && loading}
          itemRender={({ data, index, style }) => (
            <div style={style}>
              <FolderPickerItem item={data[index]} onClick={onPathChange} />
            </div>
          )}
        />
      ) : (
        <div className="flex flex-col items-center justify-center border rounded" style={height}>
          <div className="text-center">
            <icons.Collection className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-800 text-lg font-semibold">
              Nothing here yet
            </p>
            <p className="text-sm text-gray-600">
              Move file here
            </p>
          </div>
        </div>
      )}

    </>
  );
};

FolderPicker.propTypes = {
  excludeIds: PropTypes.arrayOf(
    PropTypes.string.isRequired,
  ).isRequired,
  path: PropTypes.string.isRequired,
  onPathChange: PropTypes.func.isRequired,
};

export default FolderPicker;
