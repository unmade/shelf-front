import React from 'react';

import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import useDirPath from '../../hooks/dir-path';
import * as icons from '../../icons';

import Button from '../../components/ui/Button';

import DeleteDialogProvider from '../../components/DeleteDialogProvider';

import DuplicatesResult from './DuplicatesResult';
import SelectFolderDialogButton from './SelectFolderDialogButton';

function Duplicates() {
  const { t } = useTranslation('duplicates');

  const navigate = useNavigate();

  const dirPath = useDirPath();
  const initialTargetFolderPath = dirPath !== '.' ? dirPath : null;
  const [targetFolderPath, setTargetFolderPath] = React.useState(initialTargetFolderPath);

  const goBack = () => {
    navigate(-1);
  };

  if (targetFolderPath == null) {
    return (
      <>
        <Helmet>
          <title>{t('Duplicates finder')} - Shelf</title>
        </Helmet>
        {/* desktop */}
        <div className="hidden h-full flex-col items-center justify-center lg:flex">
          <div>
            <icons.DocumentSearchOutlined className="h-12 w-12 text-gray-400 dark:text-zinc-500" />
          </div>
          <div className="mt-2">
            <p className="text-center text-2xl font-medium">{t('duplicates:welcomeTitle')}</p>
            <p className="mt-2 text-center">{t('duplicates:welcomeHelpText')}</p>
          </div>
          <div className="mt-4">
            <SelectFolderDialogButton
              type="primary"
              dirPath="."
              onSelectFolder={setTargetFolderPath}
            >
              {t('duplicates:selectFolderButton')}
            </SelectFolderDialogButton>
          </div>
        </div>
        {/* mobile */}
        <div className="flex h-full flex-col items-center justify-center space-y-6 lg:hidden">
          <p>{t('duplicates:pageNotAvailableOnMobile')}</p>
          <Button onClick={goBack} variant="primary">
            {t('duplicates:goBack')}
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{t('Duplicates finder')} - Shelf</title>
      </Helmet>
      <DeleteDialogProvider>
        <DuplicatesResult dirPath={targetFolderPath} onFolderChange={setTargetFolderPath} />
      </DeleteDialogProvider>
    </>
  );
}

export default Duplicates;
