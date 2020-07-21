import React from 'react';
import { NavLink } from 'react-router-dom';

import FileTableView from '../containers/FileTableView';

import Breadcrumbs from './Breadcrumbs';
import Dropdown from './Dropdown';
import FilePreview from '../containers/FilePreview';
import Uploader from '../containers/Uploader';

import * as icons from '../icons';

function breadcrumbsFromPath(path) {
  const breadcrumbs = [
    {
      path: '/files',
      name: 'Home',
    },
  ];

  if (!path) {
    return breadcrumbs;
  }

  const parts = path.split('/').filter((e) => e !== '' && e !== '.');
  let prefix = '/files';
  parts.forEach((part) => {
    prefix = `${prefix}/${part}`;
    breadcrumbs.push({
      path: prefix,
      name: part,
    });
  });

  return breadcrumbs;
}

class FileBrowser extends React.Component {
  componentDidMount() {
    this.loadFiles();
  }

  componentDidUpdate(prevProps) {
    const { match } = this.props;
    const { match: prevMatch } = prevProps;
    if (match.params.dirPath !== prevMatch.params.dirPath) {
      this.loadFiles();
    }
  }

  loadFiles() {
    const { match, listFolder, deselectFiles } = this.props;
    const { dirPath } = match.params;
    listFolder(dirPath);

    // we want to deselect all files when
    // current directory has changed
    deselectFiles();
  }

  render() {
    const { match, hasSelectedFiles, hasUploads } = this.props;
    const { dirPath } = match.params;
    const breadcrumbs = breadcrumbsFromPath(dirPath);

    return (
      <div className="flex flex-col h-full">
        <div className="flex flex-row justify-between p-4 border-b-2 border-gray-100">
          <Breadcrumbs>
            {breadcrumbs.map(({ name, path }) => (
              <NavLink
                key={path}
                to={path}
                className="font-semibold text-gray-600 hover:text-blue-500"
                activeClassName="text-gray-800 pointer-events-none"
                exact
              >
                {name}
              </NavLink>
            ))}
          </Breadcrumbs>

          {(hasUploads) && (
            <Dropdown overlay={<Uploader />}>
              <button type="button" className="text-xl px-4">
                <icons.CloudUpload />
              </button>
            </Dropdown>
          )}
        </div>

        <div className="flex-1 flex flex-row">
          <div className="flex-1">
            <FileTableView />
          </div>
          {(hasSelectedFiles) && (
            <div className="w-2/6">
              <FilePreview />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default FileBrowser;
