/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { FileType } from '../constants';
import * as icons from '../icons';

import FileActions from '../containers/FileActions';

import Dropdown from './Dropdown';
import FileIcon from './FileIcon';
import FileSize from './FileSize';
import TimeAgo from './TimeAgo';

function getPrimaryText(selected, hidden) {
  return (
    (selected && 'text-orange-900 font-medium')
    || (hidden && 'text-gray-500')
    || 'text-gray-800'
  );
}

function getSecondaryText(selected, hidden) {
  return (
    (selected && 'text-orange-800')
    || (hidden && 'text-gray-500')
    || 'text-gray-600'
  );
}

function getBackground(selected) {
  return (
    (selected && 'bg-orange-100 border-orange-200')
    || 'border-transparent'
  );
}

function FileTableCell({ className, item, selected, onSelect }) {
  const primaryText = getPrimaryText(selected, item.hidden);
  const secondaryText = getSecondaryText(selected, item.hidden);
  const background = getBackground(selected);

  return (
    <div
      onClick={() => onSelect(item.id)}
      className={`${className} mx-4 h-full flex flex-row items-center text-sm px-4 border rounded-lg ${(background)}`}
    >
      <div className={`sm:w-3/5 w-2/3 flex flex-row items-center space-x-2 ${primaryText}`}>
        <div className="w-6">
          <FileIcon item={item} className="w-6 h-6" />
        </div>
        {(item.type === FileType.FOLDER || item.type === FileType.TRASH) ? (
          <span className="truncate" onClick={(event) => { event.stopPropagation(); }}>
            <Link to={`/files/${item.path}`}>
              {item.name}
            </Link>
          </span>
        ) : (
          <button type="button" className="truncate">
            {item.name}
          </button>
        )}
      </div>

      <div className="sm:w-2/5 w-1/3 flex flex-row items-center justify-end">
        {/* apply classes here, otherwise they end up in closure */}
        {(item.type !== FileType.TRASH) && (
          <div className={`${secondaryText} hover:${primaryText}`}>
            <Dropdown
              overlay={FileActions}
              overlayProps={{ fileId: item.id, filePath: item.path }}
            >
              <button type="button" className="font-bold p-2 rounded-full">
                <icons.More />
              </button>
            </Dropdown>
          </div>
        )}
        <div className={`w-24 pr-4 text-right ${secondaryText}`}>
          <FileSize size={item.size} />
        </div>
        <div className={`w-40 px-4 text-left ${secondaryText}`}>
          <TimeAgo mtime={item.mtime * 1000} />
        </div>
      </div>
    </div>
  );
}

FileTableCell.propTypes = {
  className: PropTypes.string,
  item: PropTypes.shape({
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    mtime: PropTypes.number.isRequired,
    hidden: PropTypes.bool.isRequired,
  }).isRequired,
  selected: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
};

FileTableCell.defaultProps = {
  className: '',
  selected: false,
};

export default FileTableCell;
