import React from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

import { getFileById } from '../store/reducers/files';

import * as routes from '../routes';

import Thumbnail from './Thumbnail';

function DuplicateListItem({ data, index, style }) {
  const { type, value } = data[index];
  if (type === 'header') {
    return (
      <div style={style}>
        <div className="border-t bg-gray-50 px-7 py-1 text-sm font-medium text-gray-500">
          Group #{value}
        </div>
      </div>
    );
  }
  const file = useSelector((state) => getFileById(state, value));
  return (
    <div style={style}>
      <div className="flex items-center space-x-4 border-t px-7 py-4 text-sm">
        <div className="shrink-0">
          <Thumbnail className="h-10 w-10" fileId={file.id} />
        </div>
        <div>
          <div className="font-medium">{file.name}</div>
          <div className="text-gray-500">{routes.parent(file.path)}</div>
        </div>
      </div>
    </div>
  );
}

export default DuplicateListItem;

DuplicateListItem.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOf(['header', 'row']),
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    }).isRequired
  ).isRequired,
  index: PropTypes.number.isRequired,
};
