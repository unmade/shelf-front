import React from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { findDuplicates } from '../../store/actions/files';
import { getDuplicatesByPath } from '../../store/reducers/files';

import * as icons from '../../icons';
import * as routes from '../../routes';

import DuplicatePreview from '../../containers/DuplicatePreview';

import Button from '../../components/ui/Button';
import Listbox from '../../components/ui/Listbox';

import DuplicateList from './DuplicateList';
import DuplicateListItem from './DuplicateListItem';
import DuplicateSidePreview from './DuplicateSidePreview';
import SelectFolderDialogButton from './SelectFolderDialogButton';

const MemoizedDuplicatedListItem = React.memo(DuplicateListItem);

const distanceOptions = [
  { name: 'Similar', value: 5, symbol: '≈' },
  {
    name: 'Nearly identical',
    value: 2,
    symbol: (
      <span className="flex flex-col">
        <span>~</span>
        <span className="-mt-5.75">–</span>
      </span>
    ),
  },
  { name: 'Identical', value: 0, symbol: '=' },
];

function DuplicatesResult({ dirPath, onFolderChange }) {
  const { t } = useTranslation('duplicates');

  const dispatch = useDispatch();
  const location = useLocation();

  const { search } = location;
  const queryParams = new URLSearchParams(search);
  const preview = queryParams.get('preview');

  const [selection, selectItem] = React.useState({ fileId: null });
  const [maxDistance, setMaxDistance] = React.useState(distanceOptions[0]);

  const maxDistanceValue = maxDistance.value;
  React.useEffect(() => {
    dispatch(findDuplicates(dirPath, maxDistanceValue));
  }, [dirPath, dispatch, maxDistanceValue]);

  const duplicates = useSelector((state) => getDuplicatesByPath(state, dirPath));
  React.useEffect(() => {
    if (duplicates?.length) {
      selectItem({ fileId: duplicates[0][0] });
    } else {
      selectItem({ fileId: null });
    }
  }, [duplicates, selectItem]);

  const onItemClick = (fileId) => {
    selectItem({ fileId });
  };

  const itemRenderer = ({ data, index, style }) => (
    <div style={style}>
      <MemoizedDuplicatedListItem
        indexInGroup={data[index].idx}
        selected={data[index].value === selection.fileId}
        type={data[index].type}
        value={data[index].value}
        onItemClick={onItemClick}
      />
    </div>
  );

  const preparePreviewPath = (path) => {
    let previewPath = path;
    if (dirPath !== '' && path.startsWith(dirPath)) {
      previewPath = path.replace(dirPath, '').substring(1);
    }
    return routes.makeUrlFromPath({
      path: dirPath,
      queryParams: { preview: previewPath },
      defaultPrefix: routes.DUPLICATES.prefix,
    });
  };

  const title = t('duplicates:resultTitle');

  return (
    <>
      <div className="flex h-full">
        {/* left column: search results */}
        <div className="flex w-1/3 flex-col">
          {/* header and title */}
          <div className="mx-6 pt-7">
            <h2 className="text-xl font-medium text-gray-900 dark:text-zinc-200 sm:text-3xl">
              {title}
            </h2>
          </div>

          {/* select folder and filter buttons */}
          <div className="mx-6 mt-5 flex space-x-6">
            <div className="w-full">
              <SelectFolderDialogButton
                dirPath={dirPath}
                icon={<icons.Folder className="h-5 w-5 text-blue-400" />}
                onSelectFolder={onFolderChange}
              >
                <span className="text-sm">{routes.folderName(dirPath)}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                  <icons.Selector
                    className="h-5 w-5 text-gray-400 dark:text-zinc-500"
                    aria-hidden="true"
                  />
                </span>
              </SelectFolderDialogButton>
            </div>
            <Listbox
              initial={distanceOptions[0]}
              options={distanceOptions}
              onOptionChange={setMaxDistance}
            >
              <Button
                size="base"
                icon={
                  <div className="flex h-6 w-6 items-center justify-center text-xl font-medium text-gray-500 dark:text-zinc-400">
                    {maxDistance.symbol}
                  </div>
                }
              />
            </Listbox>
          </div>

          {/* duplicates list */}
          <div className="mt-7" />
          <div className="flex-1">
            {duplicates?.length ? (
              <DuplicateList dirPath={dirPath} itemRenderer={itemRenderer} />
            ) : (
              <div className="flex h-full items-center justify-center">
                <p className="font-medium">{t('duplicates:emptyResult')}</p>
              </div>
            )}
          </div>
        </div>

        {/* right column: duplicates preview */}
        <div className="w-2/3 border-l dark:border-zinc-700">
          <DuplicateSidePreview fileId={selection.fileId} />
        </div>
      </div>
      {preview && (
        <DuplicatePreview dirPath={dirPath} name={preview} preparePath={preparePreviewPath} />
      )}
    </>
  );
}

export default DuplicatesResult;

DuplicatesResult.propTypes = {
  dirPath: PropTypes.string.isRequired,
  onFolderChange: PropTypes.func,
};

DuplicatesResult.defaultProps = {
  onFolderChange: null,
};
