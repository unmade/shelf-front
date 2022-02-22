import React from 'react';

import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { findDuplicates } from '../../store/actions/files';
import { getDuplicatesByPath } from '../../store/reducers/files';

import * as icons from '../../icons';

import Button from '../../components/ui/Button';
import Listbox from '../../components/ui/Listbox';

import DuplicateList from './DuplicateList';
import DuplicateListItem from './DuplicateListItem';
import DuplicatePreview from './DuplicatePreview';
import SelectPathButton from './SelectFolderDialogButton';

const MemoizedDuplicatedListItem = React.memo(DuplicateListItem);

const distanceOptions = [
  { name: 'Similar', value: 5 },
  { name: 'Nearly identical', value: 2 },
  { name: 'Identical', value: 0 },
];

function Duplicates() {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const params = useParams();

  const dirPath = decodeURIComponent(params.dirPath ?? '.');

  const [selection, selectItem] = React.useState({ fileId: null, index: null });
  const [maxDistance, setMaxDistance] = React.useState(distanceOptions[0]);

  const maxDistanceValue = maxDistance.value;
  React.useEffect(() => {
    dispatch(findDuplicates(dirPath, maxDistanceValue));
  }, [dirPath, dispatch, maxDistanceValue]);

  const duplicates = useSelector((state) => getDuplicatesByPath(state, dirPath));
  React.useEffect(() => {
    if (duplicates?.length) {
      selectItem({ fileId: duplicates[0][0], index: 0 });
    }
  }, [duplicates, selectItem]);

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

  const title = t('Duplicates');

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
          <div className="w-full">
            <SelectPathButton dirPath={dirPath} />
          </div>
          <Listbox
            initial={distanceOptions[0]}
            options={distanceOptions}
            onOptionChange={setMaxDistance}
          >
            <Button
              as="div"
              size="base"
              icon={<icons.Filter className="h-6 w-6 text-gray-400" />}
            />
          </Listbox>
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
