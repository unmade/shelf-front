import React from 'react';
import { Link } from 'react-router-dom';

import Breadcrumbs from './Breadcrumbs';
import FilePreview from './FilePreview';
import FileTableView from './FileTableView';


function breadcrumbsFromPath(path) {
  const breadcrumbs = [
    {
      path: "/files",
      name: "Home",
    },
  ];

  if (!path) {
    return breadcrumbs;
  }

  const parts = path.split("/").filter((e) => e !== "" && e !== ".");
  let prefix = "/files";
  parts.forEach((part) => {
    prefix = `${prefix}/${part}`;
    breadcrumbs.push({
      path: prefix,
      name: part,
    });
  });

  return breadcrumbs;
};


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
    const { listFiles } = this.props;
    listFiles({ path: dirPath });
  }

  render() {
    const { data, match, location } = this.props;
    const { dirPath } = match.params;
    const preview = new URLSearchParams(location.search).get("preview");
    const breadcrumbs = breadcrumbsFromPath(dirPath);

    return (
      <div className="flex flex-col h-full">
        <div className="p-4 border-b-2">
          <Breadcrumbs>
            {breadcrumbs.map((item, idx) => (
              (idx !== breadcrumbs.length - 1) ? (
                <Link key={item.path} to={item.path} className="hover:text-blue-500">
                  {item.name}
                </Link>
              ) : (
                <span key={item.path} className="text-gray-800">
                  {item.name}
                </span>
              )
            ))}
          </Breadcrumbs>
        </div>
  
        <div className="flex-1">
          {(preview) && <FilePreview file={preview} />}
          <FileTableView data={data} />
        </div>
      </div>
    );
  }
}


export default FileBrowser;
