import React from 'react';

import { FileShape } from '../../types';

import SharedLinkSetting from '../SharedLinkSetting';
import FileMembersSetting from '../FileMembersSetting';

function SharingPanel({ file }) {
  return (
    <>
      <SharedLinkSetting file={file} />
      <FileMembersSetting fileId={file.id} />
    </>
  );
}

SharingPanel.propTypes = {
  file: FileShape.isRequired,
};

export default SharingPanel;
