import React from 'react';
import { Link } from 'react-router-dom';

import * as icons from '../icons';


function FileIcon({ item }) {
  const { type, meta } = item;
  const { mediatype } = meta;

  switch (mediatype || type) {
    case "folder": {
      return (
        <icons.Folder className="text-blue-400 w-6 h-6" />
      )
    }
    case "image": {
      const { previews } = meta;
      const preview = previews.filter((e) => e.size === "xs");
      return (
        <img 
          className="object-contain w-6 h-6"
          src={`http://localhost:8000/static/${preview[0].url}`}
        />
      );
    }
    default:
      return (
        <icons.File className="w-6 h-6" />
      )
  }
}


function FileTableCell({ item }) {
  const { type, name, size, modified_at } = item;

  return (
    <div className="h-full flex flex-row items-center space-x-4 text-sm mx-4 border-b border-gray-200">
      <div>
        <input type="checkbox" />
      </div>
      <div className="w-3/4">
        <div className="flex flex-row items-center space-x-2">
          <FileIcon item={item} />
          {(type === "folder") ? (
            <Link to={`/files/${item.path}`}>
              {name}
            </Link>
          ) : (
            <div>
              {name}
            </div>
          )}
          
        </div>
      </div>
      <div className="text-right text-gray-600">
        {(type === "folder") ? (
          "-"
        ) : (
          size
        )}
      </div>
      <div className="w-1/4 text-center text-gray-600">
        {modified_at}
      </div>
    </div>
  )
}

export default FileTableCell;
