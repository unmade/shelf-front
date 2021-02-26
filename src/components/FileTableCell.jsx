/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';

import { MediaType } from '../constants';

import FileSize from './ui/FileSize';
import TimeAgo from './ui/TimeAgo';

import FileTableCellActions from './FileTableCellActions';
import FileIcon from './FileIcon';
import FileLink from './FileLink';

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
        <div className="w-7">
          {(item.thumbnail !== null && item.thumbnail !== undefined) ? (
            <img
              srcSet={`${item.thumbnail}}?size=32 1x, ${item.thumbnail}?size=64 2x`}
              alt="preview"
            />
          ) : (
            <FileIcon item={item} className="w-7 h-7" />
          )}
        </div>
        <span className="truncate" onClick={(event) => { event.stopPropagation(); }}>
          <FileLink name={item.name} preview={item.mediatype !== MediaType.FOLDER}>
            {item.name}
          </FileLink>
        </span>
      </div>

      <div className="sm:w-2/5 w-1/3 flex flex-row items-center justify-end">
        {/* apply classes here, otherwise they end up in closure */}
        <div className={`${secondaryText} hover:${primaryText}`}>
          <FileTableCellActions id={item.id} mediaType={item.mediatype} path={item.path} />
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
    name: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    mtime: PropTypes.number.isRequired,
    hidden: PropTypes.bool.isRequired,
    mediatype: PropTypes.string.isRequired,
    thumbnail: PropTypes.string,
  }).isRequired,
  selected: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
};

FileTableCell.defaultProps = {
  className: '',
  selected: false,
};

export default FileTableCell;
