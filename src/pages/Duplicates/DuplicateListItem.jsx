import React from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

import { getFileById } from '../../store/reducers/files';

import * as routes from '../../routes';

import Thumbnail from '../../components/Thumbnail';

function getBackground(even, selected) {
  return (
    (selected && 'bg-orange-50 border-orange-200') ||
    (even && 'bg-white border-transparent') ||
    'bg-gray-50 border-transparent'
  );
}

function DuplicateListItem({ index, selected, type, value, onItemClick }) {
  const borderColor = selected ? 'border-orange-200' : '';
  const backgroundColor = getBackground(index % 2, selected);
  const nameStyle = selected ? 'font-medium text-orange-900' : 'font-medium';
  const pathStyle = selected ? 'text-orange-800' : 'text-gray-500';

  if (type === 'header') {
    return (
      <div
        className={`px-7 py-1 text-sm font-medium uppercase tracking-wider text-gray-500 ${borderColor}`}
      >
        Group #{value}
      </div>
    );
  }

  const file = useSelector((state) => getFileById(state, value));

  return (
    <div
      className={`mx-4 flex cursor-pointer items-center space-x-4 rounded-xl border px-4 py-4 text-sm ${borderColor} ${backgroundColor}`}
      onClick={() => onItemClick(file.id, index)}
      aria-hidden
    >
      <div className="shrink-0">
        <Thumbnail className="h-10 w-10" fileId={file.id} />
      </div>
      <div className="min-w-0">
        <div className={`truncate ${nameStyle}`}>{file.name}</div>
        <div className={`truncate ${pathStyle}`}>{routes.parent(file.path)}</div>
      </div>
    </div>
  );
}

export default DuplicateListItem;

DuplicateListItem.propTypes = {
  index: PropTypes.number.isRequired,
  selected: PropTypes.bool,
  type: PropTypes.oneOf(['header', 'row']).isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  onItemClick: PropTypes.func,
};

DuplicateListItem.defaultProps = {
  selected: false,
  onItemClick: null,
};
