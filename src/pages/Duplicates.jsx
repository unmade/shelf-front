import React from 'react';

import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { findDuplicates } from '../store/actions/files';

function Duplicates() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const title = t('Duplicates');

  React.useEffect(() => {
    const maxDistance = 5;
    dispatch(findDuplicates('Джонни', maxDistance));
  }, [dispatch]);

  return (
    <div className="flex h-full">
      {/* duplicates list */}
      <div className="w-1/3">
        <div>
          <h2>{title}</h2>
        </div>
      </div>

      {/* duplicates preview */}
      <div className="w-2/3 bg-gray-100" />
    </div>
  );
}

export default Duplicates;
