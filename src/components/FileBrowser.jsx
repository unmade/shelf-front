import React from 'react';
import { NavLink } from 'react-router-dom';

import FileTableView from '../containers/FileTableView';

import Breadcrumbs from './Breadcrumbs';
import FilePreview from './FilePreview';

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
    const { match } = this.props;
    const { dirPath } = match.params;
    const { listFolder } = this.props;
    listFolder(dirPath);
  }

  render() {
    const { match, location } = this.props;
    const { dirPath } = match.params;
    const preview = new URLSearchParams(location.search).get('preview');
    const breadcrumbs = breadcrumbsFromPath(dirPath);

    return (
      <div className="flex flex-col h-full">
        <div className="p-4 border-b-2 border-gray-100">
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
        </div>

        <div className="flex-1">
          {(preview) && <FilePreview file={preview} />}
          <FileTableView />
        </div>
      </div>
    );
  }
}

export default FileBrowser;
