import React from 'react';
import PropTypes from 'prop-types';

import { FileShape } from '../../types';

import * as routes from '../../routes';

import Thumbnail from '../../components/Thumbnail';

function getBackground(even, selected) {
  return (
    (selected && 'bg-orange-50 border-orange-200 dark:bg-amber-600/10 dark:border-amber-700/30') ||
    (even && 'border-transparent') ||
    'bg-gray-50 border-transparent dark:bg-zinc-700/30'
  );
}

function DuplicateListItem({ groupId, indexInGroup, selected, type, value, onItemClick }) {
  const borderColor = selected ? 'border-orange-200 dark:border-orange-700/30' : '';
  const backgroundColor = getBackground(indexInGroup % 2 === 0, selected);
  const nameStyle = selected ? 'font-medium text-orange-900 dark:text-amber-50' : 'font-medium';
  const pathStyle = selected
    ? 'text-orange-800 dark:text-amber-200'
    : 'text-gray-500 dark:text-zinc-400';

  if (type === 'header') {
    return (
      <div
        className={`px-7 pt-3 pb-1 text-sm font-medium uppercase tracking-wider text-gray-500 dark:text-zinc-500 ${borderColor}`}
      >
        Group #{value}
      </div>
    );
  }

  return (
    <div
      className={`mx-4 flex cursor-pointer items-center space-x-4 rounded-xl border px-4 py-4 text-sm ${borderColor} ${backgroundColor}`}
      onClick={() => onItemClick({ groupId, value })}
      aria-hidden
    >
      <div className="shrink-0">
        <Thumbnail className="h-10 w-10" file={value} />
      </div>
      <div className="min-w-0">
        <div className={`truncate ${nameStyle}`}>{value.name}</div>
        <div className={`truncate ${pathStyle}`}>{routes.parent(value.path)}</div>
      </div>
    </div>
  );
}

DuplicateListItem.propTypes = {
  indexInGroup: PropTypes.number.isRequired,
  selected: PropTypes.bool,
  type: PropTypes.oneOf(['header', 'row']).isRequired,
  value: PropTypes.oneOfType([PropTypes.number, FileShape]).isRequired,
  onItemClick: PropTypes.func,
};

DuplicateListItem.defaultProps = {
  selected: false,
  onItemClick: null,
};

const MemoizedDuplicatedListItem = React.memo(DuplicateListItem);

function DuplicatedListItemContainer({ data, index, style }) {
  const { items, selectedId, onItemClick } = data;
  const { type, idx, groupId, value } = items[index];
  return (
    <div style={style}>
      <MemoizedDuplicatedListItem
        groupId={groupId}
        indexInGroup={idx}
        selected={value.id === selectedId}
        type={type}
        value={value}
        onItemClick={onItemClick}
      />
    </div>
  );
}

DuplicatedListItemContainer.propTypes = {
  data: PropTypes.shape({
    items: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string.isRequired,
        idx: PropTypes.number.isRequired,
        groupId: PropTypes.number.isRequired,
        value: PropTypes.oneOfType([PropTypes.number, FileShape.isRequired]),
      })
    ).isRequired,
    selectedId: PropTypes.string,
    onItemClick: PropTypes.func.isRequired,
  }).isRequired,
};

export default DuplicatedListItemContainer;
