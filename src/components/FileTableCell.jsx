/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';

import { addToSelection, selectFile } from '../store/actions/files';

import {
  getFileById, getHasSelectedFiles, getIsFileSelected, getThumbnailById,
} from '../store/reducers/files';

import { MediaType } from '../constants';

import FileTableCellActions from '../containers/FileTableCellActions';

import FileSize from './ui/FileSize';
import TimeAgo from './ui/TimeAgo';

import FileLink from './FileLink';
import Thumbnail from './Thumbnail';

function getPrimaryText(selected, hidden) {
  return (
    (selected && 'text-orange-900 font-medium')
    || (hidden && 'text-gray-500')
    || 'text-gray-900'
  );
}

function getSecondaryText(selected, hidden) {
  return (
    (selected && 'text-orange-800')
    || (hidden && 'text-gray-400')
    || 'text-gray-500'
  );
}

function getBackground(even, selected) {
  return (
    (selected && 'bg-orange-50 border-orange-200')
    || (even && 'bg-white border-transparent')
    || ('bg-gray-50 border-transparent')
  );
}

function FileTableCell({
  className, even, item, defferThumbnail, selected, hasSelected,
}) {
  const dispatch = useDispatch();

  const primaryText = getPrimaryText(selected, item.hidden);
  const secondaryText = getSecondaryText(selected, item.hidden);
  const background = getBackground(even, selected);

  const onCellClick = () => dispatch(selectFile(item.id));
  const onCheckboxClick = (event) => {
    event.stopPropagation(); dispatch(addToSelection(item.id));
  };

  const checkboxClass = (selected || hasSelected) ? '' : 'show-on-hover-target';

  return (
    <div
      onClick={onCellClick}
      className={`show-on-hover-trigger ${className} ${background} mx-4 h-full flex flex-row items-center text-sm px-4 border rounded-xl`}
    >
      <div className={`w-4/5 md:w-1/2 2xl:w-2/3 flex flex-row items-center space-x-3 ${primaryText}`}>
        <input
          onClick={onCheckboxClick}
          type="checkbox"
          className={`form-checkbox border-gray-300 text-blue-500 rounded-md ${checkboxClass}`}
          checked={selected}
          readOnly
        />
        <div className="flex-shrink-0">
          <Thumbnail className="w-9 h-9" fileId={item.id} deferred={defferThumbnail} />
        </div>
        <span className="truncate" onClick={(event) => { event.stopPropagation(); }}>
          <FileLink
            path={item.path}
            preview={item.mediatype !== MediaType.FOLDER}
          >
            {item.name}
          </FileLink>
        </span>
      </div>

      <div className="w-1/5 md:w-1/2 2xl:w-1/3 flex flex-row items-center justify-end">
        {/* apply classes here, otherwise they end up in closure */}
        <div className={`${secondaryText} hover:${primaryText} px-2`}>
          <FileTableCellActions id={item.id} mediaType={item.mediatype} path={item.path} />
        </div>
        <div className={`hidden md:block w-20 lg:w-24 text-right ${secondaryText}`}>
          <FileSize size={item.size} />
        </div>
        <div className={`hidden md:block w-24 lg:w-36 xl:w-40 ml-6 xl:px-4 text-left ${secondaryText}`}>
          <TimeAgo mtime={item.mtime * 1000} />
        </div>
      </div>
    </div>
  );
}

FileTableCell.propTypes = {
  className: PropTypes.string,
  even: PropTypes.bool.isRequired,
  defferThumbnail: PropTypes.bool.isRequired,
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    mtime: PropTypes.number.isRequired,
    hidden: PropTypes.bool.isRequired,
  }).isRequired,
  selected: PropTypes.bool.isRequired,
  hasSelected: PropTypes.bool.isRequired,
};

FileTableCell.defaultProps = {
  className: '',
};

const MemoizedFileTableCell = React.memo(FileTableCell);

function FileTableCellContainer({ data, index, isScrolling, style }) {
  const itemId = data[index];
  const even = index % 2 === 0;
  const item = useSelector((state) => getFileById(state, itemId));
  const selected = useSelector((state) => getIsFileSelected(state, itemId));
  const hasSelected = useSelector(getHasSelectedFiles);

  const thumbs = useSelector((state) => getThumbnailById(state, itemId));
  const thumbnailLoaded = (thumbs != null && thumbs.xs != null);

  return (
    <div style={style}>
      <MemoizedFileTableCell
        even={even}
        defferThumbnail={item.has_thumbnail && isScrolling && !thumbnailLoaded}
        item={item}
        selected={selected}
        hasSelected={hasSelected}
      />
    </div>
  );
}

FileTableCellContainer.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.string.isRequired,
  ).isRequired,
  index: PropTypes.number.isRequired,
  isScrolling: PropTypes.bool.isRequired,
};

export default React.memo(FileTableCellContainer);
