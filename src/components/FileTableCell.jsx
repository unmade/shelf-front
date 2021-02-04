/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import { Link, useRouteMatch } from 'react-router-dom';

import { FileType } from '../constants';

import FileSize from './ui/FileSize';
import TimeAgo from './ui/TimeAgo';

import FileTableCellActions from './FileTableCellActions';
import FileIcon from './FileIcon';

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
  const match = useRouteMatch();
  // if (item === undefined || item === null) {
  //   return null;
  // }

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
        {(item.type === FileType.FOLDER) ? (
          <span className="truncate" onClick={(event) => { event.stopPropagation(); }}>
            <Link to={`${match.url}/${item.name}`}>
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
        <div className={`${secondaryText} hover:${primaryText}`}>
          <FileTableCellActions id={item.id} type={item.type} path={item.path} />
        </div>
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
