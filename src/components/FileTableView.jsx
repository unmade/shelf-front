import { useCallback } from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import * as Collapsible from '@radix-ui/react-collapsible';

import {
  fileBrowserScrollOffsetChanged,
  filesSelectionChanged,
  selectAllSelectedFileIds,
  selectScrollOffset,
} from '@/store/browser';

import { useAppSelector, useAppDispatch } from '@/hooks';

import { Checkbox } from '@/ui/checkbox';
import { VList } from '@/ui/vlist';

function TableHeader({ items }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const selectionSize = useSelector((state) => selectAllSelectedFileIds(state).size);
  const hasSelection = useSelector((state) => selectAllSelectedFileIds(state).size !== 0);

  const onSelect = () => {
    dispatch(filesSelectionChanged({ ids: hasSelection ? [] : items }));
  };

  const checkboxClass = hasSelection ? '' : 'show-on-hover-target';

  return (
    <div className="show-on-hover-trigger mb-1 flex flex-row items-center border-r border-l border-transparent px-9 py-2 text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-zinc-400">
      <div className={`flex w-full ${!hasSelection ? 'md:w-3/5 lg:w-2/3' : ''}`}>
        <Checkbox
          className={checkboxClass}
          onCheckedChange={onSelect}
          checked={hasSelection && selectionSize !== items.length ? 'indeterminate' : hasSelection}
        />
        <div className="ml-3">{t('Name')}</div>
      </div>
      <Collapsible.Root
        open={!hasSelection}
        className="hidden overflow-hidden transition-all duration-200 data-[state=closed]:pointer-events-none data-[state=closed]:w-0 data-[state=closed]:opacity-0 md:block md:w-2/5 lg:w-1/3"
      >
        <Collapsible.Content forceMount className="flex items-center justify-evenly space-x-4">
          <div className="w-32 text-left md:block">{t('Modified')}</div>
          <div className="w-24 text-right md:block">{t('Size')}</div>
        </Collapsible.Content>
      </Collapsible.Root>
    </div>
  );
}

function TableContent({ className, items, scrollKey, itemRenderer }) {
  const dispatch = useAppDispatch();

  const initialScrollOffset = useAppSelector((state) => selectScrollOffset(state, scrollKey));

  const handleScrollOffsetChange = useCallback(
    (offset) => {
      dispatch(fileBrowserScrollOffsetChanged({ scrollKey, offset }));
    },
    [dispatch, scrollKey],
  );

  const fileDropBorder = 'transition ease-in-out duration-75 rounded-lg';

  return (
    <VList
      className={`${fileDropBorder} ${className}`}
      initialScrollOffset={initialScrollOffset}
      itemCount={items.length}
      itemData={items}
      itemRenderer={itemRenderer}
      itemHeight={72}
      scrollKey={scrollKey}
      onScrollOffsetChange={handleScrollOffsetChange}
    />
  );
}

function FileTableView({ className, items, scrollKey, itemRenderer }) {
  return (
    <div className="flex h-full flex-col">
      <TableHeader items={items} />
      <div className="h-full">
        <TableContent
          className={className}
          items={items}
          itemRenderer={itemRenderer}
          scrollKey={scrollKey}
        />
      </div>
    </div>
  );
}

FileTableView.propTypes = {
  className: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  scrollKey: PropTypes.string.isRequired,
  itemRenderer: PropTypes.elementType.isRequired,
};

FileTableView.defaultProps = {
  className: '',
  loading: true,
};

export default FileTableView;
