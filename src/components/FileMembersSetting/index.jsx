import React from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';

import AddFileMemberForm from './AddFileMemberForm';
import FileMembers from './FileMembers';

function FileMembersSetting({ fileId }) {
  const { t } = useTranslation('fileMembersSetting');

  return (
    <>
      <div>
        <p className="mt-6 mb-1 text-sm font-semibold">
          {t('title', { defaultValue: 'Share with members' })}
        </p>
      </div>
      <div>
        <AddFileMemberForm fileId={fileId} />
      </div>

      <FileMembers fileId={fileId} />
    </>
  );
}

FileMembersSetting.propTypes = {
  fileId: PropTypes.string.isRequired,
};

export default FileMembersSetting;
