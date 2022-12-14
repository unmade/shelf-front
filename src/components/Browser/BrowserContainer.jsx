import React from 'react';
import PropTypes from 'prop-types';

import { Transition } from '@headlessui/react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import useSidePreview from '../../hooks/preview-available';

import { useListFolderQuery } from '../../store/files';
import {
  fileBrowserPathChanged,
  filesSelectionChanged,
  fileSelectionCleared,
  selectAllSelectedFileIds,
} from '../../store/browser';

import { FileShape } from '../../types';

import FileDrop from '../../containers/FileDrop';

import FileTableCell from '../FileTableCell';
import FileTableView from '../FileTableView';

import SidePreview from './SidePreview';

const MemoizedSidePreview = React.memo(SidePreview);

function FileTableViewContainer({
  dirPath,
  items,
  loading,
  droppable,
  emptyIcon,
  emptyTitle,
  emptyDescription,
}) {
  const fileTableView = (
    <FileTableView
      items={items}
      loading={loading}
      path={dirPath}
      scrollKey={dirPath}
      itemRender={FileTableCell}
      emptyIcon={emptyIcon}
      emptyTitle={emptyTitle}
      emptyDescription={emptyDescription}
    />
  );

  return droppable ? (
    <FileDrop
      className="h-full"
      uploadTo={dirPath}
      render={({ dragging }) => (
        <div className="relative h-full w-full">
          <div className={`${dragging ? 'block' : 'hidden'} absolute z-10 h-full w-full px-2 pb-2`}>
            <div className="h-full w-full rounded-2xl border-4 border-dashed border-teal-200 dark:border-teal-600" />
          </div>
          {fileTableView}
        </div>
      )}
    />
  ) : (
    fileTableView
  );
}

FileTableViewContainer.propTypes = {
  dirPath: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(FileShape).isRequired,
  loading: PropTypes.bool.isRequired,
  droppable: PropTypes.bool.isRequired,
  emptyIcon: PropTypes.element.isRequired,
  emptyTitle: PropTypes.string.isRequired,
  emptyDescription: PropTypes.string.isRequired,
};

const MemoizedFileTableViewContainer = React.memo(FileTableViewContainer);

function BrowserContainer({ dirPath, droppable, emptyIcon, emptyTitle, emptyDescription }) {
  const dispatch = useDispatch();

  const withSidePreview = useSidePreview();
  const selectedIds = useSelector(selectAllSelectedFileIds);

  const { data, isFetching: loading } = useListFolderQuery(dirPath);
  const files = React.useMemo(
    () => data?.ids.map((id) => data?.entities[id]) ?? [],
    [data?.ids, data?.entities]
  );

  React.useEffect(() => {
    dispatch(fileBrowserPathChanged({ path: dirPath }));
    return () => {
      dispatch(fileSelectionCleared());
    };
  }, [dirPath, dispatch]);

  React.useEffect(() => {
    const existingIds = data?.ids.filter((id) => selectedIds.has(id));
    if (existingIds != null && !shallowEqual(existingIds, [...selectedIds])) {
      dispatch(filesSelectionChanged({ ids: existingIds }));
    }
  }, [selectedIds, data?.ids]);

  return (
    <>
      <div className={`easy-in-out h-full duration-500 ${withSidePreview ? 'w-7/12' : 'w-full'}`}>
        <MemoizedFileTableViewContainer
          dirPath={dirPath}
          items={files}
          loading={loading}
          droppable={droppable}
          emptyIcon={emptyIcon}
          emptyTitle={emptyTitle}
          emptyDescription={emptyDescription}
        />
      </div>
      <Transition
        className="overflow-scroll"
        show={withSidePreview}
        enter="transform transition-all ease-in-out duration-500"
        enterFrom="w-0 translate-x-full"
        enterTo="w-5/12 translate-x-0"
        leave="transform transition-all ease-in-out duration-500"
        leaveFrom="w-5/12 translate-x-0"
        leaveTo="w-0 translate-x-full"
      >
        <MemoizedSidePreview itemsMap={data?.entities} />
      </Transition>
    </>
  );
}

BrowserContainer.propTypes = {
  dirPath: PropTypes.string.isRequired,
  droppable: PropTypes.bool.isRequired,
  emptyIcon: PropTypes.element.isRequired,
  emptyTitle: PropTypes.string.isRequired,
  emptyDescription: PropTypes.string.isRequired,
};

export default BrowserContainer;
