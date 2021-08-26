import React from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

import { getFileById } from '../store/reducers/files';

import FileIcon from './FileIcon';

function FolderPickerItem({ data, index, style }) {
  const itemId = data.items[index];
  const item = useSelector((state) => getFileById(state, itemId));

  const primaryText = (item.hidden) ? 'text-gray-500' : 'text-gray-800';

  return (
    <div style={style}>
      <button
        type="button"
        className="w-full h-full px-4 rounded-lg focus:outline-none"
        onClick={() => data.onClick(item.path)}
      >
        <div className={`min-w-0 text-sm flex flex-row items-center space-x-2 ${primaryText}`}>
          <div>
            <FileIcon className="w-7 h-7" mediatype={item.mediatype} hidden={item.hidden} />
          </div>
          <p className="truncate">
            {item.name}
          </p>
        </div>
      </button>
    </div>
  );
}

FolderPickerItem.propTypes = {
  data: PropTypes.shape({
    items: PropTypes.arrayOf(
      PropTypes.string.isRequired,
    ).isRequired,
    onClick: PropTypes.func.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default React.memo(FolderPickerItem);
