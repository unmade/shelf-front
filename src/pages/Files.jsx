import React from 'react';
import { Link, useParams } from 'react-router-dom';

import Breadcrumbs from '../components/Breadcrumbs';
import Files from '../containers/Files';


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


function FileBrowser() {
  const { dirPath } = useParams();
  const breadcrumbs = breadcrumbsFromPath(dirPath);

  return (
    <div className="flex flex-col h-full p-8 pb-0">
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

      <div className="flex-1">
        <Files /> 
      </div>

    </div>
  );
}

export default FileBrowser;
