import React from 'react';

import { FileShape } from '../../types';

import SharedLinkSetting from '../SharedLinkSetting';
import ShareSetting from '../ShareSetting';

function SharingPanel({ file }) {
  return (
    <>
      <SharedLinkSetting file={file} />
      <ShareSetting />
    </>
  );
}

SharingPanel.propTypes = {
  file: FileShape.isRequired,
};

export default SharingPanel;
