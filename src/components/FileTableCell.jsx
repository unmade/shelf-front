/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { Link } from 'react-router-dom';

import * as icons from '../icons';

import FileActions from '../containers/FileActions';

import Dropdown from './Dropdown';
import FileIcon from './FileIcon';
import FileSize from './FileSize';
import TimeAgo from './TimeAgo';

const TYPE_FOLDER = 'folder';

function FileTableCell({ item, selected, onSelect }) {
  const { type, name, size, mtime } = item;
  const primaryText = (selected) ? 'text-orange-900 font-medium' : 'text-gray-800';
  const secondaryText = (selected) ? 'text-orange-800' : 'text-gray-600';
  const background = (selected) ? 'bg-orange-100 border-orange-200' : 'border-transparent';

  return (
    <div
      onClick={() => onSelect(item.id)}
      className={`h-full flex flex-row items-center text-sm px-4 border rounded-lg ${(background)}`}
    >
      <div className="flex-1">
        <div className={`flex flex-row items-center space-x-2 ${primaryText}`}>
          <FileIcon item={item} className="w-6 h-6" />
          {(type === TYPE_FOLDER) ? (
            <span onClick={(event) => event.stopPropagation}>
              <Link to={`/files/${item.path}`}>
                {name}
              </Link>
            </span>
          ) : (
            <button type="button">
              {name}
            </button>
          )}
        </div>
      </div>

      {/* apply classes here, otherwise they end up in closure */}
      <div className={`${secondaryText} hover:${primaryText}`}>
        <Dropdown overlay={() => <FileActions fileId={item.id} />} selected={selected}>
          <button type="button" className="font-bold p-2 rounded-full">
            <icons.More />
          </button>
        </Dropdown>
      </div>
      <div className={`w-24 pr-4 text-right ${secondaryText}`}>
        <FileSize size={size} />
      </div>
      <div className={`w-40 px-4 text-left ${secondaryText}`}>
        <TimeAgo mtime={mtime * 1000} />
      </div>
    </div>
  );
}

export default FileTableCell;
