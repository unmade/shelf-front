import React from 'react';
import PropTypes from 'prop-types';

import AddFileMemberForm from './AddFileMemberForm';
import FileMembers from './FileMembers';

function FileMembersSetting({ fileId }) {
  return (
    <>
      <div>
        <p className="mt-6 mb-1 text-sm font-semibold">Share with members</p>
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
