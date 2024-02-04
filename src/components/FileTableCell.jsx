/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';

import { Transition } from '@headlessui/react';
import { useSelector, useDispatch } from 'react-redux';

import {
  filesSelectionChanged,
  fileSelectionToggled,
  selectAllSelectedFileIds,
} from '../store/browser';

import { FileShape } from '../types';

import { MediaType } from '../constants';

import FileSize from './ui/FileSize';
import TimeAgo from './ui/TimeAgo';

import BookmarkButton from './BookmarkButton';
import { useBrowserData } from './Browser/BrowserDataProvider';
import FileLink from './FileLink';
import FileTableCellActions from './FileTableCellActions';
import Thumbnail from './Thumbnail';

function getPrimaryText(selected, hidden) {
  return (
    (selected && 'text-orange-900 font-medium dark:text-amber-50') ||
    (hidden && 'text-gray-500 dark:text-zinc-400') ||
    'text-gray-900 dark:text-zinc-100'
  );
}

function getSecondaryText(selected, hidden) {
  return (
    (selected && 'text-orange-800 dark:text-amber-200') ||
    (hidden && 'text-gray-400 dark:text-zinc-500') ||
    'text-gray-500 dark:text-zinc-400'
  );
}

function getBackground(even, selected) {
  return (
    (selected && 'bg-orange-50 border-orange-200 dark:bg-amber-600/10 dark:border-amber-700/30') ||
    (even && 'border-transparent') ||
    'bg-gray-50 border-transparent dark:bg-zinc-700/30'
  );
}

function FileTableCell({ className, even, item, selected, hasSelection }) {
  const dispatch = useDispatch();

  const primaryText = getPrimaryText(selected, item.hidden);
  const secondaryText = getSecondaryText(selected, item.hidden);
  const background = getBackground(even, selected);

  const onCellClick = () => dispatch(filesSelectionChanged({ ids: [item.id] }));
  const onCheckboxClick = (event) => {
    event.stopPropagation();
    dispatch(fileSelectionToggled({ id: item.id }));
  };

  const checkboxClass = selected || hasSelection ? '' : 'show-on-hover-target';

  return (
    <div
      onClick={onCellClick}
      className={`show-on-hover-trigger ${className} ${background} mx-4 flex h-full flex-row items-center rounded-xl border px-5 text-sm`}
    >
      <div className={`flex w-full ${primaryText} ${!hasSelection ? 'md:w-3/5 lg:w-2/3' : ''}`}>
        <div className="flex w-full min-w-0 items-center space-x-3">
          <input
            onClick={onCheckboxClick}
            type="checkbox"
            className={`form-checkbox rounded-md border-gray-300 bg-transparent text-blue-500 dark:border-zinc-600 dark:focus:ring-offset-zinc-800 ${checkboxClass}`}
            checked={selected}
            readOnly
          />
          <div className="shrink-0">
            <Thumbnail className="h-9 w-9" file={item} />
          </div>
          <span
            className="truncate"
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <FileLink path={item.path} preview={item.mediatype !== MediaType.FOLDER}>
              {item.name}
            </FileLink>
          </span>
        </div>
        <div className="ml-2 flex items-center space-x-4">
          <BookmarkButton
            fileId={item.id}
            className={
              selected
                ? 'hover:bg-orange-100 dark:hover:bg-orange-800/30'
                : 'hover:bg-orange-50 dark:hover:bg-orange-700/30'
            }
          />
          <div className={`flex items-center ${secondaryText} hover:${primaryText}`}>
            <FileTableCellActions item={item} />
          </div>
        </div>
      </div>

      <Transition
        show={!hasSelection}
        as={React.Fragment}
        enter="transition ease-in-out duration-500"
        enterFrom="opacity-0 w-0"
        enterTo="opacity-100 w-full"
      >
        <div className="hidden flex-row items-center justify-evenly space-x-4 md:flex md:w-2/5 lg:w-1/3">
          <div className={`hidden w-32 text-left md:block ${!hasSelection ? secondaryText : ''}`}>
            <TimeAgo value={item.modified_at} />
          </div>
          <div className={`hidden w-24 text-right md:block ${secondaryText}`}>
            <FileSize size={item.size} />
          </div>
        </div>
      </Transition>
    </div>
  );
}

FileTableCell.propTypes = {
  className: PropTypes.string,
  even: PropTypes.bool.isRequired,
  item: FileShape.isRequired,
  selected: PropTypes.bool.isRequired,
  hasSelection: PropTypes.bool.isRequired,
};

FileTableCell.defaultProps = {
  className: '',
};

const MemoizedFileTableCell = React.memo(FileTableCell);

function FileTableCellContainer({ data, index, style }) {
  const itemId = data[index];
  const even = index % 2 === 0;
  const selected = useSelector((state) => selectAllSelectedFileIds(state).has(itemId));
  const hasSelection = useSelector((state) => selectAllSelectedFileIds(state).size !== 0);

  const { selectById } = useBrowserData();
  const file = useSelector((state) => selectById(state, itemId));
  if (file == null) {
    return null;
  }

  return (
    <div style={style}>
      <MemoizedFileTableCell
        even={even}
        item={file}
        selected={selected}
        hasSelection={hasSelection}
      />
    </div>
  );
}

FileTableCellContainer.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
};

export default React.memo(FileTableCellContainer);
