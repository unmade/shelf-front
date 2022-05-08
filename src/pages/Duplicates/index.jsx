import React from 'react';

import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import * as icons from '../../icons';

import DuplicatesResult from './DuplicatesResult';
import SelectFolderDialogButton from './SelectFolderDialogButton';

function Duplicates() {
  const { t } = useTranslation();

  const params = useParams();
  const initialTargetFolderPath = params.dirPath ? decodeURIComponent(params.dirPath) : null;
  const [targetFolderPath, setTargetFolderPath] = React.useState(initialTargetFolderPath);

  if (targetFolderPath == null) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <div>
          <icons.DocumentSearchOutlined className="h-12 w-12 text-gray-400" />
        </div>
        <div className="mt-2">
          <p className="text-center text-2xl font-medium">{t('Duplicates Finder')}</p>
          <p className="mt-2 text-center">
            {t('Start by selecting a folder to search for duplicates in.')}
          </p>
        </div>
        <div className="mt-4">
          <SelectFolderDialogButton type="primary" dirPath="." onSelectFolder={setTargetFolderPath}>
            {t('Select folder')}
          </SelectFolderDialogButton>
        </div>
      </div>
    );
  }

  return <DuplicatesResult dirPath={targetFolderPath} onFolderChange={setTargetFolderPath} />;
}

export default Duplicates;
