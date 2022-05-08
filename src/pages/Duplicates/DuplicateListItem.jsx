import React from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

import { getFileById } from '../../store/reducers/files';

import * as routes from '../../routes';

import Thumbnail from '../../components/Thumbnail';

function DuplicateListItem({ neighbourSelected, index, last, selected, type, value, onItemClick }) {
  const borderColor = selected || neighbourSelected ? 'border-orange-200' : '';
  const borderWidth = selected && last ? 'border-t border-b' : 'border-t';
  const backgroundColor = selected ? 'bg-orange-50' : '';
  const nameStyle = selected ? 'font-medium text-orange-900' : 'font-medium';
  const pathStyle = selected ? 'text-orange-800' : 'text-gray-500';

  if (type === 'header') {
    return (
      <div
        className={`border-t bg-gray-50 px-7 py-1 text-sm font-medium text-gray-500 ${borderColor}`}
      >
        Group #{value}
      </div>
    );
  }

  const file = useSelector((state) => getFileById(state, value));

  return (
    <div
      className={`flex cursor-pointer items-center space-x-4 px-7 py-4 text-sm ${borderWidth} ${borderColor} ${backgroundColor}`}
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
  neighbourSelected: PropTypes.bool,
  index: PropTypes.number.isRequired,
  last: PropTypes.bool,
  selected: PropTypes.bool,
  type: PropTypes.oneOf(['header', 'row']).isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  onItemClick: PropTypes.func,
};

DuplicateListItem.defaultProps = {
  neighbourSelected: false,
  last: false,
  selected: false,
  onItemClick: null,
};
