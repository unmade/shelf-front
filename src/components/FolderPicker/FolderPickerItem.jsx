import React from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

import { MediaType } from '../../constants';

import Thumbnail from '../Thumbnail';
import { selectFileByIdInPath } from '../../store/files';

function FolderPickerItem({ data, index, style }) {
  const { path, items, onClick } = data;
  const itemId = items[index];

  const item = useSelector((state) => selectFileByIdInPath(state, { path, id: itemId }));
  if (item == null) {
    return null;
  }

  const primaryText = item.hidden
    ? 'text-gray-500 dark:text-zinc-400'
    : 'text-gray-800 dark:text-zinc-200';

  const mediatypeStyle = !MediaType.isFolder(item.mediatype) ? 'opacity-25' : '';

  return (
    <div style={style}>
      <button
        type="button"
        className="h-full w-full rounded-lg px-4 focus:outline-none"
        onClick={onClick(item.path)}
        disabled={!MediaType.isFolder(item.mediatype)}
      >
        <div
          className={`flex min-w-0 flex-row items-center space-x-2 text-sm ${primaryText} ${mediatypeStyle}`}
        >
          <div className="shrink-0">
            <Thumbnail className="h-7 w-7" file={item} />
          </div>
          <p className="truncate">{item.name}</p>
        </div>
      </button>
    </div>
  );
}

FolderPickerItem.propTypes = {
  data: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.string).isRequired,
    path: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default React.memo(FolderPickerItem);
