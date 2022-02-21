import React from 'react';

import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { findDuplicates } from '../store/actions/files';
import { getDuplicatesByPath } from '../store/reducers/files';

import * as icons from '../icons';

import Button from '../components/ui/Button';

import DuplicateList from '../components/DuplicateList';
import DuplicateListItem from '../components/DuplicateListItem';
import DuplicatePreview from '../components/DuplicatePreview';

const MemoizedDuplicatedListItem = React.memo(DuplicateListItem);

function Duplicates() {
  const { t } = useTranslation();

  const [selection, selectItem] = React.useState({ fileId: null, index: null });

  const dispatch = useDispatch();
  const params = useParams();

  const dirPath = decodeURIComponent(params.dirPath ?? '.');

  // select first item by default
  const duplicates = useSelector((state) => getDuplicatesByPath(state, dirPath));
  if (duplicates?.length && selection.fileId == null) {
    selectItem({ fileId: duplicates[0][0], index: 0 });
  }

  const title = t('Duplicates');

  React.useEffect(() => {
    const maxDistance = 5;
    dispatch(findDuplicates(dirPath, maxDistance));
  }, [dispatch]);

  const onItemClick = (fileId, index) => {
    selectItem({ fileId, index });
  };

  const itemRenderer = ({ data, index, style }) => (
    <div style={style}>
      <MemoizedDuplicatedListItem
        neighbourSelected={selection.index === index - 1}
        index={index}
        selected={data[index].value === selection.fileId}
        type={data[index].type}
        value={data[index].value}
        onItemClick={onItemClick}
      />
    </div>
  );

  return (
    <div className="flex h-full">
      {/* left column: search results */}
      <div className="flex w-1/3 flex-col">
        {/* header and title */}
        <div className="mx-6 mt-8">
          <h2 className="text-xl font-medium">{title}</h2>
          <span className="text-sm text-gray-500">Lorem ipsum dolor sit amet</span>
        </div>

        {/* select folder and filter buttons */}
        <div className="mx-6 mt-5 flex space-x-6">
          <Button
            className="relative"
            type="default"
            title="Select folder"
            size="base"
            icon={<icons.Folder className="h-5 w-5 text-blue-400" />}
            full
          >
            <span className="text-sm">{dirPath}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
              <icons.Selector className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </Button>
          <Button size="base" icon={<icons.Filter className="h-5 w-6 text-gray-400" />} />
        </div>

        {/* duplicates list */}
        <div className="mt-7" />
        <div className="flex-1">
          <DuplicateList dirPath={dirPath} itemRenderer={itemRenderer} />
        </div>
      </div>

      {/* right column: duplicates preview */}
      <div className="w-2/3 border-l">
        <DuplicatePreview fileId={selection.fileId} />
      </div>
    </div>
  );
}

export default Duplicates;
