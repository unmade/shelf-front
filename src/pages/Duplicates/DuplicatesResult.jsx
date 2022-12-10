import React from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';

import { useFindDuplicatesQuery } from '../../store/files';

import * as icons from '../../icons';
import useResolvedPreviewSearchParam from '../../hooks/resolved-preview-search-param';
import * as routes from '../../routes';

import Button from '../../components/ui/Button';
import Listbox from '../../components/ui/Listbox';

import FilePreview from '../../components/FilePreview';

import DuplicateList from './DuplicateList';
import DuplicateListItem from './DuplicateListItem';
import DuplicateSidePreview from './DuplicateSidePreview';
import SelectFolderDialogButton from './SelectFolderDialogButton';

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

  const pathToPreview = useResolvedPreviewSearchParam();

  const [selection, selectItem] = React.useState(null);
  const [maxDistance, setMaxDistance] = React.useState(distanceOptions[0]);

  const { data: duplicates } = useFindDuplicatesQuery({
    path: dirPath,
    maxDistance: maxDistance.value,
  });

  React.useEffect(() => {
    if (duplicates?.length) {
      selectItem({ groupId: 0, value: duplicates[0][0] });
    } else {
      selectItem(null);
    }
  }, [duplicates, selectItem]);

  const onItemClick = ({ groupId, value }) => {
    selectItem({ groupId, value });
  };

  const data = {
    items: duplicates,
    selectedId: selection?.value.id,
    onItemClick,
  };

  if (pathToPreview) {
    return <FilePreview pathToPreview={pathToPreview} files={duplicates[selection?.groupId]} />;
  }

  return (
    <div className="flex h-full">
      {/* left column: search results */}
      <div className="flex w-1/3 flex-col">
        {/* header and title */}
        <div className="mx-6 pt-7">
          <h2 className="text-xl font-medium text-gray-900 dark:text-zinc-200 sm:text-3xl">
            {t('duplicates:resultTitle')}
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
            <DuplicateList data={data} itemRenderer={DuplicateListItem} />
          ) : (
            <div className="flex h-full items-center justify-center">
              <p className="font-medium">{t('duplicates:emptyResult')}</p>
            </div>
          )}
        </div>
      </div>

      {/* right column: duplicates preview */}
      <div className="w-2/3 border-l dark:border-zinc-700">
        {selection?.value != null && <DuplicateSidePreview file={selection.value} />}
      </div>
    </div>
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
