import React from 'react';

import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { getSpaceUsage } from '../../store/actions/accounts';
import { getSpaceUsage as selectSpaceUsage } from '../../store/reducers/accounts';

import * as icons from '../../icons';

import CircularProgressBar from '../ui/CircularProgressBar';
import FileSize from '../ui/FileSize';
import ProgressBar from '../ui/ProgressBar';

function StorageUsed() {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const spaceUsage = useSelector(selectSpaceUsage);

  const { used, quota } = spaceUsage;

  React.useEffect(() => {
    if (used == null) {
      dispatch(getSpaceUsage());
    }
  }, [used, dispatch]);

  let storageUsed = null;
  if (quota != null) {
    storageUsed = Math.floor(((used ?? 0) / quota) * 100);
  }

  const progress = storageUsed == null ? 100 : storageUsed;
  const idle = storageUsed == null;
  const success = storageUsed != null && storageUsed < 50;
  const warning = storageUsed != null && storageUsed >= 50 && storageUsed < 85;
  const danger = storageUsed != null && storageUsed >= 85;

  return (
    <>
      <div className="block space-y-2 lg:hidden xl:block">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <icons.Database className="h-4 w-4" />
            <p>{t('Storage')}</p>
          </div>
          {(storageUsed != null && <p className="text-gray-400">{storageUsed}%</p>) || (
            <icons.Infinite className="h-5 w-5" />
          )}
        </div>
        <ProgressBar
          progress={progress}
          idle={idle}
          success={success}
          warning={warning}
          danger={danger}
        />
        <div className="text-gray-400">
          {quota != null && (
            <>
              <FileSize size={quota - used} /> {t('available')}
            </>
          )}
        </div>
      </div>

      <div className="hidden lg:block xl:hidden">
        <div className="mx-auto h-11 w-11">
          <CircularProgressBar
            progress={progress}
            idle={idle}
            success={success}
            warning={warning}
            danger={danger}
          >
            {(storageUsed != null && <icons.Database className="h-5 w-5" />) || (
              <icons.Infinite className="h-5 w-5" />
            )}
          </CircularProgressBar>
        </div>
      </div>
    </>
  );
}

export default StorageUsed;

StorageUsed.propTypes = {};
